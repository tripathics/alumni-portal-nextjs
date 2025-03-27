import { UserType } from "@/types/User.type";
import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";

const login = async (loginFormData: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
  user?: UserType;
} | null> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "/api/users/login",
      data: loginFormData,
    });
    return response?.data || null;
  } catch (error) {
    if ((error as AxiosError<{ message: string }>)?.response?.data.message) {
      const errorMessage = (error as AxiosError<{ message: string }>).response
        ?.data.message;
      throw Error(errorMessage);
    } else {
      throw Error("An error occurred while logging in");
    }
  }
};

export default login;
