"use client";
import { AlumniForm } from "@/components/welcome/components/AlumniForm";
import { useRef } from "react";

// TODO: complete the form
const Page = () => {
  const formRef = useRef(null);
  return (
    <div>
      <AlumniForm ref={formRef} />
    </div>
  );
};

export default Page;
