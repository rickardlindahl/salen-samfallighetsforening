import { Suspense } from "react";

import { Container } from "~/components/container";
import { LatestDocuments } from "../latest-documents";

export default async function DocumentsPage() {
  return (
    <Container className="mt-24 md:mt-28">
      <div className="space-y-10 lg:pl-16 xl:pl-24">
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
            Dokument
          </h3>
          <div className="flex flex-col gap-16">
            <Suspense
              fallback={<LatestDocuments.loader numberOfDocuments={3} />}
            >
              <LatestDocuments numberOfDocuments={999} />
            </Suspense>
          </div>
        </div>
      </div>
    </Container>
  );
}
