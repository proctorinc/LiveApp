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
        phoneNumber: "425-295-4143",
      };
      req.session.user = user;
      res.status(200).send({ user });
    } else {
      res.status(403).send({ error: "Invalid username or password" });
    }
  }
);

router.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const game = loadGame(req.params.gameId);
      // res.json(game.getState());
    } catch (error) {
      next(error);
    }
  }
);

export default router;
