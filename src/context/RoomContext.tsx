import { FC, ReactNode, createContext } from "react";
import { useEffect, useState } from "react";
import { Message, Room, User } from "../types";
import { useNavigate } from "react-router-dom";
import useSocket from "../hooks/useSocket";

type RoomError = {
  message: string;
};

type RoomProviderProps = {
  children: ReactNode;
};
type RoomContext = {
  leaveRoom: () => void;
  loadRoom: (roomId: string) => void;
  refreshRoom: (roomId: string) => void;
  sendMessage: (messageText: string) => void;
  roomId: string | null;
  messages: Message[];
  users: User[];
  isRoomLoaded: boolean;
};
const RoomContext = createContext<RoomContext | null>(null);

export const RoomContextProvider: FC<RoomProviderProps> = ({ children }) => {
  const socket = useSocket();
  const navigate = useNavigate();
  // const [room, setRoom] = useState<Room | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // function refreshRoom(roomId: string | undefined) {
  //   if (roomId) {
  //     setRoomId(roomId);
  //   }
  //   console.log("Refreshing room", roomId);
  //   socket.emit("refresh-room", roomId);
  // }

  function sendMessage(messageText: string) {
    if (messageText.length > 0) {
      socket.emit("room:send-message", messageText);
    } else {
      console.error("Can't send empty message");
    }
  }

  function loadRoom(roomId: string) {
    console.log("loading room...");
    socket.emit("room:load", roomId);
  }

  function leaveRoom() {
    setRoomId(null);
    setUsers([]);
    navigate("/");
    socket.emit("room:leave", roomId);
  }

  useEffect(() => {
    function onNewMessage(value: Message) {
      console.log("Received new message!");
      setMessages((prev) => [value, ...prev]);
    }

    function onRoomData(room: Room) {
      console.log("Joined room id:", room.id);
      setRoomId(room.shareId);
      setMessages(room.messages);
      setUsers(room.joinList);
    }

    function onRoomError(error: RoomError) {
      console.error(error.message);
      navigate("/");
    }

    socket.on("room:error", onRoomError);
    socket.on("room:data", onRoomData);
    socket.on("room:new-message", onNewMessage);

    return () => {
      socket.off("room:error", onRoomError);
      socket.off("room:data", onRoomData);
      socket.off("room:new-message", onNewMessage);
    };
  }, [socket, navigate]);

  const contextData = {
    isRoomLoaded: roomId !== null,
    leaveRoom,
    loadRoom,
    sendMessage,
    messages,
    users,
  };

  return (
    <RoomContext.Provider value={contextData}>{children}</RoomContext.Provider>
  );
};

export default RoomContext;
