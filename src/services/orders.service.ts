import type {
	Order,
	OrderRawRow,
	OrderWithDetails,
} from "@models/orders.model";
import { sql } from "../database/db";

export async function getAllOrders(): Promise<Order[]> {
	const orders = await sql<Order[]>`SELECT * FROM get_all_orders()`;
	return orders;
}

export async function getOrderById(
	id: number,
): Promise<OrderWithDetails | null> {
	const rows = await sql<OrderRawRow[]>`SELECT * FROM get_order_by_id(${id})`;

	if (!rows[0]) {
		return null;
	}

	const order: OrderWithDetails = {
		order_id: rows[0].order_id,
		order_date: rows[0].order_date,
		email: rows[0].email,
		items: [],
	};

	for (const row of rows) {
		if (row.order_detail_id !== null) {
			order.items.push({
				order_detail_id: row.order_detail_id,
				book_id: row.book_id,
				title: row.title,
				quantity: row.quantity,
				price: Number(row.price),
				total_price: Number(row.total_price),
			});
		}
	}

	return order;
}
