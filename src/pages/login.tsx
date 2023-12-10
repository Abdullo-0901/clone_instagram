import { Link } from "react-router-dom";
import logoText from "../assets/logo-text.png";
import phone from "../assets/phone.png";
import LoginForm from "../components/ui/form/login-form";

const Login = () => {
  return (
    <div className="h-100vh container p-[45px_167px] grid grid-cols-5 gap-10">
      <div className=" col-span-3  flex justify-center">
        <img src={phone} alt="" />
      </div>
      <div className="col-span-2">
        <div className="w-full h-[420px]  items-center p-[20px_10px] border border-1  border-gray-200 flex flex-col">
          <img src={logoText} alt="text-instagram" className="w-[185px] mt-5" />
          <LoginForm />
          <span className="text-[20px] cursor-pointer font-[600] text-[#385185]">
            Войти через Facebook
          </span>
          <Link
            to={"/accounts-forgot-password"}
            className="text-[14px] cursor-pointer font-[400] mt-4 text-gray-500"
          >
            Забыли парол?
          </Link>
        </div>
        <div className="w-full mt-4  items-center p-[20px_10px] border border-1 gap-3 justify-center  border-gray-200 flex ">
          <span className="text-[15px]"> У вас ещё нет аккаунта?</span>{" "}
          <Link className="text-blue-900 font-[600] text-[16px]" to={"/signup"}>
            Зарегистрироваться
          </Link>
        </div>
        <span className="text-center block my-4">Установите приложение.</span>
      </div>
    </div>
  );
};

export default Login;
