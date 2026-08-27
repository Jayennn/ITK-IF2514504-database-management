import type { Book, CreateBookDto, UpdateBookDto } from "@models/books.model";
import { NotFoundError } from "@app-types/app-error";
import * as BooksRepository from "@repositories/books.repository";

export async function getAllBooks(): Promise<Book[]> {
	return await BooksRepository.findAllBooks();
}

export async function getBookById(id: number): Promise<Book> {
	const book = await BooksRepository.findBookById(id);

	if (!book) {
		throw new NotFoundError("Book not found");
	}

	return book;
}

export async function createBook(data: CreateBookDto): Promise<Book> {
	return await BooksRepository.insertBook(data);
}

export async function updateBook(id: number, data: UpdateBookDto): Promise<Book> {
	const book = await BooksRepository.updateBookById(id, data);

	if (!book) {
		throw new NotFoundError("Book not found");
	}

	return book;
}

export async function deleteBook(id: number): Promise<void> {
	const book = await BooksRepository.deleteBookById(id);

	if (!book) {
		throw new NotFoundError("Book not found");
	}
}
