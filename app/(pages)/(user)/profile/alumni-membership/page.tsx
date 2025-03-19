"use client";
import { AlumniForm } from "@/components/welcome/components/AlumniForm";
import PastApplications from "./components/PastApplications";

const Page = () => {
  return (
    <div className="flex flex-col gap-6">
      <AlumniForm />
      <PastApplications />
    </div>
  );
};

export default Page;
