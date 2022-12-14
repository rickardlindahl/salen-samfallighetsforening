import { TRPCClientErrorLike } from "@trpc/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useHandleUnauthorizedError } from "../../hooks/useHandleUnauthorizedError";
import { AppRouter } from "../../server/router";
import { trpc } from "../../utils/trpc";

type CreatePostFormValues = {
  csrfToken: string;
  title: string;
  body: string;
};

const Posts: NextPage = () => {
  const { data: posts, error, isLoading } = trpc.posts.getPosts.useQuery();

  useHandleUnauthorizedError(error as TRPCClientErrorLike<AppRouter>);

  const { register, handleSubmit } = useForm<CreatePostFormValues>();
  const createPost = trpc.posts.createPost.useMutation();

  const onSubmit = async (data: CreatePostFormValues) => {
    createPost.mutate(data);
  };

  return (
    <>
      <Head>
        <title>Inlägg</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex flex-col overflow-visible p-4">
        <h1 className="font-xl font-bold">Inlägg</h1>
        {isLoading && <p>Laddar inlägg...</p>}
        {error && <div>Något gick fel...</div>}
        {posts && (
          <>
            {posts.map((p) => (
              <div key={p.id} className="mb-4">
                <div className="text-lg font-bold">{p.title}</div>
                <div>
                  {p.createdAt.toISOString().split("T")[0]} {p.user.name}
                </div>
                <div>{p.body}</div>
              </div>
            ))}
          </>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <!-- The button to open modal --> */}
          <label htmlFor="create-post-modal" className="modal-button btn">
            Skapa inlägg
          </label>

          {/* <!-- Put this part before </body> tag --> */}
          <input type="checkbox" id="create-post-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label htmlFor="create-post-modal" className="btn btn-circle btn-sm absolute right-2 top-2">
                ✕
              </label>
              <h3 className="text-lg font-bold">Skapa inlägg</h3>
              <div className="p-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rubrik</span>
                  </label>
                  <input
                    required
                    type="title"
                    placeholder="Ange en rubrik"
                    className="input input-bordered"
                    {...register("title")}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Text</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Skriv din text här..."
                    className="input input-bordered"
                    required
                    {...register("body")}
                  />
                </div>
                <button className="btn-primay btn">Skapa inlägg</button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default Posts;
