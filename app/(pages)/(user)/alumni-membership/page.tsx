"use client";
import PageHeader from "@/components/layouts/PageHeader";
import { AlumniForm } from "@/components/welcome/components/AlumniForm";
import { useRef } from "react";

// TODO: complete the form
const Page = () => {
  const formRef = useRef(null);
  return (
    <>
      <PageHeader
        bgImage="/header-bg/2022-01-03.jpg"
        pageHeading="Alumni membership"
        subHeading="Apply for life membership for NIT Arunachal Pradesh, alumni association"
      />
      <div className="__page-content container">
        <AlumniForm ref={formRef} />
      </div>
    </>
  );
};

export default Page;
