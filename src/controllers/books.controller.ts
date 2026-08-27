import {
	bookIdParamSchema,
	createBookSchema,
	updateBookSchema,
} from "@models/books.model";
import {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook,
} from "@services/books.service";
import { ValidationError } from "@app-types/app-error";
import { asyncHandler } from "@lib/async-handler";
import type { NextFunction, Request, Response } from "express";

export const index = asyncHandler(async (_req: Request, res: Response) => {
	const books = await getAllBooks();

	res.status(200).json({
		success: true,
		message: "Get all books success",
		data: books,
	});
});

export const show = asyncHandler(async (req: Request, res: Response) => {
	const result = bookIdParamSchema.safeParse(req.params);

	if (!result.success) {
		throw new ValidationError("Invalid book ID");
	}

	const book = await getBookById(result.data.id);

	res.status(200).json({
		success: true,
		message: "Get book success",
		data: book,
	});
});

export const create = asyncHandler(async (req: Request, res: Response) => {
	const result = createBookSchema.safeParse(req.body);

	if (!result.success) {
		throw new ValidationError("Validation failed");
	}

	const book = await createBook(result.data);

	res.status(201).json({
		success: true,
		message: "Create book success",
		data: book,
	});
});

export const update = asyncHandler(async (req: Request, res: Response) => {
	const resultParams = bookIdParamSchema.safeParse(req.params);
	const resultBody = updateBookSchema.safeParse(req.body);

	if (!resultParams.success) {
		throw new ValidationError("Invalid book ID");
	}

	if (!resultBody.success) {
		throw new ValidationError("Validation failed");
	}

	const book = await updateBook(resultParams.data.id, resultBody.data);

	res.status(200).json({
		success: true,
		message: "Update book success",
		data: book,
	});
});

export const destroy = asyncHandler(async (req: Request, res: Response) => {
	const result = bookIdParamSchema.safeParse(req.params);

	if (!result.success) {
		throw new ValidationError("Invalid book ID");
	}

	await deleteBook(result.data.id);

	res.status(200).json({
		success: true,
		message: "Delete book success",
	});
});
