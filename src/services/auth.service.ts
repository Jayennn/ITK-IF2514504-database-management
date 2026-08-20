import type { RegisterDto } from "@models/auth.model";
import { sql } from "src/database/db";

export async function registerUser(data: RegisterDto): Promise<void> {
	const formData = {
		...data,
		password: await Bun.password.hash(data.password, {
			algorithm: "bcrypt",
			cost: 4,
		}),
	};

	await sql`CALL register_user(${formData.username}, ${formData.password})`;
}
