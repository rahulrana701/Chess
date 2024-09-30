import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedsquare: null,
};

const squareSlice = createSlice({
  name: "selectedsquare",
  initialState,
  reducers: {
    updateSquare: (state, action) => {
      const square = action.payload;
      state.selectedsquare = square;
    },
  },
});

export const { updateSquare } = squareSlice.actions;
export default squareSlice.reducer;
