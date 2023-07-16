import { eq, sql } from "drizzle-orm";

import { db } from ".";
import { document, post, user } from "./schema";

export async function getPosts(numberOfPosts: number) {
  return db
    .select({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      body: post.body,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        imageUrl: user.imageUrl,
      },
    })
    .from(post)
    .leftJoin(user, eq(post.userId, user.id))
    .limit(numberOfPosts)
    .orderBy(sql`${post.createdAt} desc`);
}

export type PostWithUser = Awaited<ReturnType<typeof getPosts>>[number];

export async function getDocuments(numberOfDocuments: number) {
  return db
    .select({
      description: document.description,
      id: document.id,
      name: document.name,
      size: document.size,
      url: document.url,
      user: {
        id: user.id,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      createdAt: document.createdAt,
    })
    .from(document)
    .leftJoin(user, eq(document.userId, user.id))
    .orderBy(sql`${document.createdAt} desc`)
    .limit(numberOfDocuments);
}

export type DocumentWithUser = Awaited<ReturnType<typeof getDocuments>>[number];
