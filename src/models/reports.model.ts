import z from "zod";

export const orderSummaryReportSchema = z.object({
	order_id: z.number(),
	customer_email: z.string(),
	order_date: z.date(),
	total_items: z.number(),
	total_price: z.number(),
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

export type OrderSummaryReport = z.infer<typeof orderSummaryReportSchema>;
export type TopSellingBooksReport = z.infer<typeof topSellingBooksReportSchema>;
