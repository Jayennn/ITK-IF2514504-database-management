import type { NextFunction, Request, Response } from "express";

export function authorize(...allowedRoles: string[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({
				message: "Unauthorized: User is not authenticated",
			});
		}

		if (!allowedRoles.includes(req.user.role)) {
			return res.status(403).json({
				message:
					"Forbidden: You do not have permission to access this resource",
			});
		}

		next();
	};
}
