import { clsx } from "clsx";
import { signOut, useSession } from "next-auth/react";
import { UserIcon } from "@heroicons/react/24/outline";

const getInitialsFromName = (name?: string | null): string => {
  const [first, last] = (name ?? "").split(" ");
  return `${first?.charAt(0)}${last?.charAt(0)}`;
};

export function AvatarDropdown() {
  const { data: session, status } = useSession();

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className={clsx("avatar placeholder btn btn-circle btn-ghost")}>
        <div className="w-10 rounded-full bg-neutral-focus text-neutral-content">
          {status === "authenticated" && <span className="text-xs">{getInitialsFromName(session?.user?.name)}</span>}
          {status !== "authenticated" && <UserIcon className="h-6 w-6" />}
        </div>
      </label>
      <ul tabIndex={0} className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
        <li className="disabled">
          <a>Profil</a>
        </li>
        <li>
          <a onClick={() => signOut({ redirect: true })}>Logga ut</a>
        </li>
      </ul>
    </div>
  );
}
