import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config();
config({ path: ".env.local", override: true });

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  breakpoints: true,
} satisfies Config;
