"use client"
import SchemaForm from "@/components/forms";
import personalDetailsFormSchema from "@/lib/schemas/formSchema/personalDetails";
import { FieldValues } from "react-hook-form";
import { Ref } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useReadProfile from "@/hooks/queries/useReadProfile";
import { LoaderCircle } from "lucide-react";
import updateProfile from "@/lib/actions/profile/updateProfile";
import { PersonalDetailsType } from "@/types/Profile.type";
import { queryKey } from "@/lib/constants/queryKey";
import { useSessionApi } from "@/state/session";

export const PersonalDetailsForm: React.FC<{
  ref: Ref<{ submit: () => void }>;
  selectedAvatarFile?: File;
}> = ({ ref, selectedAvatarFile }) => {
  const queryClient = useQueryClient();
  const { fetchUser } = useSessionApi();

  const profileQuery = useReadProfile();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.profile] });
      fetchUser({ optimistic: true });
    },
  });

  const handleSubmit = async (data: FieldValues) => {
    return new Promise((resolve, reject) => {
      updateProfileMutation.mutate(
        { data: data as PersonalDetailsType, avatarFile: selectedAvatarFile },
        {
          onSuccess: () => {
            resolve(data);
          },
          onError: (error) => {
            reject(error);
          },
        }
      );
    });
  };

  if (profileQuery.isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <SchemaForm
      prefillData={profileQuery.data || {}}
      schema={personalDetailsFormSchema}
      onSubmit={handleSubmit}
      submitRef={ref}
    />
  );
};
