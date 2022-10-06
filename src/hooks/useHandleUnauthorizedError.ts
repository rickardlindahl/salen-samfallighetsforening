import { TRPCClientErrorLike } from "@trpc/client";
import { useRouter } from "next/router";
import { AppRouter } from "../server/router";

export const useHandleUnauthorizedError = (error: TRPCClientErrorLike<AppRouter>) => {
  const router = useRouter();

  if (error?.data?.code === "UNAUTHORIZED") {
    router.push("/auth/signin");
  }
};
