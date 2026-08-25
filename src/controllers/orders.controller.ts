import { createOrderSchema, orderIdParamSchema } from "@models/orders.model";
import { AppError } from "@app-types/app-error";
import { getAuthUser } from "@services/auth.service";
import {
	getAllOrders,
	getOrderById,
	getOrdersByUserId,
	processOrderCheckout,
} from "@services/orders.service";
import type { Request, Response } from "express";

export async function index(req: Request, res: Response) {
	const orders = await getAllOrders();
	return res.status(200).json({
		success: true,
		message: "Get all orders success",
		data: orders,
	});
}

export async function show(req: Request, res: Response) {
	const result = orderIdParamSchema.safeParse(req.params);

	if (!result.success) {
		throw new AppError("Invalid order ID", 400);
	}

	const order = await getOrderById(result.data.id);

	if (!order) {
		throw new AppError("Order not found", 404);
	}

	// Ownership check: customers can only view their own orders
	const user = getAuthUser(req);
	if (user.role === "customer" && order.user_id !== user.userId) {
		throw new AppError("Forbidden: you can only view your own orders", 403);
	}

	return res.status(200).json({
		success: true,
		message: "Get order by ID success",
		data: order,
	});
}

export async function myOrders(req: Request, res: Response) {
	const user = getAuthUser(req);
	const userOrders = await getOrdersByUserId(user.userId);

	return res.status(200).json({
		success: true,
		message: "Get my orders success",
		data: userOrders,
	});
}

export async function checkoutOrder(req: Request, res: Response) {
	// Fix 1: Validate request body with Zod
	const result = createOrderSchema.safeParse(req.body);

	if (!result.success) {
		throw new AppError("Invalid order data", 400);
	}

	const user = getAuthUser(req);

	// Fix 2: Pass validated DTO, service returns full order details
	const order = await processOrderCheckout(user.userId, result.data);

	return res.status(201).json({
		success: true,
		message: "Checkout successful",
		data: order,
	});
}
