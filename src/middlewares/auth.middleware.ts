import { AppError } from "@app-types/app-error";
import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function authenticate(req: Request, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return next(new AppError("Unauthorized: Missing or invalid token format", 401));
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return next(new AppError("Unauthorized: Missing token", 401));
		}

		const { payload } = await jwtVerify(token, secret);

		req.user = {
			userId: payload.userId as number,
			email: payload.email as string,
			role: payload.role as string,
		};

		next();
	} catch (error) {
		next(new AppError("Unauthorized: Invalid or expired token", 401));
	}
}
