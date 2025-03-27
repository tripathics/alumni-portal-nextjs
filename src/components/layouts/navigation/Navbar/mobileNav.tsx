"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import NavLink from "../NavLink";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "@/state/session";
import { links } from "./links";

const MobileNav: React.FC<{
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ open, onOpenChange }) => {
  const { user } = useSession();

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <div className="md:hidden flex items-center">
        <button
          className={cn(
            "font-semibold text-sm text-foreground/80 overflow-hidden block uppercase relative before:content-['menu'] after:content-['close'] before:uppercase after:uppercase before:absolute after:absolute before:block after:block before:leading-none after:leading-none before:left-1/2 after:left-1/2 before:-translate-x-1/2 after:-translate-x-1/2 before:transition-all after:transition-all before:top-0 after:top-full",
            {
              ["before:-top-full after:top-0"]: open,
            }
          )}
          onClick={() => onOpenChange(!open)}
        >
          <div
            aria-hidden="true"
            className="block pointer-events-none opacity-0 leading-none"
          >
            Close
          </div>
        </button>
      </div>
      <div
        className={cn(
          "flex flex-col bg-background fixed top-20 left-0 right-0 bottom-0 transition-all ease-in-out duration-700 z-50",
          {
            ["clip-hline"]: !open,
            ["clip-rect"]: open,
          }
        )}
      >
        <div className="grow flex flex-col justify-between px-4 pb-6 md:px-8 max-w-(--breakpoint-xl) w-full mx-auto">
          <div></div>
          <ul className="flex flex-col gap-8">
            {links.map((link, i) => (
              <li key={i}>
                <NavLink
                  type="mobileLink"
                  action={() => onOpenChange(false)}
                  href={link.href}
                  label={link.label}
                />
              </li>
            ))}
          </ul>
          <div className="flex flex-row justify-between gap-4">
            {!user && (
              <>
                <Link
                  href="/login"
                  onClick={() => onOpenChange(false)}
                  className={buttonVariants({
                    size: "lg",
                    variant: "fill",
                    className: "grow text-xl uppercase",
                  })}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => onOpenChange(false)}
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "grow text-xl uppercase",
                  })}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
