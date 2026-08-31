import { asyncHandler } from "@lib/async-handler";
import { getMonthlyRevenueSummary, getTopSellingBooksReport } from "@services/reports.service";
import type { Request, Response } from "express";

export const revenueReport = asyncHandler(async (req: Request, res: Response) => {
   const data = await getMonthlyRevenueSummary();

   res.status(200).json({
      success: true,
      message: "Get monthly revenue summary success",
      data,
   });
});

export const topSellingBooks = asyncHandler(async (req: Request, res: Response) => {
   const data = await getTopSellingBooksReport();

   res.status(200).json({
      success: true,
      message: "Get top selling books success",
      data,
   });
});
