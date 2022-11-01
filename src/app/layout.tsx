import { headers } from "next/headers";
import { Drawer } from "../components/drawer";
import SessionProvider from "../components/session-provider.client";
import { getSession } from "../lib/auth/session";
import "./styles.css";

export default async function RootLayout({ children }: React.PropsWithChildren<Record<never, any>>) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en" data-theme="lemonade">
      <head />
      <body className="bg-slate-200">
        <SessionProvider session={session}>
          <Drawer>{children}</Drawer>
        </SessionProvider>
      </body>
    </html>
  );
}
