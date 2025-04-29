"use client";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React from "react";
import WelcomeExperience from "@/components/welcome/index";
import { useSession } from "@/state/session";
import { AnimatePresence } from "motion/react";

const CompleteProfileSetup: React.FC<{
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ modalOpen, setModalOpen }) => {
  const { profileCompletionStatus } = useSession();

  const profileIncomplete =
    profileCompletionStatus &&
    Object.keys(profileCompletionStatus).some(
      (key) => !profileCompletionStatus[key]
    );

  return (
    <AnimatePresence>
      {profileIncomplete && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent aria-describedby="Profile setup dialog" fullScreen>
            <DialogTitle aria-label="Finish setting up your profile"></DialogTitle>
            <DialogDescription className="hidden">
              Complete your profile setup and apply for alumni membership.
            </DialogDescription>
            <WelcomeExperience />
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default CompleteProfileSetup;
