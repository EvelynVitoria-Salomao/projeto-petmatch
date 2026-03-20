import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
	throw new Error("DATABASE_URL is not defined. Please check your .env file.");
}

const connection = new SQL(databaseUrl);
const db = drizzle(connection, { logger: true });

export { db };
export type Database = typeof db;
