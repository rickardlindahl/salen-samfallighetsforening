import { Suspense } from "react";

import { Container } from "~/components/container";
import { LatestPosts } from "../latest-posts";

export default async function PostsPage() {
  return (
    <Container className="mt-24 md:mt-28">
      <div className="prose grid grid-cols-1 gap-y-20">
        <div className="flex flex-col gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              Inlägg
            </h2>
          </div>
          <div className="flex flex-col gap-16">
            <Suspense fallback={<LatestPosts.loader numberOfPosts={12} />}>
              <LatestPosts numberOfPosts={999} />
            </Suspense>
          </div>
        </div>
      </div>
    </Container>
  );
}
