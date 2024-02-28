import { useRoutes } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  const commonRoutes = [{ path: "*", element: <div>Not Found</div> }];

  const routes = isAuthenticated ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
