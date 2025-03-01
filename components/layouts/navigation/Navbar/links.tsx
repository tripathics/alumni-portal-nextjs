import { LucideIcon, UserCog2, UserRound, UserRoundCheck } from "lucide-react";

import { UserRole } from "@/types/User.type";

export const userLinks: {
  Icon: LucideIcon;
  label: string;
  href: string;
  role: UserRole;
}[] = [
  { Icon: UserRound, label: "Profile", href: "/profile", role: "user" },
  {
    Icon: UserRoundCheck,
    label: "Alumni Membership",
    href: "/alumni-membership",
    role: "user",
  },
  { Icon: UserCog2, label: "Admin", href: "/admin", role: "admin" },
];

export const links = [
  { label: "Home", href: "/" },
  { label: "Alumni List", href: "/alumni-list" },
  { label: "About", href: "/about" },
];
