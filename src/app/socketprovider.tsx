"use client";
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

type SocketcontextType = Socket | null;

const SocketContext = createContext<SocketcontextType>(null);
export const UseSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}
let socket: Socket;

export default function socketprovider({ children }: SocketProviderProps) {
  useEffect(() => {
    socket = io("http://localhost:3000");
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
