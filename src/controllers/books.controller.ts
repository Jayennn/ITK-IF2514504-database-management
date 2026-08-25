import {
	bookIdParamSchema,
	createBookSchema,
	updateBookSchema,
} from "@models/books.model";
import {
	createBook,
	deleteBook,
	getAllBooks,
	getBookById,
	updateBook,
} from "@services/books.service";
import { AppError } from "@app-types/app-error";
import type { Request, Response } from "express";

export async function index(_req: Request, res: Response) {
	const books = await getAllBooks();
	return res.status(200).json({
		success: true,
		message: "Get all books success",
		data: books,
	});
}

export async function show(req: Request, res: Response) {
	const result = bookIdParamSchema.safeParse(req.params);

	if (!result.success) {
		throw new AppError("Invalid book ID", 400);
	}

	const book = await getBookById(result.data.id);
	if (!book) {
		throw new AppError("Book not found", 404);
	}

	return res.status(200).json({
		success: true,
		message: "Get book success",
		data: book,
	});
}

export async function create(req: Request, res: Response) {
	const result = createBookSchema.safeParse(req.body);

	if (!result.success) {
		throw new AppError("Validation failed", 400);
	}

	const { title, author, price, stock_quantity } = result.data;

	const book = await createBook({ title, author, price, stock_quantity });

	return res.status(201).json({
		success: true,
		message: "Create book success",
		data: book,
	});
}

export async function update(req: Request, res: Response) {
	const resultParams = bookIdParamSchema.safeParse(req.params);
	const resultBody = updateBookSchema.safeParse(req.body);

	if (!resultParams.success) {
		throw new AppError("Invalid book ID", 400);
	}

	if (!resultBody.success) {
		throw new AppError("Validation failed", 400);
	}

	const { id } = resultParams.data;
	const { title, author, price, stock_quantity } = resultBody.data;

	const book = await updateBook(id, { title, author, price, stock_quantity });

	return res.status(200).json({
		success: true,
		message: "Update book success",
		data: book,
	});
}

export async function destroy(req: Request, res: Response) {
	const result = bookIdParamSchema.safeParse(req.params);

	if (!result.success) {
		throw new AppError("Invalid book ID", 400);
	}

	const deletedBook = await deleteBook(result.data.id);

	if (!deletedBook) {
		throw new AppError("Book not found", 404);
	}

	return res.status(200).json({
		success: true,
		message: "Delete book success",
	});
}
