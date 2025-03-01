import axios from "@/config/axios/client.config";
import { AxiosError } from "axios";

const updateAvatarNew = async (
  avatar: string
): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axios.patch("/api/users/update-avatar", { avatar });
    return response.data || null;
  } catch (error) {
    // Handle the error here
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default updateAvatarNew;
