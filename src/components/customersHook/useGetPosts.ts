import { useQuery } from "react-query";
import { getPostsService } from "../../services/post-service";
export const UseGetPost = () => {
  const postService = new getPostsService();
  return useQuery(["post"], () => postService.responsePost(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
