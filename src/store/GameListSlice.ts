import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IGame, IGameList } from "../types/GameTypes";
import tymtStorage from "../lib/storage/tymtStorage";
import { GameAPI } from "../lib/api/GameAPI";

const init: IGameList = {
  games: [],
};

const loadGameList = () => {
  const data = tymtStorage.get(`gameList`);
  if (!data) {
    tymtStorage.set(`gameList`, JSON.stringify(init));
    return init;
  }
  return JSON.parse(data);
};

const initialState = {
  data: loadGameList(),
  status: "gameList",
  msg: "",
};

export const fetchGameList = createAsyncThunk("gameList/fetchGameList", GameAPI.fetchGameList);

export const gameListSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    setGameList(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameList.fulfilled, (state, action: PayloadAction<IGame[]>) => {
        state.data.games = action.payload;
        tymtStorage.set(`gameList`, JSON.stringify(state.data));
        state.status = "gameList";
      })
      .addCase(fetchGameList.rejected, (state) => {
        state.status = "error";
        state.msg = "Failed to fetch game list";
      });
  },
});

export const getGameList = (state: any) => state.gameList.data;
export const { setGameList } = gameListSlice.actions;

export default gameListSlice.reducer;
