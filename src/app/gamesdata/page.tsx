"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import axios from "axios";
import { updategamesdata } from "@/lib/features/game/gameSlice";
import "../../../styles/games.css";

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user: User;
  expires: string;
}
export default function page() {
  const { data } = useSession() as { data: Session | null };
  const dispatch = useAppDispatch();
  const { gamesdata } = useAppSelector((state) => state.games);

  useEffect(() => {
    const fetchdata = async () => {
      const response = await axios.get("/api/auth/getgame", {
        headers: {
          "Content-Type": "application/json",
          id: data?.user?.id,
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
      const gameData = response.data.User.games;
      dispatch(updategamesdata(gameData));
    };

    fetchdata();
  }, []);
  return (
    <>
      {data ? (
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
