"use client";
import React from "react";
import loginApi from "@/lib/actions/auth/login";
import logoutApi from "@/lib/actions/auth/logout";
import fetchUserApi from "@/lib/actions/profile/fetchUser";
import fetchProfileCompletionStatusApi from "@/lib/actions/profile/fetchProfileCompletionStatus";
import { SessionApiContext, SessionStateContext } from "./types";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types/User.type";
import { queryKey } from "@/lib/constants/queryKey";
import eventEmitter from "@/config/eventEmitter.config";
import { usePathname, useRouter } from "next/navigation";

const SessionApi = React.createContext<SessionApiContext>({
  login: {
    error: null,
    isPending: false,
    reset: () => {},
    status: "idle",
    mutateAsync: async () => undefined,
  },
  logout: () => {},
  fetchUser: () => {},
  fetchProfileCompletionStatus: () => {},
});

const SessionState = React.createContext<SessionStateContext>({
  user: null,
  isUserLoading: true,
  profileCompletionStatus: null,
});

const Provider = ({ children }: React.PropsWithChildren<object>) => {
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<UserType | null>(null);

  const { data: fetchUserData, isFetching: isfetchUserLoading } = useQuery({
    queryKey: [queryKey.user],
    queryFn: fetchUserApi,
    refetchOnWindowFocus: false,
    retry: false,
  });

  React.useEffect(() => {
    console.log("fetchUserData from session state");
    if (fetchUserData?.user) setUser(fetchUserData.user);
  }, [fetchUserData]);

  const { data: profileCompletionStatus } = useQuery({
    enabled: !!user,
    queryFn: fetchProfileCompletionStatusApi,
    queryKey: [queryKey.profileCompletionStatus],
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.invalidateQueries({ queryKey: [queryKey.user] });
        setUser(data.user);
        const first_name = data.user.first_name;
        toast.dismiss();
        toast.success(
          "Welcome back" + `${!!first_name ? `, ${first_name}!` : "!"}`,
          {
            autoClose: 5000,
            closeButton: false,
            closeOnClick: true,
          }
        );
        [queryKey.profile, queryKey.profileCompletionStatus].forEach((key) => {
          queryClient.invalidateQueries({
            queryKey: [key],
          });
        });
      }
    },
  });

  const clearUser = React.useCallback(() => {
    setUser(null);
    const queryKeys = [
      queryKey.user,
      queryKey.profile,
      queryKey.profileCompletionStatus,
    ];
    queryKeys.forEach((key) => {
      queryClient.removeQueries({ queryKey: [`${key}`] });
    });
  }, [queryClient]);

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.dismiss();
      toast.info("Logged out", {
        autoClose: 2000,
        closeButton: false,
        closeOnClick: true,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      clearUser();
    },
  });

  const fetchUser = React.useCallback(() => {
    queryClient.invalidateQueries({ queryKey: [queryKey.user] });
  }, [queryClient]);

  const fetchProfileCompletionStatus = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [queryKey.profileCompletionStatus],
    });
  }, [queryClient]);

  const logout = React.useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  const isUserLoading =
    isfetchUserLoading || loginMutation.isPending || logoutMutation.isPending;

  const api: SessionApiContext = React.useMemo(() => {
    const { mutateAsync, error, isPending, status, reset } = loginMutation;
    return {
      login: { mutateAsync, error, isPending, status, reset },
      logout,
      fetchUser,
      fetchProfileCompletionStatus,
    };
  }, [loginMutation, logout, fetchUser, fetchProfileCompletionStatus]);

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    eventEmitter.on("unauthorized", () => {
      if (user) {
        clearUser();
        toast.error("Session expired.");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    });
    return () => {
      eventEmitter.off("unauthorized");
    };
  }, [user, clearUser, router, pathname]);

  const state: SessionStateContext = {
    user,
    isUserLoading,
    profileCompletionStatus: profileCompletionStatus || null,
  };

  return (
    <SessionState.Provider value={state}>
      <SessionApi.Provider value={api}>{children}</SessionApi.Provider>
    </SessionState.Provider>
  );
};

const useSession = () => {
  const context = React.useContext(SessionState);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

const useSessionApi = () => {
  const context = React.useContext(SessionApi);
  if (context === undefined) {
    throw new Error("useSessionApi must be used within a SessionProvider");
  }
  return context;
};

export { useSession, useSessionApi, Provider as SessionContextProvider };
