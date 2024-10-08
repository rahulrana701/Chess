"use client";

import { addplayers } from "@/lib/features/boardplayers/boardplayerSlice";
import React, { createContext, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "@/lib/hooks";

type SocketcontextType = Socket | null;

const SocketContext = createContext<SocketcontextType>(null);
export const UseSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}
let socket: Socket;

export default function socketprovider({ children }: SocketProviderProps) {
  const socket = io("http://localhost:3000");
  const dispatch = useAppDispatch();

  socket?.on("player-joined", ({ players }) => {
    console.log(players);
    dispatch(addplayers(players));
    if (players.length === 1) {
      alert(`${players[0]} is assigned with white piece`);
    } else if (players.length === 2) {
      alert(`${players[1]} is assigned with black piece`);
    }
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
