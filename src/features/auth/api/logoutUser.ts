import { fetchQuery } from "@/lib/fetch";

export const logoutUser = async () => {
  return fetchQuery({
    endpoint: `/auth/logout`,
  });
};
