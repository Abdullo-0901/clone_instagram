import { useQuery } from "react-query";
import { getUser } from "../../services/user/users";
export const UseGetUserProfileById = (id?:string) => {
  const userService = new getUser();
  const userId = id;
  return useQuery(["usersById",userId], () => userService.getById(id), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
