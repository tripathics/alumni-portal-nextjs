"use client";
import { useSession, useSessionApi } from "@/state/session";
import NavLink from "../NavLink";
import { cx } from "class-variance-authority";
import { useRouter } from "next/navigation";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { UserRole, UserType } from "@/types/User.type";

const links = [
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const userLinks: {
  label: string;
  href: string;
  role: UserRole;
}[] = [
  { label: "Profile", href: "/profile", role: "user" },
  { label: "Alumni Membership", href: "/alumni-membership", role: "user" },
  { label: "Admin", href: "/admin", role: "admin" },
];

const UserLinks = ({ userData }: { userData: UserType }) => {
  const { user: clientUser, isUserLoading: isClientUserLoading } = useSession();
  const { logout } = useSessionApi();

  const user =
    isClientUserLoading && clientUser === null ? userData : clientUser;

  const router = useRouter();

  return (
    <div className="bg-primary/85 h-fit overflow-hidden">
      <div className="container flex justify-end gap-1">
        <ul className={cx("md:flex gap-1 hidden m-0 p-0 list-none", {})}>
          {(user
            ? userLinks.filter((link) => user.role.includes(link.role))
            : links
          ).map((link, index) => (
            <li className="block" key={index}>
              <NavLink type="button" {...link} />
            </li>
          ))}
        </ul>
        {user && (
          <div className="block">
            <button
              className="px-2 h-8 bg-primary/90 hover:bg-primary text-white flex transition-all ease-in text-xs leading-none flex-row items-center gap-2"
              onClick={() => {
                logout();
                router.replace("/");
              }}
            >
              <Avatar avatar={user.avatar} size="24px" />
              <div>Logout</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLinks;
