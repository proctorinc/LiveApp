import { User } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    const validCredentials = true;

    if (validCredentials) {
      // const user = await UserService.findByUsername(username);
      const user: User = {
        id: "test-id",
        name: "MattyP",
        color: "purple",
        email: "proctormatt0@gmail.com",
        createdAt: new Date(),
        enabled: true,
      };
      req.session.user = user;
      res.status(200).json({ user });
    } else {
      res.status(403).json({ error: "Invalid username or password" });
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // AuthService.logout()
    } catch (error) {
      next(error);
    }
  }
);

export default router;
