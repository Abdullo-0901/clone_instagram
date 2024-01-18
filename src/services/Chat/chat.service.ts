import axios from "axios";
import { ChatMessage, GetChatById, GetChats, likeId } from "../../interfaces";
const token = window.localStorage.getItem("access_token");

class chatService {
  async getChats() {
    return axios.get<GetChats>(
      `${import.meta.env.VITE_APP_API_URL}Chat/get-chats`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
  async getChatById(chatId?: number) {
    return axios.get<GetChatById>(
      `${import.meta.env.VITE_APP_API_URL}Chat/get-chat-by-id?chatId=${chatId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }

  async createChat(postId: string) {
    return axios.post(
      `${
        import.meta.env.VITE_APP_API_URL
      }Chat/create-chat?receiverUserId=${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  async sendMessage(data: ChatMessage): Promise<ChatMessage> {
    console.log(data);

    const response = await axios.post<ChatMessage>(
      `${import.meta.env.VITE_APP_API_URL}Chat/send-message`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
  async deleteMessage(id: number) {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}Chat/delete-message?massageId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
  async deleteChat(id: number) {
    return axios.post<likeId>(
      `${import.meta.env.VITE_APP_API_URL}Chat/delete-chat?chatId=${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}

export { chatService };
