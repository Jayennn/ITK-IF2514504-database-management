import { AppError } from "@app-types/app-error";
import type { NextFunction, Request, Response } from "express";

export function authorize(...allowedRoles: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return next(new AppError("Unauthorized: User is not authenticated", 401));
		}

		if (!allowedRoles.includes(req.user.role)) {
			return next(
				new AppError(
					"Forbidden: You do not have permission to access this resource",
					403,
				),
			);
		}

		next();
	};
}
