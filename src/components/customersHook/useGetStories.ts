import { useQuery } from "react-query";
import { getStories } from "../../services/post-service";
export const UseGetPost = () => {
  const getStoriesHook = new getStories();
  return useQuery(["post"], () => getStoriesHook.getStories(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
