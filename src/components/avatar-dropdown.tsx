import { UserIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const getInitialsFromName = (name?: string | null): string => {
  const [first, last] = (name ?? "").split(" ");
  return `${first?.charAt(0)}${last?.charAt(0)}`;
};

export function AvatarDropdown() {
  const { data: session, status } = useSession();

  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className={clsx("avatar placeholder btn btn-ghost btn-circle")}>
        <div className="w-10 rounded-full bg-base-content text-base-100">
          {status === "authenticated" && <span className="text-xs">{getInitialsFromName(session?.user?.name)}</span>}
          {status !== "authenticated" && <UserIcon className="h-6 w-6" />}
        </div>
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
        {status === "authenticated" && (
          <li className="disabled">
            <a>Profil</a>
          </li>
        )}
        <li>
          {status !== "authenticated" && (
            <Link href="/auth/signin">
              <a>Logga in</a>
            </Link>
          )}
          {status === "authenticated" && <a onClick={() => signOut({ redirect: true })}>Logga ut</a>}
        </li>
      </ul>
    </div>
  );
}
