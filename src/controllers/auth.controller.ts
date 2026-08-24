import { loginSchema, registerSchema } from "@models/auth.model";
import { loginUser, registerUser } from "@services/auth.service";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
	try {
		const result = registerSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const { email, password, confirmPassword } = result.data;

		const user = await registerUser({
			email,
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

export async function login(req: Request, res: Response) {
	try {
		const result = loginSchema.safeParse(req.body);

		if (!result.success) {
			return res.status(400).json({
				message: "Validation failed",
				errors: result.error.flatten().fieldErrors,
			});
		}

		const user = await loginUser(result.data);

		return res.status(200).json({
			message: "Login success",
			data: user,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal Server Error",
		});
	}
}
