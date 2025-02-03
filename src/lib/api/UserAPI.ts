import axiosAuth from "../core/AxiosAuth";
import { IUpdateProfile, IUser } from "../../types/APITypes/UserAPITypes";

export const UserAPI = {
  updateProfile: async (profile: IUpdateProfile): Promise<IUser> => {
    const res = await axiosAuth.post<{ data: IUser }>(`/user/update-profile`, profile);
    return res.data.data;
  },
};
