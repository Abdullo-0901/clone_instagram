import logo from "../assets/logo-text.png";
import forgotPass from "../assets/forgot-password.png";
import ForgotForm from "../components/ui/form/forgot-form";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="container">
      <header className="w-full">
        <nav className="w-[60%] m-[0_auto]">
          <Link to={"/"}>
            <img className="w-[100px] my-6" src={logo} alt="" />
          </Link>
        </nav>
        <hr />
      </header>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[500px] border h-[600px] border-1 mt-4 border-black rounded-xl p-[15px_20px] flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <img className="w-[180px]" src={forgotPass} alt="" />
            <h1 className="text-[18px] mb-4 font-[600] text-black">
              Не удается войти?
            </h1>
            <span className="text-gray-300 text-center ">
              Введите свой электронный адрес, имя пользователя или номер
              телефона, и мы отправим вам ссылку для восстановления доступа к
              аккаунту.
            </span>
          </div>
          <ForgotForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
