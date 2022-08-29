import { GetServerSidePropsContext } from "next";
import { getSession } from "../../lib/auth/session";
import { trpc } from "../../utils/trpc";

function Admin() {
  const usersQuery = trpc.useQuery(["admin.users"]);

  if (usersQuery.isLoading) {
    return <div>loading...</div>;
  }

  return (
    <section className="container mx-auto py-4">
      <h1 className="mb-4">Admin</h1>
      <div className="overflow-x-auto">
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
            {usersQuery.data?.map((user) => (
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
      </div>
    </section>
  );
}

export default Admin;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session || session?.user?.role !== "admin") {
    return { redirect: { permanent: false, destination: "/" } };
  }

  return {
    props: { session: session },
  };
}
