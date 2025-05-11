import { Button } from "@/components/ui/button";
import { DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { UserRole, UserType } from "@/types/User.type";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useImperativeHandle, useRef, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Check, Info, Plus, Undo, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const roleMap: Record<UserRole, {
  id: UserRole;
  label: string;
  description: string;
}> = {
  user: {
    id: "user",
    label: "User",
    description: "A newly registered member who can complete their profile, provide education details, and submit an alumni membership form for admin approval.",
  },
  admin: {
    id: "admin",
    label: "Admin",
    description: "An administrator with full access to manage users, review and approve alumni membership forms, oversee content, events, and platform settings.",
  },
  alumni: {
    id: "alumni",
    label: "Alumni",
    description: "A verified graduate whose membership form has been approved, granting access to exclusive alumni features like events, mentorship, and directories.",
  },
  coordinator: {
    id: "coordinator",
    label: "Coordinator",
    description: "An organizer responsible for managing specific alumni events or programs, with tools for scheduling, communication, and reporting.",
  },
};

const ManageRolesDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void
  user: UserType;
}> = ({ open, onOpenChange, user }) => {
  const formRef = useRef<{ submit: () => UserRole[] }>(null)
  const [mode, setMode] = useState<string>("assign");

  // TODO: Integrate assign/revoke role API

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage roles</DialogTitle>
          <DialogDescription>Assign or revoke roles to the user</DialogDescription>
        </DialogHeader>
        <div>
          <p className="text-xs text-muted mb-1">User account</p>
          <p>{user.email}</p>
        </div>
        <Tabs value={mode} onValueChange={setMode}>
          <TabsList>
            <TabsTrigger value="assign">Assign roles</TabsTrigger>
            <TabsTrigger value="revoke">Revoke roles</TabsTrigger>
          </TabsList>
          <TabsContent value="assign">
            <AssignRoleForm roles={user.role} ref={formRef} />
          </TabsContent>
          <TabsContent value="revoke">
            <RevokeRoleForm roles={user.role} ref={formRef} />
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={() => {
            const data = formRef.current?.submit();
            console.log(data);
          }}>
            {mode === "assign" ? "Assign role" : "Revoke role"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const AssignRoleForm: React.FC<{
  roles: UserRole[];
  ref: React.Ref<{ submit: () => UserRole[] }>;
}> = ({ roles, ref }) => {
  const [rolesToAssign, setRolesToAssign] = useState(() => {
    const availableRoles = Object.keys(roleMap)
      .filter(r => !roles.includes(r as UserRole)) as UserRole[]

    return availableRoles.reduce((prev, curr) => {
      prev[curr] = false
      return prev
    }, {} as Record<UserRole, boolean>)
  });

  useImperativeHandle(ref, () => ({
    submit: () => Object.keys(rolesToAssign)
      .filter(role => rolesToAssign[role as UserRole]) as UserRole[]
  }))

  const toggleMarkForRevoke = (id: UserRole) => {
    setRolesToAssign(prev => ({
      ...prev, [id]: !prev[id]
    }))
  }

  return (
    <ul>
      {Object.keys(rolesToAssign).map(r => {
        const id = r as UserRole;
        const assign = rolesToAssign[id]
        const { label, description } = roleMap[id]
        return (
          <li className="flex flex-row justify-between items-center" key={r}>
            <div>
              {assign ? <span>{label}</span> : <span className="text-muted">{label}</span>}
              <Popover>
                <PopoverTrigger>
                  <Info size="1rem" className="mx-1 text-muted" />
                </PopoverTrigger>
                <PopoverContent className="text-sm max-w-sm">
                  {description}
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={() => toggleMarkForRevoke(id)}
              aria-label={assign ? "Mark for revocation" : "Undo revoke"}
              variant="ghost" size="icon"
            >
              {assign ? <Undo /> : <Plus />}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

const RevokeRoleForm: React.FC<{
  roles: UserRole[];
  ref: React.Ref<{ submit: () => UserRole[] }>;
}> = ({ roles, ref }) => {
  const [rolesToRevoke, setRolesToRevoke] = useState(
    roles.reduce((prev, curr) => {
      prev[curr] = false
      return prev
    }, {} as Record<UserRole, boolean>)
  );

  useImperativeHandle(ref, () => ({
    submit: () => Object.keys(rolesToRevoke)
      .filter(role => rolesToRevoke[role as UserRole]) as UserRole[]
  }))

  const toggleMarkForRevoke = (id: UserRole) => {
    setRolesToRevoke(prev => ({
      ...prev, [id]: !prev[id]
    }))
  }

  return (
    <ul>
      {roles.map(r => {
        const id = r as UserRole;
        const revoke = rolesToRevoke[id]
        const { label, description } = roleMap[id]
        return (
          <li className="flex flex-row justify-between items-center" key={r}>
            <div>
              {revoke ? <s className="text-warning">{label}</s> : <span>{label}</span>}
              <Popover>
                <PopoverTrigger>
                  <Info size="1rem" className="mx-1 text-muted" />
                </PopoverTrigger>
                <PopoverContent className="text-sm max-w-sm">
                  {description}
                </PopoverContent>
              </Popover>
            </div>
            <Button
              onClick={() => toggleMarkForRevoke(id)}
              aria-label={revoke ? "Mark for revocation" : "Undo revoke"}
              variant="ghost" size="icon"
            >
              {revoke ? <Undo /> : <X />}
            </Button>
          </li>
        )
      })}
    </ul>
  )
}

export default ManageRolesDialog;
