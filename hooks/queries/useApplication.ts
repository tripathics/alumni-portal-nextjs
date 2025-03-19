import {
  fetchApplicationById,
  fetchApplicationByIdAdmin,
} from "@/lib/actions/admin/fetchApplicationById";
import { queryKey } from "@/lib/constants/queryKey";
import { MembershipApplicationType } from "@/types/Membership.type";
import { useQuery } from "@tanstack/react-query";

const fetchApplication = (
  action: (id: string) => Promise<MembershipApplicationType | undefined>,
  id: string | null
) => (id ? action(id) : null);

export const useApplicationAdmin = (id: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => fetchApplication(fetchApplicationByIdAdmin, id),
    queryKey: [queryKey.application, id],
    enabled: !!id,
  });

  return { data, error, isLoading };
};

export const useApplication = (id: string | null) => {
  const { data, error, isLoading } = useQuery({
    queryFn: () => fetchApplication(fetchApplicationById, id),
    queryKey: [queryKey.application, id],
    enabled: !!id,
  });

  return { data, error, isLoading };
};
