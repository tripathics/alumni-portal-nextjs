import axios from "axios";
import { cookies } from "next/headers";

const createServerAxiosInstance = async () => {
  const cookieStore = await cookies();
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie: `auth=${cookieStore.get("auth")?.value}`,
    },
    withCredentials: true,
  });
};

export default createServerAxiosInstance;
