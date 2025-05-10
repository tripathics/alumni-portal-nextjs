import SchemaForm from "@/components/forms";
import { FieldValues } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import useAlumniPrefillData from "@/hooks/queries/useAlumniPrefillData";
import { UserDetailsForMembership } from "./UserDetailsForMembership";
import Alert from "@/components/custom-ui/Alert";
import { alumniMembershipForm } from "@/lib/schemas/formSchema/alumniMembershipForm";
import { AlumniMembershipFormSubmissionType } from "@/types/Alumni.type";
import useSubmitMembershipForm from "@/hooks/mutations/useSubmitMembershipForm";

interface EducationFormProps {
  ref: React.Ref<{ submit: () => void }>;
}
export const AlumniForm: React.FC<EducationFormProps> = ({ ref }) => {
  const alumniPrefillDataQuery = useAlumniPrefillData();
  const membershipSubmitMutation = useSubmitMembershipForm()

  const handleSubmit = (data: FieldValues) => {
    return new Promise((resolve, reject) => {
      data.sign = data.sign[0]
      membershipSubmitMutation.mutate(
        data as AlumniMembershipFormSubmissionType, {
        onSuccess: () => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        },
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
      {membershipSubmitMutation.isError && (
        <Alert>{membershipSubmitMutation.error?.message}</Alert>
      )}
      <SchemaForm
        schema={alumniMembershipForm}
        onSubmit={handleSubmit}
        submitRef={ref}
      />
    </div>
  );
};
