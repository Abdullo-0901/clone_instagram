import axios from "axios";
import { getToken } from "../utils/token";
let token = localStorage.getItem("access_token");
let userId = getToken();
export const layoutApi = axios.get(
  `${
    import.meta.env.VITE_APP_API_URL
  }UserProfile/get-user-profile-by-id?id=${userId?.sid}`,
  {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  },
);
