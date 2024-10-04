import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
};

const roomIdSlice = createSlice({
  name: "roomId",
  initialState,
  reducers: {
    changeroomId: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { changeroomId } = roomIdSlice.actions;
export default roomIdSlice.reducer;
