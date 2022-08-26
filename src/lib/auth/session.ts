import { Session } from "next-auth";
import {
  getSession as getNextSession,
  GetSessionParams,
} from "next-auth/react";

export async function getSession(
  options: GetSessionParams
): Promise<Session | null> {
  const session = await getNextSession(options);

  // that these are equal are ensured in `[...nextauth]`'s callback
  return session as Session | null;
}
