import { useQuery } from "react-query";
import { getUser } from "../../services/Post/post-service";
import { getToken } from "../../utils/token";
let userId = getToken();
export const UseGetUserProfileById = () => {
  const userService = new getUser();
  return useQuery(["usersById"], () => userService.getById(userId?.sid), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
