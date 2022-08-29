import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { AvatarDropdown } from "./avatar-dropdown";
import { Footer } from "./footer";
import { NavigationMenu } from "./navigation-menu";

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="container mx-auto font-sans">
      <div className="flex min-h-screen flex-col justify-between p-2">
        <div className="navbar rounded-lg bg-white">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <NavigationMenu
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
              />
            </div>
            <Link href="/">
              <a className="btn btn-ghost text-xl normal-case">
                <HomeIcon className="mr-2 h-6 w-6" />
                Salen
              </a>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <NavigationMenu className="menu menu-horizontal p-0" />
          </div>
          <div className="navbar-end">
            <AvatarDropdown />
          </div>
        </div>
        <div className="flex flex-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
