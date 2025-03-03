import Application from "@/components/Application/Application";
import Avatar from "@/components/custom-ui/Avatar/Avatar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  MembershipApplcationStatus,
  MembershipApplicationType,
} from "@/types/Membership.type";
import { fetchApplicationByIdAdmin } from "@/lib/actions/admin/fetchApplicationById";
import updateApplicationStatus from "@/lib/actions/admin/updateApplicationStatus";
import { getDateWithTime, getMonth, toTitleCase } from "@/lib/helper";
import { Eye as EyeOpenIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { toast } from "react-toastify";

export type MembershipApplication = {
  id: string;
  avatar: string | null;
  status: MembershipApplcationStatus;
  name: string;
  roll_no: string;
  degree: string;
  discipline: string;
  graduation_date: string;
  created_at: string;
};

export const columns: ColumnDef<MembershipApplication>[] = [
  {
    accessorKey: "applicant",
    header: "Applicant",
    cell: (cell) => (
      <div className="flex items-start">
        <Avatar avatar={cell.row.original.avatar} size="2rem" />
        <div className="flex flex-col ml-2">
          <span>{cell.row.original.name}</span>
          <span className="text-muted-foreground">
            Roll no: {cell.row.original.roll_no}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "batch",
    header: "Batch",
    cell: (cell) => (
      <div className="flex flex-col">
        <span>
          {cell.row.original.degree}
          {" in "}
          {cell.row.original.discipline}
        </span>
        <span className="text-muted-foreground">
          Graduation {getMonth(cell.row.original.graduation_date)}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: (cell) => getDateWithTime(cell.row.original.created_at),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (cell) => toTitleCase(cell.row.original.status),
  },
  {
    id: "actions",
    cell: ({ row }) => <ApplicationAction id={row.original.id} />,
  },
];

const ApplicationAction: React.FC<{ id: string }> = ({ id }) => {
  const [applicationData, setApplicationData] =
    useState<MembershipApplicationType | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchApplicationData = async () => {
    try {
      setLoading(true);
      const data = await fetchApplicationByIdAdmin(id);
      if (data) {
        setApplicationData(data);
        setIsApplicationModalOpen(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const data = await updateApplicationStatus(id, status);
      if (data?.membershipApplicationRecord) {
        toast.success(
          `Application ${data?.membershipApplicationRecord.status}`,
          {
            autoClose: 1000,
          }
        );
        setIsApplicationModalOpen(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.preventDefault();
          fetchApplicationData();
        }}
        loading={loading}
        aria-label="View application"
      >
        <EyeOpenIcon width={16} height={16} />
      </Button>
      <Dialog
        open={isApplicationModalOpen}
        onOpenChange={setIsApplicationModalOpen}
      >
        <DialogContent>
          <DialogTitle>Life membership application</DialogTitle>
          {!!applicationData && (
            <Application applicationData={applicationData} />
          )}
          <DialogFooter>
            <div className="flex gap-4 justify-between *:grow">
              <Button
                variant="secondary"
                onClick={() => {
                  if (!applicationData) return;
                  updateStatus(applicationData?.id, "rejected");
                }}
              >
                Reject
              </Button>
              <Button
                onClick={() => {
                  if (!applicationData) return;
                  updateStatus(applicationData?.id, "approved");
                }}
              >
                Approve
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
