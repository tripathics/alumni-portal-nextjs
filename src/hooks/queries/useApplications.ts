import fetchMembershipApplications from "@/lib/actions/admin/membership-applications/fetchMembershipApplications";
import { queryKey } from "@/lib/constants/queryKey";
import { useSession } from "@/state/session";
import { useQuery } from "@tanstack/react-query";

const useApplications = () => {
  const { user } = useSession();
  const membershipApplicationsQuery = useQuery({
    queryFn: fetchMembershipApplications,
    queryKey: [queryKey.applications],
    enabled: !!user?.role.includes("admin"),
    select: (data) => !data ? [] : data.map((d) => ({
      id: d.id,
      avatar: d.avatar,
      created_at: d.created_at,
      degree: d.degree,
      discipline: d.discipline,
      graduation_date: d.graduation_date,
      name: `${d.title} ${d.first_name} ${d.last_name}`,
      roll_no: d.roll_no,
      status: d.status,
    }))
  });

  return membershipApplicationsQuery;
};

export default useApplications;
