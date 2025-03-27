import axios from "@/config/axios/client.config";

const logout = async (): Promise<{
  message: string;
  success: boolean;
} | null> => {
  try {
    const response = await axios.request({
      method: "POST",
      url: "/api/users/logout",
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export default logout;
