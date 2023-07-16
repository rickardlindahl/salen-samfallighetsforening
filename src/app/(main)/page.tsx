import { Suspense } from "react";
import Link from "next/link";

import { Container } from "~/components/container";
import { LatestDocuments } from "./latest-documents";
import { LatestPosts } from "./latest-posts";

export default async function IndexPage() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Salen Samfällighetsförening
          </h1>
          {[
            "Salen Samfällighetsförening är en samfällighetsförening baserad på Tomtebo i Umeå. Dess huvudsakliga syfte är att förvalta och underhålla gemensamma områden och tillgångar inom området för att skapa en trivsam miljö för de boende.",
            "Genom medlemskapet och årliga avgifter kan de boende vara delaktiga i beslut och vara en del av en gemenskap som strävar efter att förbättra boendemiljön på Tomtebo.",
          ].map((text, index) => (
            <p
              key={index}
              className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
            >
              {text}
            </p>
          ))}
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="grid grid-cols-1 gap-y-20 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
                Senaste inläggen
              </h2>
            </div>
            <div className="flex flex-col gap-16">
              <Suspense fallback={<LatestPosts.loader numberOfPosts={3} />}>
                <LatestPosts numberOfPosts={3} />
              </Suspense>
              <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                <Link href="/posts">Se alla inlägg</Link>
              </div>
            </div>
          </div>

          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
              <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
                Senaste dokumenten
              </h3>
              <Suspense
                fallback={<LatestDocuments.loader numberOfDocuments={5} />}
              >
                <LatestDocuments numberOfDocuments={5} />
              </Suspense>
              <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
                <Link href="/documents">Se alla dokument</Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
