import { FC, ReactNode, createContext } from "react";
import { useEffect, useState } from "react";
import { Room, RoomWithActiveUsers } from "@/types";
import { useNavigate } from "react-router-dom";
import useSocket from "@/features/socket/hooks/useSocket";

type RoomError = {
  message: string;
};

type RoomProviderProps = {
  children: ReactNode;
};
type RoomContext = {
  isRoomLoaded: boolean;
  leaveRoom: () => void;
  loadRoom: (roomId: string) => void;
  sendMessage: (messageText: string) => void;
  alertQueue: string[];
  room: RoomWithActiveUsers | null;
};
const RoomContext = createContext<RoomContext | null>(null);

export const RoomContextProvider: FC<RoomProviderProps> = ({ children }) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [alertQueue, setAlertQueue] = useState<string[]>([]);

  const activeUsers = room?.joinList
    ? room?.joinList
        .filter((joinedUser) => joinedUser.isActive)
        .map((joinedUser) => joinedUser.user)
    : [];

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
    if (room) {
      socket.emit("room:leave", room?.id);
      setRoom(null);
    }
    navigate("/");
  }

  useEffect(() => {
    // Show user has joined for 3 seconds
    setTimeout(() => {
      setAlertQueue((prev) => prev.slice(1));
    }, 3000);
  }, [alertQueue]);

  useEffect(() => {
    function onRoomData(updatedRoom: Room) {
      setRoom(updatedRoom);
    }

    function onRoomError(error: RoomError) {
      console.error(error.message);
      navigate("/");
    }

    function onAlert(alert: string) {
      console.log(alert);
      setAlertQueue((prev) => [...prev, alert]);
    }

    socket.on("room:error", onRoomError);
    socket.on("room:data", onRoomData);
    socket.on("room:alert", onAlert);

    return () => {
      socket.off("room:error", onRoomError);
      socket.off("room:data", onRoomData);
      socket.off("room:alert", onAlert);
    };
  }, [socket, navigate]);

  const contextData = {
    isRoomLoaded: room !== null,
    leaveRoom,
    loadRoom,
    sendMessage,
    alertQueue,
    room: room ? { ...room, activeUsers } : null,
  };

  return (
    <RoomContext.Provider value={contextData}>{children}</RoomContext.Provider>
  );
};

export default RoomContext;
