import { createAdminRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in as admin
export const adminRouter = createAdminRouter().query("users", {
  async resolve({ ctx }) {
    const users = await ctx.prisma.user.findMany();
    return users;
  },
});
