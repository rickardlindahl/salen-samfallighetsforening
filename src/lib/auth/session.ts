import { Session } from "next-auth";
import { decode } from "next-auth/jwt";
import { env } from "../../env/server.mjs";

export async function getSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${env.NEXTAUTH_URL}/api/auth/session`, {
    headers: { cookie },
  });

  if (!response?.ok) {
    return null;
  }

  const session = await response.json();

  return Object.keys(session).length > 0 ? (session as Session) : null;
}

export async function isAuth(cookie: string) {
  if (!cookie) return false;

  const session = await getSession(cookie);
  return !!session?.user;
}

export function decodeToken(token: string) {
  return decode({
    token,
    secret: env.NEXTAUTH_SECRET,
  });
}
