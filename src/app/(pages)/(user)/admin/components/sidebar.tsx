"use client";
import Navigation from "@/components/custom-ui/Dashboard/Navigation";
import {
  Database,
  LayoutDashboard,
  NotepadText,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const navigations = [
    {
      title: "",
      links: [
        {
          name: "Dashboard",
          path: `/admin` + "",
          Icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Alumni",
      links: [
        {
          name: "Applications",
          path: `/admin/` + "applications",
          Icon: NotepadText,
        },
        { name: "Database", path: `/admin/` + "alumni", Icon: Database },
      ],
    },
    {
      title: "User Management",
      links: [
        { name: "Users", path: `/admin/` + "users", Icon: UsersRound },
        { name: "Roles", path: `/admin/` + "roles", Icon: UserRoundCheck },
      ],
    },
    {
      title: "Website",
      links: [
        {
          name: "Content Management",
          path: `/admin/` + "content",
          Icon: NotepadText,
        },
      ],
    },
  ];

  return navigations.map((navigation, index) => (
    <Navigation key={index} {...navigation} />
  ));
};
