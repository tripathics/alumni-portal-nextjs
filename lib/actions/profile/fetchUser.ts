import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import { UserType } from "@/types/User.type";

const fetchUser = async (): Promise<{
  success: boolean;
  message: string;
  user?: UserType;
} | null> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/users/u",
    });
    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        throw new Error(error.response.data.message);
      }
    } else {
      console.error(error);
    }
    return null;
  }
};

export default fetchUser;
