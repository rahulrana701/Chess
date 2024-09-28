import { configureStore } from "@reduxjs/toolkit";
import positionReducer from "./features/position/positionSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      position: positionReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
