import { useSession } from "@/state/session";
import { Square, SquareCheckBig } from "lucide-react";

const ListItem: React.FC<{
  label: string;
  completed: boolean;
}> = ({ completed, label }) => (
  <li className="flex gap-2 items-center mb-2">
    {completed ? <SquareCheckBig /> : <Square />}
    <span>{label}</span>
  </li>
)

export const Acknowledgement: React.FC<{
  ref?: React.Ref<{ submit: () => void }>;
}> = ({ ref }) => {
  const { profileCompletionStatus } = useSession()

  return (
    <div>
      <ul>
        <ListItem completed={!!profileCompletionStatus?.avatar} label="Avatar" />
        <ListItem completed={!!profileCompletionStatus?.personal_profile} label="Profile" />
        <ListItem completed={!!profileCompletionStatus?.education} label="Education at NITAP" />
        <ListItem completed={!!profileCompletionStatus?.membership_application} label="Alumni membership application" />
      </ul>
    </div>
  )
}
