import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { AvatarDropdown } from "./avatar-dropdown";
import { NavigationMenu } from "./navigation-menu";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <div className="drawer">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="navbar w-full bg-transparent">
            <div className="flex-none lg:hidden">
              <label htmlFor="drawer" className="btn btn-ghost btn-square">
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
              <Link href="/">
                <a className="flex flex-row gap-2">
                  <HomeIcon className="h-6 w-6" />
                  <span className="font-bold">Salen</span>
                </a>
              </Link>
            </div>
            <div className="navbar-end">
              <div className="hidden flex-none lg:block">
                <NavigationMenu tabIndex={0} className="menu menu-horizontal p-0" />
              </div>
              <AvatarDropdown />
            </div>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay" />
          <div className="w-80 overflow-y-auto bg-base-100 py-12 px-4">
            <div className="mb-4 px-4 text-3xl font-bold">Salen</div>
            <NavigationMenu tabIndex={0} className="menu" />
          </div>
        </div>
      </div>
    </>
  );
}
