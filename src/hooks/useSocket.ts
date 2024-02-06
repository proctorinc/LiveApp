import { useContext } from "react";
import SocketContext from "../context/SocketContext";

const useSocket = () => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error("useSocket has to be used within <SocketContext.Provider>");
  }

  return socketContext;
};

export default useSocket;
