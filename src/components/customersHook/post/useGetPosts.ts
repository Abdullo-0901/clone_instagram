import { useQuery } from "react-query";
import { getPostsService } from "../../../services/post-service";
export const UseGetPost = () => {
  const postService = new getPostsService();
  return useQuery(["post"], () => postService.responsePost(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
// export const UsePostLike = (postId: number) => {
//   const postService = new getPostsService();
//   return useMutation(["like"], () => postService.like(postId), {
//     onSuccess() {
//       alert("ljilij");
//     },
//   });
// };
