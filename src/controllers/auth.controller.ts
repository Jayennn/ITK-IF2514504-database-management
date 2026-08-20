import { registerSchema } from "@models/auth.model";
import { registerUser } from "@services/auth.service";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
	try {
		const result = registerSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { username, password, confirmPassword } = result.data;

		const user = await registerUser({
			username,
			password,
			confirmPassword,
		});

		return res.status(201).json({
			message: "Register success",
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
