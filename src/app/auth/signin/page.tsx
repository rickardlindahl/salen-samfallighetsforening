import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SigninForm from "./signin-form";

export default function SignInPage() {
  const token = cookies().get("next-auth.session-token");
  const csrfToken = cookies().get("next-auth.csrf-token");

  if (token) {
    redirect("/"); // already logged-in
    return;
  }

  if (!csrfToken) {
    redirect("/"); // no csrf available
    return;
  }

  return <SigninForm csrfToken={csrfToken} />;
}
