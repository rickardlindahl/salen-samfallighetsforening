import Link from "next/link";
import { eq, sql } from "drizzle-orm";

import { db } from "~/lib/db";
import { document, user } from "~/lib/db/schema";
import { formatDate } from "~/lib/utils";

async function getDocuments(numberOfDocuments: number) {
  return db
    .select({
      description: document.description,
      id: document.id,
      name: document.name,
      size: document.size,
      url: document.url,
      user: {
        id: user.id,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      createdAt: document.createdAt,
    })
    .from(document)
    .leftJoin(user, eq(document.userId, user.id))
    .orderBy(sql`${document.createdAt} desc`)
    .limit(numberOfDocuments);
}

interface LatestDocumentsProps {
  numberOfDocuments: number;
}

export async function LatestDocuments({
  numberOfDocuments,
}: LatestDocumentsProps) {
  const documents = await getDocuments(numberOfDocuments);

  return (
    <div className="space-y-10 lg:pl-16 xl:pl-24">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          Senaste dokumenten
        </h3>
        <ol className="space-y-4">
          {documents.map((doc) => (
            <li key={doc.id} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <img
                  src={doc.user?.imageUrl}
                  alt={`${doc.user?.firstName} ${doc.user?.lastName}`}
                />
              </div>
              <a href={doc.url} download>
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  <dt className="sr-only">Namn</dt>
                  <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {doc.name}
                  </dd>
                  <dt className="sr-only">Beskrivning</dt>
                  <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                    {doc.description}
                  </dd>
                  <dt className="sr-only">Datum</dt>
                  <dd
                    className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                    aria-label={formatDate(doc.createdAt)}
                  >
                    <time dateTime={formatDate(doc.createdAt)}>
                      {formatDate(doc.createdAt)}
                    </time>{" "}
                  </dd>
                </dl>
              </a>
            </li>
          ))}
        </ol>
        <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500">
          <Link href="/documents">Se alla dokument</Link>
        </div>
      </div>
    </div>
  );
}
