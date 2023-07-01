import { Suspense } from "react";

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
          <Suspense fallback={<LatestPosts.loader numberOfPosts={3} />}>
            <LatestPosts numberOfPosts={3} />
          </Suspense>
          <Suspense fallback={<LatestDocuments.loader numberOfDocuments={5} />}>
            <LatestDocuments numberOfDocuments={5} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}
