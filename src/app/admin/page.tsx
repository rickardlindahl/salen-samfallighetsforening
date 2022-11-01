import { prisma } from "../../server/db/client";

export default async function AdminPage() {
  const users = await prisma.user.count();

  return <div>Users: {users}</div>;
}
