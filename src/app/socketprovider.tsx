"use client";

import { addplayers } from "@/lib/features/boardplayers/boardplayerSlice";
import { useAppDispatch } from "@/lib/hooks";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType | null>(null);
export const UseSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

let socket: Socket;

export default function socketprovider({ children }: SocketProviderProps) {
  const socket = io("https://localhost:3000");
  const dispatch = useAppDispatch();

  socket?.on("player-joined", ({ players, id }) => {
    console.log(players);
    dispatch(addplayers(players));
    if (players.length === 1) {
      alert(`${players[0].name} is assigned with white piece`);
    } else if (players.length === 2) {
      alert(`${players[1].name} is assigned with black piece`);
    }
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
