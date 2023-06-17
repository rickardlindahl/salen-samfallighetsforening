import Link from "next/link";

async function getDocuments(numberOfDocuments: number) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, 500);
  });

  const documents: {
    company: string;
    title: string;
    start: string;
    end: string;
  }[] = [
      {
        company: "Planetaria",
        title: "CEO",
        start: "2019",
        end: "Present",
      },
      {
        company: "Airbnb",
        title: "Product Designer",
        start: "2014",
        end: "2019",
      },
      {
        company: "Facebook",
        title: "iOS Software Engineer",
        start: "2011",
        end: "2014",
      },
      {
        company: "Starbucks",
        title: "Shift Supervisor",
        start: "2008",
        end: "2011",
      },
    ];

  return documents.slice(0, numberOfDocuments);
}

interface LatestDocumentsProps {
  numberOfDocuments: number;
}

export async function LatestDocuments({
  numberOfDocuments,
}: LatestDocumentsProps) {
  const resume = await getDocuments(numberOfDocuments);

  return (
    <div className="space-y-10 lg:pl-16 xl:pl-24">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          Senaste dokumenten
        </h3>
        <ol className="space-y-4">
          {resume.map((role, roleIndex) => (
            <li key={roleIndex} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"></div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {role.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {role.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${role.start} until ${role.end}`}
                >
                  <time dateTime={role.start}>{role.start}</time>{" "}
                  <span aria-hidden="true">—</span>{" "}
                  <time dateTime={role.end}>{role.end}</time>
                </dd>
              </dl>
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
