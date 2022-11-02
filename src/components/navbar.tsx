import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { AvatarDropdown } from "./avatar-dropdown";
import { NavigationMenu } from "./navigation-menu";

export default function Navbar() {
  return (
    <div className="navbar w-full bg-transparent">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer" className="btn-ghost btn-square btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2">
        <Link href="/" className="flex flex-row gap-2">
          <HomeIcon className="h-6 w-6" />
          <span className="font-bold">Salen</span>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="hidden flex-none lg:block">
          <NavigationMenu tabIndex={0} className="menu menu-horizontal p-0" />
        </div>
        <AvatarDropdown />
      </div>
    </div>
  );
}
