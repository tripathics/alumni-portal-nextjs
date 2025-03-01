import Dashboard from "@/components/custom-ui/Dashboard";
import PageHeader from "@/components/layouts/PageHeader";
import React from "react";
import { Sidebar } from "./components/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader
        bgImage="/header-bg/2023-04-09.jpg"
        pageHeading="Profile"
        subHeading="Your profile here"
      />
      <div className="__page-content container">
        <Dashboard>
          <Sidebar />
          {children}
        </Dashboard>
      </div>
    </>
  );
}
