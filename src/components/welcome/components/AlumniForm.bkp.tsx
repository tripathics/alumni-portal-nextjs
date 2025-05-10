import SchemaForm from "@/components/forms";
import { AlumniMembershipFormSubmissionType } from "@/types/Alumni.type";
import { FieldValues } from "react-hook-form";
import { UserDetailsForMembership } from "./UserDetailsForMembership";
import { LoaderCircle } from "lucide-react";
import useAlumniPrefillData from "@/hooks/queries/useAlumniPrefillData";
import Alert from "@/components/custom-ui/Alert";
import { Button } from "@/components/ui/button";
import { useSessionApi } from "@/state/session";
import { queryKey } from "@/lib/constants/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import alumniMembershipSubmit from "@/lib/actions/alumni/alumniMembershipSubmit";
import { toast } from "react-toastify";

export const AlumniForm: React.FC<{
  ref: React.Ref<{ submit: () => void }>;
}> = ({ ref }) => {
  const { fetchProfileCompletionStatus } = useSessionApi();
  const alumniPrefillDataQuery = useAlumniPrefillData();
  const queryClient = useQueryClient();

  const membershipSubmitMutation = useMutation({
    mutationFn: alumniMembershipSubmit,
    onSuccess: () => {
      fetchProfileCompletionStatus({ optimistic: true });
      queryClient.invalidateQueries({
        queryKey: [queryKey.alumniPrefill],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.userApplications],
      });
      toast.success("Your Alumni Membership form has been submitted!");
    },
  });

  const handleSubmit = (data: FieldValues) => {
    return new Promise(async (resolve, reject) => {
      membershipSubmitMutation.mutate(
        data as AlumniMembershipFormSubmissionType, {
        onSuccess: () => {
          resolve(data);
        }, onError: (error) => {
          reject(error)
        }
      });
    });
  };

  if (alumniPrefillDataQuery.isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }
  if (alumniPrefillDataQuery.error) {
    return (
      <Alert className="mb-0">
        {alumniPrefillDataQuery.error?.message ?? "Error fetching data"}
      </Alert>
    );
  }
  if (!alumniPrefillDataQuery.data) {
    return <Alert>Error fetching data</Alert>;
  }

  return (
    <div className="flex flex-col gap-6 mb-4">
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
        actions={
          !ref && (
            <div className="flex justify-end">
              <Button
                type="submit"
                size="lg"
                loading={membershipSubmitMutation.isPending}
              >
                Submit application
              </Button>
            </div>
          )
        }
      />
    </div>
  );
};
