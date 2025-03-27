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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import React from "react";

const GridItem: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}> = ({ title, description, children, trigger }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-left font-normal w-full justify-between px-6 py-4 rounded-none"
              size="lg"
            >
              {trigger}
              <ChevronRight className="text-inherit shrink-0" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const Page = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
      <GridItem
        title="Hero section"
        description="This is the first section of the homepage of the website"
        trigger={<p>Update hero section</p>}
      >
        <div></div>
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
