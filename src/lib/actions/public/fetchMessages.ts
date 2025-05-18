import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";

export type MessageType = {
  message_from: "director" | "president";
  full_name: string;
  email: string;
  phone: string;
  message: string;
  designation?: string;
  department?: string;
  avatar: string;
}

const fetchMessages = async (messageFrom?: "director" | "president"): Promise<{
  success: boolean;
  messages: MessageType[];
} | null> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/nitapalumnicontent/messages",
      params: { message_from: messageFrom }
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

export default fetchMessages;
