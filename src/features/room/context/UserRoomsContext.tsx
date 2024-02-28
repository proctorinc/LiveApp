import { FC, ReactNode, createContext } from "react";
import { useEffect, useState } from "react";
import { Room } from "@/types";
import { useNavigate } from "react-router-dom";
import useSocket from "@/features/socket/hooks/useSocket";

type UserRoomsError = {
  message: string;
};

type UserRoomsProviderProps = {
  children: ReactNode;
};
type UserRoomsContext = {
  rooms: Room[];
  getRooms: () => void;
  joinRoom: (roomId: string) => void;
  createNewRoom: () => void;
};
const UserRoomsContext = createContext<UserRoomsContext | null>(null);

export const UserRoomsContextProvider: FC<UserRoomsProviderProps> = ({
  children,
}) => {
  const socket = useSocket();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);

  async function getRooms() {
    await fetch("http://localhost:3000/api/room")
      .then((response) => response.json())
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => console.error(error));
  }

  async function joinRoom(roomId: string) {
    // socket.emit("user-rooms:join", roomId);
    fetch(`http://localhost:3000/api/room/join/${roomId}`)
      .then((response) => response.json())
      .then(() => navigate(`/room/${roomId}`))
      .catch((error) => console.error(error));
  }

  async function createNewRoom() {
    fetch("http://localhost:3000/api/room", {
      method: "POST",
    })
      .then(() => {
        // Refresh page data
        getRooms();
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    function onUserRoomJoined(shareId: string, rooms: Room[]) {
      setRooms(rooms);
      navigate(`/room/${shareId}`);
    }

    function onUserRoomsData(rooms: Room[]) {
      setRooms(rooms);
    }

    function onUserRoomError(error: UserRoomsError) {
      console.error(error.message);
      navigate("/");
    }

    socket.on("user-rooms:error", onUserRoomError);
    socket.on("user-rooms:data", onUserRoomsData);
    socket.on("user-rooms:joined", onUserRoomJoined);

    return () => {
      socket.off("room:error", onUserRoomError);
      socket.off("room:data", onUserRoomsData);
    };
  }, [socket, navigate]);

  const contextData = {
    rooms,
    getRooms,
    joinRoom,
    createNewRoom,
  };

  return (
    <UserRoomsContext.Provider value={contextData}>
      {children}
    </UserRoomsContext.Provider>
  );
};

export default UserRoomsContext;
