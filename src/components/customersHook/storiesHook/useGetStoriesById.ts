import { useQuery } from "react-query";
import { getStories } from "../../../services/stories/servises-stories";
export const UseGetStoriesById = (idx?: string) => {
  const getStoriesHookById = new getStories();
  const  userId = idx;
  return useQuery(
    ["storiesId", userId],
    () => getStoriesHookById.getStoriesById(userId),

    {
      refetchOnWindowFocus: false,
      select: ({ data }) => data,
      enabled: !!userId,
    },
  );
};
