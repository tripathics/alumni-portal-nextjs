import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";
import { MembershipApplicationAcknowledgementType } from "@/types/Membership.type";
import { AlumniMembershipFormSubmissionType } from "@/types/Alumni.type";

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
    const response = await axios.request({
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
      url: "/api/alumni/membership",
      data: data,
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
