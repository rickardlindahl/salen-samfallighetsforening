import { prisma } from "../../../server/db/client";

async function getUsers() {
  return prisma.user.findMany();
}

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Status</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.email}>
            <td>
              <div>
                <a>
                  <p>{user.email}</p>
                </a>
              </div>
            </td>
            <td>{user.name}</td>
            <td>
              <span>{user.emailVerified ? "Verified" : "Not Verified"}</span>
            </td>
            <td>
              <p>{user.role}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
