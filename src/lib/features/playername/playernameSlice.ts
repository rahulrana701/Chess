import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const playernameSlice = createSlice({
  name: "playername",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});
export const { changeName } = playernameSlice.actions;
export default playernameSlice.reducer;
