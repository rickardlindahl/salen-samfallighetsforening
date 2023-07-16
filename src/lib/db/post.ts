import { eq, sql } from "drizzle-orm";

import { db } from ".";
import { post, user } from "./schema";

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
