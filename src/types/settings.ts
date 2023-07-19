export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type SiteConfig = {
  name: string;
  purpose: string[];
  links: {
    github: string;
    githubProfile: string;
  };
};

export type MarketingConfig = {
  mainNav: MainNavItem[];
};
