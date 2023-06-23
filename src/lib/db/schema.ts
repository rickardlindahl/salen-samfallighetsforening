import { InferModel, sql } from "drizzle-orm";
import {
  int,
  json,
  mysqlEnum,
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
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at"),
});

export type Post = InferModel<typeof post>;

export const roles = ["admin", "user"] as const;
export type Role = (typeof roles)[number];

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 255 }).notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  emailAddress: text("email_address").notNull(),
  imageUrl: text("image_url").notNull(),
  attributes: json("attributes").notNull(),
  role: mysqlEnum("role", roles).default("user").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at"),
});

export type User = InferModel<typeof user>;
export type NewUser = InferModel<typeof user, "insert">;

export const document = mysqlTable("document", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  key: text("key").notNull(),
  name: text("name").notNull(),
  size: int("size").notNull(),
  url: text("url").notNull(),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at"),
});

export type Document = InferModel<typeof document>;
export type NewDocument = InferModel<typeof document, "insert">;
