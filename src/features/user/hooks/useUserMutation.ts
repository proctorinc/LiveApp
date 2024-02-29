import { useMutation } from "react-query";
import { getUser } from "../api/getUser";
import { User } from "@/types";

export const useUserMutation = () => {
  return useMutation<User>({
    mutationFn: getUser,
  });
};
