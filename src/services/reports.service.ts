import * as ReportsRepository from "@repositories/reports.repository";
import type { OrderSummaryReport, TopSellingBooksReport } from "@models/reports.model";

export async function getAllOrdersReport(): Promise<OrderSummaryReport[]> {
	return await ReportsRepository.getOrderSummary();
}

export async function getTopSellingBooksReport(): Promise<TopSellingBooksReport[]> {
	return await ReportsRepository.getTopSellingBooks();
}
