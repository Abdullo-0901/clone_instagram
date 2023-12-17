import axios from "axios";
import { IStories } from "../../interfaces";
let token = window.localStorage.getItem("access_token");
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
}
class getStoriesById {
  async getStoriesById() {
    return axios.get<IStories>(
      `${
        import.meta.env.VITE_APP_API_URL
      }Story/get-stories?userId=ed6f0130-ac03-42f8-afee-68722712260b`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
    );
  }
}
export { getStories, getStoriesById };
