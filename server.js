import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

var rooms = {
  [roomNumber]: {
    Players: [],
    roomId: roomNumber,
  },
};
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
      }

      const playerExists = rooms[data.roomId].Players.includes(data.name);
      if (!playerExists) {
        rooms[data.roomId].Players.push(data.name);

        io.to(data.roomId).emit("player-joined", {
          name: data.name,
          players: rooms[data.roomId].Players,
          socketId: socket.id,
        });
      }
    });

    

    // USER DISCONNECTED
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
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
