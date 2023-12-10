import { Link } from "react-router-dom";
import logoText from "../assets/logo-text.png";
import Button from "../components/ui/button";
import RegisterForm from "../components/ui/form/register-form";
const Register = () => {
  return (
    <div className="flex justify-center flex-col items-center mt-5">
      <div className="w-[390px] border border-1 border-gray-200 p-[10px_30px]">
        <Link to={"/"}>
          {" "}
          <img
            className="w-[150px] block m-[0_auto] mt-5"
            src={logoText}
            alt=""
          />
        </Link>
        <p className="text-center text-[19px] font-[500] my-3 text-gray-700">
          Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.
        </p>
        <Button
          label={"Войти через Facebook"}
          clasName={"w-[100%] p-[5px_15px] rounded-xl my-3"}
        />
        <div className="flex items-center justify-center mt-5">
          <div className="h-px bg-gray-700 w-1/2" />
          <p className="mx-4">ИЛИ</p>
          <div className="h-px bg-gray-700 w-1/2" />
        </div>
        <RegisterForm />
      </div>
      <div className="w-[390px] mb-7 mt-4  items-center p-[20px_10px] border border-1 gap-3 justify-center  border-gray-200 flex ">
        <span className="text-[15px]">Есть аккаунт?</span>{" "}
        <Link className="text-blue-900 font-[600] text-[16px]" to={"/"}>
          Вход
        </Link>
      </div>
    </div>
  );
};

export default Register;
