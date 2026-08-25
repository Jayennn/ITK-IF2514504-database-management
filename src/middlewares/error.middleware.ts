import type { NextFunction, Request, Response } from "express";
import { AppError } from "@app-types/app-error";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (process.env.NODE_ENV !== "production") {
		console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
		console.error(err.stack);
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
		});
	}

	return res.status(500).json({
		success: false,
		message:
			process.env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
	});
}

export function notFoundHandler(req: Request, res: Response) {
	return res.status(404).json({
		success: false,
		message: `Route ${req.method} ${req.originalUrl} not found`,
	});
}
