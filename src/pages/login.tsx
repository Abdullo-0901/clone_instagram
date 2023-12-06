import logoText from "../assets/logo-text.png";
import phone from "../assets/phone.png";
import Basic from "../components/ui/login-form";
const Login = () => {
  return (
    <div className="h-100vh container p-[45px_167px] grid grid-cols-2 gap-10">
      <div className="">
        <img src={phone} alt="" />
      </div>
      <div className="w-full items-center p-[20px_15px] border border-1  border-gray-500 flex flex-col">
        <img src={logoText} alt="text-instagram" className="w-[185px] mt-5" />
        <Basic />
      </div>
    </div>
  );
};

export default Login;
