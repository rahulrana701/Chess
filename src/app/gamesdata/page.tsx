"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import { updategamesdata } from "@/lib/features/game/gameSlice";
import "../../../styles/games.css"

export default function page() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const gamesdata = useAppSelector((state) => state.games);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("/api/auth/getgame", {
        headers: {
          "Content-Type": "application/json",
          "id": session.data?.user.id,
        },
      });
      if (!response) {
        alert("something went wrong");
        return;
      }
      if (response.data.message) {
        alert(response.data.message);
        return;
      }
      const { gameData } = response.data;
      dispatch(updategamesdata(gameData));
    };

    fetchdata();
  }, []);
  return (
    <>
      {session.data ? (
        <div className="gamesdata">
          {gamesdata ? (
            gamesdata.map((game: any, index: number) => (
              <div className="actual-games-data" key={index}>
                {game}
              </div>
            ))
          ) : (
            <h2>THERE IS NO DATA TO SHOW</h2>
          )}
        </div>
      ) : (
        <div className="gamesdata">
          <h1>PLEASE LOGIN FIRST TO SEE YOUR GAME DATA</h1>
        </div>
      )}
    </>
  );
}
