import { Router } from "express";
import roomController from "./room/room.controller";
import authController from "./auth/auth.controller";
import { requireAuth } from "../middleware";

const api = Router();
api.use("/room", requireAuth, roomController);
api.use("/auth", authController);

export default Router().use("/api", api);
