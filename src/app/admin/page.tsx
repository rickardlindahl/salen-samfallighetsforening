import { prisma } from "../../server/db/client";

async function getUserCount() {
  return prisma.user.count();
}

export default async function AdminPage() {
  const users = await getUserCount();

  return <div>Users: {users}</div>;
}
