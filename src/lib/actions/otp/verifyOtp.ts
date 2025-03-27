import axios from "@/config/axios/client.config";
import { AxiosError } from "axios";

const verifyOtp = async (data: {
  email: string;
  otp: string;
}): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const response = await axios.post("/api/otp/verify", data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw error;
  }
};

export default verifyOtp;
