import { createProtectedRouter } from "./protected-router";

export const postsRouter = createProtectedRouter().query("getPosts", {
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
    });
    return posts || [];
  },
});
