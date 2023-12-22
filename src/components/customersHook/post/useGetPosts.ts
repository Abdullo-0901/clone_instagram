import { useQuery } from "react-query";
import { getPostsService } from "../../../services/Post/post-service";
export const UseGetPost = () => {
  const postService = new getPostsService();
  return useQuery(["post"], () => postService.responsePost(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
export const useGetPostById = (idx: number) => {

  const getPostByIdUser = new getPostsService();
  const userId = idx;
  return useQuery(
    ["postId", userId],
    () => getPostByIdUser.getPostById(userId),

    {
      refetchOnWindowFocus: false,
      select: ({ data }) => data,
      enabled: !!userId,
    },
  );
};
