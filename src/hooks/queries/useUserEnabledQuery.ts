import { useSession } from "@/state/session"
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query"

type SessionEnabledQueryProps<
  TQueryFnData = unknown,
  TError extends Error = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "enabled">;

const useSessionEnabledQuery = <
  TQueryFnData = unknown,
  TError extends Error = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>({
  ...queryOptions
}: SessionEnabledQueryProps<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<TData, TError> => {
  const { user } = useSession();
  const query = useQuery<TQueryFnData, TError, TData, TQueryKey>({
    enabled: !!user,
    ...queryOptions,
  });

  return query;
};

export default useSessionEnabledQuery;
