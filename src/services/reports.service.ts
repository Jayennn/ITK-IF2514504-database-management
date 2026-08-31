import * as ReportsRepository from "@repositories/reports.repository";
import type { MonthlyRevenueSummary, TopSellingBooksReport } from "@models/reports.model";

export async function getMonthlyRevenueSummary(): Promise<MonthlyRevenueSummary[]> {
	return await ReportsRepository.getMonthlyRevenueSummary();
}

export async function getTopSellingBooksReport(): Promise<TopSellingBooksReport[]> {
	return await ReportsRepository.getTopSellingBooks();
}
