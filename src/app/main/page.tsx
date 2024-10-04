"use client";

import React from "react";
import "../../../styles/main.css";
import { signIn, signOut } from "next-auth/react";
import { UseSocket } from "../socketprovider";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { changeName } from "@/lib/features/playername/playernameSlice";
import { changeroomId } from "@/lib/features/roomnumber/roomnumberSlice";
import { useRouter } from "next/navigation";
export default function page() {
  const socket = UseSocket();
  const { name } = useAppSelector((state) => state.playername);
  const { roomId } = useAppSelector((state) => state.roomID);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleChessRoom = async (e: any) => {
    e.preventDefault();
    if (roomId == "" || name == "") {
      alert("please enter the fields first before playing the game");
      return;
    }
    socket?.emit("user-joined", { name, roomId });
    socket?.on("cannot-join", (msg) => {
      alert(msg);
      router.push(`/main`);
    });
    router.push(`/board/${roomId}`);
  };
  return (
    <>
      <div className="navbar">
        <div className="nav-logo">CHESS</div>
        <div className="navbar-button">
          <button onClick={() => signIn()}>SignIn</button>
          <button onClick={() => signOut()}> LogOut</button>
        </div>
      </div>
      <div className="main-page">
        <div className="main-page-content">
          <h1>PLAY GAME</h1>
          <div className="main-page-form">
            <form action="" onSubmit={handleChessRoom}>
              <input
                type="text"
                value={name}
                onChange={(e) => dispatch(changeName(e.target.value))}
                placeholder="Player Name"
              />
              <input
                type="text"
                placeholder="Room number"
                value={roomId}
                onChange={(e) => dispatch(changeroomId(e.target.value))}
              />
              <input type="submit" value="Enter The Game" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
