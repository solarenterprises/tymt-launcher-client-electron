import axios, { AxiosResponse } from "axios";
import { CONFIG_TYMT_BACKEND_URL } from "../../config/MainConfig";
import tymtStorage from "../storage/tymtStorage";
import { IGame } from "../../types/GameTypes";

export const GameAPI = {
  fetchGameList: async (): Promise<IGame[]> => {
    const token = JSON.parse(tymtStorage.get(`auth`));
    const res = await axios.get<{ data: IGame[] }>(`${CONFIG_TYMT_BACKEND_URL}/game/get-games`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    return res.data.data;
  },

  fetchComingGameList: async (page: number): Promise<AxiosResponse<any, any>> => {
    return await axios.get(`${CONFIG_TYMT_BACKEND_URL}/store/by-visibility-state/coming%20soon?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};

export default GameAPI;
