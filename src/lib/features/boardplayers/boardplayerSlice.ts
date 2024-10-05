import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [] as string[],
};

const boardplayerSlice = createSlice({
  name: "boardplayer",
  initialState,
  reducers: {
    addplayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { addplayers } = boardplayerSlice.actions;
export default boardplayerSlice.reducer;
