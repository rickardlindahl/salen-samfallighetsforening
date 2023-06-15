import "./globals.css";

import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "~/components/theme-provider";
import { env } from "~/lib/env/client";
import { cn } from "~/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Salen Samfällighetsförening",
  description: "Salen Samfällighetsförening, Tomtebo Umeå",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      signInUrl={env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
      signUpUrl={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignInUrl={env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
      afterSignUpUrl={env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
    >
      <html lang="sv" suppressHydrationWarning>
        <body
          className={cn(
            inter.className,
            "min-h-screen bg-background font-sans antialiased",
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
