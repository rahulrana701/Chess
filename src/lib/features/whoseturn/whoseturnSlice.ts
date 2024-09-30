import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  whichturn: `IT IS WHITE PLAYER'S TURN FIRST`,
};

const whoseturnSlice = createSlice({
  name: "turnslice",
  initialState,
  reducers: {
    updatewhoseturn: (state, action) => {
      state.whichturn = action.payload;
    },
  },
});

export const { updatewhoseturn } = whoseturnSlice.actions;
export default whoseturnSlice.reducer;
