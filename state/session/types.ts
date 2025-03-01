import { ProfileCompletionStatusType, UserType } from "@/types/User.type";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

export type SessionApiContext = {
  login: {
    error: Error | null;
    isPending: boolean;
    reset: () => void;
    status: string;
    mutateAsync: UseMutateAsyncFunction<
      | {
          success: boolean;
          message: string;
          user?: UserType;
        }
      | undefined,
      Error,
      {
        email: string;
        password: string;
      },
      unknown
    >;
  };
  logout: () => void;
  fetchUser: () => void;
  fetchProfileCompletionStatus: () => void;
};

export type SessionStateContext = {
  user: UserType | null;
  isUserLoading: boolean;
  profileCompletionStatus: ProfileCompletionStatusType | null;
};
