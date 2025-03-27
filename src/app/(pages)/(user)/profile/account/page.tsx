"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSession } from "@/state/session";
import { ChevronRight, KeyRound, Mail } from "lucide-react";
import UpdatePassword from "./components/UpdatePassword";
import { getDateWithTime } from "@/lib/helper";
import React from "react";

const Page = () => {
  const [modalOpen, setModalOpen] = React.useState<
    "password" | "email" | false
  >(false);
  const { user } = useSession();

  if (!user) {
    return null;
  }

  return (
    <>
      <header className="mb-4">
        <h2 className="text-lg">Manage your account</h2>
      </header>
      <div className="grid gap-6 lg:grid-cols-2 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
            <CardDescription>
              This is the primary email of your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Dialog
              open={modalOpen === "email"}
              onOpenChange={(open) => setModalOpen(open ? "email" : false)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-left font-normal w-full justify-between px-6 py-4 rounded-none"
                  size="lg"
                >
                  <div className="font-mono max-w-fit text-sm flex flex-row gap-2 items-center overflow-hidden">
                    <Mail size="1rem" />
                    <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronRight className="text-inherit shrink-0" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Update your email</DialogTitle>
                <DialogDescription>
                  This functionality is not available yet. Contact admin to
                  update your email
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              A secure password helps protect your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <Dialog
              open={modalOpen === "password"}
              onOpenChange={(open) => setModalOpen(open ? "password" : false)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-left font-normal w-full justify-between px-6 py-4 rounded-none"
                  size="lg"
                >
                  <div className="flex flex-col gap-2">
                    <div className="font-mono text-sm flex flex-row gap-2 items-center">
                      <KeyRound size="1rem" />
                      ******
                    </div>
                    <div>
                      Last changed on {getDateWithTime(user.updated_at)}
                    </div>
                  </div>
                  <ChevronRight className="text-inherit" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Update your password</DialogTitle>
                <DialogDescription>
                  Create a strong password for your alumni account
                </DialogDescription>
                <UpdatePassword closeModal={() => setModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
