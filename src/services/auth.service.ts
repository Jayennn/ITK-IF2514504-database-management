import type { LoginDto, LoginResponse, RegisterDto } from "@models/auth.model";
import type { User } from "@models/users.model";
import { SignJWT } from "jose";
import { sql } from "src/database/db";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function generateToken(userId: number, username: string) {
	return await new SignJWT({
		userId,
		username,
	})
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);
}

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

export async function loginUser(data: LoginDto): Promise<LoginResponse> {
	const [user] = await sql<User[]>`
			SELECT * FROM get_user_with_password_by_username(${data.username})
		`;

	if (!user) {
		throw new Error("Invalid username or password!");
	}

	const isValid = await Bun.password.verify(data.password, user.password);

	if (!isValid) {
		throw new Error("Invalid username or password!");
	}

	const { password: _, ...publicUser } = user;

	const token = await generateToken(user.id, user.username);

	return {
		user: publicUser,
		token,
	};
}


// export function getAuthUser(req: Request) {
// 	if (!req.user) {
// 		throw new Error("User is not authenticated");
// 	}

// 	return req.user;
// }