import { generateRoomId } from "../../utils";
import { db } from "../../db";
import { User } from "@prisma/client";

async function getRoomByShareId(user: User, shareId: string) {
  return await db.room.findUniqueOrThrow({
    where: {
      ownerId: user.id,
      shareId,
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
      authorizedUsers: {
        include: {
          user: true,
        },
      },
    },
  });
}

async function getRoomById(user: User, roomId: string) {
  return await db.room.findUniqueOrThrow({
    where: {
      ownerId: user.id,
      id: roomId,
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
      authorizedUsers: {
        include: {
          user: true,
        },
      },
    },
  });
}

async function joinRoomByShareId(shareId: string) {
  const room = await db.room.findUniqueOrThrow({
    where: {
      shareId,
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
      authorizedUsers: {
        include: {
          user: true,
        },
      },
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
      authorizedUsers: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}

async function getActiveUsersInRoom(roomId: string) {
  return await db.usersJoinedRoom.findMany({
    where: {
      roomId,
      isActive: true,
    },
    include: {
      user: true,
    },
    orderBy: {
      lastJoinedDate: "desc",
    },
  });
}

async function createRoom(user: User) {
  const authorizedUser = await db.usersAuthorizedRoom.create({
    data: {
      room: {
        create: {
          shareId: generateRoomId(),
          createdAt: new Date(),
          owner: {
            connect: { id: user.id },
          },
        },
      },
      user: {
        connect: { id: user.id },
      },
    },
    include: {
      room: {
        include: {
          joinList: {
            include: {
              user: true,
            },
          },
          messages: true,
          authorizedUsers: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return authorizedUser.room;
}

async function updateRoom(
  user: User,
  roomId: string,
  name: string,
  isPublic: boolean,
) {
  const room = await db.room.update({
    where: {
      ownerId: user.id,
      id: roomId,
    },
    data: {
      name,
      isPublic,
    },
  });

  if (!room.isPublic) {
    await db.usersAuthorizedRoom.create({
      data: {
        room: {
          connect: { id: room.id },
        },
        user: {
          connect: { id: user.id },
        },
      },
    });
  }
}

async function updateRoomShareId(user: User, roomId: string) {
  const newShareId = generateRoomId();
  await db.room.update({
    where: {
      ownerId: user.id,
      id: roomId,
    },
    data: {
      shareId: newShareId,
    },
  });

  return newShareId;
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
  messageText: string,
) {
  return await db.message.create({
    data: {
      text: messageText,
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

async function sendUserJoinMessage(user: User, roomId: string) {
  return await db.message.create({
    data: {
      text: `${user.name} joined the room`,
      room: {
        connect: { id: roomId },
      },
    },
    include: {
      sender: true,
    },
  });
}

async function sendUserLeaveMessage(user: User, roomId: string) {
  return await db.message.create({
    data: {
      text: `${user.name} left the room`,
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
  console.log("Attempting to remove user from room", roomId);
  console.log(user);
  console.log(roomId);
  return await db.usersJoinedRoom.upsert({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId,
      },
    },
    create: {
      isActive: false,
      user: {
        connect: { id: user.id },
      },
      room: {
        connect: { id: roomId },
      },
    },
    update: {
      isActive: false,
      lastJoinedDate: new Date(),
    },
  });
}

async function isUserActiveInRoom(user: User, roomId: string) {
  const userJoinedRoom = await db.usersJoinedRoom.findUnique({
    where: {
      userId_roomId: {
        userId: user.id,
        roomId,
      },
    },
  });
  console.log(userJoinedRoom);
  console.log("User is active already?", userJoinedRoom?.isActive);
  return userJoinedRoom?.isActive;
}

export default {
  getRoomById,
  joinRoomByShareId,
  getRoomByShareId,
  getRoomsByUser,
  createRoom,
  updateRoom,
  updateRoomShareId,
  deleteRoom,
  sendUserMessage,
  sendUserJoinMessage,
  sendUserLeaveMessage,
  addUserToRoom,
  removeUserFromRoom,
  isUserActiveInRoom,
  getActiveUsersInRoom,
};
