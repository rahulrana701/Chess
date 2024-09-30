import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "start",
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    updatePosition: (state, action) => {
      state.start = action.payload;
    },
  },
});

export const { updatePosition } = positionSlice.actions;
export default positionSlice.reducer;
