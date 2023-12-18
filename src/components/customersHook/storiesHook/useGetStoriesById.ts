import { useQuery } from "react-query";
import { getStoriesById } from "../../../services/stories/servises-stories";
export const UseGetStoriesById = (idx: string) => {
  const getStoriesHookById = new getStoriesById();
  return useQuery(["storiesId"], () => getStoriesHookById.getStoriesById(idx), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
