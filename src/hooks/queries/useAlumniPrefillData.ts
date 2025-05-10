import alumniPrefill from "@/lib/actions/alumni/alumniPrefill";
import { queryKey } from "@/lib/constants/queryKey";
import useSessionEnabledQuery from "./useUserEnabledQuery";

const useAlumniPrefillData = () => {
  const alumniPrefillQuery = useSessionEnabledQuery({
    queryFn: alumniPrefill,
    queryKey: [queryKey.alumniPrefill],
  });

  return alumniPrefillQuery;
};

export default useAlumniPrefillData;
