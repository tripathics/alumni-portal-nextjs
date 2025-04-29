"use client";
import { MembershipApplication, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Spinner } from "@/components/ui/spinner";
import fetchMembershipApplications from "@/lib/actions/admin/fetchMembershipApplications";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/lib/constants/queryKey";

async function getData(): Promise<MembershipApplication[]> {
  try {
    const data = await fetchMembershipApplications();
    if (!data) return [];
    return data.map((d) => ({
      id: d.id,
      avatar: d.avatar,
      created_at: d.created_at,
      degree: d.degree,
      discipline: d.discipline,
      graduation_date: d.graduation_date,
      name: `${d.title} ${d.first_name} ${d.last_name}`,
      roll_no: d.roll_no,
      status: d.status,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default function Applications() {
  const { data: applications, isLoading } = useQuery({
    queryKey: [queryKey.applications],
    queryFn: getData,
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
