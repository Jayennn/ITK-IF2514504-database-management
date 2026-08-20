import { sql } from "./db";

async function migrate() {
	try {
		console.log("Running migration...");
		await sql.file("./src/database/migrations/20260817_create_bookstore_schema.sql");
		await sql.file("./src/database/migrations/20260817_seed_bookstore_data.sql");
		// await sql.file(
		// 	"./src/database/migrations/20260817_add_books_crud_migration.sql",
		// );
		console.log("Migration finished successfully!");
	} catch (error) {
		console.error("Migration failed:", error);
	} finally {
		await sql.end();
		process.exit(0);
	}
}

migrate();
