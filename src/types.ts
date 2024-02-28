export type User = {
  id: string;
  name: string;
  color: string;
  email: string;
  ownedRooms: Room[];
  joinedRooms: UserJoinedRoom[];
  messages: Message[];
  createdAt: Date;
};

export type UpdateUserBody = {
  name: string;
  color: string;
};

export type UserJoinedRoom = {
  room: Room;
  user: User;
  isActive: boolean;
  lastJoinedDate: Date;
};

export type UserAuthorizedRoom = {
  room: Room;
  user: User;
  isActive: boolean;
  invitedDate: Date;
};

export type Message = {
  text: string;
  sender: User;
  sentAt: Date;
};

export type Room = {
  id: string;
  name: string;
  shareId: string;
  owner: User;
  messages: Message[];
  joinList: UserJoinedRoom[];
  authorizedUsers: UserAuthorizedRoom[];
  createdAt: Date;
  isPublic: boolean;
};

export type UpdateRoomBody = {
  name?: string;
  isPublic?: boolean;
};

export type RoomWithActiveUsers = Room & {
  activeUsers: User[];
};
