"use client";
import { cx } from "class-variance-authority";
import React from "react";
import { SectionHeader } from "./components/SectionHeader";
import { ChevronLeft } from "lucide-react";
import { welcomeExperienceSections } from "./Sections";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { useSession } from "@/state/session";

const WelcomeExperience = () => {
  const { profileCompletionStatus } = useSession();
  const stepsCompleted = welcomeExperienceSections.findIndex(
    (section) => !profileCompletionStatus?.[section.name]
  );

  const [page, setPage] = React.useState(stepsCompleted);
  const [isLoading, setIsLoading] = React.useState(false);
  const formRef = React.useRef<{ submit: () => Promise<FieldValues> }>(null);
  const [avatar, setAvatar] = React.useState<File | null>(null);
  const formDivRef = React.useRef<HTMLDivElement>(null);

  const changePage = (direction: "next" | "prev" = "next") => {
    setPage((prev) =>
      direction === "next"
        ? prev + 1 < welcomeExperienceSections.length - 1
          ? prev + 1
          : prev
        : prev - 1 < 0
        ? 0
        : prev - 1
    );
    setPage((prev) => {
      if (prev + 1 >= welcomeExperienceSections.length - 1 || prev - 1 < 0)
        return prev;
      const next = direction === "next" ? prev + 1 : prev - 1;
      formDivRef.current?.scrollTo(0, 0);
      return next;
    });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = await formRef.current?.submit();
      if (page === 0) setAvatar(data?.avatar || null);
      changePage();
    } catch (e) {
      if ((e as Error).message === "Form validation failed") {
        formDivRef.current?.scrollTo(0, 0);
      }
    } finally {
      if (page < welcomeExperienceSections.length - 1) setIsLoading(false);
    }
  };

  const SectionMain = welcomeExperienceSections[page].main;

  return (
    <div className="h-screen flex flex-col">
      <main ref={formDivRef} className="flex-1 min-h-0 overflow-auto">
        <div className="flex flex-col gap-5 max-w-md m-auto pt-12 pb-8 px-4">
          <div className="flex flex-row gap-1.5 mb-8 w-full max-w-xs mx-auto *:grow *:rounded-full *:h-1">
            {welcomeExperienceSections.map((_, i) => (
              <div
                key={i}
                className={cx("bg-muted/25", {
                  ["bg-primary"]: i <= page,
                })}
              />
            ))}
          </div>
          <SectionHeader {...welcomeExperienceSections[page].header} />
          <SectionMain ref={formRef} selectedAvatarFile={avatar || undefined} />
        </div>
      </main>
      <footer className="py-6 bg-background border-t border-muted/25">
        <div className="flex flex-row justify-between max-w-md m-auto px-4">
          <div>
            {page > 0 && (
              <Button
                type="button"
                onClick={() => changePage("prev")}
                variant="outline"
                size="icon"
                aria-label="Go back to previous step"
              >
                <ChevronLeft size="1rem" />
              </Button>
            )}
          </div>
          <Button
            type="button"
            loading={isLoading}
            onClick={handleSubmit}
            size="lg"
            aria-label="Continue to next step"
          >
            {welcomeExperienceSections[page].btnText}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeExperience;
