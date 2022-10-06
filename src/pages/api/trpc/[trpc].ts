import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/router";
import { createContext } from "../../../server/trpc";

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError({ error, type, path, input, ctx, req }) {
    if (error.code === "INTERNAL_SERVER_ERROR") {
      // send to bug reporting
    }
  },
});
