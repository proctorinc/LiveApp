import { NextFunction, Request, Response, Router } from "express";
import userService from "./user.service";

const router = Router();

router.get("/me", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user;
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.session.user;
    const { name, color } = req.body;

    if (user) {
      const updatedUser = await userService.updateUserProfile(
        user?.id,
        name,
        color
      );
      console.log(updatedUser);
      res.json(updatedUser);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
});

export default router;
