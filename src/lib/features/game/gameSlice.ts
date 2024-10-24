import { createSlice } from "@reduxjs/toolkit";

type data = {
  resultofgame: string;
  gamedate: Date;
  resultId: number;
  ownerId: number;
};

const initialState = {
  gamesdata: [] as data[],
};

const gameSlice = createSlice({
  name: "gameSlice",
  initialState,
  reducers: {
    updategamesdata: (state, action) => {
      const item = action.payload;
      state.gamesdata.push(item);
    },
  },
});

export const { updategamesdata } = gameSlice.actions;
export default gameSlice.reducer;
