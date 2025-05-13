"use client"
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
        bgImage="/header-bg/2022-01-03.jpg"
        pageHeading="Admin"
        subHeading="Welcome to the admin console"
      />
      <div className="page-main container">
        <Dashboard>
          <Sidebar />
          {children}
        </Dashboard>
      </div>
    </>
  );
}
