import { Server } from "socket.io";
import { SessionSocket } from "../../app";
import RoomService from "../room/room.service";

export default (io: Server, socket: SessionSocket) => {
  const req = socket.request;
  const currentUser = req.session.user;

  io.on("user-rooms:fetch", () => {
    const rooms = RoomService.getRoomsByUser(currentUser);
    socket.to(currentUser.id).emit("user-rooms:data", rooms);
  });
};
