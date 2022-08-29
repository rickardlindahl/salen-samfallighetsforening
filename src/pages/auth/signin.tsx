import { GetServerSidePropsContext } from "next";
import { getSession, getCsrfToken, signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

const MINIMUM_ACTIVITY_TIMEOUT = 850;

type LoginFormValues = {
  csrfToken: string;
  email: string;
  password: string;
};

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const [isSubmitting, setSubmitting] = React.useState(false);

  const { register, handleSubmit } = useForm<LoginFormValues>();

  const onSubmit = async (data: LoginFormValues) => {
    setSubmitting(true);

    try {
      signIn("app-login", {
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      setTimeout(() => {
        setSubmitting(false);
      }, MINIMUM_ACTIVITY_TIMEOUT);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto flex flex-col items-center justify-center p-4">
      <div className="flex flex-col py-12 sm:px-6 lg:px-8">
        <Head>
          <title>Sign In</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex flex-col justify-center p-2 sm:p-6 lg:p-8">
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl sm:mx-auto sm:w-full sm:max-w-md">
            <div className="text-center sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="text-xl font-bold leading-7 sm:truncate sm:leading-9">Sign In</h1>
            </div>
            <div className="card-body">
              <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                <input {...register("csrfToken")} type="hidden" defaultValue={csrfToken} hidden />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    {...register("email")}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
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
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (session) {
    return { redirect: { permanent: false, destination: "/" } };
  }

  const csrfToken = await getCsrfToken({ req: context.req });

  return {
    props: {
      csrfToken,
    },
  };
}
