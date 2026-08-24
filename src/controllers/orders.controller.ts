import { orderIdParamSchema } from "@models/orders.model";
import { getAllOrders, getOrderById } from "@services/orders.service";
import type { Request, Response } from "express";

export async function index(_req: Request, res: Response) {
	try {
		const orders = await getAllOrders();
		return res.status(200).json({
			message: "Get all orders success",
			data: orders,
		});
	} catch (_error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function show(req: Request, res: Response) {
	try {
		const result = orderIdParamSchema.safeParse(req.params);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid order ID",
				errors: result.error.flatten(),
			});
		}

		const order = await getOrderById(result.data.id);

		if (!order) {
			return res.status(404).json({
				message: "Order not found",
			});
		}

		return res.status(200).json({
			message: "Get order by ID success",
			data: order,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
