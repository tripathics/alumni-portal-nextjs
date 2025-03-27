import alumniMembershipSubmit from "@/lib/actions/alumni/alumniMembershipSubmit";
import { queryKey } from "@/lib/constants/queryKey";
import { useSessionApi } from "@/state/session";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSubmitMembershipForm = () => {
  const { fetchProfileCompletionStatus } = useSessionApi();
  const queryClient = useQueryClient();

  const submitMembershipMutation = useMutation({
    mutationFn: alumniMembershipSubmit,
    onSuccess: () => {
      fetchProfileCompletionStatus({ optimistic: true });
      queryClient.invalidateQueries({
        queryKey: [queryKey.alumniPrefill],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.userApplications],
      });
      toast.success("Your Alumni Membership form has been submitted!");
    },
  });

  return submitMembershipMutation;
};

export default useSubmitMembershipForm;
