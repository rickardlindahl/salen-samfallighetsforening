import Link from "next/link";
import { sql } from "drizzle-orm";

import { Card } from "~/components/card";
import { db } from "~/lib/db";
import { post } from "~/lib/db/schema";
import { formatDate } from "~/lib/utils";

async function getPosts(numberOfPosts: number) {
  return db
    .select({
      id: post.id,
      title: post.title,
      createdAt: post.createdAt,
      body: post.body,
    })
    .from(post)
    .limit(numberOfPosts)
    .orderBy(sql`${post.createdAt} desc`);
}

interface LatestPostsProps {
  numberOfPosts: number;
}

export async function LatestPosts({ numberOfPosts }: LatestPostsProps) {
  const posts = await getPosts(numberOfPosts);

  return (
    <div className="flex flex-col gap-4">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
          Senaste inläggen
        </h2>
      </div>
      <div className="flex flex-col gap-16">
        {posts.map((post) => (
          <Card key={post.id} as="article">
            <Card.Title>{post.title}</Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={post.createdAt.toISOString()}
              decorate
            >
              {formatDate(post.createdAt)}
            </Card.Eyebrow>
            <Card.Description>{post.body}</Card.Description>
          </Card>
        ))}
      </div>
      <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
        <Link href="/posts">Se alla inlägg</Link>
      </div>
    </div>
  );
}
