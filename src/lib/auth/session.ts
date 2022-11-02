import { Session } from "next-auth";
import { decode } from "next-auth/jwt";
import { env } from "../../env/server.mjs";

const AUTH_URL = env.VERCEL === "1" ? `https://${env.VERCEL_URL}` : env.NEXTAUTH_URL;

export async function getSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${AUTH_URL}/api/auth/session`, {
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
