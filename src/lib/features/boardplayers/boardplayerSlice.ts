import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: null,
};

const boardplayerSlice = createSlice({
  name: "boardplayer",
  initialState,
  reducers: {
    addplayers: (state, action) => {
      state.players= action.payload;
    },
  },
});

export const { addplayers } = boardplayerSlice.actions;
export default boardplayerSlice.reducer;
