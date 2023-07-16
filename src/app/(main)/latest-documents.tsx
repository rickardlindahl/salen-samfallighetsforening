import { Skeleton } from "~/components/ui/skeleton";
import { getDocuments } from "~/lib/db/queries";
import { formatDate } from "~/lib/utils";

interface LatestDocumentsProps {
  numberOfDocuments: number;
}

export async function LatestDocuments({
  numberOfDocuments,
}: LatestDocumentsProps) {
  const documents = await getDocuments(numberOfDocuments);

  return (
    <ol className="space-y-4">
      {documents.map((doc) => (
        <li key={doc.id} className="flex gap-4">
          <div
            className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-contain shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
            style={{ backgroundImage: `url(${doc.user?.imageUrl})` }}
          ></div>
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
  );
}

LatestDocuments.loader = function LatestDocumentsLoader({
  numberOfDocuments,
}: LatestDocumentsProps) {
  return (
    <ol className="space-y-4">
      {Array.apply(null, Array(numberOfDocuments)).map((_, index) => (
        <li key={index} className="flex gap-4">
          <Skeleton className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0" />
          <dl className="flex flex-auto flex-wrap gap-x-2">
            <Skeleton className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100" />
            <Skeleton className="text-xs text-zinc-500 dark:text-zinc-400" />
            <Skeleton className="ml-auto text-xs text-zinc-400 dark:text-zinc-500" />
          </dl>
        </li>
      ))}
    </ol>
  );
};
