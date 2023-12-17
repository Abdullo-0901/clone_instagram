import { useQuery } from "react-query";
import { getStoriesById } from "../../../services/stories/servises-stories";
export const UseGetStoriesById = () => {
  const getStoriesHookById = new getStoriesById();
  return useQuery(["storiesId"], () => getStoriesHookById.getStoriesById(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
