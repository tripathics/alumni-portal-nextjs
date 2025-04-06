import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";

const fetchHero = async (): Promise<{
  title: string;
  description: string;
  hero_image: string;
} | null> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/nitapalumnicontent/hero",
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

export default fetchHero;
