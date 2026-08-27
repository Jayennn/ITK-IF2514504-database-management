import type { LoginDto, LoginResponse, RegisterDto } from "@models/auth.model";
import { UnauthorizedError } from "@app-types/app-error";
import * as AuthRepository from "@repositories/auth.repository";
import type { Request } from "express";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(
	userId: number,
	email: string,
	role: string,
): Promise<string> {
	return await new SignJWT({ userId, email, role })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);
}

export async function registerUser(data: RegisterDto): Promise<void> {
	const hashedPassword = await Bun.password.hash(data.password, {
		algorithm: "bcrypt",
		cost: 4,
	});

	await AuthRepository.createUser(data.email, hashedPassword);
}

export async function loginUser(data: LoginDto): Promise<LoginResponse> {
	const user = await AuthRepository.findUserByEmail(data.email);

	if (!user) {
		throw new UnauthorizedError("Invalid email or password");
	}

	const isValid = await Bun.password.verify(data.password, user.password);

	if (!isValid) {
		throw new UnauthorizedError("Invalid email or password");
	}

	const { password: _, ...publicUser } = user;
	const token = await generateToken(user.id, user.email, user.role);

	return { user: publicUser, token };
}

export function getAuthUser(req: Request) {
	if (!req.user) {
		throw new UnauthorizedError("Unauthorized: User is not authenticated");
	}

	return req.user;
}
