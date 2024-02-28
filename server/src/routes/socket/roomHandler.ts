import { Server } from "socket.io";
import { SessionSocket } from "../../app";
import RoomService from "../room/room.service";

export default (io: Server, socket: SessionSocket) => {
  const req = socket.request;
  const currentUser = req.session.user;

  if (currentUser) {
    socket.on("room:load", async (roomId: string) => {
      console.log("Room attempting to be loaded...");

      if (roomId) {
        const room = await RoomService.getRoomByShareId(currentUser, roomId);

        socket.join(room.id);
        socket.join(currentUser.id);

        const isUserActive = await RoomService.isUserActiveInRoom(
          currentUser,
          room.id,
        );
        await RoomService.addUserToRoom(currentUser, room.id);
        console.log("set socket data roomId to", room.id);
        socket.data.roomId = room.id;
        socket.emit("room:data", room);

        if (!isUserActive) {
          console.log("User was not in the room. Sending join message");
          const updatedRoom = await RoomService.getRoomByShareId(
            currentUser,
            roomId,
          );
          socket.in(room.id).emit("room:data", updatedRoom);
          socket
            .in(room.id)
            .emit("room:alert", `${currentUser.name} joined the room`);
        } else {
          console.log("User is already in the room");
        }
      } else {
        const message = "Invalid room ID";
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
      await RoomService.sendUserMessage(currentUser, roomId, messageText);
      console.log("Emitting message to room", roomId);
      const updatedRoom = await RoomService.getRoomById(currentUser, roomId);
      io.in(roomId).emit("room:data", updatedRoom);
    });

    socket.on("room:leave", async (roomId: string) => {
      console.log("User leaving room:", roomId);
      // If user is not already in the room, add them to the room
      // and send a 'User Joined Room' message

      try {
        const room = await RoomService.getRoomById(currentUser, roomId);

        const isUserActive = await RoomService.isUserActiveInRoom(
          currentUser,
          room.id,
        );
        socket.leave(room.id);
        socket.leave(currentUser.id);

        if (isUserActive) {
          await RoomService.removeUserFromRoom(currentUser, room.id);

          const updatedRoom = await RoomService.getRoomById(
            currentUser,
            roomId,
          );
          socket.in(room.id).emit("room:data", updatedRoom);

          socket
            .in(room.id)
            .emit("room:alert", `${currentUser.name} left the room`);
        }
        socket.data.roomId = null;
        socket.emit("room:data", room);
      } catch (error) {
        const message = "Failed to leave room. No user";
        socket.emit("room:error", { message });
        console.error(error);
      }
    });
  }
};
