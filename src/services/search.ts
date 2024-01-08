import axios from "axios";
import { IUser } from "../interfaces";
const token = window.localStorage.getItem("access_token");
class getUserByUserName {
    async getUser(userName:string) {
        console.log(userName);
        
      return axios.get<IUser>(
        `${import.meta.env.VITE_APP_API_URL}User/get-users?UserName=${userName}&PageSize=100 `,
        {
          headers: {
            Authorization: `Bearer ${token} `,
          },
        },
      );
    }
   
  }

  
  export {getUserByUserName}
