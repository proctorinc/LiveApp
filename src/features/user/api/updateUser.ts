import { fetchQuery } from "@/lib/fetch";
import { UpdateUserBody, User } from "@/types";

export const updateUser = async (updateUserBody: UpdateUserBody) => {
  return fetchQuery<User>({
    method: "PATCH",
    endpoint: `/user`,
    body: updateUserBody,
  });
};
