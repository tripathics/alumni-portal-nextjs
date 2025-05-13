import SchemaForm from "@/components/forms";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import changePassword from "@/lib/actions/admin/users/changePassword";
import { UserType } from "@/types/User.type";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";

const ChangePasswordDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: UserType;
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
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
        </DialogHeader>
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

export default ChangePasswordDialog;
