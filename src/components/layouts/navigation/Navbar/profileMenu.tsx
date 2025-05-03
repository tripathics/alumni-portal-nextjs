"use client";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSession, useSessionApi } from "@/state/session";
import { LogOutIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import CompleteProfileSetup from "./completeProfileSetup";
import { userLinks } from "./links";

export const ProfileMenu: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean, popover?: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const { user, profileCompletionStatus } = useSession();
  const { logout } = useSessionApi();
  const router = useRouter();

  const [profileCompletionModalOpen, setProfileCompletionModalOpen] =
    React.useState(true);

  const profileIncomplete =
    profileCompletionStatus &&
    Object.keys(profileCompletionStatus).some(
      (key) => !profileCompletionStatus[key]
    );

  return user ? (
    <>
      <Popover open={open} onOpenChange={(open) => onOpenChange(open, true)}>
        <PopoverTrigger>
          <div
            className={cn(
              "bg-transparent rounded-full p-1 transition-all my-3.5",
              {
                ["bg-primary/25"]: open,
                ["hover:bg-primary/10"]: !open,
                ["relative before:absolute before:z-10 before:content-[''] before:bg-primary before:border before:border-background before:rounded-full before:w-2 before:h-2 after:absolute after:content-[''] after:bg-primary after:rounded-full after:animate-ping after:w-2 after:h-2 after:top-1 after:right-1 after:brightness-125 before:top-1 before:right-1 before:brightness-150"]:
                  profileIncomplete,
              }
            )}
          >
            <div className="bg-background rounded-full">
              <Avatar avatar={user.avatar} size="36px" />
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="border-0 p-0">
          <Card>
            <CardContent className="p-1">
              <nav className="flex flex-col gap-1">
                <div className="px-3 py-2 text-sm text-center text-muted">
                  {user.email}
                </div>
                {profileIncomplete && user.role.includes('user') && (
                  <Button
                    variant="outline"
                    className="relative bg-card text-foreground/80 justify-left w-full"
                    onClick={() => setProfileCompletionModalOpen(true)}
                  >
                    <Sparkles
                      className="absolute z-10 -top-1 -right-1 animate-pulse"
                      size="1rem"
                      fill="currentColor"
                    />
                    Finish your profile setup
                  </Button>
                )}
                <div className="border-b border-foreground/10"></div>
                <div>
                  <ul className="flex flex-col items-stretch">
                    {userLinks
                      .filter(({ role }) => role ? user.role.includes(role) : true)
                      .map(({ href, label, Icon }, index) => (
                        <li key={index}>
                          <Link
                            className="text-foreground/80 px-3 py-2 flex flex-row gap-2 items-center w-full text-sm hover:bg-accent rounded-full active:bg-accent/50 transition-all"
                            href={href}
                            onClick={() => onOpenChange(false)}
                          >
                            <Icon size="18px" />
                            {label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="border-b border-foreground/10"></div>
                <div>
                  <button
                    onClick={() => {
                      logout();
                      router.replace("/");
                      onOpenChange(false);
                    }}
                    className="text-foreground/80 px-3 py-2 flex flex-row gap-2 items-center w-full text-sm hover:bg-accent rounded-full"
                  >
                    <LogOutIcon size="18px" />
                    Logout
                  </button>
                </div>
              </nav>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
      {user.role.includes("user") && (
        <CompleteProfileSetup
          modalOpen={profileCompletionModalOpen && !!profileIncomplete}
          setModalOpen={setProfileCompletionModalOpen}
        />
      )}
    </>
  ) : (
    <div className="hidden md:flex gap-4 items-center">
      <Link
        href="/login"
        className={buttonVariants({
          size: "sm",
          variant: "fill",
          className: "uppercase",
        })}
      >
        Login
      </Link>
      <Link
        href="/register"
        className={buttonVariants({
          size: "sm",
          variant: "outline",
          className: "uppercase",
        })}
      >
        Sign up
      </Link>
    </div>
  );
};
