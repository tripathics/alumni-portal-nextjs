"use client";
import React from "react";
import loginApi from "@/lib/actions/auth/login";
import logoutApi from "@/lib/actions/auth/logout";
import fetchUserApi from "@/lib/actions/profile/fetchUser";
import fetchProfileCompletionStatusApi from "@/lib/actions/profile/fetchProfileCompletionStatus";
import { SessionApiContext, SessionStateContext } from "./types";
import { toast } from "react-toastify";
import { UserType } from "@/types/User.type";
import eventEmitter from "@/config/eventEmitter.config";
import { usePathname, useRouter } from "next/navigation";
import useAction from "@/hooks/useAction";
import { useQueryClient } from "@tanstack/react-query";

const SessionApi = React.createContext<SessionApiContext>({
  login: {
    data: null,
    loading: false,
    error: null,
    exec: () =>
      new Promise((resolve, reject) => reject("Login is not implemented")),
    reset: () => {},
  },
  logout: () =>
    new Promise((resolve, reject) => reject("logout is not implemented")),
  fetchUser: () =>
    new Promise((resolve, reject) => reject("fetchUser is not implemented")),
  fetchProfileCompletionStatus: () =>
    new Promise((resolve, reject) =>
      reject("fetchProfileCompletionStatus is not implemented")
    ),
});

const SessionState = React.createContext<SessionStateContext>({
  user: null,
  isUserLoading: true,
  profileCompletionStatus: null,
});

const SessionProvider = ({ children }: React.PropsWithChildren<object>) => {
  const queryClient = useQueryClient();
  const [user, setUser] = React.useState<UserType | null>(null);

  const {
    data: profileCompletionStatus,
    exec: fetchProfileCompletionStatus,
    reset: resetProfileCompletionStatus,
  } = useAction({
    apiAction: fetchProfileCompletionStatusApi,
  });

  const {
    exec: fetchUser,
    loading: isfetchUserLoading,
    reset: resetFetchUser,
  } = useAction({
    apiAction: fetchUserApi,
    execOnMount: true,
    onSuccess: (data) => {
      if (data?.user) {
        console.log("fetched user");
        setUser(data.user);
      }
      fetchProfileCompletionStatus();
    },
  });

  const loginAction = useAction({
    apiAction: loginApi,
    onSuccess: (data) => {
      if (data?.user) {
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
        fetchProfileCompletionStatus();
      }
    },
  });

  const clearUser = React.useCallback(() => {
    setUser(null);
    resetFetchUser();
    resetProfileCompletionStatus();
    loginAction.reset();
  }, [setUser, resetFetchUser, resetProfileCompletionStatus, loginAction]);

  const logoutAction = useAction({
    apiAction: async () => {
      queryClient.removeQueries({
        queryKey: [user?.id],
        exact: false,
      });
      return await logoutApi();
    },
    onSuccess() {
      toast.dismiss();
      toast.info("Logged out", {
        autoClose: 2000,
        closeButton: false,
        closeOnClick: true,
      });
    },
    onError(error) {
      toast.error(error.message);
    },
    onSettled() {
      clearUser();
    },
  });

  const isUserLoading =
    isfetchUserLoading || loginAction.loading || logoutAction.loading;

  const api: SessionApiContext = React.useMemo(
    () => ({
      login: loginAction,
      logout: logoutAction.exec,
      fetchUser,
      fetchProfileCompletionStatus,
    }),
    [loginAction, logoutAction.exec, fetchProfileCompletionStatus, fetchUser]
  );

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
  }, [user, router, pathname, clearUser]);

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

export { useSession, useSessionApi, SessionProvider as SessionContextProvider };
