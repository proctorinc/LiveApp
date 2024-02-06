export type User = {
  id: string;
  name: string;
};

export type Message = {
  text: string;
  date: Date;
  user: User;
};

export type Room = {
  id: string;
  name: string;
  shareId: string;
  owner: User;
  messages: Message[];
  users: User[];
  createdAt: Date;
};
