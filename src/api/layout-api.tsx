import axios from "axios";
import { getToken } from "../utils/token";
let token = window.localStorage.getItem("access_token");

let userId = getToken();
export const layoutApi = async () => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_APP_API_URL
      }UserProfile/get-user-profile-by-id?id=${userId?.sid}`,
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
