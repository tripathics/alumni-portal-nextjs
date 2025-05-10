import axios from "@/config/axios/client.config";
import { AxiosError } from "axios";

const deleteAccount = async (userId: string): Promise<{
  message: string;
  success: boolean;
} | undefined
> => {
  try {
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/users/delete-account",
      data: { userId }
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default deleteAccount;
