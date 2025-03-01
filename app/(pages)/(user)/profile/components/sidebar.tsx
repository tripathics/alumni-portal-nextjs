"use client";
import Navigation from "@/components/custom-ui/Dashboard/Navigation";
import { useSessionApi } from "@/state/session";
import {
  BookIcon,
  Briefcase as BriefcaseIcon,
  LogOutIcon,
  SettingsIcon,
  User as UserIcon,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { logout } = useSessionApi();

  const navigations = [
    {
      title: "Profile",
      links: [
        {
          name: "Personal Profile",
          path: `/profile` + "",
          Icon: UserIcon,
        },
        {
          name: "Education",
          path: `/profile/` + "education",
          Icon: BookIcon,
        },
        {
          name: "Experience",
          path: `/profile/` + "experience",
          Icon: BriefcaseIcon,
        },
      ],
    },
    {
      title: "Account",
      links: [
        {
          name: "Account settings",
          path: `/profile/` + "account",
          Icon: SettingsIcon,
        },
        {
          name: "Logout",
          path: "/",
          Icon: LogOutIcon,
          action: () => {
            logout();
          },
        },
      ],
    },
  ];

  return navigations.map((navigation, index) => (
    <Navigation key={index} {...navigation} />
  ));
};
