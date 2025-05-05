import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/User.type";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { EllipsisVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";

type User = {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  role: UserRole[];
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (cell) => (
      <div className="flex items-center">
        <Avatar avatar={cell.row.original.avatar} size="2rem" />
        <span className="ml-2">{cell.row.original.name}</span>
      </div>
    ),
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
    cell: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-6"
            aria-label="Manage user"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <Card>
            <CardContent className="flex flex-col gap-0.5 p-1">
              <Button className="justify-start" variant="ghost">Manage roles</Button>
              <Button className="justify-start" variant="ghost">Change password</Button>
              <Button className="justify-start" variant="ghost">Delete user</Button>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    )
  }
];
