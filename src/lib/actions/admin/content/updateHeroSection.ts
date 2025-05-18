import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import getUploadUrlApi from "../../media/getUploadUrl";

type UpdateHeroProp = {
  title: string;
  description: string;
  hero_image: File | null;
}

type SubmitData = Omit<UpdateHeroProp, 'hero_image'> & { hero_image?: string }

const updateHeroSection = async (data: UpdateHeroProp): Promise<
  | {
    success: boolean;
    message: string;
  }
  | undefined
> => {
  try {
    const { hero_image, ...restData } = data
    const submitData: SubmitData = restData;
    if (hero_image instanceof File) {
      const { name, type, size } = hero_image
      const urlRes = await getUploadUrlApi("hero", name, type, size);
      const { key, url } = urlRes;
      await axios.put(url, hero_image, {
        headers: { "Content-type": hero_image.type },
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
