import { useQuery } from "react-query";
import { User } from "@/types";
import { getUser } from "../api/getUser";

export const useUserQuery = () => {
  return useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: getUser,
  });
};
