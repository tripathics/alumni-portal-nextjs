"use client"
import Dashboard from "@/components/custom-ui/Dashboard";
import PageHeader from "@/components/layouts/PageHeader";
import React from "react";
import { Sidebar } from "./components/sidebar";
import { useSession } from "@/state/session";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isUserLoading } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (!isUserLoading && !user?.role.includes("admin")) {
      router.replace('/404')
    }
  }, [])

  return (
    isUserLoading
      ? <LoaderCircle className="animate-spin" />
      : (
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
      )
  );
}
