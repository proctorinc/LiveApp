import { FC, ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";
import { QueryContextProvider } from "../context/QueryContext";
import { AuthContextProvider } from "@/features/auth/context/AuthContext";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  return (
    <QueryContextProvider>
      <Router>
        <AuthContextProvider>
          <ErrorBoundary FallbackComponent={() => <div>Oops!</div>}>
            <ReactQueryDevtools />
            {children}
          </ErrorBoundary>
        </AuthContextProvider>
      </Router>
    </QueryContextProvider>
  );
};
