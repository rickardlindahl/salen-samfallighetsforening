import * as trpc from "@trpc/server";
import { TRPC_UNAUTHORIZED_ADMIN_REQUIRED, TRPC_UNAUTHORIZED_USER_REQUIRED } from "../../lib/auth/message";
import { t } from "../trpc";

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED", message: TRPC_UNAUTHORIZED_USER_REQUIRED });
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.session || ctx.session.user?.role !== "admin") {
    throw new trpc.TRPCError({ code: "UNAUTHORIZED", message: TRPC_UNAUTHORIZED_ADMIN_REQUIRED });
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
