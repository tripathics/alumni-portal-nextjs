import axios from "@/config/axios/client.config";
import { AxiosError } from "axios";

const changePassword = async (data: {
  userId: string,
  password: string,
  confirmPassword: string,
}): Promise<{
  message: string;
  success: boolean;
} | undefined
> => {
  try {
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/users/change-password",
      data
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default changePassword;
