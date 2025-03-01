import { LucideProps } from "lucide-react";
import NavLi from "./NavLi";

interface NavigationProps {
  title: string;
  links: {
    name: string;
    path: string;
    Icon:
      | React.ForwardRefExoticComponent<
          Omit<React.SVGProps<SVGSVGElement>, "ref"> &
            React.RefAttributes<SVGSVGElement>
        >
      | React.FC<React.SVGProps<SVGSVGElement>>
      | React.ForwardRefExoticComponent<
          Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >;
    action?: () => void;
  }[];
}
const Navigation: React.FC<NavigationProps> = ({ title, links }) => (
  <nav>
    <div className="mb-2">
      <h2 className="text-xs font-bold">{title}</h2>
    </div>
    <ul className="mb-8">
      {links.map((link, index) => (
        <NavLi key={index} {...link} />
      ))}
    </ul>
  </nav>
);

export default Navigation;
