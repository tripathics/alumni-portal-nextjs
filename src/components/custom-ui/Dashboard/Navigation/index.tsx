import { LucideIcon } from "lucide-react";
import NavLi from "./NavLi";
import { UserRole } from "@/types/User.type";
import { useSession } from "@/state/session";

export interface NavigationProps {
  title: string;
  links: {
    name: string;
    path: string;
    Icon: LucideIcon;
    roleVisibleTo?: UserRole;
    action?: () => void;
  }[];
}
const Navigation: React.FC<NavigationProps> = ({ title, links }) => {
  const { user } = useSession()
  const userRole = user?.role || []

  return (
    <nav>
      <div className="mb-2">
        <h2 className="text-xs font-bold font-sans text-muted px-4">{title}</h2>
      </div>
      <ul className="mb-8">
        {links.filter(({ roleVisibleTo }) => roleVisibleTo
          ? userRole?.includes(roleVisibleTo)
          : true).map((link, index) => (
            <NavLi key={index} {...link} />
          ))}
      </ul>
    </nav>
  )
};

export default Navigation;
