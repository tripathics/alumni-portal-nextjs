import axios from "@/config/axios/client.config";
import { AxiosError } from "axios";

type MediaCategoryType = "avatar" | "sign" | "post";

const getUploadUrlApi = async (
  type: MediaCategoryType,
  filename: string,
  filetype: string,
  filesize: number
): Promise<{
  key: string;
  url: string;
}> => {
  try {
    const response = await axios.get(`/api/get-upload-url/${type}`, {
      params: {
        filename,
        filetype,
        filesize,
      },
    });
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new AxiosError(err.response?.data.message);
    }
    throw err;
  }
};

export default getUploadUrlApi;
