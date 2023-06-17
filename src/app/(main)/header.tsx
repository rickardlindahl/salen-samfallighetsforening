import { UserButton } from "@clerk/nextjs";

import { Container } from "~/components/container";
import { DesktopNavigation } from "~/components/desktop-navigation";
import { MobileNavigation } from "~/components/mobile-navigation";
import { ModeToggle } from "~/components/mode-toggle";
import { MenuItem } from "~/types/settings";

export function Header({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <header className="flex flex-col">
      <div className="h-16 pt-6">
        <Container className="w-full">
          <div className="flex gap-4">
            <div className="flex flex-1">
              <UserButton />
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation
                className="pointer-events-auto md:hidden"
                menuItems={menuItems}
              />
              <DesktopNavigation
                className="pointer-events-auto hidden md:block"
                menuItems={menuItems}
              />
            </div>
            <div className="flex justify-end md:flex-1">
              <div className="pointer-events-auto">
                <ModeToggle />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
