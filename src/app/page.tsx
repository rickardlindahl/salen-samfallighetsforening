import { currentUser } from "@clerk/nextjs";

import { db } from "~/lib/db";
import { post } from "~/lib/db/schema";

export default async function Home() {
  const user = await currentUser();
  const posts = await db.select().from(post);

  return (
    <main>
      <h1>Salen Samfällighetsförening</h1>
      <div>
        Inloggad som: {user?.firstName} {user?.lastName}
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
