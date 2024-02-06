import { Server, Socket } from "socket.io";
import RoomService from "./room.service";
import { SessionSocket } from "../../app";

export function onConnection(io: Server, defaultSocket: Socket) {
  const socket = defaultSocket as SessionSocket;
  console.log("User connected:", socket.id);
  console.log(io.sockets.sockets.size, "users connected");

  const req = socket.request;
  const session = req.session;
  const currentUser = req.session.user;

  console.log("socket roomId:", socket.data.roomId);

  socket.on("room:load", async (roomId: string) => {
    console.log("Room attempting to be loaded...");
    // If user is not already in the room, add them to the room
    // and send a 'User Joined Room' message
    const user = req.session.user;

    if (user) {
      // const user = UserService.getById(userId);
      const room = await RoomService.getRoomByShareId(user, roomId);

      socket.join(room.id);
      RoomService.addUserToRoom(user, room.id);
      console.log("set socket data roomId to", room.id);
      socket.data.roomId = room.id;
      socket.emit("room:data", room);

      // TODO: alert room user has joined
    } else {
      const message = "User is not authenticated";
      socket.emit("room:error", { message });
      console.error(message);
    }
  });

  socket.on("room:send-message", async (messageText: string) => {
    // Verify that user is in the room they are sending the message to
    console.log("New message sent!", messageText);
    const roomId = socket.data.roomId;
    console.log("When sending, roomId:", roomId);
    console.log(socket.data);
    const message = await RoomService.sendUserMessage(
      currentUser,
      roomId,
      messageText
    );
    console.log("Emitting message to room", roomId);
    console.log(message);
    console.log(roomId);
    console.log(socket.rooms);
    io.in(roomId).emit("room:new-message", message);
  });

  socket.on("room:leave", async (roomId: string) => {
    // const users = RoomService.getUsersInRoom(io, room.id);
    // socket.to(room.id).emit("users", users);
    // RoomService.sendServerMessage(
    //   socket,
    //   room,
    //   `${user.name} has left the room`
    // );

    console.log("User leaving room:", roomId);
    // If user is not already in the room, add them to the room
    // and send a 'User Joined Room' message
    const user = req.session.user;

    try {
      // const user = UserService.getById(userId);
      const room = await RoomService.getRoomByShareId(user, roomId);

      socket.leave(room.id);
      RoomService.removeUserFromRoom(user, room.id);
      socket.data.roomId = null;
      socket.emit("room:data", room);

      // TODO: alert room user has joined
    } catch (error) {
      const message = "Failed to leave room. No user";
      socket.emit("room:error", { message });
      console.error(error);
    }
  });

  // socket.on("join-room", (roomId: string, name: string) => {
  //   RoomService.setUsername(socket, name);
  //   RoomService.joinRoom(io, socket, roomId);
  // });

  // socket.on("create-room", (name: string) => {
  //   const roomId = RoomService.createRoom(socket);
  //   RoomService.setUsername(socket, name);
  //   RoomService.joinRoom(io, socket, roomId);
  // });

  // socket.on("send-message", (messageText: string) => {
  //   const roomId = req.session.roomId as string;
  //   const room = RoomService.rooms.get(roomId);

  //   console.log("roomId", roomId);
  //   console.log("session", req.session.id);

  //   if (room) {
  //     RoomService.sendUserMessage(socket, room, messageText);
  //     RoomService.rooms.set(roomId, room);
  //   } else {
  //     console.error("Invalid room ID");
  //   }
  // });

  // socket.on("refresh-room", (roomId: string) => {
  //   RoomService.refreshRoom(io, socket, roomId);
  // });

  // socket.on("leave-room", () => {
  //   const roomId = req.session.roomId as string;
  //   const room = RoomService.rooms.get(roomId);
  //   const user = req.session.user;

  //   req.session.roomId = undefined;
  //   req.session.save();
  //   RoomService.leaveAllRooms(socket);

  //   if (room && user) {
  //     const users = RoomService.getUsersInRoom(io, room.id);
  //     socket.to(room.id).emit("users", users);
  //     RoomService.sendServerMessage(
  //       socket,
  //       room,
  //       `${user.name} has left the room`
  //     );
  //   }
  // });

  // socket.on("all-messages", () => {
  //   const roomId = req.session.roomId as string;
  //   const room = RoomService.rooms.get(roomId);
  //   if (room) {
  //     socket.emit("initial-messages", room.messages);
  //   }
  // });

  socket.on("disconnect", () => {
    console.log("User disconnected!", socket.id);
    console.log(io.sockets.sockets.size, "users connected");
  });
}
