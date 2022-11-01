import { DocumentTextIcon, NewspaperIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function NavigationMenu(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
) {
  return (
    <ul {...props}>
      <li>
        <Link href="/posts">
          <NewspaperIcon className="h-6 w-6" />
          <span className="link font-bold">Inlägg</span>
        </Link>
      </li>
      <li>
        <Link href="/documents">
          <DocumentTextIcon className="h-6 w-6" />
          <span className="link font-bold">Dokument</span>
        </Link>
      </li>
      <li>
        <Link href="/address-list">
          <UsersIcon className="h-6 w-6" />
          <span className="link font-bold">Adresslista</span>
        </Link>
      </li>
    </ul>
  );
}
