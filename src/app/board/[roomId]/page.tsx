"use client";

import Chessboard from "chessboardjsx";
import React, { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { UseSocket } from "../../socketprovider";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateSquare } from "../../../lib/features/square/squareSlice";
import { updatePosition } from "@/lib/features/position/positionSlice";
import { updateblacksSquare } from "@/lib/features/blacksquare/blacksquareSlice";
import { updatewhoseturn } from "@/lib/features/whoseturn/whoseturnSlice";
import { addplayers } from "@/lib/features/boardplayers/boardplayerSlice";
import { updateSocketId } from "@/lib/features/playersocketId/playersocketIdSlice";

export default function page() {
  const [chess] = useState(new Chess());
  const { start } = useAppSelector((state) => state.position);
  var { whichturn } = useAppSelector((state) => state.whoseturn);
  var { selectedsquare } = useAppSelector((state) => state.selectedsquare);
  var { selectedBlacksSquare } = useAppSelector(
    (state) => state.blacksSquarePostion
  );

  const { players } = useAppSelector((state) => state.boardPlayers);
  const dispatch = useAppDispatch();
  const socket = UseSocket();

  function onSquareClick(square: Square): void {
    const turn = chess.turn();
    let selectedSquare = turn === "w" ? selectedsquare : selectedBlacksSquare;

    if (selectedSquare != null) {
      try {
        const move = chess.move({ from: selectedSquare, to: square });
        if (move) {
          dispatch(updatePosition(chess.fen()));
          dispatch(
            updatewhoseturn(
              turn === "w" ? "IT IS BLACK'S TURN NOW" : "IT IS WHITE'S TURN NOW"
            )
          );
          if (turn === "w") {
            dispatch(updateSquare(null));
          } else {
            dispatch(updateblacksSquare(null));
          }

          if (chess.isCheckmate()) {
            alert("The Game Is Over");
          }
          if (turn === "w" && chess.isCheck()) {
            alert("You are in check");
          }
          if (turn === "b" && chess.inCheck()) {
            alert("Please check");
          }
          if (chess.isStalemate()) {
            alert("The game is a draw");
          }
          if (chess.isInsufficientMaterial()) {
            alert("The game is a over");
          }
        }
      } catch (error) {
        console.log("invalid move made");
        alert(error);
        if (turn === "w") {
          dispatch(updateSquare(null));
        } else {
          dispatch(updateblacksSquare(null));
        }
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

  useEffect(() => {
    socket?.on("player-joined", ({ name, players, socketId }) => {
      console.log(name);
      dispatch(addplayers(players));
      dispatch(updateSocketId(socketId));
    });
  }, []);

  return (
    <div>
      <Chessboard
        position={start}
        draggable={true}
        onSquareClick={onSquareClick}
      />
      {players}
      <h3>{whichturn}</h3>
    </div>
  );
}
