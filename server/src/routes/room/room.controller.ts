import { NextFunction, Request, Response, Router } from "express";
import RoomService from "./room.service";
import { Server } from "socket.io";
import { User } from "@prisma/client";

const router = Router();

router.get(
  "/join/:roomId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roomId = req.params.roomId;
      const io: Server = req.app.get("io");

      const room = await RoomService.joinRoomByShareId(roomId);

      // if (room) {
      //   io.to(roomId).emit("room:joined", user);
      // }
      res.json(room);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/:roomId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.session.user as User;
      const roomId = req.params.roomId;

      const room = await RoomService.getRoomByShareId(user, roomId);
      res.json(room);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user as User;

    const rooms = await RoomService.getRoomsByUser(user);
    res.json(rooms);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user as User;

    const room = RoomService.createRoom(user);
    res.json(room);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:roomId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.session.user as User;
      const roomId = req.params.room;
      const { name } = req.body;

      return RoomService.updateRoom(user, roomId, name);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:roomId/share-id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.session.user as User;
      const roomId = req.params.roomId;

      return RoomService.updateRoomShareId(user, roomId);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:roomId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.session.user as User;
      const roomId = req.params.roomId;
      return RoomService.deleteRoom(user, roomId);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
