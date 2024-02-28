import { useMutation } from "react-query";
import { getUser } from "../api/getUser";

export const useUserMutation = () => {
  return useMutation({
    mutationFn: getUser,
  });
};
