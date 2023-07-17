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
        <article
          key={post.id}
          className="group relative flex flex-col items-start"
        >
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            {post.title}
          </h2>
          <time
            className="relative z-10 mt-2 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500"
            dateTime={post.createdAt.toISOString()}
          >
            <span
              className="absolute inset-y-0 left-0 flex items-center"
              aria-hidden="true"
            >
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
            </span>
            {formatDate(post.createdAt)}
          </time>
          <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {post.body}
          </p>
        </article>
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
        <article
          key={index}
          className="group relative flex flex-col items-start"
        >
          <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
            <Skeleton className="h-6 w-[320px]" />
          </h2>
          <div className="relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500">
            <Skeleton className="h-4 w-[180px]" />
          </div>
          <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Skeleton className="h-4 w-[320px]" />
          </div>
          <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Skeleton className="h-4 w-[300px]" />
          </div>
          <div className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            <Skeleton className="h-4 w-[240px]" />
          </div>
        </article>
      ))}
    </>
  );
};
