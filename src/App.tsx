import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SocketContextProvider } from "./context/SocketContext";
import { RoomContextProvider } from "./context/RoomContext";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <SocketContextProvider>
        <RoomContextProvider>
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/room/:roomId" element={<Room />} />
          </Routes>
        </RoomContextProvider>
      </SocketContextProvider>
    </BrowserRouter>
  );
}

export default App;
