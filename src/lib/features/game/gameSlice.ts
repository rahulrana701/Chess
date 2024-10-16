import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gamesdata: [] as any[],
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
