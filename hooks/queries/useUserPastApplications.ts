import fetchUserMembershipApplications from "@/lib/actions/alumni/fetchUserMembershipApplications";
import { queryKey } from "@/lib/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useUserPastApplications = () => {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryFn: fetchUserMembershipApplications,
    queryKey: [queryKey.userApplications],
  });

  return { data, error, isLoading };
};

export default useUserPastApplications;
