import type { OrderSummaryReport, TopSellingBooksReport } from "@models/reports.model";
import { sql } from "../database/db";

export async function getOrderSummary(): Promise<OrderSummaryReport[]> {
	return await sql<OrderSummaryReport[]>`SELECT * FROM vw_order_summary`;
}

export async function getTopSellingBooks(): Promise<TopSellingBooksReport[]> {
	return await sql<TopSellingBooksReport[]>`SELECT * FROM vw_top_selling_books`;
}
