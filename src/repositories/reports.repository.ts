import type { MonthlyRevenueSummary, TopSellingBooksReport } from "@models/reports.model";
import { sql } from "../database/db";

export async function getMonthlyRevenueSummary(): Promise<MonthlyRevenueSummary[]> {
	return await sql<MonthlyRevenueSummary[]>`SELECT * FROM vw_monthly_revenue_summary`;
}

export async function getTopSellingBooks(): Promise<TopSellingBooksReport[]> {
	return await sql<TopSellingBooksReport[]>`SELECT * FROM vw_top_selling_books`;
}
