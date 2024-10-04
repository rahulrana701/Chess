import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  remoteSocketId: "",
};

const playersocketIdSlice = createSlice({
  name: "remoteSocketId",
  initialState,
  reducers: {
    updateSocketId: (state, action) => {
      state.remoteSocketId = action.payload;
    },
  },
});

export const { updateSocketId } = playersocketIdSlice.actions;
export default playersocketIdSlice.reducer;
