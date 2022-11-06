import { unstable_getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import SigninForm from "./signin-form";

export default async function SignInPage() {
  const session = await unstable_getServerSession(authOptions);

  if (session?.user) {
    redirect("/"); // already logged-in
    return;
  }

  return <SigninForm />;
}
