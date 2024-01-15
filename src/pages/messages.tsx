import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UseGetUserProfileById } from "../components/customersHook/useGetUserById";
import { setOpenEditOrDeleteModal } from "../store/storeSlice";
const Messages = () => {
  const openMessage = useSelector(({ modal }) => modal.openmessageuser);
  const messageUser = useSelector(({ modal }) => modal.employeeId);
  const [modalSmile, setModalSmile] = useState(false);
  const [smile, setSmile] = useState<string>("");

  const dispatch = useDispatch();
  const { data: userInfo } = UseGetUserProfileById(messageUser);

  const smiles = [
    "😂",
    "😮",
    "😍",
    "😢",
    "👏",
    "🔥",
    "🎉",
    "💯",
    "❤️",
    "🤣",
    "🥰",
    "😘",
    "😭",
    "😊",
  ];
  const smilesSecond = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "🤣",
    "😂",
    "🙂",
    "🙃",
    "😉",
    "😊",
    "😇",
    "🥰",
    "😍",
    "🤩",
    "😘",
    "😗",
    "😚",
    "😙",
    "😋",
    "😛",
    "😜",
  ];

  return (
    <div className="w-[1400px]   p-[10px] ml-[165px] ">
      {openMessage ? (
        <div className="w-full gap-y-2 h-[78vh] flex flex-col justify-center items-center">
          <svg
            className="x1lliihq x1n2onr6 x5n08af"
            fill="currentColor"
            height={96}
            viewBox="0 0 96 96"
            width={96}
          >
            <path d="M48 0C21.532 0 0 21.533 0 48s21.532 48 48 48 48-21.532 48-48S74.468 0 48 0zm0 94C22.636 94 2 73.364 2 48S22.636 2 48 2s46 20.636 46 46-20.636 46-46 46zm12.227-53.284l-7.257 5.507c-.49.37-1.166.375-1.661.005l-5.373-4.031a3.453 3.453 0 00-4.989.921l-6.756 10.718c-.653 1.027.615 2.189 1.582 1.453l7.257-5.507a1.382 1.382 0 011.661-.005l5.373 4.031a3.453 3.453 0 004.989-.92l6.756-10.719c.653-1.027-.615-2.189-1.582-1.453zM48 25c-12.958 0-23 9.492-23 22.31 0 6.706 2.749 12.5 7.224 16.503.375.338.602.806.62 1.31l.125 4.091a1.845 1.845 0 002.582 1.629l4.563-2.013a1.844 1.844 0 011.227-.093c2.096.579 4.331.884 6.659.884 12.958 0 23-9.491 23-22.31S60.958 25 48 25zm0 42.621c-2.114 0-4.175-.273-6.133-.813a3.834 3.834 0 00-2.56.192l-4.346 1.917-.118-3.867a3.833 3.833 0 00-1.286-2.727C29.33 58.54 27 53.209 27 47.31 27 35.73 36.028 27 48 27s21 8.73 21 20.31-9.028 20.31-21 20.31z" />
          </svg>
          <p className="text-[20px]">Ваши сообщения</p>
          <p className="text-[14px] text-[#737373]">
            Отправляйте личные фото и сообщения другу или группе
          </p>
          <button
            onClick={() => dispatch(setOpenEditOrDeleteModal(true))}
            className="bg-[#0095f6] text-[#fff] text-[14px] font-[600] px-[16px] py-[6px] rounded-[8px] hover:bg-[#0065e0d4] transition-all duration-100"
          >
            Отправить сообщение
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex  w-full  justify-between items-center p-[10px] border-b-[1px]">
            <div className="user flex items-center gap-[15px] cursor-pointer w-[30%]">
              <Avatar
                sx={{ width: 46, height: 46 }}
                src={`${import.meta.env.VITE_APP_FILES_URL}${userInfo?.data
                  .image}`}
              />
              <div className="wrapper-text">
                <p className="text-[14px]">{userInfo?.data.fullName}</p>
                <p className="text-[12px] text-[#737373]">В сети</p>
              </div>
            </div>
            <div className="wrapper-icons flex items-center gap-[18px]">
              <CallIcon />
              <VideoCameraFrontIcon />
              <button>
                <svg
                  className="x1lliihq x1n2onr6 x5n08af css-1m9ymud-MuiSvgIcon-root"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="undefinedIcon"
                  aria-label="\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u043A\u0435"
                  fill="currentColor"
                  height="24"
                  width="24"
                >
                  <circle
                    cx="12.001"
                    cy="12.005"
                    fill="none"
                    r="10.5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></circle>
                  <circle cx="11.819" cy="7.709" r="1.25"></circle>
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.569 16.777L13.432 16.777"
                  ></path>
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.569 11.05L12 11.05 12 16.777"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className=" fixed w-[80%] z-50 bottom-0">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className={`${"w-[77%]"} bg-[#fff] p-[20px]`}
            >
              <div className="wrapper-input flex justify-between px-[15px] items-center border-[1px] w-full rounded-[50px]">
                <div
                  className="cursor-pointer"
                  onClick={() => setModalSmile(modalSmile ? false : true)}
                >
                  <SentimentSatisfiedAltIcon />
                </div>
                <input
                  value={smile}
                  type="text"
                  onChange={(e) => setSmile(e.target.value)}
                  className=" p-[10px] outline-none w-full"
                  placeholder="Напишите сообщение..."
                />
                <div className="input-icons flex items-center gap-[20px]">
                  <button
                    type="submit"
                    className={`text-[14px] font-[600] text-[#0095f6] hover:text-[#19405a] transition-all duration-100`}
                  >
                    Отправить
                  </button>
                  <KeyboardVoiceIcon />
                  <ImageSearchIcon />
                  <FavoriteIcon />
                </div>
              </div>
              {/* Modal Smile ============== */}
              <div
                className={`${
                  modalSmile ? "flex" : "hidden"
                } modal bg-[#fff] flex-col rounded-[10px] border-[1px] overflow-auto h-[60vh] w-[40%] shadow-lg absolute bottom-[90%] p-[15px]`}
              >
                <p>Самые популярные</p>
                <div className="wrapper-smile flex flex-wrap py-[10px]">
                  {smiles.map((e) => {
                    return (
                      <p
                        className="text-[35px] cursor-pointer"
                        onClick={() => setSmile((prev) => prev + e)}
                      >
                        {e}
                      </p>
                    );
                  })}
                </div>
                <p>Смайлики и люди</p>
                <div className="wrapper-smile-people flex flex-wrap">
                  {smilesSecond.map((e) => {
                    return (
                      <p
                        onClick={() => setSmile((prev) => prev + e)}
                        className="text-[35px] cursor-pointer"
                      >
                        {e}
                      </p>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
