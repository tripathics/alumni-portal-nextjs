import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import getUploadUrlApi from "../../media/getUploadUrl";

const updateHeroSection = async ({
  title,
  description,
  hero_image = null,
}: {
  title: string;
  description: string;
  hero_image: File | null;
}): Promise<
  | {
      success: boolean;
      message: string;
    }
  | undefined
> => {
  try {
    const submitData: {
      title: string;
      description: string;
      hero_image?: string;
    } = { title, description };
    if (hero_image instanceof File) {
      const urlRes = await getUploadUrlApi(
        "hero",
        hero_image.name,
        hero_image.type,
        hero_image.size
      );
      const { key, url } = urlRes;
      await axios.put(url, hero_image, {
        headers: {
          "Content-type": hero_image.type,
        },
      });
      submitData.hero_image = key;
    }
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/content/hero",
      data: submitData,
    });
    return response.data || null;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
  }
};

export default updateHeroSection;
