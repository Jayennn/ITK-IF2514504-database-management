import { asyncHandler } from "@lib/async-handler";
import { getAllOrdersReport, getTopSellingBooksReport } from "@services/reports.service";
import type { Request, Response } from "express";

export const revenueReport = asyncHandler(async (_eq: Request, res: Response) => {
   const revenue = await getAllOrdersReport();

   res.status(200).json({
      success: true,
      message: "Get all orders report success",
      data: revenue,
   });
});

export const topSellingBooks = asyncHandler(async (req: Request, res: Response) => {
   const data = await getTopSellingBooksReport();

   res.status(200).json({
      success: true,
      message: "Get all top selling books success",
      data,
   });
});
