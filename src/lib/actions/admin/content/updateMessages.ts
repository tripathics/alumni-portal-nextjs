import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import getUploadUrlApi from "../../media/getUploadUrl";

export type UpdateMessagesProp = {
  message_from: "director" | "president";
  full_name: string;
  email: string;
  phone: string;
  message: string;
  designation?: string;
  department?: string;
  avatar: File | null;
}

type SubmitData = Omit<UpdateMessagesProp, 'avatar'> & { avatar?: string }

const updateMessages = async (data: UpdateMessagesProp): Promise<
  | {
    success: boolean;
    message: string;
  }
  | undefined
> => {
  try {
    const { avatar, ...restData } = data;
    const submitData: SubmitData = restData
    if (avatar instanceof File) {
      const { name, type, size } = avatar;
      const urlRes = await getUploadUrlApi("director", name, type, size);
      const { key, url } = urlRes;
      await axios.put(url, avatar, {
        headers: { "Content-type": avatar.type },
      });
      submitData.avatar = key;
    }
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/content/messages",
      data: submitData,
    });
    return response.data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export default updateMessages;
