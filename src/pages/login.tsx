import logoText from "../assets/logo-text.png";
import phone from "../assets/phone.png";
import LoginForm from "../components/ui/login-form";

const Login = () => {
  return (
    <div className="h-100vh container p-[45px_167px] grid grid-cols-5 gap-10">
      <div className=" col-span-3  flex justify-center">
        <img src={phone} alt="" />
      </div>
      <div className="w-full col-span-2 items-center p-[20px_10px] border border-1  border-gray-500 flex flex-col">
        <img src={logoText} alt="text-instagram" className="w-[185px] mt-5" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
