import { fetchQuery } from "@/lib/fetch";
import { User } from "@/types";

export const getUser = async () => {
  return fetchQuery<User>({
    endpoint: `/user/me`,
  });
};
