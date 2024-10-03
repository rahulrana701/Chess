"use client";
import React from "react";
import "../../../styles/main.css";
import { signIn, signOut } from "next-auth/react";

export default function page() {
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
            <form action="">
              <input type="text" placeholder="Player Name" />
              <input type="text" placeholder="Room number" />
            </form>
            <button>Enter The Game</button>
          </div>
        </div>
      </div>
    </>
  );
}
