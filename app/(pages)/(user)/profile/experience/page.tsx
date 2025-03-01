"use client";
import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Pencil as EditPencil, CirclePlus as AddIcon } from "lucide-react";
import { useState } from "react";
import { experienceFormSchema } from "@/lib/schemas/formSchema/experienceDetails";
import { FieldValues } from "react-hook-form";
import fetchExperiencesApi from "@/lib/actions/profile/experience/fetchExperience";
import { ExperienceType } from "@/types/Profile.type";
import { getMonth } from "@/lib/helper";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import updateExperience from "@/lib/actions/profile/experience/updateExperience";
import { toast } from "react-toastify";
import { ProfileTableRowSkeleton } from "@/components/custom-ui/Skeletons/Table";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/lib/constants/queryKey";

interface ExperienceFormProps {
  onSubmit: (data: FieldValues) => void;
  prefillData?: FieldValues;
  loading?: boolean;
}
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  onSubmit,
  prefillData = {},
  loading,
}) => (
  <SchemaForm
    prefillData={prefillData}
    schema={experienceFormSchema}
    onSubmit={onSubmit}
    actions={
      <Button loading={loading} type="submit">
        {loading ? "Saving" : "Save"}
      </Button>
    }
  />
);

interface ExperienceRowProps {
  data: FieldValues;
  openEditModal: (data: FieldValues) => void;
}
const ExperienceRow: React.FC<ExperienceRowProps> = ({
  data,
  openEditModal,
}) => {
  return (
    <TableRow>
      <TableCell className="max-w-fit w-[66px]">
        <div>
          <Image
            width={50}
            height={50}
            src="https://img.icons8.com/ios-filled/50/university.png"
            alt="university"
          />
        </div>
      </TableCell>
      <TableCell>
        <div className="text-base font-medium mb-2">{data.organisation}</div>
        <div>
          <p>
            {data.designation} {data.type === "internship" && data.type}
          </p>
          <p>{data.location}</p>
          <p>
            {getMonth(data.start_date)}
            {" - "}
            {data.end_date ? getMonth(data.end_date) : "Present"}
          </p>
        </div>
        {!!data.description && <div>{data.description}</div>}
      </TableCell>
      <TableCell className="text-right w-12">
        <Button
          aria-label="Edit experience details"
          className="p-1.5 rounded-full w-8 h-8"
          variant="secondary"
          onClick={() => openEditModal(data)}
        >
          <EditPencil />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const Experience: React.FC = () => {
  const queryClient = useQueryClient();

  const experienceQuery = useQuery({
    queryKey: [queryKey.experience],
    queryFn: fetchExperiencesApi,
  });

  const experienceMutation = useMutation({
    mutationFn: updateExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.experience] });
      toast.success("Experiences updated");
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<ExperienceType | null>(
    null
  );

  const openModal = (data: FieldValues | null = null) => {
    if (experienceMutation.isPending || experienceQuery.isLoading) return;
    setEditPrefillData(data as ExperienceType | null);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Experience</TableHead>
              <TableHead colSpan={1} className="text-right">
                <Button
                  variant="link"
                  className="hover:no-underline px-0"
                  disabled={experienceQuery.isLoading}
                  onClick={() => openModal()}
                >
                  <AddIcon />
                  Add
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experienceQuery.isLoading ? (
              <>
                <ProfileTableRowSkeleton />
                <ProfileTableRowSkeleton />
              </>
            ) : (
              experienceQuery.data?.experienceRecords.map((e) => (
                <ExperienceRow data={e} key={e.id} openEditModal={openModal} />
              ))
            )}
          </TableBody>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogTitle>
                {editPrefillData ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
              <DialogDescription className="hidden">
                Edit or update your experience details.
              </DialogDescription>
              <ExperienceForm
                onSubmit={(data) => {
                  experienceMutation.mutate(data as ExperienceType);
                  setIsModalOpen(false);
                }}
                prefillData={editPrefillData as FieldValues}
                loading={experienceMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Experience;
