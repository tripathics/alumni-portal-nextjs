import alumniPrefill from "@/lib/actions/alumni/alumniPrefill";
import { queryKey } from "@/lib/constants/queryKey";
import { useSession } from "@/state/session";
import { useQuery } from "@tanstack/react-query";

const useAlumniPrefillData = () => {
  const { user } = useSession()
  const alumniPrefillQuery = useQuery({
    queryFn: alumniPrefill,
    queryKey: [queryKey.alumniPrefill],
    enabled: !!user && !user.role.includes("alumni")
  });

  return alumniPrefillQuery;
};

export default useAlumniPrefillData;
