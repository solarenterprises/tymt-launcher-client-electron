import axios, { AxiosResponse } from "axios";
import { CONFIG_TYMT_BACKEND_URL } from "../../config/MainConfig";

class GameAPI {
  static async fetchGameList(page: number): Promise<AxiosResponse<any, any>> {
    return await axios.get(`${CONFIG_TYMT_BACKEND_URL}/store?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  static async fetchComingGameList(page: number): Promise<AxiosResponse<any, any>> {
    return await axios.get(`${CONFIG_TYMT_BACKEND_URL}/store/by-visibility-state/coming%20soon?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export default GameAPI;
