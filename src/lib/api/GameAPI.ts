import axiosAuth from "../core/AxiosAuth";
import { IGame } from "../../types/GameTypes";

export const GameAPI = {
  fetchGameList: async (): Promise<IGame[]> => {
    const res = await axiosAuth.get<{ data: IGame[] }>(`/game/list`);

    return res.data.data;
  },

  fetchComingGameList: async (page: number): Promise<any> => {
    const res = await axiosAuth.get<{ data: any }>(`/store/by-visibility-state/coming%20soon?page=${page}`);

    return res.data.data;
  },
};

export default GameAPI;
