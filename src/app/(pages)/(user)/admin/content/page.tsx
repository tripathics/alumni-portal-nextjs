"use client";
import React from "react";
import HeroSectionForm from "./components/HeroSectionForm";
import GridItem from "./components/GridItem";

const Page = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <GridItem
        title="Hero section"
        description="This is the first section of the homepage of the website"
        trigger={<p>Manage hero section</p>}
        dialogClassName="max-w-screen overflow-x-hidden"
      >
        <HeroSectionForm />
      </GridItem>
      <GridItem
        title="Messages"
        description="Messages from director and president"
        trigger={<p>Update messages</p>}
      >
        <p>Here is the email content</p>
      </GridItem>
      <GridItem
        title="Coordinators"
        description="Manage coordinators' details of the Alumni Assiociation"
        trigger={<p>Manage coordinators data</p>}
      >
        <p>Here is the email content</p>
      </GridItem>
    </div>
  );
};
export default Page;
