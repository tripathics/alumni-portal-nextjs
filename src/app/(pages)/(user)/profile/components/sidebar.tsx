"use client";
import Navigation, { NavigationProps } from "@/components/custom-ui/Dashboard/Navigation";
import { useSessionApi } from "@/state/session";
import {
  BookIcon,
  Briefcase as BriefcaseIcon,
  LogOutIcon,
  SettingsIcon,
  UserRoundIcon,
  UserRoundCheck,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const { logout } = useSessionApi();

  const navigations: NavigationProps[] = [
    {
      title: "Profile",
      links: [
        {
          name: "Personal Profile",
          path: `/profile` + "",
          Icon: UserRoundIcon,
        },
        {
          name: "Education",
          path: `/profile/` + "education",
          roleVisibleTo: 'user',
          Icon: BookIcon,
        },
        {
          name: "Experience",
          path: `/profile/` + "experience",
          roleVisibleTo: 'user',
          Icon: BriefcaseIcon,
        },
        {
          name: "Alumni membership",
          path: `/profile/` + "alumni-membership",
          roleVisibleTo: 'user',
          Icon: UserRoundCheck,
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
