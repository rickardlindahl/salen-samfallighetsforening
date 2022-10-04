import { t } from "../trpc";
import { isAdmin } from "./middlewares";

const adminProcedure = t.procedure.use(isAdmin);

// Example router with queries that can only be hit if the user requesting is signed in as admin
export const adminRouter = t.router({
  users: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany();
    return users;
  }),
});
