import { configureStore } from "@reduxjs/toolkit";
import positionReducer from "./features/position/positionSlice";
import squareReducer from "./features/square/squareSlice";
import blacksSquareReducer from "./features/blacksquare/blacksquareSlice";
import whoseturnReducer from "./features/whoseturn/whoseturnSlice";
import playernameReducer from "./features/playername/playernameSlice";
import roomIdReducer from "./features/roomnumber/roomnumberSlice";
import boardplayerReducer from "./features/boardplayers/boardplayerSlice";
import playerSocketReducer from "./features/playersocketId/playersocketIdSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      position: positionReducer,
      selectedsquare: squareReducer,
      blacksSquarePostion: blacksSquareReducer,
      whoseturn: whoseturnReducer,
      playername: playernameReducer,
      roomID: roomIdReducer,
      boardPlayers: boardplayerReducer,
      SocketID: playerSocketReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
