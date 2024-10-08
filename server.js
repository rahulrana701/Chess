import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

let rooms = {};
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("first socket connected", socket.id);

    //USER JOINED THE GAME OR ROOM
    socket.on("user-joined", (data) => {
      console.log(`${data.name} joined the game in room ${data.roomId}`);
      if (!rooms[data.roomId]) {
        rooms[data.roomId] = {
          Players: [],
          roomId: data.roomId,
        };
      }

      // NOT MORE THAT TWO USERS IN ONE ROOM
      if (rooms[data.roomId].Players.length >= 2) {
        const msg =
          "You cannot join the game right as two players are already playing game in this room , please join some other room ";
        socket.emit("cannot-join", { msg });
        return;
      }

      const playerExists = rooms[data.roomId].Players.includes(data.name);
      if (!playerExists) {
        rooms[data.roomId].Players.push(data.name);
        socket.join(data.roomId);
        io.to(data.roomId).emit("player-joined", {
          players: rooms[data.roomId].Players,
        });
      }
    });

    // MOVES
    socket.on("new-move", ({ move, roomId }) => {
      console.log(move);
      console.log(roomId);
      socket.to(roomId).emit("now-move", { move });
    });

    // USER DISCONNECTED
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);

      const roomId = socket.roomId;

      if (roomId && rooms[roomId]) {
        rooms[roomId].Players = rooms[roomId].Players.filter(
          (player) => player !== socket.id
        );

        if (rooms[roomId].Players.length === 0) {
          delete rooms[roomId];
        } else {
          io.to(roomId).emit("player-left", {
            players: rooms[roomId].Players,
            socketId: socket.id,
          });
        }
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
