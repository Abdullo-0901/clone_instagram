import axios from "axios";
import { IStories } from "../../interfaces";
const token = window.localStorage.getItem("access_token");
class getStories {
  async getStories() {
    return axios.get<IStories>(
      `${import.meta.env.VITE_APP_API_URL}Story/get-stories`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }

  async getStoriesById(idx?: string) {

    return axios.get<IStories>(
      `${import.meta.env.VITE_APP_API_URL}Story/get-stories?userId=${idx}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
}
export { getStories };
