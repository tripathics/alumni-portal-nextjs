import { ProfileCompletionStatusType, UserType } from "@/types/User.type";

export type SessionApiContext = {
  login: {
    data: {
      success: boolean;
      message: string;
      user?: UserType;
    } | null;
    loading: boolean;
    error: Error | null;
    exec: (
      params: {
        email: string;
        password: string;
      },
      optimistic?: boolean
    ) => Promise<{ success: boolean; message: string; user?: UserType } | null>;
    reset: () => void;
  };
  logout: (
    params?: void,
    optimistic?: boolean
  ) => Promise<{
    message: string;
    success: boolean;
  } | null>;
  fetchUser: (
    params?: true | undefined,
    optimistic?: boolean
  ) => Promise<{
    success: boolean;
    message: string;
    user?: UserType;
  } | null>;
  fetchProfileCompletionStatus: (
    params: void,
    optimistic?: boolean
  ) => Promise<ProfileCompletionStatusType | null>;
};

export type SessionStateContext = {
  user: UserType | null;
  isUserLoading: boolean;
  profileCompletionStatus: ProfileCompletionStatusType | null;
};
