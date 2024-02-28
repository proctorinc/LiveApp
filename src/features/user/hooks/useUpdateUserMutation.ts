import { useMutation } from "react-query";
import { updateUser } from "../api/updateUser";
import { UpdateUserBody } from "@/types";

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (userBody: UpdateUserBody) => updateUser(userBody),
  });
};
