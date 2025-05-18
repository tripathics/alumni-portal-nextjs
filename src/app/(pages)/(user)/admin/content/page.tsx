"use client";
import React from "react";
import HeroSectionForm from "./components/HeroSectionForm";
import GridItem, { GridItemOption } from "./components/GridItem";
import DirectorsMessageForm from "./components/directorMessageForm";
import PresidentsMessageForm from "./components/presidentMessageForm";

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
          trigger={<p>Director&apos;s message</p>}
        >
          <DirectorsMessageForm />
        </GridItemOption>
        <GridItemOption
          title="President's message"
          description="Message from the president"
          trigger={<p>President&apos;s message</p>}
        >
          <PresidentsMessageForm />
        </GridItemOption>
      </GridItem>
    </div>
  );
};
export default Page;
