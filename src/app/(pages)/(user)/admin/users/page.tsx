"use client";
import getUsers from "@/lib/actions/admin/getUsers";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import useSessionEnabledQuery from "@/hooks/queries/useUserEnabledQuery"
import { queryKey } from "@/lib/constants/queryKey";

export default function Users() {
  const { data: users, isLoading } = useSessionEnabledQuery({
    queryKey: [queryKey.usersList],
    queryFn: getUsers,
    select: (data) => !data ? [] : data.users.map((user) => ({
      id: user.id,
      avatar: user.avatar,
      name: user.first_name
        ? `${user.title} ${user.first_name} ${user.last_name}`
        : "User",
      email: user.email,
      role: user.role,
    }))
  })
  return (
    <div>
      <header>
        <h2 className="mb-4">Users</h2>
      </header>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={users || []} />
      )}
    </div>
  );
}
