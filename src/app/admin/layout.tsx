import Link from "next/link";

export default function AdminLayout({ children }: React.PropsWithChildren<Record<never, any>>) {
  return (
    <section className="container mx-auto py-4">
      <h1 className="mb-4">Admin</h1>
      <nav className="navbar w-full">
        <ul tabIndex={0} className="menu menu-horizontal p-0">
          <li>
            <Link href="/admin/users">Users</Link>
          </li>
        </ul>
      </nav>
      {children}
    </section>
  );
}
