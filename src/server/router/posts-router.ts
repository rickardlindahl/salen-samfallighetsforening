import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const postsRouter = createProtectedRouter()
  .query("getPosts", {
    async resolve({ ctx }) {
      const posts = await ctx.prisma.post.findMany({
        select: {
          id: true,
          title: true,
          body: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts || [];
    },
  })
  .mutation("createPost", {
    input: z.object({
      title: z.string(),
      body: z.string(),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          userId: ctx.session.user.id,
        },
      });

      return post;
    },
  });
