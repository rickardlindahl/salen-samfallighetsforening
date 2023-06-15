import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { MainNav } from "./main-nav";
import { SiteFooter } from "./site-footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={[{ title: "Posts", href: "/posts " }]} />
          <nav>
            <UserButton />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
