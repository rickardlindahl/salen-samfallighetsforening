// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { adminRouter } from "./admin-router";
import { postsRouter } from "./posts-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("posts.", postsRouter)
  .merge("admin.", adminRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
