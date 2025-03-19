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
import { BoxCol, BoxRow, BoxTable } from "../../components/boxTable";
import SchemaForm from "@/components/forms";
import personalDetailsFormSchema from "@/lib/schemas/formSchema/personalDetails";
import { FieldValues } from "react-hook-form";
import updateProfile from "@/lib/actions/profile/updateProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import readProfile from "@/lib/actions/profile/readProfile";

interface PersonalDetailsFormProps {
  prefillData: FieldValues;
  onSubmit: (data: FieldValues) => void;
  loading?: boolean;
}
const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
  prefillData,
  onSubmit,
  loading,
}) => {
  return (
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
};

const PersonalDetailsClient = ({
  profileData,
}: {
  profileData: PersonalDetailsType;
}) => {
  const queryClient = useQueryClient();
  queryClient.setQueryData(["profile"], profileData);
  const [isProfileQueryEnabled, setIsProfileQueryEnabled] =
    React.useState(false);

  const profileQuery = useQuery({
    queryFn: async () => {
      const data = await readProfile();
      return data?.user;
    },
    initialData: profileData,
    queryKey: ["profile"],
    enabled: isProfileQueryEnabled,
  });

  const profile = profileQuery.data || null;
  const [updateFormModalOpen, setUpdateFormModalOpen] = React.useState(false);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setIsProfileQueryEnabled(true);
      // queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.refetchQueries({ queryKey: ["profile"] });
      // queryClient.setQueryData(["profile"], updateProfileMutation.variables);
    },
  });

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
                <PencilIcon />
                Edit
              </Button>
            ) : (
              <Dialog
                open={updateFormModalOpen}
                onOpenChange={setUpdateFormModalOpen}
              >
                <DialogTrigger>
                  <Button onClick={() => setUpdateFormModalOpen(true)}>
                    <PencilIcon />
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit personal details</DialogTitle>
                  <PersonalDetailsForm
                    prefillData={profile}
                    onSubmit={async (data) => {
                      await updateProfileMutation.mutateAsync({
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
                <Dialog>
                  <DialogTrigger>
                    <Button
                      aria-label="Edit profile picture"
                      variant="outline"
                      size="icon"
                      className="rounded-full p-2"
                    >
                      <PencilIcon />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </DialogDescription>
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
                <p>Class of 2020</p>
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

export default PersonalDetailsClient;
