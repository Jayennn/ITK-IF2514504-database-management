import type { User } from "@models/users.model";
import { sql } from "../database/db";

export async function findUserByEmail(email: string): Promise<User | null> {
	const [user] = await sql<
		User[]
	>`SELECT * FROM get_user_with_password_by_email(${email})`;
	return user ?? null;
}

export async function createUser(email: string, hashedPassword: string): Promise<void> {
	await sql`CALL register_user(${email}, ${hashedPassword})`;
}
