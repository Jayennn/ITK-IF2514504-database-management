import { sql } from "./db";

const migrationFiles = [
	"./src/database/migrations/20260817_create_bookstore_schema.sql",
	"./src/database/migrations/20260817_seed_bookstore_data.sql",
	"./src/database/migrations/20260817_create_books_procedure_function.sql",
	"./src/database/migrations/20260819_create_users_procedure_function.sql",
	"./src/database/migrations/20260824_create_orders_procedure_function.sql",
	"./src/database/migrations/20260825_create_bookstore_triggers.sql",
];

async function migrate() {
	try {
		console.log("Starting database migrations...\n");

		for (const filePath of migrationFiles) {
			const fileName = filePath.split("/").pop();
			console.log(`Executing: ${fileName}`);
			await sql.file(filePath);
			console.log(`Success:${fileName}\n`);
		}

		console.log("All migrations finished successfully!");
	} catch (error) {
		console.error("Migration failed:", error);
		process.exitCode = 1;
	} finally {
		await sql.end();
		process.exit();
	}
}

migrate();
