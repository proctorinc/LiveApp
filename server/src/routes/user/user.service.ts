import { db } from "../../db";

async function updateUserProfile(userId: string, name: string, color: string) {
  return await db.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      color,
    },
  });
}

async function getUserById(userId: string) {
  return await db.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default {
  updateUserProfile,
  getUserById,
};
