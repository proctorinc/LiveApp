import { FC, ReactNode } from "react";
import useAuth from "@/features/auth/hooks/useAuth";

type AuthRouteProps = {
  children: ReactNode;
};

export const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return <>{currentUser ? children : null}</>;
};
