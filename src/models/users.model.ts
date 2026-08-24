import { z } from "zod";

export const userSchema = z.object({
	id: z
		.number("User ID must be a number")
		.int("User ID must be an integer")
		.positive("User ID must be greater than 0"),

	email: z
		.string("Email is required")
		.trim()
		.email("Invalid email address")
		.min(1, "Email cannot be empty")
		.max(255, "Email maximum length is 255 characters"),

	password: z
		.string("Password is required")
		.min(1, "Password cannot be empty")
		.max(255, "Password maximum length is 255 characters"),

	role: z.enum(["admin", "customer"], "Role must be either admin or customer"),

	created_at: z.date().nullable(),
	updated_at: z.date().nullable(),
});

export const publicUserSchema = userSchema.omit({
	password: true,
});

export const createUserSchema = userSchema.omit({
	id: true,
	created_at: true,
	updated_at: true,
});

export const updateUserSchema = userSchema
	.omit({
		id: true,
		created_at: true,
		updated_at: true,
	})
	.partial();

export const userIdParamSchema = z.object({
	id: z.coerce
		.number("ID must be a number")
		.int("ID must be an integer")
		.positive("ID must be a positive integer"),
});

export type User = z.infer<typeof userSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UserIdParams = z.infer<typeof userIdParamSchema>;
