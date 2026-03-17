import { drizzle } from "drizzle-orm/bun-sql";
import { SQL } from "bun";

const connection = new SQL(process.env.DATABASE_URL!);

export const db = drizzle(connection, { logger: true });
