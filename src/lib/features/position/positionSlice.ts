import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: "start",
};

const positionSlice = createSlice({
  name: "position",
  initialState,
  reducers: {
    updatePosition:(state)=>{
      
    }
  },
});

export default positionSlice.reducer;
