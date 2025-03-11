"use client";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
// import Modal from "@/components/custom-ui/Modal/Modal";

import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { userAvatarUrl } from "@/lib/utils";
import { useSession } from "@/state/session";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useState } from "react";

const CreatePost: React.FC = () => {
  const { user } = useSession();
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  if (!user) return null;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-4">
          <Avatar avatar={userAvatarUrl(user.avatar)} size="3rem" />
          <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
            <DialogTrigger asChild>
              <button className="bg-primary/10 hover:bg-primary/5 active:bg-transparent px-4 grow text-input text-left rounded-full border border-solid border-muted-foreground/30">
                Start a post...
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Share your thoughts with the community
                </DialogTitle>
              </DialogHeader>
              <SchemaForm
                schema={[
                  {
                    name: "post_type",
                    type: "radio",
                    required: "Post type is required",
                    label: "Create a new...",
                    options: [
                      {
                        label: "Post",
                        value: "post",
                        defaultChecked: true,
                      },
                      { label: "Event", value: "event" },
                    ],
                  },
                  {
                    name: "description",
                    type: "textarea",
                    required: "Description is required",
                    label: "Write your post",
                  },
                  {
                    name: "pictures",
                    type: "file",
                    multiple: true,
                    allowedFormats: ["image/png", "image/jpeg", "image/webp"],
                    label: "Photos",
                  },
                ]}
                onSubmit={(data) => {
                  console.log(data);
                }}
                loading={false}
                actions={
                  <div className="flex gap-4">
                    <Button
                      onClick={() => setIsPostModalOpen(false)}
                      className="grow"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                    <Button className="grow" type="submit" variant="default">
                      Post
                    </Button>
                  </div>
                }
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
};

export default Dashboard;
