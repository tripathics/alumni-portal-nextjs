"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "classnames";

const NavLink: React.FC<{
  label: string;
  href: string;
  action?: () => void;
  type?: "link" | "button" | "mobileLink";
}> = ({ label, href, action, type = "link" }) => {
  const pathname = usePathname();

  const lnStyles = {
    link: cx(
      "flex relative h-full items-center after:content-[''] after:absolute after:top-full after:bg-current after:w-full after:transition-all after:ease-out after:h-1.5 after:-translate-y-2 after:scale-y-0 after:origin-top hover:after:scale-y-100",
      {
        ["text-primary after:scale-y-100"]: pathname === href,
        ["text-foreground/80"]: pathname !== href,
      }
    ),
    button:
      "block px-6 py-2.5 bg-primary/90 hover:bg-primary text-white block transition-all ease-in",
    mobileLink: cx(
      "block w-fit text-foreground/80 relative after:content-[''] after:absolute after:block after:w-full after:h-2 after:border-b-2 after:border-background transition-all ease-out after:transition-all after:ease-out",
      {
        ["after:top-1/2 brightness-125 text-primary after:bg-primary"]:
          pathname === href,
        ["hover:text-foreground/90 hover:after:bg-foreground/90 after:top-full after:bg-transparent"]:
          pathname !== href,
      }
    ),
  };

  const textStyles = {
    link: "px-1 uppercase font-semibold text-sm",
    button: "text-xs leading-none block",
    mobileLink: "text-6xl font-semibold uppercase",
  };

  return (
    <Link
      className={lnStyles[type]}
      href={href}
      onClick={() => {
        if (action) action();
      }}
    >
      <span className={textStyles[type]}>{label}</span>
    </Link>
  );
};

export default NavLink;
