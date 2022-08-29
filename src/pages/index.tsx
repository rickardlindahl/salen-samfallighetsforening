import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col items-center justify-center overflow-visible p-4">
        <div className="hero">
          <div className="hero-content break-normal rounded-lg bg-base-100 text-center sm:p-8 md:p-16">
            <div className="w-full">
              <h1 className="text-4xl font-bold">Salen</h1>
              <h2 className="text-xl font-bold">Samfällighetsförening</h2>
              <p className="py-6">Välkommen till Salen Samfällighetsförening, Tomtebo, Umeå.</p>
              <div className={clsx({ "animate-pulse": status === "loading", "h-12": status !== "unauthenticated" })}>
                {status === "loading" && <div className="rounded bg-slate-200" />}

                {status === "unauthenticated" && (
                  <Link href="/auth/signin">
                    <a className="btn btn-primary w-full md:w-2/4">
                      <ArrowRightOnRectangleIcon className="h-6 w-6" />
                      Logga in
                    </a>
                  </Link>
                )}

                {status === "authenticated" && (
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <div>Inloggad som</div>
                    <div className="rounded-lg bg-slate-200 p-2 text-xs">{session.user?.email}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;