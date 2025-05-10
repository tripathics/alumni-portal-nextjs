import { PersonalDetailsType } from "@/types/Profile.type";
import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import getUploadUrlApi from "../media/getUploadUrl";

const updateProfile = async ({
  data,
  avatarFile,
}: {
  data: PersonalDetailsType;
  avatarFile?: File;
}): Promise<
  | {
    success: boolean;
    message: string;
  }
  | undefined
> => {
  try {
    if (avatarFile instanceof File) {
      const urlRes = await getUploadUrlApi(
        "avatar",
        avatarFile.name,
        avatarFile.type,
        avatarFile.size
      );
      const { key, url } = urlRes;
      await axios.put(url, avatarFile, {
        headers: {
          "Content-type": avatarFile.type,
        },
      });
      data.avatar = key;
    }
    const response = await axios.request({
      method: "POST",
      url: "/api/users/update-profile",
      data,
    });
    return response.data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export default updateProfile;
