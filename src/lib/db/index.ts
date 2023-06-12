import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "~/lib/env/server";

const databaseUrl = `postgres://${env.PGUSER}:${env.PGPASSWORD}@${env.PGHOST}/${env.PGDATABASE}`;

const pool = new Pool({ connectionString: databaseUrl });

export const db = drizzle(pool);
