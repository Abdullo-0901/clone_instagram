import { Link, Outlet } from "react-router-dom";
import logoText from "../assets/logo-text.png";
import { navbar } from "../components/navbar";

const Layout = () => {
  return (
    <div className="flex ">
      <header className="w-[230px] border-l-2 border h-[100vh] p-[5px_10px] mr-[182px] border-gray-300 sticky top-0 flex flex-col gap-y-2">
        <Link to={"/home"}>
          <img className="w-[120px] m-[35px_10px]" src={logoText} alt="" />
        </Link>
        {navbar.map((el) => {
          console.log(el.icons);

          return (
            <div>
              <Link
                className="flex hover:bg-gray-200 transition hover:scale-105 duration-500 ease-in-out p-[10px_11px] gap-3  rounded-xl"
                to={el.path}
                key={el.id}
              >
                <span>{el.icons}</span>
                {el.title}
              </Link>
            </div>
          );
        })}
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
