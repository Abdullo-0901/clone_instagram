import { useQuery } from "react-query";
import { getUser } from "../../services/Post/post-service";
export const UseGetUser = () => {
  const getUsers = new getUser();
  return useQuery(["user"], () => getUsers.getUser(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
