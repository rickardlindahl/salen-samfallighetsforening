import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../../server/db/client";
import CreatePostForm from "./create-post-form";

export default async function Posts() {
  const token = cookies().get("next-auth.session-token");

  if (!token) {
    redirect("/auth/signin");
    return;
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <CreatePostForm />
      {posts?.map((p) => (
        <div key={p.id} className="mb-4">
          <div className="text-lg font-bold">{p.title}</div>
          <div>
            {p.createdAt.toISOString().split("T")[0]} {p.user.name}
          </div>
          <div>{p.body}</div>
        </div>
      ))}
    </>
  );
}
