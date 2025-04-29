"use client";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSession } from "@/state/session";
import { DialogClose, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CreatePost: React.FC = () => {
  const { user } = useSession();
  if (!user) return null;

  return (
    <Card>
      <CardContent>
        <div className="flex flex-row gap-4">
          <Avatar avatar={user.avatar} size="3rem" />
          <Dialog>
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
              <Tabs defaultValue="post">
                <TabsList>
                  <TabsTrigger value="post">Stories</TabsTrigger>
                  <TabsTrigger value="event">Programs and Events</TabsTrigger>
                </TabsList>
                <TabsContent value="post">
                  <SchemaForm
                    schema={[
                      {
                        name: "title",
                        type: "text",
                        label: "Enter story title",
                        required: "Story title is required",
                      },
                      {
                        name: "description",
                        type: "textarea",
                        required: "Description is required",
                        label: "Enter the story content",
                      },
                      {
                        name: "pictures",
                        type: "file",
                        multiple: false,
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
                        <DialogClose asChild>
                          <Button className="grow" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button className="grow" type="submit" variant="default">
                          Post
                        </Button>
                      </div>
                    }
                  />
                </TabsContent>
                <TabsContent value="event">
                  <SchemaForm
                    schema={[{
                      name: "title",
                      type: "text",
                      label: "Enter event title",
                      required: "Event title is required",
                    }, {
                      name: "date",
                      type: "date",
                      label: "Event date",
                      required: "Event date is required",
                    }, {
                      name: "event_type",
                      type: "select",
                      label: "Event type",
                      options: [
                        { label: "Lecture/Reading/Talk", value: "lecture" },
                        { label: "Other", value: "other" }
                      ],
                      required: "Event type is required"
                    }, {
                      name: "location",
                      type: "text",
                      required: "Location is required",
                      label: "Location (city,state)",
                    }, {
                      name: "description",
                      type: "textarea",
                      required: "Description is required",
                      label: "Enter event description",
                    }]}
                    onSubmit={(data) => {
                      console.log(data);
                    }}
                    loading={false}
                    actions={
                      <div className="flex gap-4">
                        <DialogClose asChild>
                          <Button className="grow" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button className="grow" type="submit" variant="default">
                          Post
                        </Button>
                      </div>
                    }
                  />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="col-span-2">
        <CreatePost />
      </div>
    </div>
  );
};

export default Dashboard;
