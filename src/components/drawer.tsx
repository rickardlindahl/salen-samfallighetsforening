import React from "react";
import { Navbar } from "./navbar";
import { NavigationMenu } from "./navigation-menu";

export function Drawer({ children }: React.PropsWithChildren) {
  return (
    <div className="drawer">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <Navbar />
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
  );
}
