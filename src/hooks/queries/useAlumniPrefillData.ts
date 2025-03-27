import alumniPrefill from "@/lib/actions/alumni/alumniPrefill";
import { queryKey } from "@/lib/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

const useAlumniPrefillData = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: alumniPrefill,
    queryKey: [queryKey.alumniPrefill],
  });

  return { data, error, isLoading };
};

export default useAlumniPrefillData;
