import axios from "axios";
import {
  IPost,
  IPostById,
  PropsComment,
  likeId
} from "../../interfaces";
const token = window.localStorage.getItem("access_token");

class getPostsService {
  async responsePost() {
    return axios.get<IPost>(
      `${import.meta.env.VITE_APP_API_URL}Post/get-posts`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
  async getPostById(postId: number) {
    return axios.get<IPostById>(
      `${import.meta.env.VITE_APP_API_URL}Post/get-post-by-id?id=${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }

  async like(postId: number) {
    return axios.post<likeId>(
      `${import.meta.env.VITE_APP_API_URL}Post/like-post?postId=${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  async comment(data: PropsComment): Promise<PropsComment> {
    const response = await axios.post<PropsComment>(
      `${import.meta.env.VITE_APP_API_URL}Post/add-comment`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  }
  async deletePost(id: number) {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_API_URL}Post/delete-comment?commentId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }
}


export { getPostsService };

