"use client";
import React from "react";
import HeroSectionForm from "./components/HeroSectionForm";
import GridItem, { GridItemOption } from "./components/GridItem";

const Page = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <GridItem
        title="Hero section"
        description="This is the first section of the homepage of the website"
      >
        <GridItemOption
          title="Hero section"
          description="This is the first section of the homepage of the website"
          trigger={<p>Manage hero section</p>}
          className="max-w-screen overflow-x-hidden"
        >
          <HeroSectionForm />
        </GridItemOption>
      </GridItem>
      <GridItem
        title="Messages"
        description="Message from director and president"
      >
        <GridItemOption
          title="Director's message"
          description="Message from the director"
          trigger={<p>Manage director&apos;s message</p>}
        >
          <p>Here is the director&apos;s message</p>
        </GridItemOption>
        <GridItemOption
          title="President's message"
          description="Message from the president"
          trigger={<p>Manage president&apos;s message</p>}
        >
          <p>Here is the president&apos;s message</p>
        </GridItemOption>
      </GridItem>
      <GridItem
        title="Coordinators"
        description="Manage coordinators' details of the Alumni Assiociation"
      >
        <p>Here is the email content</p>
      </GridItem>
    </div>
  );
};
export default Page;
