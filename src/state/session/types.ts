import { UseActionExec, UseActionResult } from "@/hooks/useAction";
import { ProfileCompletionStatusType, UserType } from "@/types/User.type";

export type SessionApiContext = {
  login: UseActionResult<
    { success: boolean; message: string; user?: UserType } | null,
    {
      email: string;
      password: string;
    }
  >;
  logout: UseActionExec<{
    message: string;
    success: boolean;
  } | null>;
  fetchUser: UseActionExec<
    {
      success: boolean;
      message: string;
      user?: UserType;
    } | null,
    true
  >;
  fetchProfileCompletionStatus: UseActionExec<ProfileCompletionStatusType | null>;
};

export type SessionStateContext = {
  user: UserType | null;
  isUserLoading: boolean;
  profileCompletionStatus: ProfileCompletionStatusType | null;
};
