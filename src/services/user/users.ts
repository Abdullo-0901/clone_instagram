import axios from "axios";
import { IUser, getUserByIdInterface } from "../../interfaces";
const token = window.localStorage.getItem("access_token");
class getUser {
    async getUser() {
      return axios.get<IUser>(
        `${import.meta.env.VITE_APP_API_URL}User/get-users?PageSize=100`,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        },
      );
    }
    async getById(id?: string) {
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

  export {getUser };
