import axios from "axios";
import { getToken } from "../utils/token";
import { IPost, getUserByIdInterface } from "../interfaces";
const token = window.localStorage.getItem("access_token");

const userId = getToken();
console.log(userId?.sid);
export const layoutApi = async () => {
  try {
    const response = await axios.get<getUserByIdInterface>(
      `${
        import.meta.env.VITE_APP_API_URL
      }UserProfile/get-user-profile-by-id?id=${userId?.sid}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
    console.log(response.data);

    return (await response).data;
  } catch (error) {
    console.log(error);
  }
};
export const getPosts = async () => {
  try {
    const response = await axios.get<IPost>(
      `${import.meta.env.VITE_APP_API_URL}Post/get-posts`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
    return (await response).data;
  } catch (error) {
    console.log(error);
  }
};
