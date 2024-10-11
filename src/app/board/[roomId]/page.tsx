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
import { useParams } from "next/navigation";
import { Chessboard } from "react-chessboard";
import "../../../../styles/board.css";

export default function page() {
  const socket = UseSocket();
  const [role, setRole] = useState("");

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

  const turn = chess.turn();
  function onSquareClick(square: Square): void {
    if (turn === "w" && role == "white" && selectedsquare != null) {
      try {
        if (chess.isCheckmate()) {
          alert("White Player Got Checkmate So The Game Is Over ");
          const whitecheckmatemessage =
            "White Player Got Checkmate So The Game Is Over";
          socket?.emit("white-checkmate", { whitecheckmatemessage, roomId });
          return;
        }

        if (chess.isCheck()) {
          alert("White player is in check");
          return;
        }

        const move = chess.move({ from: selectedsquare, to: square });
        if (move) {
          socket?.emit("new-move", { move, roomId });

          dispatch(updatePosition(chess.fen()));

          dispatch(updateSquare(null));
        }
      } catch (error) {
        console.log("invalid move made");
        alert("Invalid Move");
        dispatch(updateSquare(null));

        return;
      }
    } else {
      dispatch(updateSquare(square));
    }

    if (turn === "b" && role == "black" && selectedBlacksSquare != null) {
      try {
        if (chess.isCheckmate()) {
          alert("Black Player Got Checkmate So The Game Is Over ");
          const blackcheckmatemessage =
            "Black Player Got Checkmate So The Game Is Over";
          socket?.emit("black-checkmate", { blackcheckmatemessage, roomId });
          return;
        }

        if (chess.isCheck()) {
          alert("Black player is in check");
          return;
        }

        const move = chess.move({ from: selectedBlacksSquare, to: square });
        if (move) {
          socket?.emit("new-move", { move, roomId });

          dispatch(updatePosition(chess.fen()));

          dispatch(updateblacksSquare(null));

          if (chess.isCheckmate()) {
            alert("The Game Is Over");
          }

          if (chess.inCheck()) {
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
        alert("Invalid Move");
        dispatch(updateblacksSquare(null));

        return;
      }
    } else {
      dispatch(updateblacksSquare(square));
    }

    if (turn === "b" && role == "white") {
      alert("It is not your turn you cannot move");
    }
    if (turn === "w" && role == "black") {
      alert("It is not your turn you cannot move");
    }
  }

  socket?.on("white-checkmate-reply", ({ wcmessage }) => {
    alert(wcmessage);
  });
  socket?.on("black-checkmate-reply", ({ bcmessage }) => {
    alert(bcmessage);
  });

  socket?.on("new-role", ({ roles }) => {
    setRole(roles);
  });

  useEffect(() => {
    socket?.on("now-move", ({ move }) => {
      chess.move(move);
      dispatch(updatePosition(chess.fen()));
      if (role == "black") {
        dispatch(updatewhoseturn("IT IS BLACK'S TURN NOW"));
      } else {
        dispatch(updatewhoseturn("IT IS WHITE'S TURN NOW"));
      }
    });
  }, []);

  return (
    <div className="board">
      <div style={{ width: "568px", height: "310px" }}>
        <Chessboard position={start} onSquareClick={onSquareClick} />
      </div>
      <div className="board-content">
        <h3 style={{ marginLeft: "10px" }}>{whichturn}</h3>
        <h3 style={{ marginTop: "70px", marginBottom: "0px" }}>PLAYERS</h3>
        <div className="board-players">
          {players &&
            players.map((player: String, index: number) => (
              <h1 style={{ width: "100px" }} key={index}>
                {player}
              </h1>
            ))}
        </div>
      </div>
    </div>
  );
}