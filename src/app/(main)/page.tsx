import { Suspense } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

import { Icons } from "~/components/icons";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { siteConfig } from "~/settings";
import { LatestDocuments } from "./latest-documents";
import { LatestPosts } from "./latest-posts";

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {siteConfig.name}
          </h1>
          {siteConfig.purpose.map((text, index) => (
            <p
              key={index}
              className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
            >
              {text}
            </p>
          ))}

          <SignedOut>
            <button
              className={cn(
                buttonVariants({ variant: "secondary", size: "sm" }),
                "px-4",
              )}
            >
              <SignInButton>Logga in</SignInButton>
            </button>
          </SignedOut>
        </div>
      </section>

      <SignedIn>
        <section
          id="latest"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Händelser
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Här visas de senaste händelserna från samfällighetsföreningen.
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 justify-center gap-4 lg:grid-cols-2">
            <div className="rounded-lg border bg-background p-2">
              <div className="flex flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="flex flex-row gap-2 font-heading text-2xl font-bold">
                    <Icons.newspaper />
                    Senaste inläggen
                  </h3>
                  <Suspense fallback={<LatestPosts.loader numberOfPosts={3} />}>
                    <LatestPosts numberOfPosts={3} />
                  </Suspense>
                  <div className="flex justify-center">
                    <Link href="/posts" className="underline">
                      Se alla inlägg
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex rounded-lg border bg-background p-2">
              <div className="flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="flex flex-row gap-2 font-heading text-2xl font-bold">
                    <Icons.file />
                    Senaste dokumenten
                  </h3>
                  <Suspense
                    fallback={<LatestDocuments.loader numberOfDocuments={5} />}
                  >
                    <LatestDocuments numberOfDocuments={5} />
                  </Suspense>
                  <div className="flex justify-center">
                    <Link href="/documents" className="underline">
                      Se alla dokument
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SignedIn>
    </>
  );
}
