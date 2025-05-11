import { Button } from "@/components/ui/button";
import { UserType } from "@/types/User.type";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ManageRolesDialog from "./dialogs/ManageRolesDialog";
import DeleteAccountDialog from "./dialogs/DeleteAccountDialog";
import ChangePasswordDialog from "./dialogs/ChangePasswordDialog";

export const ManageUserMenu: React.FC<{ user: UserType }> = ({ user }) => {
  const [dialogOpen, setDialogOpen] = useState<"role" | "password" | "delete" | null>(null)

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="size-9"
            aria-label="Manage user"
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="p-1 flex flex-col">
          <Button onClick={() => setDialogOpen("role")} className="justify-start" variant="ghost">
            Manage roles
          </Button>
          <Button onClick={() => setDialogOpen("password")} className="justify-start" variant="ghost">
            Change password
          </Button>
          <Button onClick={() => setDialogOpen("delete")} className="justify-start" variant="ghost">
            Delete account
          </Button>
        </PopoverContent>
      </Popover>
      <ManageRolesDialog
        open={dialogOpen === "role"}
        onOpenChange={(open) => setDialogOpen(open ? "role" : null)}
        user={user}
      />
      <ChangePasswordDialog
        open={dialogOpen === "password"}
        onOpenChange={(open) => setDialogOpen(open ? "password" : null)}
        user={user}
      />
      <DeleteAccountDialog
        open={dialogOpen === "delete"}
        onOpenChange={(open) => setDialogOpen(open ? "delete" : null)}
        user={user}
      />
    </>
  )
}


