import { FC, ReactNode, createContext } from "react";
import { io, Socket } from "socket.io-client";

type SocketProviderProps = {
  children: ReactNode;
};

const SOCKET_URL = "http://localhost:3000";
const socket = io(SOCKET_URL, {
  withCredentials: true,
});
const SocketContext = createContext<Socket>(socket);

export const SocketContextProvider: FC<SocketProviderProps> = ({
  children,
}) => {
  return (
    <SocketContext.Provider value={socket}>
      {socket ? children : null}
    </SocketContext.Provider>
  );
};

export default SocketContext;
