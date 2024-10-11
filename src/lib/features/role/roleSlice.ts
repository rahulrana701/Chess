import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    updaterole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { updaterole } = roleSlice.actions;
export default roleSlice.reducer;
