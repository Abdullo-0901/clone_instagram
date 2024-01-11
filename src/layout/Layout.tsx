import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logoText from "../assets/logo-text.png";
import OpenLeft from "../components/dialog/open-left-query";
import { navbar } from "../components/navbar";
import { setopenLeft, setopenLeftMessage } from "../store/storeSlice";
import { destroyToken, isValidToken } from "../utils/token";
import InstagramIcon from "@mui/icons-material/Instagram";
import OpenLeftMessage from "../components/dialog/open-left-message";
const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openleft = useSelector(({ modal }) => modal.openleft);
  const openleftmessage = useSelector(({ modal }) => modal.openleftmessage);
  useEffect(() => {
    if (isValidToken()) {
      destroyToken();
    }
  }, [navigate]);

  return (
    <div className="flex w-full">
      <div className="min-w-[250px]  min-h-[100vh]  border-gray-300">
        <header className="fixed min-w-[280px] p-[5px_10px]   min-h-[100vh] border-l-2 border flex flex-col gap-y-2  top-0">
          <Link to={"/home"}>
            {openleft | openleftmessage ? (
              <Link
                onClick={() => dispatch(setopenLeft(false))}
                to={`${openleft | openleftmessage ? "" : "home"}`}
                className={`flex  m-[35px_2px] hover:bg-gray-200 transition hover:scale-105 duration-500 ease-in-out p-[10px_9px] gap-3  rounded-xl ${
                  openleft ? "w-[45px]" : "w-full"
                }`}
              >
                <InstagramIcon width={100} />
              </Link>
            ) : (
              <img className="w-[120px] m-[35px_10px]" src={logoText} alt="" />
            )}
          </Link>
          {navbar.map((el, ind) => {
            return (
              <div key={ind}>
                {el.title == "Поисковый запрос" ? (
                  <Link
                    onClick={() => {
                      dispatch(setopenLeft(openleft ? false : true));
                      dispatch(
                        setopenLeftMessage(openleftmessage ? false : true),
                      );
                    }}
                    className={`flex  hover:bg-gray-200 transition hover:scale-105 duration-500 ease-in-out p-[10px_11px] gap-3  rounded-xl ${
                      openleft | openleftmessage ? "w-[45px]" : "w-full"
                    }`}
                    to={el.path}
                    key={el.id}
                  >
                    <span>{el.icons}</span>
                    {openleft | openleftmessage ? (
                      <span className="hidden"> {el.title}</span>
                    ) : (
                      <span> {el.title}</span>
                    )}
                  </Link>
                ) : el.title == "Сообщения" ? (
                  <Link
                    onClick={() => {
                      dispatch(setopenLeft(openleft ? false : true));
                      dispatch(
                        setopenLeftMessage(openleftmessage ? false : true),
                      );
                    }}
                    className={`flex  hover:bg-gray-200 transition hover:scale-105 duration-500 ease-in-out p-[10px_11px] gap-3  rounded-xl ${
                      openleft | openleftmessage ? "w-[45px]" : "w-full"
                    }`}
                    to={el.path}
                    key={el.id}
                  >
                    <span>{el.icons}</span>
                    {openleft | openleftmessage ? (
                      <span className="hidden"> {el.title}</span>
                    ) : (
                      <span> {el.title}</span>
                    )}
                  </Link>
                ) : (
                  <Link
                    onClick={() => {
                      dispatch(setopenLeft(false));
                      dispatch(setopenLeftMessage(false));
                    }}
                    className={`flex  hover:bg-gray-200 transition hover:scale-105 duration-500 ease-in-out p-[10px_11px] gap-3  rounded-xl ${
                      openleft | openleftmessage ? "w-[45px]" : "w-full"
                    }`}
                    to={el.path}
                    key={el.id}
                  >
                    <span>{el.icons}</span>
                    {openleft | openleftmessage ? (
                      <span className="hidden"> {el.title}</span>
                    ) : (
                      <span> {el.title}</span>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
          <Link
            className="flex  hover:bg-gray-200 transition hover:scale-105 items-center duration-500 ease-in-out p-[10px_11px] gap-3  rounded-xl"
            to={"/profile"}
          >
            <div className="w-[30px] rounded-full  ">
              <img
                className=" rounded-[50%] object-cover w-ful"
                src={`${
                  import.meta.env.VITE_APP_FILES_URL
                }1497ae79-d617-40d8-8e34-e34b4dfba87f.png`}
                alt=""
              />
            </div>
            <span className="text-black font-600">Профиль</span>
          </Link>
        </header>

        {openleft && <OpenLeft />}
        {openleftmessage && <OpenLeftMessage />}
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
