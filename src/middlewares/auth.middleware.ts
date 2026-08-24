import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function authenticate(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res
				.status(401)
				.json({ message: "Unauthorized: Missing or invalid token format" });
		}

		const token = authHeader.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "Unauthorized: Missing token" });
		}

		const { payload } = await jwtVerify(token, secret);
		req.user = {
			userId: payload.userId as number,
			email: payload.email as string,
			role: payload.role as string,
		};

		next();
	} catch (_error) {
		return res
			.status(401)
			.json({ message: "Unauthorized: Invalid or expired token" });
	}
}
