import axios from "axios";
import { IPost, IUser, getUserByIdInterface, likeId } from "../interfaces";
let token = window.localStorage.getItem("access_token");

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

  async like(postId: number) {
    console.log(postId);

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
}
class getUser {
  async getUser() {
    return axios.get<IUser>(
      `${import.meta.env.VITE_APP_API_URL}User/get-users`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
  async getById(id: any) {
    return axios.get<getUserByIdInterface>(
      `${
        import.meta.env.VITE_APP_API_URL
      }UserProfile/get-user-profile-by-id?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
}

export { getPostsService, getUser };
