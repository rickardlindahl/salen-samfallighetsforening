import * as React from "react";

import { Icons } from "~/components/icons";
import { ModeToggle } from "~/components/mode-toggle";
import { cn } from "~/lib/utils";
import { siteConfig } from "~/settings";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Byggd av{" "}
            <a
              href={siteConfig.links.githubProfile}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              rickardlindahl
            </a>
            . Hostas på{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Vercel
            </a>
            . Källkoden är tillgänglig på{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
