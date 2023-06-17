import Link from "next/link";

import { Card } from "~/components/card";
import { Post } from "~/lib/db/schema";
import { formatDate } from "~/lib/utils";

async function getPosts(numberOfPosts: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, 500);
  });

  const posts: Post[] = [
    {
      id: 1,
      title: "First",
      body: "Text",
      userId: "1",
      createdAt: new Date("2023-06-16"),
      updatedAt: null,
    },
    {
      id: 2,
      title: "Second",
      body: "Another text",
      userId: "1",
      createdAt: new Date("2023-06-16"),
      updatedAt: null,
    },
  ];

  return posts.slice(0, numberOfPosts);
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
