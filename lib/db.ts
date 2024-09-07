import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from 'dotenv';

import * as schema from "@/drizzle/schema";

config({ path: '.env' });

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export type DB = typeof db;