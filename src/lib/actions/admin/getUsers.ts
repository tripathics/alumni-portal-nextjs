import axios from "@/config/axios/client.config";
import { UserType } from "@/types/User.type";
import { AxiosError } from "axios";

const getUsers = async (): Promise<
  | { users: UserType[]; }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/admin/users",
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export default getUsers;
