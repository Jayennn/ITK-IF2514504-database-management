import z from "zod";

export const monthlyRevenueSummarySchema = z.object({
	year: z.number(),
	month: z.number(),
	total_orders: z.number(),
	unique_customers: z.number(),
	total_items_sold: z.number(),
	total_revenue: z.number(),
	avg_order_value: z.number(),
});

export const topSellingBooksReportSchema = z.object({
	book_id: z.number(),
	title: z.string(),
	author: z.string(),
	price: z.number(),
	remaining_stock: z.number(),
	total_sold: z.number(),
	total_revenue: z.number(),
});

export type MonthlyRevenueSummary = z.infer<typeof monthlyRevenueSummarySchema>;
export type TopSellingBooksReport = z.infer<typeof topSellingBooksReportSchema>;
