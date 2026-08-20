import { z } from "zod";

export const registerSchema = z
	.object({
		username: z
			.string("Username is required")
			.trim()
			.min(1, "Username cannot be empty")
			.max(50, "Username maximum length is 50 characters"),

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

export type RegisterDto = z.infer<typeof registerSchema>;
