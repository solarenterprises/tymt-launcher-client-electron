import { isArray } from "lodash";

import { SocketEventNames } from "../../const/SocketEventNames";
import { CONST_PRIVATE_STORE_IDS } from "../../const/PrivateStoreIds";

import GameAPI from "./GameAPI";

import { IGame } from "../../types/GameTypes";
import { IParamfetchAllGameList, IStoreSecret } from "../../types/APITypes/GameListAPITypes";
import { decryptGameURL } from "../helper/GameHelper";

export const fetchGameList = async (page: number) => {
  try {
    const res = await GameAPI.fetchGameList(page);
    if (!res?.data?.result?.data || !isArray(res?.data?.result?.data)) {
      // console.error("Failed to fetchGameList: response error!", res);
      // const noti: INotificationParams = {
      //   status: "failed",
      //   title: "Error",
      //   message: "Server response error!",
      //   link: null,
      //   translate: true,
      // };
      // emit(TauriEventNames.NOTIFICATION, noti);
      return null;
    }
    return { games: res.data.result.data };
  } catch (err) {
    // console.error("Failed to fetchGameList: ", err);
    // const noti: INotificationParams = {
    //   status: "failed",
    //   title: "Error",
    //   message: err.toString(),
    //   link: null,
    //   translate: true,
    // };
    // emit(TauriEventNames.NOTIFICATION, noti);
    return null;
  }
};

export const fetchAllGameList = async ({ socket, userId }: IParamfetchAllGameList) => {
  try {
    // console.log("fetchAllGameList");
    const res1 = await GameAPI.fetchGameList(1);
    const totalPage: number = res1?.data?.result?.meta?.pagination?.pageCount;

    const items = Array.from({ length: totalPage });
    const promiseList = items.map((_item, index) => GameAPI.fetchGameList(index + 1));
    const dataList = await Promise.all(promiseList);

    const res: IGame[] = [];
    for (const data of dataList) {
      res.push(...(data?.data?.result?.data || []));
    }

    const TIMEOUT = 5000; // 5 seconds timeout
    const responsesData: (IStoreSecret | null)[] = await Promise.all(
      CONST_PRIVATE_STORE_IDS.map((privateStoreId): Promise<IStoreSecret | null> => {
        return new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            // console.log("Failed to fetch storeSecret: ", privateStoreId, userId);
            resolve(null); // Resolve with null instead of rejecting
          }, TIMEOUT);

          // console.log("socket.current.emit > request-store-secretkey", privateStoreId, userId);
          socket.current.emit(SocketEventNames.REQUEST_STORE_SECRET_KEY, { privateStoreId, userId }, (response: any) => {
            clearTimeout(timeoutId); // Clear the timeout on successful response
            // console.log("response", response); // Log the response status

            if (response.error) {
              resolve(null); // Resolve with null if there's an error in the response
            } else {
              const data: IStoreSecret = {
                storeId: privateStoreId,
                secret: response.data,
              };
              resolve(data); // Resolve the promise with response.data
            }
          });
        });
      })
    );

    // Filter out null values if needed
    const validResponsesData = responsesData.filter((data): data is IStoreSecret => data !== null);

    const res2 = await Promise.all(
      res.map(async (game) => {
        if (CONST_PRIVATE_STORE_IDS?.some((privateStoreId) => privateStoreId === game?.externalStoreId)) {
          const storeSecret = validResponsesData.find((one) => one?.storeId === game?.externalStoreId);
          if (!storeSecret) return game; // Return the original game if no secret is found
          const decryptedGame = await decryptGameURL(game, storeSecret?.secret);
          return decryptedGame; // Return the decrypted game
        }
        return game; // Return the original game if the condition is not met
      })
    );

    return { games: res2 };
  } catch (err) {
    // console.log("Failed to fetchAllGameList: ", err);
    return null;
  }
};
