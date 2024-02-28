import { NextFunction, Request, Response, Router } from "express";
import RoomService from "./room.service";
import { Server } from "socket.io";
import { User } from "@prisma/client";

const router = Router();

router.get(
  "/join/:shareId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const shareId = req.params.shareId;
      const io: Server = req.app.get("io");

      const room = await RoomService.joinRoomByShareId(shareId);

      if (room) {
        res.json(room);
      } else {
        res.status(400).json({ message: "Invalid Room ID" });
      }
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

// router.get(
//   "/recent",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = req.session.user as User;
//       const roomId = req.params.roomId;

//       const room = await RoomService.getRecentlyJoinedRooms(user, roomId);
//       res.json(room);
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   }
// );

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
      const roomId = req.params.roomId;
      const { name, isPublic } = req.body;
      console.log(req.body);

      const room = await RoomService.updateRoom(user, roomId, name, isPublic);

      res.json(room);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:roomId/refresh/share-id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.session.user as User;
      const roomId = req.params.roomId;

      const shareId = await RoomService.updateRoomShareId(user, roomId);

      res.json(shareId);
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
      return await RoomService.deleteRoom(user, roomId);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
