import { z } from "zod";
import { bookSchema } from "./books.model";

// 1. Base table schema for orders
export const orderSchema = z.object({
	id: z
		.number("Order ID must be a number")
		.int("Order ID must be an integer")
		.positive("Order ID must be greater than 0"),

	user_id: z
		.number("User ID must be a number")
		.int("User ID must be an integer")
		.positive("User ID must be greater than 0"),

	order_date: z.union([z.string(), z.date()]),

	created_at: z.date().nullable(),
	updated_at: z.date().nullable(),
});

// 2. Base table schema for order_details
export const orderDetailSchema = z.object({
	id: z
		.number("Order detail ID must be a number")
		.int("Order detail ID must be an integer")
		.positive("Order detail ID must be greater than 0"),

	order_id: z
		.number("Order ID must be a number")
		.int("Order ID must be an integer")
		.positive("Order ID must be greater than 0"),

	book_id: z
		.number("Book ID must be a number")
		.int("Book ID must be an integer")
		.positive("Book ID must be greater than 0"),

	quantity: z
		.number("Quantity must be a number")
		.int("Quantity must be an integer")
		.positive("Quantity must be at least 1"),

	price: z.number("Price must be a number").min(0, "Price cannot be negative"),

	created_at: z.date().nullable(),
	updated_at: z.date().nullable(),
});

export const orderRawRowSchema = z.object({
	order_id: z.number(),
	user_id: z.number(),
	email: z.string().email(),
	order_date: z.union([z.string(), z.date()]),
	order_detail_id: z.number(),
	book_id: z.number(),
	title: z.string(),
	quantity: z.number(),
	price: z.coerce.number(),
	total_price: z.coerce.number(),
});

export const orderWithDetailsSchema = z.object({
	order_id: z.number(),
	order_date: z.union([z.string(), z.date()]),
	email: z.string().email(),

	items: z.array(
		z.object({
			order_detail_id: z.number(),
			book_id: z.number(),
			title: z.string(),
			quantity: z.number(),
			price: z.number(),
			total_price: z.number(),
		}),
	),
});

export const orderIdParamSchema = z.object({
	id: z.coerce
		.number("ID must be a number")
		.int("ID must be an integer")
		.positive("ID must be a positive integer"),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderDetail = z.infer<typeof orderDetailSchema>;
export type OrderRawRow = z.infer<typeof orderRawRowSchema>;
export type OrderWithDetails = z.infer<typeof orderWithDetailsSchema>;
export type OrderIdParams = z.infer<typeof orderIdParamSchema>;
