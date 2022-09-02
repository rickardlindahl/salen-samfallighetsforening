import { DocumentTextIcon, NewspaperIcon, UsersIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function NavigationMenu(
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>,
) {
  return (
    <ul {...props}>
      <li role="menu-item">
        <Link href="/posts">
          <a>
            <NewspaperIcon className="h-6 w-6" />
            <span className="link font-bold">Inlägg</span>
          </a>
        </Link>
      </li>
      <li role="menu-item">
        <Link href="/documents">
          <a>
            <DocumentTextIcon className="h-6 w-6" />
            <span className="link font-bold">Dokument</span>
          </a>
        </Link>
      </li>
      <li role="menu-item">
        <Link href="/address-list">
          <a>
            <UsersIcon className="h-6 w-6" />
            <span className="link font-bold">Adresslista</span>
          </a>
        </Link>
      </li>
    </ul>
  );
}
