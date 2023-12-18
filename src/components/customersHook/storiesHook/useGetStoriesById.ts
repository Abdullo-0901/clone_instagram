import { useQuery } from "react-query";
import { getStories } from "../../../services/stories/servises-stories";
export const UseGetStoriesById = (idx: string) => {
  const getStoriesHookById = new getStories();
  return useQuery(["storiesId"], () => getStoriesHookById.getStoriesById(idx), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
