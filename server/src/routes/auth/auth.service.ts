import { generateRoomId } from "../../utils";
import { User } from "../room/models";

function login(username: string, password: string): User {
  return {
    id: generateRoomId(),
    name: username,
  };
}

function signup(username: string, password: string, confirmPassword: string) {
  if (password === confirmPassword) {
  } else {
  }
}
