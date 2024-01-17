import { useQuery } from "react-query";
import { chatService } from "../../../services/Chat/chat.service";

const chatServices = new chatService();

export const useGetChats = () => {
  return useQuery(["getChats"], () => chatServices.getChats(), {
    refetchOnWindowFocus: false,
    select: ({ data }) => data,
  });
};
export const useGetMessageById = (id?: number) => {
  return useQuery(["getMessageById", id], () => chatServices.getChatById(id), {
    staleTime: 30000,
    select: ({ data }) => data,
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
