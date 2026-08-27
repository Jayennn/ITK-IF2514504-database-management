import type { Book, CreateBookDto, UpdateBookDto } from "@models/books.model";
import { sql } from "../database/db";

export async function findAllBooks(): Promise<Book[]> {
	return await sql<Book[]>`SELECT * FROM get_all_books()`;
}

export async function findBookById(id: number): Promise<Book | null> {
	const [book] = await sql<Book[]>`SELECT * FROM get_book_by_id(${id})`;
	return book ?? null;
}

export async function insertBook(data: CreateBookDto): Promise<Book> {
	await sql`CALL create_book(${data.title}, ${data.author}, ${data.price}, ${data.stock_quantity})`;
	const [book] = await sql<Book[]>`SELECT * FROM get_book_by_id(LASTVAL()::INT)`;
	return book!;
}

export async function updateBookById(
	id: number,
	data: UpdateBookDto,
): Promise<Book | null> {
	await sql`CALL update_book(${id}, ${data.title}, ${data.author}, ${data.price}, ${data.stock_quantity})`;
	const [book] = await sql<Book[]>`SELECT * FROM get_book_by_id(${id})`;
	return book ?? null;
}

export async function deleteBookById(id: number): Promise<Book | null> {
	const [book] = await sql<Book[]>`SELECT * FROM get_book_by_id(${id})`;
	if (!book) return null;
	await sql`CALL delete_book(${id})`;
	return book;
}
