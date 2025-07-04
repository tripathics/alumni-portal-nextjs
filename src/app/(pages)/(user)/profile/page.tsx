"use client";

import React from "react";
import AvatarPreview from "@/components/custom-ui/Avatar/AvatarPreview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PersonalDetailsType } from "@/types/Profile.type";
import { PencilIcon } from "lucide-react";
import SchemaForm from "@/components/forms";
import personalDetailsFormSchema from "@/lib/schemas/formSchema/personalDetails";
import { FieldValues } from "react-hook-form";
import updateProfile from "@/lib/actions/profile/updateProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProfileSkeleton from "@/components/custom-ui/Skeletons/Profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { queryKey } from "@/lib/constants/queryKey";
import AvatarUpload from "@/components/forms/AvatarUpload";
import axios from "axios";
import updateAvatarNew from "@/lib/actions/profile/updateAvatarNew";
import getUploadUrlApi from "@/lib/actions/media/getUploadUrl";
import { useSessionApi } from "@/state/session";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useReadProfile from "@/hooks/queries/useReadProfile";

interface PersonalDetailsFormProps {
  prefillData: FieldValues;
  onSubmit: (data: FieldValues) => void;
  loading?: boolean;
}
const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  prefillData,
  onSubmit,
  loading,
}) => (
  <SchemaForm
    prefillData={prefillData}
    schema={personalDetailsFormSchema}
    onSubmit={onSubmit}
    actions={
      <Button type="submit" loading={loading}>
        {loading ? "Saving..." : "Save"}
      </Button>
    }
  />
);

const Page = () => {
  const queryClient = useQueryClient();
  const { fetchProfileCompletionStatus, fetchUser } = useSessionApi();
  const profileQuery = useReadProfile()
  const profile = profileQuery.data;
  const [updateFormModalOpen, setUpdateFormModalOpen] = React.useState(false);
  const [updateAvatarModalOpen, setUpdateAvatarModalOpen] =
    React.useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.profile] });
      fetchProfileCompletionStatus();
      fetchUser({ optimistic: true });
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: async (file: File | null) => {
      try {
        let filename = null
        if (file) {
          const getUrlRes = await getUploadUrlApi(
            "avatar",
            file.name,
            file.type,
            file.size
          );
          const { key, url } = getUrlRes!;
          filename = key;

          await axios.put(url, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
        }
        await updateAvatarNew(filename);
        toast.success("Avatar updated successfully");
      } catch (err) {
        if ((err as Error).message) {
          throw err;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.profile] });
      fetchProfileCompletionStatus();
      fetchUser({ optimistic: true });
      setUpdateAvatarModalOpen(false);
    },
  });

  if (profileQuery.isLoading || !profile) {
    return <ProfileSkeleton />;
  }

  return profile.registration_no ? (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent className="flex flex-row-reverse gap-x-5 gap-y-3 flex-wrap">
          <div>
            {profile.profile_locked ? (
              <Button disabled>
                <PencilIcon size="1rem" />
                Edit
              </Button>
            ) : (
              <Dialog
                open={updateFormModalOpen}
                onOpenChange={setUpdateFormModalOpen}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setUpdateFormModalOpen(true)}>
                    <PencilIcon size="1rem" />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit personal details</DialogTitle>
                  <DialogDescription className="hidden">
                    Edit or update your personal details.
                  </DialogDescription>
                  <PersonalDetailsForm
                    prefillData={profile}
                    onSubmit={async (data) => {
                      updateProfileMutation.mutate({
                        data: data as PersonalDetailsType,
                      });
                      setUpdateFormModalOpen(false);
                    }}
                    loading={updateProfileMutation.isPending}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="flex grow flex-wrap gap-y-3 gap-x-5 justify-center">
            <div className="shrink-0 relative h-fit">
              <AvatarPreview
                avatar={profile.avatar}
                className="md:w-36 md:h-36 w-24 h-24"
              />
              <div className="absolute bottom-0 right-0">
                <Dialog
                  open={updateAvatarModalOpen}
                  onOpenChange={setUpdateAvatarModalOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      aria-label="Edit profile picture"
                      variant="outline"
                      size="icon"
                      className="rounded-full md:h-9 md:w-9 w-8 h-8 "
                    >
                      <PencilIcon className="w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle aria-label="Update Avatar"></DialogTitle>
                    <DialogDescription className="hidden">
                      Update your profile picture
                    </DialogDescription>
                    <AvatarUpload
                      avatar={profile.avatar}
                      loading={updateAvatarMutation.isPending}
                      updateAvatar={updateAvatarMutation.mutate}
                    />
                    {updateAvatarMutation.isError && (
                      <div className="border-red-500 mt-2 text-red-500 border p-2 text-center">
                        {updateAvatarMutation.error?.message}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="grow">
              <h2 className="md:text-2xl md:mb-2 text-xl">
                {profile.title} {profile.first_name} {profile.last_name}
              </h2>
              <div className="flex flex-col gap-1">
                {/* todo year of graduation */}
                {/* <p>Class of 2020</p> */}
                <div>
                  <span className="text-muted-foreground font-mono font-semibold text-sm tracking-wide">
                    {profile.registration_no}
                  </span>
                  |
                  <span className="text-muted-foreground font-mono font-semibold text-sm tracking-wide">
                    {profile.roll_no}
                  </span>
                </div>
                <div>{profile.email}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal details</CardTitle>
          <CardDescription>
            These details are used for account safety purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted">Date of Birth</TableCell>
                <TableCell>{profile.dob}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted">Category</TableCell>
                <TableCell>{profile.category}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted">Nationality</TableCell>
                <TableCell>{profile.nationality}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted">Religion</TableCell>
                <TableCell>{profile.religion}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Email & Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="align-top">
                  <p>{profile.address}</p>
                  <p>
                    {profile.city}, {profile.state}
                  </p>
                  <p>
                    {profile.country} {profile.pincode}
                  </p>
                </TableCell>
                <TableCell className="align-top">
                  <p>{profile.email}</p>
                  <p>{profile.alt_email}</p>
                  <p>{profile.phone}</p>
                  <p>{profile.alt_phone}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead colSpan={2}>Your Social Profiles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted">LinkedIn</TableCell>
                <TableCell>
                  {profile.linkedin ? (
                    <a className="link" href={profile.linkedin} target="_blank">
                      {profile.linkedin}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-muted">GitHub</TableCell>
                <TableCell>
                  {profile.github ? (
                    <a className="link" href={profile.github} target="_blank">
                      {profile.github}
                    </a>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      <Card>
        <CardContent>
          <PersonalDetailsForm
            prefillData={profile}
            onSubmit={(data) => {
              updateProfileMutation.mutate({
                data: data as PersonalDetailsType,
              });
            }}
            loading={updateProfileMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
