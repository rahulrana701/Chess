import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBlacksSquare: null,
};

const blacksquareSlice = createSlice({
  name: "SelectedSquareForBlack",
  initialState,
  reducers: {
    updateblacksSquare: (state, action) => {
      const square = action.payload;
      state.selectedBlacksSquare = square;
    },
  },
});

export const { updateblacksSquare } = blacksquareSlice.actions;
export default blacksquareSlice.reducer;
