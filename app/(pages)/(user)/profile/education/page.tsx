"use client";
import SchemaForm from "@/components/forms";
import {
  Pencil as EditPencil,
  CirclePlus as AddIcon,
  School,
} from "lucide-react";
import { useState } from "react";
import {
  educationFormNITAPSchema,
  educationFormSchema,
} from "@/lib/schemas/formSchema/educationDetails";
import { FieldValues } from "react-hook-form";
import fetchEducationApi from "@/lib/actions/profile/education/fetchEducation";
import updateEducationApi from "@/lib/actions/profile/education/updateEducation";
import { EducationType } from "@/types/Profile.type";
import { getMonth } from "@/lib/helper";
import { useSession, useSessionApi } from "@/state/session";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ProfileTableRowSkeleton } from "@/components/custom-ui/Skeletons/Table";
import { toast } from "react-toastify";
// import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/lib/constants/queryKey";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface EducationFormProps {
  onSubmit: (data: FieldValues) => void;
  prefillData?: FieldValues;
  loading?: boolean;
}
const EducationFormNITAP: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {
    institute: "National Institute of Technology, Arunachal Pradesh",
  },
  loading,
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormNITAPSchema}
      onSubmit={onSubmit}
      actions={
        <Button loading={loading} type="submit">
          {loading ? "Saving" : "Save"}
        </Button>
      }
    />
  );
};

const EducationForm: React.FC<EducationFormProps> = ({
  onSubmit,
  prefillData = {},
  loading,
}) => {
  return (
    <SchemaForm
      prefillData={prefillData}
      schema={educationFormSchema}
      onSubmit={onSubmit}
      actions={
        <Button loading={loading} type="submit">
          {loading ? "Saving" : "Save"}
        </Button>
      }
    />
  );
};

interface EducationRowProps {
  data: EducationType;
  openEditModal: (data: FieldValues) => void;
}
const EducationRow: React.FC<EducationRowProps> = ({ data, openEditModal }) => {
  const { user } = useSession();
  return (
    <TableRow>
      <TableCell className="max-w-fit w-[66px]">
        <div className="bg-primary/10 p-4 rounded-full">
          <School className="text-primary w-6 h-6" strokeWidth={1.5} />
        </div>
      </TableCell>
      <TableCell>
        <div className="text-base font-medium mb-2">{data.institute}</div>
        <div className="text-muted-foreground">
          <p>
            {data.degree} ({data.type}) in {data.discipline}
          </p>
          <p>
            {getMonth(data.start_date)}
            {" - "}
            {getMonth(data.end_date)}
            {new Date(data.end_date) > new Date() ? " (Expected)" : ""}
          </p>
        </div>
        {!!data.description && <div>{data.description}</div>}
      </TableCell>
      <TableCell className="w-12 text-right">
        <Button
          aria-label="Edit experience details"
          size="icon"
          variant="secondary"
          onClick={() => openEditModal(data)}
          disabled={!!user?.profile_locked}
        >
          <EditPencil size="1rem" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

const Education: React.FC = () => {
  const { user } = useSession();
  const { fetchProfileCompletionStatus } = useSessionApi();

  const queryClient = useQueryClient();

  const educationQuery = useQuery({
    queryKey: [queryKey.education],
    queryFn: fetchEducationApi,
  });

  const educationMutation = useMutation({
    mutationFn: updateEducationApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.education],
      });
      fetchProfileCompletionStatus();
      toast.success("Educations updated");
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(JSON.stringify(error));
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPrefillData, setEditPrefillData] = useState<EducationType | null>(
    null
  );

  const openModal = (data: FieldValues | null = null) => {
    if (
      educationMutation.isPending ||
      educationQuery.isLoading ||
      user?.profile_locked
    )
      return;
    setEditPrefillData(data as EducationType | null);
    setIsModalOpen(true);
  };

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Education</TableHead>
              <TableHead colSpan={1} className="text-right">
                <Button
                  variant="link"
                  className="hover:no-underline px-0"
                  disabled={!!user?.profile_locked || educationQuery.isLoading}
                  onClick={() => openModal()}
                >
                  <AddIcon />
                  Add
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {educationQuery.isLoading ? (
              <>
                <ProfileTableRowSkeleton />
                <ProfileTableRowSkeleton />
              </>
            ) : (
              educationQuery.data?.educationRecords.map((e) => (
                <EducationRow data={e} key={e.id} openEditModal={openModal} />
              ))
            )}
          </TableBody>
          {!(educationQuery.isLoading || educationMutation.isPending) &&
            (educationQuery.data?.educationRecords.length === 0 ? (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                  <DialogTitle>Add education details at NITAP</DialogTitle>
                  <DialogDescription className="hidden">
                    Add your education details which you completed at NITAP
                  </DialogDescription>
                  <EducationFormNITAP
                    onSubmit={async (data) => {
                      await educationMutation.mutateAsync(
                        data as EducationType
                      );
                    }}
                    loading={educationMutation.isPending}
                  />
                </DialogContent>
              </Dialog>
            ) : (
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent>
                  <DialogTitle>
                    {editPrefillData ? "Edit Education" : "Add Education"}
                  </DialogTitle>
                  <DialogDescription className="hidden">
                    Add or edit your education details
                  </DialogDescription>
                  <EducationForm
                    prefillData={editPrefillData as FieldValues}
                    onSubmit={(data) => {
                      educationMutation.mutate(data as EducationType);
                    }}
                    loading={educationMutation.isPending}
                  />
                </DialogContent>
              </Dialog>
            ))}
        </Table>
      </CardContent>
    </Card>
  );
};

export default Education;
