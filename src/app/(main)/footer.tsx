import Link from "next/link";

import { Container } from "~/components/container";
import { menuItems } from "~/settings";

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {menuItems.map((menuItem) => (
                  <Link
                    key={menuItem.title}
                    href={menuItem.href}
                    className="transition hover:text-teal-500 dark:hover:text-teal-400"
                  >
                    {menuItem.title}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Salen Samfällighetsförening
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  );
}
