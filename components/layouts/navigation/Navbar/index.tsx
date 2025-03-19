"use client";
import Link from "next/link";
import NavLink from "../NavLink";
import { ProfileMenu } from "./profileMenu";
import MobileNav from "./mobileNav";
import React from "react";
import { links } from "./links";
import { LogoWide } from "../../Logo";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  return (
    <nav className="bg-background md:bg-background/75 md:backdrop-blur-md sticky top-0 z-50 border-b border-border">
      <div className="container flex justify-between transition-all h-20">
        {/* logo */}
        <div className="flex items-center">
          <Link href="/">
            <LogoWide className="md:h-10 w-auto h-8 dark:invert" />
          </Link>
        </div>
        {/* nav-content */}
        <div className="flex items-stretch gap-2 md:gap-4">
          <ul className="hidden md:flex gap-6 m-0 p-0 list-none">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink {...link} />
              </li>
            ))}
          </ul>
          <MobileNav open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
          <ProfileMenu
            open={profileMenuOpen}
            onOpenChange={(open, popover) => {
              if (!popover) setMobileMenuOpen(false);
              setProfileMenuOpen(open);
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
