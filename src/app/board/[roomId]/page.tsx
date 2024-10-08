"use client";

import React, { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { UseSocket } from "../../socketprovider";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { updateSquare } from "../../../lib/features/square/squareSlice";
import { updatePosition } from "@/lib/features/position/positionSlice";
import { updateblacksSquare } from "@/lib/features/blacksquare/blacksquareSlice";
import { updatewhoseturn } from "@/lib/features/whoseturn/whoseturnSlice";
import { addplayers } from "@/lib/features/boardplayers/boardplayerSlice";
import { useParams } from "next/navigation";
import { Chessboard } from "react-chessboard";

export default function page() {
  const socket = UseSocket();
  const params = useParams();
  const { roomId } = params;
  const [chess] = useState(new Chess());
  const { start } = useAppSelector((state) => state.position);
  var { whichturn } = useAppSelector((state) => state.whoseturn);
  var { selectedsquare } = useAppSelector((state) => state.selectedsquare);
  var { selectedBlacksSquare } = useAppSelector(
    (state) => state.blacksSquarePostion
  );

  const { players } = useAppSelector((state) => state.boardPlayers);

  const dispatch = useAppDispatch();

  function onSquareClick(square: Square): void {
    const turn = chess.turn();
    let selectedSquare = turn === "w" ? selectedsquare : selectedBlacksSquare;

    if (selectedSquare != null) {
      try {
        const move = chess.move({ from: selectedSquare, to: square });
        if (move) {
          socket?.emit("new-move", { move, roomId });

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
    const turns = chess.turn();
    console.log(turns);
    socket?.on("now-move", ({ move }) => {
      console.log(move);
      chess.move(move);
      dispatch(updatePosition(chess.fen()));
      dispatch(
        updatewhoseturn(
          turns === "w" ? "IT IS BLACK'S TURN NOW" : "IT IS WHITE'S TURN NOW"
        )
      );
    });
  }, []);

  return (
    <div>
      <div style={{ width: "300px", height: "300px" }}>
        <Chessboard position={start} onSquareClick={onSquareClick} />
      </div>
      {players &&
        players.map((player: String, index: number) => (
          <p key={index}>{player}</p>
        ))}
      <h3>{whichturn}</h3>
    </div>
  );
}
