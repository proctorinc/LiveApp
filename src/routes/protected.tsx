import { Suspense } from "react";

import { Navigate, Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Room from "../pages/Room";
import { UserRoomsContextProvider } from "@/features/room/context/UserRoomsContext";
import { RoomContextProvider } from "@/features/room/context/RoomContext";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/room/:roomId",
        element: (
          <RoomContextProvider>
            <Room />
          </RoomContextProvider>
        ),
      },
      {
        path: "/",
        element: (
          <UserRoomsContextProvider>
            <Home />
          </UserRoomsContextProvider>
        ),
      },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
