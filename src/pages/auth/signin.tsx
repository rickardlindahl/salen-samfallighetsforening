import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [isSubmitting, setSubmitting] = React.useState(false);
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
      const signinResponse = await signIn("app-login", {
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
    <>
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero h-full">
        <div className="hero-content w-fit rounded-lg bg-base-100 p-8 text-center">
          <div>
            <h1 className="pb-8 text-lg font-bold sm:text-2xl md:text-3xl lg:text-4xl">Logga in</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("csrfToken")} type="hidden" defaultValue={csrfToken} hidden />
              <div className="form-control">
                <label className="label">
                  <span className="label-text">E-post</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="user@email.com"
                  className="input input-bordered"
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
                  className="input input-bordered"
                  required
                  {...register("password")}
                />
                <label className="label">
                  <a href="#" className="link link-hover label-text-alt">
                    Glömt lösenordet?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  disabled={isSubmitting}
                  className={clsx("md:2-2/4 btn btn-primary w-full", { loading: isSubmitting })}
                >
                  <div className="flex flex-row items-center gap-2">
                    <ArrowRightOnRectangleIcon className="h-6 w-6" />
                    Logga in
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
