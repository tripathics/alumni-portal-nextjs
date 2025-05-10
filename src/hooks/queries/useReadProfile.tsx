import readProfile from "@/lib/actions/profile/readProfile"
import { queryKey } from "@/lib/constants/queryKey"
import useSessionEnabledQuery from "./useUserEnabledQuery"

const useReadProfile = () => {
  const readProfileQuery = useSessionEnabledQuery({
    queryKey: [queryKey.profile],
    queryFn: async () => {
      const data = await readProfile()
      return data?.user;
    },
  });

  return readProfileQuery;
}

export default useReadProfile;
