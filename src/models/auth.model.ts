import { z } from "zod";
import { publicUserSchema } from "./users.model";

export const registerSchema = z
	.object({
		email: z
			.string("Email is required")
			.trim()
			.email("Invalid email address")
			.min(1, "Email cannot be empty")
			.max(255, "Email maximum length is 255 characters"),

		password: z
			.string("Password is required")
			.min(8, "Password must be at least 8 characters")
			.max(255, "Password maximum length is 255 characters"),

		confirmPassword: z
			.string("Confirm password is required")
			.min(1, "Confirm password cannot be empty"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const loginSchema = z.object({
	email: z
		.string("Email is required")
		.trim()
		.email("Invalid email address")
		.min(1, "Email cannot be empty")
		.max(255, "Email maximum length is 255 characters"),

	password: z.string("Password is required").min(1, "Password cannot be empty"),
});

export const loginResponseSchema = z.object({
	user: publicUserSchema,
	token: z.string(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
