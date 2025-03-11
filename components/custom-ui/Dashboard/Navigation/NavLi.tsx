"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLiProps {
  Icon:
    | React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> &
          React.RefAttributes<SVGSVGElement>
      >
    | React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  path: string;
  action?: () => void;
}
const NavLi: React.FC<NavLiProps> = ({ Icon, name, path, action = null }) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={path}
        onClick={() => {
          if (action) action();
        }}
        className={cn(
          "relative px-4 py-2 mb-2 flex items-center gap-x-3 text-sm font-medium transition-all ease-in-out duration-150 before:content-[''] before:rounded-full before:w-1 before:h-3/5 before:absolute before:left-0 before:origin-right before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:ease-out before:bg-foreground text-muted",
          {
            ["hover:before:bg-primary before:bg-primary before:scale-x-100 text-primary dark:brightness-150"]:
              pathname === path,
            ["hover:text-foreground/80 before:scale-x-0"]: pathname !== path,
          }
        )}
      >
        {Icon && <Icon />}
        {name}
      </Link>
    </li>
  );
};

export default NavLi;
