import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@/types/User.type";
import { ColumnDef } from "@tanstack/react-table";
import { getDateWithTime } from "@/lib/helper";
import { ManageUserMenu } from "./components/ManageUserMenu";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (cell) => {
      const { title, first_name, last_name, avatar } = cell.row.original;
      const name = first_name
        ? `${title} ${first_name} ${last_name}`
        : 'User';
      return (
        <div className="flex items-center">
          <Avatar avatar={avatar} size="2rem" />
          <span className="ml-2">{name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "created",
    header: "Date created",
    cell: (cell) => getDateWithTime(cell.row.original.created_at),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Roles",
    cell: (cell) => (
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {cell.row.original.role.map((role) => (
          <Badge key={role} variant="secondary">
            {role}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    id: "actions",
    cell: (cell) => <ManageUserMenu user={cell.row.original} />
  }
];

