import { User } from "@prisma/client";
import { generateRoomId } from "../../utils";

function login(username: string, password: string): User {
  return {
    id: "test-id",
    name: "MattyP",
    color: "purple",
    email: "proctormatt0@gmail.com",
    createdAt: new Date(),
    enabled: true,
  };
}

function signup(username: string, password: string, confirmPassword: string) {
  if (password === confirmPassword) {
  } else {
  }
}
