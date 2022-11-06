import { unstable_getServerSession } from "next-auth/next";
import { Drawer } from "../components/drawer";
import SessionProvider from "../components/session-provider.client";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import "./styles.css";

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const session = await unstable_getServerSession(authOptions);

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
