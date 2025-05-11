"use client";
import getUsers from "@/lib/actions/admin/getUsers";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import useSessionEnabledQuery from "@/hooks/queries/useUserEnabledQuery"
import { queryKey } from "@/lib/constants/queryKey";
import { LoaderCircle } from "lucide-react";

export default function Users() {
  const { data: users = [], isLoading } = useSessionEnabledQuery({
    queryKey: [queryKey.usersList],
    queryFn: getUsers,
    select: (data) => data?.users
  })
  return (
    <div>
      <header>
        <h2 className="mb-4">Users</h2>
      </header>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <DataTable columns={columns} data={users} />
      )}
    </div>
  );
}
