import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type QueryProviderProps = {
  children: ReactNode;
};
const queryClient = new QueryClient();

export const QueryContextProvider: FC<QueryProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
