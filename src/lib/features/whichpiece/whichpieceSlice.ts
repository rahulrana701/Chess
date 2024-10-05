import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignedPiece: "",
};

const whichpieceSlice = createSlice({
  name: "whichpiece",
  initialState,
  reducers: {
    updatePiece: (state, action) => {
      state.assignedPiece = `${action.payload.player} is assigend with ${action.payload.color} pieces`;
    },
  },
});

export const { updatePiece } = whichpieceSlice.actions;
export default whichpieceSlice.reducer;
