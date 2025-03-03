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
import { BoxCol, BoxRow, BoxTable } from "../components/boxTable";
import SchemaForm from "@/components/forms";
import personalDetailsFormSchema from "@/lib/schemas/formSchema/personalDetails";
import { FieldValues } from "react-hook-form";
import updateProfile from "@/lib/actions/profile/updateProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileSkeleton from "@/components/custom-ui/Skeletons/Profile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import readProfile from "@/lib/actions/profile/readProfile";
import { queryKey } from "@/lib/constants/queryKey";
import AvatarUpload from "@/components/forms/AvatarUpload";
import axios from "axios";
import updateAvatarNew from "@/lib/actions/profile/updateAvatarNew";
import getUploadUrlApi from "@/lib/actions/media/getUploadUrl";
import { useSession, useSessionApi } from "@/state/session";

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
  const { user } = useSession();

  const profileQuery = useQuery({
    queryFn: async () => {
      if (!user) return null;
      const data = await readProfile();
      return data?.user;
    },
    queryKey: [queryKey.profile],
    enabled: !!user,
  });

  const profile = profileQuery.data || null;
  const [updateFormModalOpen, setUpdateFormModalOpen] = React.useState(false);
  const [updateAvatarModalOpen, setUpdateAvatarModalOpen] =
    React.useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.profile] });
      fetchProfileCompletionStatus();
      fetchUser(undefined, true);
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        const getUrlRes = await getUploadUrlApi(
          "avatar",
          file.name,
          file.type,
          file.size
        );
        const { key, url } = getUrlRes!;

        await axios.put(url, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        await updateAvatarNew(key);
      } catch (err) {
        if ((err as Error).message) {
          throw err;
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.profile] });
      fetchProfileCompletionStatus();
      fetchUser(undefined, true);
      setUpdateAvatarModalOpen(false);
    },
  });

  if (profileQuery.isLoading) {
    return <ProfileSkeleton />;
  }

  if (!profile) {
    return <div>Error fetching profile data</div>;
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
          <BoxTable>
            <BoxRow>
              <BoxCol label>Date of Birth</BoxCol>
              <BoxCol>{profile.dob}</BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol label>Category</BoxCol>
              <BoxCol>{profile.category}</BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol label>Nationality</BoxCol>
              <BoxCol>{profile.nationality}</BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol label>Religion</BoxCol>
              <BoxCol>{profile.religion}</BoxCol>
            </BoxRow>
          </BoxTable>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Contact Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BoxTable>
            <BoxRow header>
              <BoxCol header>Address</BoxCol>
              <BoxCol header>Email & Phone</BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol>
                <p>{profile.address}</p>
                <p>
                  {profile.city}, {profile.state}
                </p>
                <p>
                  {profile.country} {profile.pincode}
                </p>
              </BoxCol>
              <BoxCol>
                <p>{profile.email}</p>
                <p>{profile.alt_email}</p>
                <p>{profile.phone}</p>
                <p>{profile.alt_phone}</p>
              </BoxCol>
            </BoxRow>
          </BoxTable>
          <BoxTable>
            <BoxRow header>
              <BoxCol header>Your Social Profiles</BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol label>LinkedIn</BoxCol>
              <BoxCol>
                {profile.linkedin ? (
                  <a className="link" href={profile.linkedin} target="_blank">
                    {profile.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </BoxCol>
            </BoxRow>
            <BoxRow>
              <BoxCol label>GitHub</BoxCol>
              <BoxCol>
                {profile.github ? (
                  <a className="link" href={profile.github} target="_blank">
                    {profile.linkedin}
                  </a>
                ) : (
                  "N/A"
                )}
              </BoxCol>
            </BoxRow>
          </BoxTable>
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
