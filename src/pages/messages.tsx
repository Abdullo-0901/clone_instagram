import CallIcon from "@mui/icons-material/Call";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import {
  useGetChats,
  useGetMessageById,
} from "../components/customersHook/chat-query-hooks/useChat";
import { UseGetUserProfileById } from "../components/customersHook/useGetUserById";
import MessageDialog from "../components/dialog/dialog-message";
import { ChatMessage } from "../interfaces";
import { chatService } from "../services/Chat/chat.service";
import { getUserByUserName } from "../services/search";
import {
  setInformationUser,
  setMessagePanel,
  setOpenEditOrDeleteModal,
} from "../store/storeSlice";
import { getToken } from "../utils/token";
const label = { inputProps: { "aria-label": "Switch demo" } };

const Messages = () => {
  const openMessage = useSelector(({ modal }) => modal.openmessageuser);
  const messageUserId = useSelector(({ modal }) => modal.employeeId);
  const refetchMessage = useSelector(({ modal }) => modal.refetchMessage);
  const messagePanel = useSelector(({ modal }) => modal.messagePanel);
  const informationUser = useSelector(({ modal }) => modal.informationUser);
  const openEditOrDeleteModal = useSelector(
    ({ modal }) => modal.openEditOrDeleteModal,
  );

  const [modalSmile, setModalSmile] = useState(false);
  const [smile, setSmile] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const dispatch = useDispatch();
  const chatServices = new chatService();
  const getByUserName = new getUserByUserName();
  const { data: getChats, isSuccess } = useGetChats();
  const { data: userInfo } = UseGetUserProfileById(messageUserId);
  const [messagePanelId, setMessagePanelId] = useState<number | string>("");

  const { mutate: sendMessage } = useMutation(
    ["sendMessage"],
    (data: ChatMessage) => chatServices.sendMessage(data),
    {
      async onSuccess() {
        await refetch();
      },
    },
  );

  const { mutate: deleteMessageId } = useMutation(
    ["deleteMessageId"],
    (messageId: number) => chatServices.deleteMessage(messageId),
    {
      async onSuccess() {
        await refetch();
      },
    },
  );

  const { data: users } = useQuery(
    ["byUserName", value],
    () => getByUserName.getUser(value),
    {
      enabled: !!value,
    },
  );

  const chatId = getChats?.data.find(
    (chat) => chat.receiveUser.userId === messageUserId,
  );

  const { data: message, refetch } = useGetMessageById(chatId?.chatId);
  const result = message?.data.sort((a, b) => a.messageId - b.messageId);

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
  const res = result ? [...result] : [];

  const userId = getToken();
  refetchMessage && refetch();

  return (
    <div
      className={` ${
        informationUser ? "w-[757px]" : "w-[1400px]"
      }   p-[10px] ml-[165px] `}
    >
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
          <div className="flex   z-[999] bg-white  w-full  justify-between items-center p-[10px] border-b-[1px]">
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
            <div className="wrapper-icons  flex items-center gap-[18px]">
              <CallIcon />
              <VideoCameraFrontIcon />
              <button
                onClick={() =>
                  dispatch(setInformationUser(informationUser ? false : true))
                }
              >
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

          <div
            className={`wrapper-message mt-[px] mb-5 flex-col-reverse gap-[20px] `}
          >
            {res?.map((mess) => {
              return (
                <>
                  <div
                    key={mess.messageId}
                    className={`message-user flex w-full items-center gap-[10px] ${
                      userId?.sid !== mess.userId
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    {messagePanel && (
                      <div
                        className={`${
                          messagePanelId === mess.messageId ? "flex" : "hidden"
                        }
                     modal-panel-message bg-[#000] gap-[20px]   text-[#fff] p-[5px] px-[10px] rounded-[5px]`}
                      >
                        <p
                          className="cursor-pointer"
                          onClick={() =>
                            dispatch(setOpenEditOrDeleteModal(true))
                          }
                        >
                          Переслать
                        </p>
                        <p className="cursor-pointer">Копировать</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            deleteMessageId(mess.messageId);
                          }}
                        >
                          Отменить отправку
                        </p>
                      </div>
                    )}
                    <div
                      onClick={() => {}}
                      className={`${
                        userId?.sid !== mess.userId
                          ? "hidden"
                          : "block panel-hidden"
                      } panel-message relative`}
                    >
                      <p
                        onClick={() => {
                          dispatch(setMessagePanel(true)),
                            setMessagePanelId(mess.messageId);
                        }}
                      >
                        ...
                      </p>
                    </div>
                    <Avatar
                      src={mess.userPhoto}
                      sx={{
                        display: userId?.sid !== mess.userId ? "flex" : "none",
                      }}
                    />
                    <p
                      className={`${
                        userId?.sid !== mess.userId
                          ? "bg-[#00000010]"
                          : "bg-[#3797f0] text-[#fff]"
                      } bg-[#00000010] inline rounded-[20px] p-[5px] px-[10px] my-2 ${
                        informationUser ? "mr-3" : ""
                      }`}
                    >
                      {mess.messageText}
                    </p>
                  </div>
                </>
              );
            })}
          </div>

          <div
            className={`${
              informationUser ? "w-[64%]" : "w-[94%]"
            } fixed  z-50 bottom-0`}
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage({
                  chatId: chatId?.chatId,
                  messageText: smile,
                });
                isSuccess ? (refetch(), setSmile("")) : alert("hello");
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
                        key={e}
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
      {openEditOrDeleteModal && (
        <MessageDialog
          show={openEditOrDeleteModal}
          handleClose={() =>
            dispatch(
              setOpenEditOrDeleteModal(openEditOrDeleteModal ? false : true),
            )
          }
        >
          <div className="p-[10px_15px]">
            <div className="wrapper-text flex justify-between items-center  p-[15px]">
              <p className="text-[16px] font-[700] mx-auto text-center">
                Новое сообщение
              </p>
              <button onClick={() => dispatch(setOpenEditOrDeleteModal(false))}>
                <CloseIcon
                  className="to-active cursor-pointer"
                  sx={{ fontSize: "28px" }}
                />
              </button>
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="flex flex-col justify-between"
            >
              <div className="wrapper-input flex items-end gap-[20px] py-[7px] px-[20px] border-t border-b mb-3">
                <label className="font-[500]">Кому:</label>
                <div
                  className={`${
                    value == "" ? "hidden" : "flex"
                  } items-end gap-[10px] bg-[#e0f1ff]  rounded-[12px] px-[12px] py-[3px] font-[600] cursor-pointer`}
                >
                  <p className="text-[14px] text-[#0095F6] hover:text-[#1d4a68]">
                    {value}
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch(setOpenEditOrDeleteModal(false))}
                  >
                    <CloseIcon
                      className="to-active cursor-pointer"
                      sx={{ fontSize: "18px", color: "#0095F6" }}
                    />
                  </button>
                </div>
                <input
                  onChange={(event) => setValue(event.target.value)}
                  value={value}
                  type="text"
                  placeholder="Поиск..."
                  className="text-[14px] outline-none w-[100%]"
                />
              </div>

              <div className="wrapper-search overflow-auto h-[50vh]">
                <div className="flex flex-col gap-6 ">
                  {users?.data.data.map((user) => {
                    return (
                      <Link
                        onClick={() => {
                          dispatch(setOpenEditOrDeleteModal(false));
                        }}
                        className=""
                        to={`messages`}
                      >
                        <div className="flex gap-6 items-center">
                          <Avatar
                            sx={{ width: 46, height: 46 }}
                            src={`${import.meta.env.VITE_APP_FILES_URL}${
                              user.avatar
                            }`}
                          />
                          <div className="flex flex-col justify-between">
                            <h1 className="font-semibold text-black">
                              {user.userName}
                            </h1>
                            <h1 className="text-gray-300">{user.fullName}</h1>
                          </div>
                        </div>{" "}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="h-[44px]  flex justify-center items-center text-center mx-auto w-[94%] bg-[#0095f6] text-[#fff] text-[14px] font-[600] rounded-[8px]"
                >
                  Чат
                </button>
              </div>
            </form>
          </div>
        </MessageDialog>
      )}
      {informationUser && (
        <div className="w-[370px] bg-white border-l  h-full fixed right-0 top-0">
          <div className="pl-5   pr-4">
            <h1 className="my-3 text-black font-semibold text-[20px]">
              Информация
            </h1>
            <div className="flex justify-between items-center">
              <h1 className="">Выключить уведомления о сообщениях</h1>
              <Switch {...label} defaultChecked />
            </div>
            <div className="flex justify-between items-center my-4 ">
              <h1>Переместить в папку "Основные"</h1>
              <button className="bg-gray-300 h-[32px]  px-3 rounded-xl hover:bg-gray-400">
                Переместить
              </button>
            </div>
          </div>
          <hr />
          <div className="flex flex-col ">
            <h1 className="text-[18px] text-black font-semibold px-3 my-2">
              Участники
            </h1>
            <Avatar
              src={mess.userPhoto}
              sx={{
                display: userId?.sid !== mess.userId ? "flex" : "none",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
