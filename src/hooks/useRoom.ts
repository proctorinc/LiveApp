import { useContext } from "react";
import RoomContext from "../context/RoomContext";

const useRoom = () => {
  const roomContext = useContext(RoomContext);

  if (!roomContext) {
    throw new Error("useRoom has to be used within <RoomContext.Provider>");
  }

  return roomContext;
};

export default useRoom;
