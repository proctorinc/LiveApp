import { FC, ReactNode, createContext } from "react";
import { User } from "@/types";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/features/auth/api/logoutUser";
import { useUserQuery } from "@/features/user/hooks/useUserQuery";

type AuthProviderProps = {
  children: ReactNode;
};
type AuthContext = {
  isAuthenticated: boolean;
  currentUser: User;
  logout: () => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider: FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const userQuery = useUserQuery();

  const currentUser = userQuery.data;

  function logout() {
    logoutUser();
    navigate("/login");
  }

  const contextData = {
    isAuthenticated: !!currentUser,
    isLoading: userQuery.isLoading,
    currentUser,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {userQuery.isLoading ? <div>Loading Auth...</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
