import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Running requireAuth middleware!");
  if (req.session && req.session.user) {
    console.log(`Found User Session`);
    console.log(req.session.id);
    console.log(req.session.user);
    // const user = UserService.findById(userId);
    // res.locals.user = req.session.user;
    console.log("ok...");
    try {
      next();
    } catch (err) {
      console.log("Caught it!", err);
    }
  } else {
    console.log("Failed requireAuth. Generating user...");
    const user: User = {
      id: "test-id",
      name: "MattyP",
      color: "purple",
      phoneNumber: "425-295-4143",
    };
    req.session.user = user;
    // console.log(`No User Session Found`);
    // res
    //   .status(403)
    //   .send({
    //     message:
    //       "You are not authorized to access this endpoint. Login Required",
    //   });
  }
  next();
};

export const requireSocketAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Running requireAuth middleware!");
  if (req.session && req.session.user) {
    console.log(`Found User Session`);
    console.log(req.session.id);
    console.log(req.session.user);
    // const user = UserService.findById(userId);
    // res.locals.user = req.session.user;
    console.log("ok...");
    try {
      next();
    } catch (err) {
      console.log("Caught it!", err);
    }
  } else {
    console.log("Failed requireAuth. Generating user...");
    const user: User = {
      id: "test-id",
      name: "MattyP",
      color: "purple",
      phoneNumber: "425-295-4143",
    };
    req.session.user = user;
    // console.log(`No User Session Found`);
    // res
    //   .status(403)
    //   .send({
    //     message:
    //       "You are not authorized to access this endpoint. Login Required",
    //   });
  }
  next();
};
