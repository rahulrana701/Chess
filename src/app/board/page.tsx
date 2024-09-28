"use client";
import Chessboard from "chessboardjsx";
import React, { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { UseSocket } from "../socketprovider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function page() {
  const [chess] = useState(new Chess());
  const { start } = useAppSelector((state) => state.position);
  const dispatch = useAppDispatch();
  const socket = UseSocket();

  function onSquareClick(square: Square): void {

  }

  return (
    <div>
      <Chessboard
        position={start}
        draggable={true}
        onSquareClick={onSquareClick}
      />
    </div>
  );
}
