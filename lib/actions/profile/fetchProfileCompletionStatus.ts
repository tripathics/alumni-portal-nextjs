import axiosInstance from "@/config/axios/client.config";
import { ProfileCompletionStatusType } from "@/types/User.type";
import { AxiosError } from "axios";

const fetchProfileCompletionStatus = async (): Promise<
  ProfileCompletionStatusType | undefined
> => {
  try {
    const response = await axiosInstance.get(
      "/api/users/profile-completion-status"
    );
    return response.data.profileCompletionStatus;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
  }
};

export default fetchProfileCompletionStatus;
