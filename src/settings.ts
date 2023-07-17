import { MainNavItem, SiteConfig } from "./types/settings";

export const siteConfig: SiteConfig = {
  name: "Salen Samfällighetsförening",
  purpose: [
    "Salen Samfällighetsförening är en samfällighetsförening baserad på Tomtebo i Umeå. Dess huvudsakliga syfte är att förvalta och underhålla gemensamma områden och tillgångar inom området för att skapa en trivsam miljö för de boende.",
    "Genom medlemskapet och årliga avgifter kan de boende vara delaktiga i beslut och vara en del av en gemenskap som strävar efter att förbättra boendemiljön på Tomtebo.",
  ],
  links: {
    githubProfile: "https://github.com/rickardlindahl",
    github: "https://github.com/rickardlindahl/salen-samfallighetsforening",
  },
};

export const mainNav: MainNavItem[] = [
  {
    title: "Hem",
    href: "/",
  },
  {
    title: "Inlägg",
    href: "/posts",
  },
  {
    title: "Dokument",
    href: "/documents",
  },
  {
    title: "Adresslista",
    href: "/address-list",
    disabled: true,
  },
];
