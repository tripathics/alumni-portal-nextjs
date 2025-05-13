import Alert from "@/components/custom-ui/Alert";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import deleteAccount from "@/lib/actions/admin/users/deleteAccount";
import { queryKey } from "@/lib/constants/queryKey";
import { UserType } from "@/types/User.type";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const DeleteAccountDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: UserType;
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

export default DeleteAccountDialog;
