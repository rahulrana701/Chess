import { createSlice } from "@reduxjs/toolkit";

type playerData = {
  id: string;
  name: string;
};

const initialState = {
  players: [] as playerData[],
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
