import { InferModel, sql } from "drizzle-orm";
import {
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const post = mysqlTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at"),
});

export type Post = InferModel<typeof post>;

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 255 }).notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  emailAddress: text("email_address").notNull(),
  imageUrl: text("image_url").notNull(),
  attributes: json("attributes").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at"),
});

export type NewUser = InferModel<typeof user, "insert">;
