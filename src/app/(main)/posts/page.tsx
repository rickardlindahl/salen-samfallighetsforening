import { Suspense } from "react";

import { LatestPosts } from "../latest-posts";

export default async function PostsPage() {
  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="grid grid-cols-1 gap-y-20">
        <div className="flex flex-col gap-4">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Inlägg
            </h1>
          </div>
          <div className="flex flex-col gap-16">
            <Suspense fallback={<LatestPosts.loader numberOfPosts={12} />}>
              <LatestPosts numberOfPosts={999} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
