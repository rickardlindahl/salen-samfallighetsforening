import { Post } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { z, ZodError } from "zod";
import { prisma } from "../../server/db/client";
import { authOptions } from "./auth/[...nextauth]";

const allowedMethods = ["POST"];

const formSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export default async function PostsApi(
  req: NextApiRequest,
  res: NextApiResponse<Post | { message: string } | { message: ZodError<{ title: string; body: string }> }>,
) {
  try {
    const session = await unstable_getServerSession(authOptions);
    if (!session || !session.user) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    if (!req.method || !allowedMethods.includes(req.method) || req.method === "OPTIONS") {
      return res.status(405).send({ message: "Method not allowed." });
    }

    // const body = typeof req.body === "object" ? req.body : JSON.parse(req.body);
    const validation = formSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).send({
        message: validation.error,
      });
    }

    const post = await prisma.post.create({
      data: {
        title: validation.data.title,
        body: validation.data.body,
        userId: session.user.id,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error!" });
  }
}
