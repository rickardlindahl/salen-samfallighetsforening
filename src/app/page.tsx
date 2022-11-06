import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function StartPage() {
  return (
    <div className="hero h-full">
      <div className="hero-content w-fit rounded-lg bg-black/50 p-8 text-center text-white">
        <div>
          <h1 className="text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl">
            Salen
            <br />
            samfällighetsförening
          </h1>
          <p className="py-8">Tomtebo, Umeå</p>

          <Link href="/auth/signin" className="btn-primary btn w-full md:w-2/4">
            <div className="flex flex-row items-center gap-2">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              Logga in
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
