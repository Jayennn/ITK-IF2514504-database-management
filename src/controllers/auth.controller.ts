import { loginSchema, registerSchema } from "@models/auth.model";
import { getAuthUser, loginUser, registerUser } from "@services/auth.service";
import { AppError } from "@app-types/app-error";
import type { Request, Response } from "express";

export async function register(req: Request, res: Response) {
	const result = registerSchema.safeParse(req.body);

	if (!result.success) {
		throw new AppError("Validation failed", 400);
	}

	const { email, password, confirmPassword } = result.data;

	const user = await registerUser({ email, password, confirmPassword });

	return res.status(201).json({
		success: true,
		message: "Register success",
		data: user,
	});
}

export async function login(req: Request, res: Response) {
	const result = loginSchema.safeParse(req.body);

	if (!result.success) {
		throw new AppError("Validation failed", 400);
	}

	const user = await loginUser(result.data);

	return res.status(200).json({
		success: true,
		message: "Login success",
		data: user,
	});
}

export async function getProfile(req: Request, res: Response) {
	const user = getAuthUser(req);

	return res.status(200).json({
		success: true,
		message: "Get profile success",
		data: user,
	});
}
