"use client";

import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  csrfToken: string;
  email: string;
  password: string;
}

export default function SigninForm() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);

    try {
      const signinResponse = await signIn("credentials", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });
      if (signinResponse?.error || !signinResponse?.ok) {
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">E-post</span>
        </label>
        <input
          required
          type="email"
          placeholder="user@email.com"
          className="input-bordered input"
          autoComplete="user"
          {...register("email")}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Lösenord</span>
        </label>
        <input
          type="password"
          placeholder="password"
          className="input-bordered input"
          required
          autoComplete="current-password"
          {...register("password")}
        />
        <label className="label">
          <a href="#" className="link-hover label-text-alt link">
            Glömt lösenordet?
          </a>
        </label>
      </div>
      <div className="form-control mt-6">
        <button disabled={isSubmitting} className={clsx("md:2-2/4 btn-primary btn w-full", { loading: isSubmitting })}>
          <div className="flex flex-row items-center gap-2">
            <ArrowRightOnRectangleIcon className="h-6 w-6" />
            Logga in
          </div>
        </button>
      </div>
    </form>
  );
}
