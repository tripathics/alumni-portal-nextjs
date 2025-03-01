import SchemaForm from "@/components/forms";
import alumniMembershipSubmit from "@/lib/actions/alumni/alumniMembershipSubmit";
import { AlumniMembershipFormSubmissionType } from "@/types/Alumni.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { UserDetailsForMembership } from "./UserDetailsForMembership";
import alumniPrefill from "@/lib/actions/alumni/alumniPrefill";
import { LoaderCircle } from "lucide-react";
import { queryKey } from "@/lib/constants/queryKey";

export const AlumniForm: React.FC<{
  ref: React.Ref<{ submit: () => void }>;
}> = ({ ref }) => {
  const alumniPrefillDataQuery = useQuery({
    queryFn: alumniPrefill,
    queryKey: [queryKey.alumniPrefill],
  });

  const membershipSubmitMutation = useMutation({
    mutationFn: alumniMembershipSubmit,
  });

  const handleSubmit = (data: FieldValues) => {
    return new Promise((resolve, reject) => {
      membershipSubmitMutation.mutate(
        data as AlumniMembershipFormSubmissionType,
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

  if (alumniPrefillDataQuery.isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  if (!alumniPrefillDataQuery.data) {
    return <p>Failed to load data</p>;
  }

  return (
    <>
      <UserDetailsForMembership data={alumniPrefillDataQuery.data} />
      <SchemaForm
        submitRef={ref}
        schema={[
          {
            name: "membership_level",
            label: "Membership level",
            type: "select",
            required: "Membership level is required",
            options: [
              {
                value: "level1_networking",
                label: "I am Interested to get information and networking only",
              },
              {
                value: "level2_volunteering",
                label:
                  "I am Interested in volunteering for events and activities",
              },
            ],
          },
          {
            name: "sign",
            label: "Signature",
            type: "file",
            required: "Signature is required",
            allowedFormats: ["image/jpeg", "image/png", "image/gif"],
            maxFileSize: 200 * 1024,
          },
        ]}
        onSubmit={(data) => {
          data.sign = data.sign[0];
          handleSubmit(data);
        }}
      />
    </>
  );
};
