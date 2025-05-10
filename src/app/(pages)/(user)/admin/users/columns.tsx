import Avatar from "@/components/custom-ui/Avatar/Avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/User.type";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { EllipsisVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTitle, DialogFooter, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRef, useState } from "react";
import SchemaForm from "@/components/forms";
import Alert from "@/components/custom-ui/Alert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import changePassword from "@/lib/actions/admin/changePassword";
import deleteAccount from "@/lib/actions/admin/deleteAccount";
import { toast } from "react-toastify";
import { queryKey } from "@/lib/constants/queryKey";

type User = {
  id: string;
  avatar: string | null;
  name: string;
  email: string;
  role: UserRole[];
};

export const columns: ColumnDef<User>[] = [
  // {
  //   accessorKey: "created",
  //   header: "Date created",
  //   cell: (cell) => (cell.row.original.),
  // },
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
    cell: (cell) => <RolePopover user={cell.row.original} />
  }
];

const RolePopover: React.FC<{ user: User }> = ({ user }) => {
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
        <PopoverContent align="end">
          <Card>
            <CardContent className="flex flex-col gap-0.5 p-1">
              <Button onClick={() => setDialogOpen("role")} className="justify-start" variant="ghost">
                Manage roles
              </Button>
              <Button onClick={() => setDialogOpen("password")} className="justify-start" variant="ghost">
                Change password
              </Button>
              <Button onClick={() => setDialogOpen("delete")} className="justify-start" variant="ghost">
                Delete account
              </Button>
            </CardContent>
          </Card>
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

const DeleteAccountDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: User;
}> = ({ open, onOpenChange, user }) => {
  const queryClient = useQueryClient()
  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success(`Account deleted: ${user.email}`)
      if (user.role.includes('alumni')) {
        queryClient.invalidateQueries({
          queryKey: [queryKey.alumniList]
        })
      }
      queryClient.invalidateQueries({
        queryKey: [queryKey.usersList]
      })
      onOpenChange(false)
    }
  })
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete account?</DialogTitle>
        </DialogHeader>
        <Alert severity="warning" className="mb-2">
          Deleting an account is an irreversible process. It cannot be undone.
        </Alert>
        <div>
          <p className="text-xs text-muted mb-1">User account</p>
          <p>{user.email}</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            loading={deleteAccountMutation.isPending}
            onClick={() => deleteAccountMutation.mutate(user.id)}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
const ChangePasswordDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: User;
}> = ({ open, onOpenChange, user }) => {
  const { mutate } = useMutation({
    mutationFn: changePassword
  })

  const formRef = useRef<{ submit: () => void }>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>Change password</DialogHeader>
        <div>
          <p className="text-xs text-muted mb-1">User account</p>
          <p>{user.email}</p>
        </div>
        <SchemaForm
          schema={[{
            type: "password",
            name: "password",
            label: "Enter a new password",
            required: "Password is required",
            autocomplete: "new-password",
          },
          {
            type: "password",
            name: "confirmPassword",
            label: "Confirm Password",
            required: "Confirm Password is required",
            autocomplete: "new-password",
          }]}
          onSubmit={(data) => {
            mutate({
              userId: user.id,
              password: data.password
            })
          }}
          submitRef={formRef}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={() => {
            formRef.current?.submit()
          }}>
            Change password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const ManageRolesDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: User;
}> = ({ open, onOpenChange, user }) => {

  const formRef = useRef<{ submit: () => void }>(null)

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>Manage roles</DialogHeader>
        <div>
          <p className="text-xs text-muted mb-1">User account</p>
          <p>{user.email}</p>
        </div>
        <Tabs defaultValue="post">
          <TabsList>
            <TabsTrigger value="assign">Assign roles</TabsTrigger>
            <TabsTrigger value="revoke">Revoke roles</TabsTrigger>
          </TabsList>
          <TabsContent value="assign">
            hello
          </TabsContent>
          <TabsContent value="revoke">
            world
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={() => {

          }}>
            Change password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


