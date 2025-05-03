import { AxiosError } from "axios";
import axios from "@/config/axios/client.config";

export type FetchedAlumni = {
  id: string,
  name: string,
  linkedin: string | null,
  github: string | null,
  avatar: string | null,
  job_organisation: string | null,
  job_designation: string | null,
  job_location: string | null,
  ed_institute: string | null,
  ed_degree: string | null,
  ed_discipline: string | null,
  nitap_degree: string,
  nitap_discipline: string,
  nitap_graduation_year: string,
}

const fetchAlumni = async (): Promise<FetchedAlumni[] | null> => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "/api/public/alumni",
    });
    return response?.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        throw new Error(error.response.data.message);
      }
    } else {
      console.error(error);
    }
    return null;
  }
};

export default fetchAlumni;
