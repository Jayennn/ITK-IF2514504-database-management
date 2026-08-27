import type { NextFunction, Request, Response } from "express";

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

/**
 * Wraps an async Express handler so that any thrown error is automatically
 * forwarded to the Express error middleware via `next(error)`.
 * Eliminates the need for try/catch in every controller function.
 */
export function asyncHandler(fn: AsyncHandler) {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}
