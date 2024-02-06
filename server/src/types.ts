import { User } from "./routes/room/models";

export type SocketData = {
  name: string | null;
  room: string | null;
};

export type Message = {
  text: string;
  date: Date;
  user: User;
};

export type Room = {
  id: string;
  messages: Message[];
};
