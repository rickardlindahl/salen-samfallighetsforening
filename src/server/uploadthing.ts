import { getAuth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

import { db } from "~/lib/db";
import { document, NewDocument, user } from "~/lib/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  documentUploader: f({ pdf: { maxFileSize: "4MB" } })
    .input(z.object({ description: z.string().min(1) }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      const { userId } = getAuth(req);
      // This code runs on your server before upload

      // If you throw, the user will not be able to upload
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const result = await db
        .select({ id: user.id })
        .from(user)
        .where(eq(user.externalId, userId));

      if (result.length === 0) {
        throw new Error("Unauthorized");
      }

      return { userId: result[0].id, description: input.description };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      const newDocument: NewDocument = {
        ...metadata,
        ...file,
      };

      console.log("Upload complete for userId:", newDocument);

      await db.insert(document).values(newDocument);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
