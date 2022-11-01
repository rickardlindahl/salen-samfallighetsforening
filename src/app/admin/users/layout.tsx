import React from "react";

export default function AdminUsersLayout({ children }: React.PropsWithChildren<Record<never, any>>) {
  return <div className="overflow-x-auto">{children}</div>;
}
