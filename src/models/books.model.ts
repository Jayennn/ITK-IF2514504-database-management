import { z } from "zod";

export const bookSchema = z.object({
	id: z
		.number("Book ID must be a number")
		.int("Book ID must be an integer")
		.positive("Book ID must be greater than 0"),

	title: z
		.string("Title is required")
		.trim()
		.min(1, "Title cannot be empty")
		.max(255, "Title maximum length is 255 characters"),

	author: z
		.string("Author is required")
		.trim()
		.min(1, "Author cannot be empty")
		.max(150, "Author maximum length is 150 characters"),

	price: z.number("Price is required").min(0, "Price cannot be negative"),

	stock_quantity: z
		.number("Stock quantity is required")
		.int("Stock quantity must be an integer")
		.min(0, "Stock quantity cannot be negative"),

	updated_at: z.date(),
	created_at: z.date(),
});

export const createBookSchema = bookSchema.omit({
	id: true,
	updated_at: true,
	created_at: true,
});
export const updateBookSchema = bookSchema
	.omit({ id: true, updated_at: true, created_at: true })
	.partial();

export const bookIdParamSchema = z.object({
	id: z.coerce
		.number("ID must be a number")
		.int("ID must be an integer")
		.positive("ID must be a positive integer"),
});

export type Book = z.infer<typeof bookSchema>;
export type CreateBookDto = z.infer<typeof createBookSchema>;
export type UpdateBookDto = z.infer<typeof updateBookSchema>;
export type BookIdParams = z.infer<typeof bookIdParamSchema>;
