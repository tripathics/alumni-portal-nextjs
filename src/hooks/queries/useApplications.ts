import fetchMembershipApplications from "@/lib/actions/admin/fetchMembershipApplications";
import { queryKey } from "@/lib/constants/queryKey";
import { useSession } from "@/state/session";
import { useQuery } from "@tanstack/react-query";

const useApplications = () => {
  const { user } = useSession();
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryFn: fetchMembershipApplications,
    queryKey: [queryKey.applications],
    enabled: user?.role.includes("admin"),
  });

  return { data, error, isLoading };
};

export default useApplications;
