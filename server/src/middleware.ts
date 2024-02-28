import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import userService from "./routes/user/user.service";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session && req.session.user) {
    next();
  } else {
    const userId = "test-id";
    const user = await userService.getUserById(userId);
    if (user) {
      req.session.user = user;
    } else {
      res.status(403).json({
        message:
          "You are not authorized to access this endpoint. Login Required",
      });
    }
  }
  next();
}

export function validateBody() {}

export function validateQuery() {}
