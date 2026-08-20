import type { Request, Response } from "express";
import {
	createBook,
	deleteBook,
	getAllBooks,
	getBookById,
	updateBook,
} from "@services/books.service";
import {
	bookIdParamSchema,
	createBookSchema,
	updateBookSchema,
} from "@models/books.model";

export async function index(req: Request, res: Response) {
	try {
		const books = await getAllBooks();
		return res.status(200).json({
			message: "Get all books success",
			data: books,
		});
	} catch (error) {
      console.log(error)
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function show(req: Request, res: Response) {
	try {
		const result = bookIdParamSchema.safeParse(req.params);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid book ID",
				errors: result.error.flatten(),
			});
		}

		const { id } = result.data;

		const book = await getBookById(id);
		if (!book) {
			return res.status(404).json({
				message: "Category ",
			});
		}

		return res.status(200).json({
			message: "Get book success",
			data: book,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function create(req: Request, res: Response) {
	try {
		const result = createBookSchema.safeParse(req.body);
		if (!result.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { title, author, price, stock_quantity } = result.data;

		const book = await createBook({
			title,
			author,
			price,
			stock_quantity,
		});

		return res.status(200).json({
			message: "Create book success",
			data: book,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function update(req: Request, res: Response) {
	try {
		const resultParams = bookIdParamSchema.safeParse(req.params);
		const resultBody = updateBookSchema.safeParse(req.body);

		if (!resultParams.success) {
			return res.status(400).json({
				message: "Invalid book ID",
				errors: resultParams.error.flatten(),
			});
		}

		if (!resultBody.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: resultBody.error.flatten().fieldErrors,
			});
		}

		const { id } = resultParams.data;
		const { title, author, price, stock_quantity } = resultBody.data;

		const book = await updateBook(id, {
			title,
			author,
			price,
			stock_quantity,
		});

		return res.status(200).json({
			message: "Update book success",
			data: book,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}

export async function destroy(req: Request, res: Response) {
	try {
		const result = bookIdParamSchema.safeParse(req.params);

		if (!result.success) {
			return res.status(400).json({
				message: "Invalid book ID",
				errors: result.error.flatten(),
			});
		}

		const { id } = result.data;

		const deletedBook = await deleteBook(id);

		if (!deletedBook) {
			return res.status(404).json({
				message: "Book not found",
			});
		}

		return res.status(200).json({
			message: "Delete book success",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
