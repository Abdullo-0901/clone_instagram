import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AuthCheckProp {
  children: React.ReactNode;
}

const AuthCheck = (props: AuthCheckProp) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      return navigate("/home");
    }
  }, [navigate, token]);

  return props.children;
};

export default AuthCheck;
