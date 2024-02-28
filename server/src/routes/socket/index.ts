import { Server, Socket } from "socket.io";
import { SessionSocket } from "../../app";
import roomHandler from "./roomHandler";

export function onConnection(io: Server, defaultSocket: Socket) {
  const socket = defaultSocket as SessionSocket;

  console.log("User connected:", socket.id);
  console.log(io.sockets.sockets.size, "users connected");

  roomHandler(io, socket);

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
    console.log(io.sockets.sockets.size, "users connected");
  });
}
