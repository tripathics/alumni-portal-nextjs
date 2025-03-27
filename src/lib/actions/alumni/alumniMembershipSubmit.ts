import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import { MembershipApplicationAcknowledgementType } from "@/types/Membership.type";
import { AlumniMembershipFormSubmissionType } from "@/types/Alumni.type";
import getUploadUrlApi from "../media/getUploadUrl";

const alumniMembershipSubmit = async (
  data: AlumniMembershipFormSubmissionType
): Promise<
  | {
      message: string;
      success: boolean;
      application: MembershipApplicationAcknowledgementType;
    }
  | undefined
> => {
  try {
    const signFile = data.sign;
    const urlRes = await getUploadUrlApi(
      "sign",
      signFile.name,
      signFile.type,
      signFile.size
    );
    const { key, url } = urlRes;
    await axios.put(url, signFile, {
      headers: {
        "Content-Type": signFile.type,
      },
    });
    const response = await axios.request({
      method: "POST",
      url: "/api/alumni/membership",
      data: {
        membership_level: data.membership_level,
        sign: key,
      },
    });
    return response.data;
  } catch (error) {
    if ((error as AxiosError).response?.status === 401) {
      const err = error as AxiosError<{ message: string }>;
      throw new Error(err.response?.data.message || err.message);
    } else {
      console.error(error);
    }
  }
};

export default alumniMembershipSubmit;
