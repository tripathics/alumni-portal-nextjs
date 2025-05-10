"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import fetchMembershipApplications from "@/lib/actions/admin/fetchMembershipApplications";
import { queryKey } from "@/lib/constants/queryKey";
import useSessionEnabledQuery from "@/hooks/queries/useUserEnabledQuery";

export default function Applications() {
  const { data: applications, isLoading } = useSessionEnabledQuery({
    queryKey: [queryKey.applications],
    queryFn: fetchMembershipApplications,
    select: (data) => !data ? [] : data.map((d) => ({
      id: d.id,
      avatar: d.avatar,
      created_at: d.created_at,
      degree: d.degree,
      discipline: d.discipline,
      graduation_date: d.graduation_date,
      name: `${d.title} ${d.first_name} ${d.last_name}`,
      roll_no: d.roll_no,
      status: d.status,
    }))
  });

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
