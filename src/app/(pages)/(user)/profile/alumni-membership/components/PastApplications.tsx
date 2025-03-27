import { useState } from "react";
import useUserPastApplications from "@/hooks/queries/useUserPastApplications";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableRowSkeleton } from "@/components/custom-ui/Skeletons/Table";
import { dataValueLookup } from "@/lib/constants/data";
import { getDateWithTime } from "@/lib/helper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApplication } from "@/hooks/queries/useApplication";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Application from "@/components/Application/Application";

export default function PastApplications() {
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);
  const { data, error, isLoading } = useUserPastApplications();
  const selectedApplication = useApplication(selectedApplicationId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your past applications</CardTitle>
        <CardDescription>
          View the status of your past applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application</TableHead>
              <TableHead>Submission date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                <TableRowSkeleton cols={3} />
                <TableRowSkeleton cols={3} />
              </>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={3}>Error: {error.message}</TableCell>
              </TableRow>
            ) : !data.length ? (
              <TableRow>
                <TableCell colSpan={3}>No past applications found</TableCell>
              </TableRow>
            ) : (
              data.map(({ id, membership_level, created_at, status }) => (
                <TableRow
                  className="cursor-pointer"
                  key={id}
                  onClick={() => setSelectedApplicationId(id)}
                >
                  <TableCell>
                    {"Life membership " + dataValueLookup[membership_level]}
                  </TableCell>
                  <TableCell>{getDateWithTime(created_at)}</TableCell>
                  <TableCell className="capitalize">{status}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog
        open={!!selectedApplicationId && !!selectedApplication.data}
        onOpenChange={(open) =>
          setSelectedApplicationId(open ? selectedApplicationId : null)
        }
      >
        <DialogContent>
          {selectedApplication.data && (
            <>
              <DialogHeader>
                <DialogTitle>Application details</DialogTitle>
                <DialogDescription>
                  Submitted on{" "}
                  {getDateWithTime(selectedApplication.data?.created_at)}
                </DialogDescription>
              </DialogHeader>
              <Application applicationData={selectedApplication.data} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
