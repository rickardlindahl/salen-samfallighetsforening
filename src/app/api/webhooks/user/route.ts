import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { UserJSON } from "@clerk/nextjs/dist/types/server";
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

function userJSONtoNewUser(userJSON: UserJSON) {
  const { id, ...attributes } = userJSON;

  const newUser: NewUser = {
    externalId: id,
    firstName: userJSON.first_name,
    lastName: userJSON.last_name,
    emailAddress: userJSON.email_addresses?.find(
      (emailAddress) => emailAddress.id === userJSON.primary_email_address_id,
    )?.email_address as string,
    imageUrl: userJSON.image_url,
    attributes,
  };

  return newUser;
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
    switch (evt.type) {
      case "user.created": {
        await createUser(userJSONtoNewUser(evt.data));

        return NextResponse.json({ message: "User created!" }, { status: 201 });
      }
      case "user.updated": {
        await updateUser(userJSONtoNewUser(evt.data));

        return NextResponse.json({ message: "User updated!" }, { status: 200 });
      }
    }
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({ message: "Bad request!" }, { status: 400 });
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
