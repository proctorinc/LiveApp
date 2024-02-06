import { generateRoomId } from "../../utils";
import { db } from "../../db";
import { User } from "@prisma/client";

async function getRoomByShareId(user: User, roomId: string) {
  return await db.room.findUniqueOrThrow({
    where: {
      ownerId: user.id,
      shareId: roomId,
    },
    include: {
      joinList: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          sender: true,
        },
        orderBy: {
          sentAt: "desc",
        },
      },
      owner: true,
    },
  });
}

async function joinRoomByShareId(roomId: string) {
  const room = await db.room.findUniqueOrThrow({
    where: {
      shareId: roomId,
    },
    include: {
      joinList: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          sender: true,
        },
        orderBy: {
          sentAt: "desc",
        },
      },
      owner: true,
    },
  });

  return room;
}

async function getRoomsByUser(user: User) {
  return await db.room.findMany({
    where: {
      ownerId: user.id,
    },
    include: {
      joinList: {
        include: {
          user: true,
        },
      },
      messages: true,
    },
  });
}

async function createRoom(user: User) {
  return await db.room.create({
    data: {
      shareId: generateRoomId(),
      createdAt: new Date(),
      owner: {
        connect: { id: user.id },
      },
    },
  });
}

async function updateRoom(user: User, roomId: string, name: string) {
  return await db.room.update({
    where: {
      ownerId: user.id,
      id: roomId,
    },
    data: {
      name: name,
    },
  });
}

async function updateRoomShareId(user: User, roomId: string) {
  return await db.room.update({
    where: {
      ownerId: user.id,
      id: roomId,
    },
    data: {
      shareId: generateRoomId(),
    },
  });
}

async function deleteRoom(user: User, roomId: string) {
  return await db.room.delete({
    where: {
      ownerId: user.id,
      id: roomId,
    },
  });
}

// function sendServerMessage(socket: Socket, room: Room, messageText: string) {
//   const newMessage: Message = {
//     text: messageText,
//     date: new Date(),
//     user: {
//       id: "server",
//       name: "server",
//     },
//   };
//   room.messages = [newMessage, ...room.messages];
//   socket.to(room.id).emit("new-message", newMessage);
//   console.log(room.messages);
// }

async function sendUserMessage(
  user: User,
  roomId: string,
  messageText: string
) {
  return await db.message.create({
    data: {
      text: messageText,
      sentAt: new Date(),
      sender: {
        connect: { id: user.id },
      },
      room: {
        connect: { id: roomId },
      },
    },
    include: {
      sender: true,
    },
  });
}

async function addUserToRoom(user: User, roomId: string) {
  return await db.usersJoinedRoom.upsert({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId,
      },
    },
    create: {
      isActive: true,
      user: {
        connect: { id: user.id },
      },
      room: {
        connect: { id: roomId },
      },
    },
    update: {
      isActive: true,
      lastJoinedDate: new Date(),
    },
  });
}

async function removeUserFromRoom(user: User, roomId: string) {
  return await db.usersJoinedRoom.update({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId,
      },
    },
    data: {
      isActive: false,
      lastJoinedDate: new Date(),
    },
  });
}

export default {
  joinRoomByShareId,
  getRoomByShareId,
  getRoomsByUser,
  createRoom,
  updateRoom,
  updateRoomShareId,
  deleteRoom,
  sendUserMessage,
  addUserToRoom,
  removeUserFromRoom,
};
