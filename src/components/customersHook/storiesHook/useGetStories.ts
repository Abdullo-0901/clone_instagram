import { useQuery } from "react-query";
import { getStories } from "../../../services/stories/servises-stories";
export const UseGetStories = () => {
  const getStoriesHook = new getStories();
  return useQuery(["stories"], () => getStoriesHook.getStories(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
