import { z } from "zod";
import { t } from "../trpc";
import { isAuthed } from "./middlewares";

const authedProcedure = t.procedure.use(isAuthed);

export const postsRouter = t.router({
  getPosts: authedProcedure.query(async ({ ctx }) => {
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
  }),
  createPost: authedProcedure
    .input(
      z.object({
        title: z.string(),
        body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          body: input.body,
          userId: ctx.session.user.id,
        },
      });

      return post;
    }),
});
