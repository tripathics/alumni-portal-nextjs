"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import useApplications from "@/hooks/queries/useApplications";

export default function Applications() {
  const { data: applications, isLoading } = useApplications()
  return (
    <div>
      <header>
        <h2 className="mb-4">Membership applications</h2>
      </header>
      {isLoading ? (
        <Spinner />
      ) : applications ? (
        <DataTable columns={columns} data={applications} />
      ) : (
        <div>
          <p>No applications found</p>
        </div>
      )}
    </div>
  );
}
