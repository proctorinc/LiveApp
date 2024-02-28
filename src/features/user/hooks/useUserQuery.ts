import { useQuery } from "react-query";
import { getUser } from "../api/getUser";

export const useUserQuery = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getUser,
  });
};
