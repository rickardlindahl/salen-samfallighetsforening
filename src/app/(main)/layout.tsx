import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import { MainNav } from "~/components/main-nav";
import { SiteFooter } from "~/components/site-footer";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { mainNav } from "~/settings";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={mainNav} />
          <nav>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <button
                className={cn(
                  buttonVariants({ variant: "secondary", size: "sm" }),
                  "px-4",
                )}
              >
                <SignInButton>Logga in</SignInButton>
              </button>
            </SignedOut>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
