import { useContext } from "react";
import UserRoomsContext from "../context/UserRoomsContext";

const useUserRooms = () => {
  const userRoomsContext = useContext(UserRoomsContext);

  if (!userRoomsContext) {
    throw new Error(
      "useUserRooms has to be used within <UserRoomsContext.Provider>",
    );
  }

  return userRoomsContext;
};

export default useUserRooms;
