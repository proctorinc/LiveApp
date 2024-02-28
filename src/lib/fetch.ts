import { axios } from "./axios";

type FetchQueryParameters = {
  endpoint: string;
  method?: string;
  body?: Object;
};

export async function fetchQuery<T>(params: FetchQueryParameters) {
  const { endpoint, method, body } = params;

  if (method === "POST") {
    return axios.post<T>(endpoint, body);
  } else if (method === "PATCH") {
    return axios.patch<T>(endpoint, body);
  } else if (method === "DELETE") {
    return axios.delete<T>(endpoint, body);
  } else {
    return axios.get<T>(endpoint);
  }
}
