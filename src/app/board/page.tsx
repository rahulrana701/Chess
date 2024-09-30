"use client";
import Chessboard from "chessboardjsx";
import React, { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { UseSocket } from "../socketprovider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateSquare } from "../../lib/features/square/squareSlice";
import { updatePosition } from "@/lib/features/position/positionSlice";
import { updateblacksSquare } from "@/lib/features/blacksquare/blacksquareSlice";
import { updatewhoseturn } from "@/lib/features/whoseturn/whoseturnSlice";

export default function page() {
  const [chess] = useState(new Chess());
  const { start } = useAppSelector((state) => state.position);
  var { whichturn } = useAppSelector((state) => state.whoseturn);
  var { selectedsquare } = useAppSelector((state) => state.selectedsquare);
  var { selectedBlacksSquare } = useAppSelector(
    (state) => state.blacksSquarePostion
  );
  const dispatch = useAppDispatch();
  const socket = UseSocket();

  function onSquareClick(square: Square): void {
    const turn = chess.turn();
    let selectedSquare = turn === "w" ? selectedsquare : selectedBlacksSquare;

    if (selectedSquare != null) {
      const move = chess.move({ from: selectedSquare, to: square });
      if (move) {
        dispatch(updatePosition(chess.fen()));
        dispatch(updatewhoseturn(`IT IS BLACK'S PLAYER TURN NOW `));
        turn === "w"
          ? dispatch(updateSquare(null))
          : dispatch(updateblacksSquare(null));
      } else {
        alert("The move is invalid");
        return;
      }
    } else {
      if (turn === "w") {
        dispatch(updateSquare(square));
      } else {
        dispatch(updateblacksSquare(square));
      }
    }
  }

  return (
    <div>
      <Chessboard
        position={start}
        draggable={true}
        onSquareClick={onSquareClick}
      />
      <h3>{whichturn}</h3>
    </div>
  );
}
