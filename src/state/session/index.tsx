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
      new Promise((_, reject) => reject("Login is not implemented")),
    reset: () => { },
  },
  logout: () =>
    new Promise((_, reject) => reject("logout is not implemented")),
  fetchUser: () =>
    new Promise((_, reject) => reject("fetchUser is not implemented")),
  fetchProfileCompletionStatus: () =>
    new Promise((_, reject) =>
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
    initialParams: true,
    onSuccess: (data) => {
      if (data?.user) setUser(data.user);
      fetchProfileCompletionStatus();
    },
    onError: () => { },
  });

  const loginAction = useAction({
    apiAction: loginApi,
    onSuccess: (data) => {
      if (!data?.user) return;
      setUser(data.user);
      const first_name = data.user.first_name;
      toast.dismiss();
      if (first_name) {
        toast.success(`Welcome back ${first_name}`, {
          autoClose: 5000,
          closeButton: false,
          closeOnClick: true,
        })
      }
      fetchProfileCompletionStatus();
    },
  });

  const clearUser = React.useCallback(() => {
    queryClient.clear();
    setUser(null);
    resetFetchUser();
    resetProfileCompletionStatus();
    loginAction.reset();
  }, [
    setUser,
    resetFetchUser,
    resetProfileCompletionStatus,
    loginAction,
    queryClient,
  ]);

  const logoutAction = useAction({
    apiAction: async () => {
      return await logoutApi();
    },
    onSettled() {
      clearUser();
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
    [loginAction, logoutAction.exec, fetchUser, fetchProfileCompletionStatus]
  );

  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    eventEmitter.on("unauthorized", () => {
      if (user) clearUser();
      toast.error("Session expired.");
      const redirectQuery =
        !(pathname.includes('login') || pathname.includes('register'))
          ? `?redirect=${encodeURIComponent(pathname)}`
          : ''
      router.push(`/login${redirectQuery}`);
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
