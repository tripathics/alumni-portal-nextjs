import axios from "@/config/axios/client.config";
import { PersonalDetailsType } from "@/types/Profile.type";

const readProfile = async (): Promise<
  | {
      user: PersonalDetailsType;
      message: string;
      success?: boolean;
    }
  | undefined
> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/users/profile",
    });
    return response.data || null;
  } catch (error) {
    console.error(error);
  }
};

export default readProfile;
