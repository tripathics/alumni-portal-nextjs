import SchemaForm, { Select } from "@/components/forms";
import { educationFormNITAPSchema } from "@/lib/schemas/formSchema/educationDetails";
import { FieldValues } from "react-hook-form";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import updateEducation from "@/lib/actions/profile/education/updateEducation";
import { EducationType } from "@/types/Profile.type";
import { queryKey } from "@/lib/constants/queryKey";
import fetchNitapEducation from "@/lib/actions/profile/education/fetchNitapEducation";
import { LoaderCircle } from "lucide-react";
import { useSession } from "@/state/session";

interface EducationFormProps {
  ref: React.Ref<{ submit: () => void }>;
}
export const EducationForm: React.FC<EducationFormProps> = ({ ref }) => {
  const { user } = useSession();
  const [prefillData, setPrefillData] = React.useState<EducationType | null>(
    null
  );

  const queryClient = useQueryClient();

  const educationAtNitapQuery = useQuery({
    queryKey: [queryKey.nitapEducation],
    queryFn: async () => {
      const data = await fetchNitapEducation();
      return data?.educationRecords;
    },
  });

  const fetchedDegrees = educationAtNitapQuery.data?.map((edu, i) => ({
    label: edu.degree,
    value: i.toString(),
  }));

  const updateEducationMutation = useMutation({
    mutationFn: updateEducation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.nitapEducation],
      });
    },
  });

  const handleSubmit = (data: FieldValues) => {
    return new Promise((resolve, reject) => {
      updateEducationMutation.mutate(data as EducationType, {
        onSuccess: () => {
          resolve(data);
        },
        onError: (error) => {
          reject(error);
        },
      });
    });
  };

  if (educationAtNitapQuery.isLoading) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <>
      {!!fetchedDegrees?.length ? (
        <div>
          <p className="text-sm mb-12">
            Select the degree of your existing education records at NIT
            Arunachal Pradesh to modify.
          </p>
          <Select
            required
            label="Existing Degree"
            name="degree"
            options={fetchedDegrees}
            onChange={(e) => {
              setPrefillData(
                educationAtNitapQuery.data?.[parseInt(e.target.value)] || null
              );
            }}
            onBlur={() => {}}
          />
          {prefillData && (
            <SchemaForm
              prefillData={prefillData}
              schema={educationFormNITAPSchema}
              onSubmit={handleSubmit}
              submitRef={ref}
            />
          )}
        </div>
      ) : (
        <SchemaForm
          schema={educationFormNITAPSchema}
          onSubmit={handleSubmit}
          prefillData={{
            institute: "National Institute of Technology, Arunachal Pradesh",
          }}
          submitRef={ref}
        />
      )}
    </>
  );
};
