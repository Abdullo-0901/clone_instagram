import { useQuery } from "react-query";
import { getUserById } from "../../services/post-service";
import { getToken } from "../../utils/token";
let userId = getToken();
export const UseGetUserProfileById = () => {
  const userService = new getUserById();
  return useQuery(["usersById"], () => userService.getById(userId?.sid), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
