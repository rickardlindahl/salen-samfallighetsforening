import { Suspense } from "react";

import { LatestDocuments } from "../latest-documents";

export default async function DocumentsPage() {
  return (
    <section className="container space-y-6 py-8 md:py-12 lg:py-24">
      <div className="grid grid-cols-1 gap-y-20">
        <div className="flex flex-col gap-4">
          <div className="max-w-2xl">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Dokument
            </h1>
          </div>
          <div className="flex flex-col gap-16">
            <Suspense
              fallback={<LatestDocuments.loader numberOfDocuments={10} />}
            >
              <LatestDocuments numberOfDocuments={999} />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
