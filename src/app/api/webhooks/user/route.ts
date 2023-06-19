import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { eq } from "drizzle-orm";
import { Webhook, WebhookRequiredHeaders } from "svix";

import { db } from "~/lib/db";
import { NewUser, user } from "~/lib/db/schema";
import { env } from "~/lib/env/server";

async function createUser(newUser: NewUser) {
  return db.insert(user).values(newUser);
}

async function updateUser(newUser: NewUser) {
  return db
    .update(user)
    .set({ attributes: newUser.attributes })
    .where(eq(user.externalId, newUser.externalId));
}

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };

  try {
    const wh = new Webhook(env.WEBHOOK_SECRET);
    const evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as WebhookEvent;
    console.log(evt);
    switch (evt.type) {
      case "user.created": {
        const { id, ...attributes } = evt.data;

        await createUser({ externalId: id, attributes });

        return NextResponse.json({ message: "User created!" }, { status: 200 });
      }
      case "user.updated": {
        const { id, ...attributes } = evt.data;

        await updateUser({ externalId: id, attributes });

        return NextResponse.json({ message: "User updated!" }, { status: 200 });
      }
    }
  } catch (err) {
    console.error(err);
    console.error((err as Error).message);
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
