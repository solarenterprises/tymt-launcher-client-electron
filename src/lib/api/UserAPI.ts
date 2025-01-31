import axios from "axios";

import { CONFIG_TYMT_BACKEND_URL } from "../../config/MainConfig";
import tymtStorage from "../storage/tymtStorage";
import { IUpdateProfile, IUser } from "../../types/APITypes/UserAPITypes";

export const UserAPI = {
  updateProfile: async (profile: IUpdateProfile): Promise<IUser> => {
    const token = JSON.parse(tymtStorage.get(`auth`));
    const res = await axios.post<{ data: IUser }>(`${CONFIG_TYMT_BACKEND_URL}/user/update-profile`, profile, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data.data;
  },
};
