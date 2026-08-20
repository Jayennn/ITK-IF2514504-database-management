import { SQL } from "bun";

export const sql = new SQL({
	adapter: "postgres",
	hostname: process.env.POSTGRES_HOST ?? "localhost",
	port: Number(process.env.POSTGRES_PORT ?? 5432),
	username: process.env.POSTGRES_USER ?? "prabowo",
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
});
