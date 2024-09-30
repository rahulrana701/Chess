import { configureStore } from "@reduxjs/toolkit";
import positionReducer from "./features/position/positionSlice";
import squareReducer from "./features/square/squareSlice";
import blacksSquareReducer from "./features/blacksquare/blacksquareSlice";
import whoseturnReducer from "./features/whoseturn/whoseturnSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      position: positionReducer,
      selectedsquare: squareReducer,
      blacksSquarePostion: blacksSquareReducer,
      whoseturn: whoseturnReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
