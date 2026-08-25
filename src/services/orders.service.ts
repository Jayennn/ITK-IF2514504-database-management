import type {
	CreateOrderDto,
	Order,
	OrderRawRow,
	OrderWithDetails,
} from "@models/orders.model";
import { sql } from "../database/db";

export async function getAllOrders(): Promise<Order[]> {
	const orders = await sql<Order[]>`SELECT * FROM get_all_orders()`;
	return orders;
}

export async function getOrderById(id: number): Promise<OrderWithDetails | null> {
	const rows = await sql<OrderRawRow[]>`SELECT * FROM get_order_by_id(${id})`;

	if (!rows[0]) {
		return null;
	}

	const order: OrderWithDetails = {
		order_id: rows[0].order_id,
		user_id: rows[0].user_id,
		order_date: rows[0].order_date,
		email: rows[0].email,
		items: [],
	};

	for (const row of rows) {
		if (row.order_detail_id !== null) {
			const item_total = Number(row.total_price);
			order.items.push({
				order_detail_id: row.order_detail_id,
				book_id: row.book_id,
				title: row.title,
				quantity: row.quantity,
				price: Number(row.price),
				total_price: item_total,
			});
		}
	}

	return order;
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
	const orders = await sql<Order[]>`SELECT * FROM get_orders_by_user_id(${userId})`;
	return orders;
}

export async function processOrderCheckout(
	userId: number,
	data: CreateOrderDto,
): Promise<OrderWithDetails> {
	const itemsJson = JSON.stringify(data.items);

	const [result] = await sql<[{ p_order_id: number }]>`
		SELECT p_order_id FROM (CALL process_order_checkout(${userId}, ${itemsJson}::JSONB)) AS result
	`;

	const order = await getOrderById(result.p_order_id);

	if (!order) {
		throw new Error("Failed to retrieve order after checkout");
	}

	return order;
}
