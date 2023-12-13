import jwt_decode from "jwt-decode";

interface ITokenType {
  email: string;
  userName: string;
  name: string;
  exp: number;
  iat: number;
  sub: string;
  sid: string;
}

function saveToken(token: string) {
  localStorage.setItem("access_token", token);
}

function destroyToken() {
  localStorage.removeItem("access_token");
  window.location.pathname = "/";
}

function isValidToken(): boolean {
  const token = getToken() as ITokenType;

  if (token?.exp) {
    if (token?.exp * 1000 < Date.now()) {
      return true;
    }
  }

  return false;
}

function getToken() {
  try {
    const token: string | null = localStorage.getItem("access_token");
    if (token) {
      const decodedToken: { [key: string]: any } = jwt_decode(token);
      console.log(decodedToken);

      let obj = {
        email: decodedToken.email,
        userName: decodedToken.name,
        exp: decodedToken.exp,
        sid: decodedToken.sid,
      };
      return obj;
    }
  } catch (error) {
    console.log(error);
  }
}

export { destroyToken, getToken, isValidToken, saveToken };
