import Link from "next/link";

import { Card } from "~/components/card";
import { Skeleton } from "~/components/ui/skeleton";
import { getPosts } from "~/lib/db/queries";
import { formatDate } from "~/lib/utils";

interface LatestPostsProps {
  numberOfPosts: number;
}

export async function LatestPosts({ numberOfPosts }: LatestPostsProps) {
  const posts = await getPosts(numberOfPosts);

  return (
    <>
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
    </>
  );
}

LatestPosts.loader = function LatestPostsLoader({
  numberOfPosts,
}: LatestPostsProps) {
  return (
    <>
      {Array.apply(null, Array(numberOfPosts)).map((_, index) => (
        <Card key={index} as="article">
          <Card.Title>
            <Skeleton className="h-6 w-[320px]" />
          </Card.Title>
          <Card.Eyebrow>
            <Skeleton className="h-2 w-[180px]" />
          </Card.Eyebrow>
          <Card.Description>
            <Skeleton className="h-4 w-[240px]" />
          </Card.Description>
        </Card>
      ))}
    </>
  );
};
