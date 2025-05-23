import axios from "@/config/axios/client.config";
import { UserRole } from "@/types/User.type";
import { AxiosError } from "axios";

export type ManageRolePayload = {
  userId: string,
  roles: UserRole[]
}
export type ManageRoleResponse = {
  message: string;
  updatedUser: boolean;
} | undefined;

export const assignRoles = async (data: ManageRolePayload):
  Promise<ManageRoleResponse> => {
  try {
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/users/assign-roles",
      data
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

export const revokeRoles = async (data: ManageRolePayload):
  Promise<ManageRoleResponse> => {
  try {
    const response = await axios.request({
      method: "PATCH",
      url: "/api/admin/users/revoke-roles",
      data
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    console.error(error);
  }
};

