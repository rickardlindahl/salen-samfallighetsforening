import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  return (
    <main>
      <h1>Salen Samfällighetsförening</h1>
      <div>Inloggad som: {user.firstName} {user.lastName}</div>
    </main>
  );
}
