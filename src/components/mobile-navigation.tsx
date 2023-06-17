"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, isActive } from "~/lib/utils";
import { MenuItem } from "~/types/settings";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export function MobileNavigation({
  menuItems,
  ...props
}: React.ComponentProps<"div"> & { menuItems: MenuItem[] }) {
  const pathname = usePathname();

  return (
    <div {...props}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
              Meny
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800">
              <nav className="px-8 py-4 ">
                <ul className="divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                  {menuItems.map(({ href, title }) => (
                    <li key={title} className="py-2">
                      <Link
                        className={cn(
                          isActive(pathname, href)
                            ? "text-teal-500 dark:text-teal-400"
                            : "hover:text-teal-500 dark:hover:text-teal-400",
                        )}
                        href={href}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
