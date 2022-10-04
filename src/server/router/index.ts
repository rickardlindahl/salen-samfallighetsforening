import { t } from "../trpc";
import { adminRouter } from "./admin-router";
import { postsRouter } from "./posts-router";

export const appRouter = t.router({
  admin: adminRouter,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;
