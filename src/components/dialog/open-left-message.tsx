import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserInfoInterface } from "../../interfaces";
import { getUserByUserName } from "../../services/search";
import { setOpenEditOrDeleteModal, setopenLeft } from "../../store/storeSlice";
import CircularIndeterminate from "../Progres";
import BasicTabs from "../tabs";
import { getToken } from "../../utils/token";
import MessageDialog from "./dialog-message";

const OpenLeftMessage = () => {
  const getByUserName = new getUserByUserName();
  const openleftmessage = useSelector(({ modal }) => modal.openleftmessage);
  const openEditOrDeleteModal = useSelector(
    ({ modal }) => modal.openEditOrDeleteModal,
  );
  const [value, setValue] = useState<string>("");
  const dispatch = useDispatch();
  const values = value;
  const user = getToken();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["byUserName", values], () => getByUserName.getUser(values), {
    enabled: !!values,
  });

  const usersStorage: UserInfoInterface[] =
    JSON.parse(localStorage.getItem("users") as string) || [];
  console.log(usersStorage);

  const handleClick = (user: UserInfoInterface) => {
    const existUser = usersStorage.find((us) => us.id == user?.id);
    if (!existUser) {
      const data = [...usersStorage, { ...user }];
      localStorage.setItem("users", JSON.stringify(data));
    }
  };

  const removeUser = (id: string) => {
    const updateUser = usersStorage.filter((us) => us.id !== id);
    localStorage.setItem("users", JSON.stringify(updateUser));
  };
  const removeAll = () => {
    localStorage.removeItem("users");
    refetch();
  };
  return (
    <div className="absolute  min-h-full  ">
      <div
        className={`fixed w-[350px] p-[15px_14px] bg-white border-l border-r rounded-[0_10px_10px_0] border-gray-200 ${
          openleftmessage ? "left-[65px]" : "left-[-65px]"
        } h-full`}
      >
        <div className="flex justify-between p-[4px_10px] items-center">
          <div className="flex items-center cursor-pointer">
            <h1 className="font-bold text-black ">{user?.userName}</h1>
            <KeyboardArrowDownIcon />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setOpenEditOrDeleteModal(true))}
          >
            <KeyboardCommandKeyIcon />
          </div>
        </div>
        <BasicTabs />
        <div className="relative w-full">
          <span
            onClick={() => setValue("")}
            className="absolute top-10 right-2 cursor-pointer"
          >
            {isLoading ? (
              <div className="mt-[3px]">
                <CircularIndeterminate />
              </div>
            ) : (
              <ClearIcon className="" />
            )}
          </span>
        </div>
        <hr className="my-10" />
        <div className="flex items-center  justify-between">
          <h1 className="ml-4 font-medium mb-5">Недавнее</h1>
          {usersStorage.length != 0 && value == "" && (
            <h2
              onClick={() => removeAll()}
              className="text-[#0095f6] mb-5 cursor-pointer"
            >
              Очисть всё
            </h2>
          )}{" "}
        </div>
      </div>
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
                {users?.data.data.length == 0 || value == "" ? (
                  <div className="flex flex-col gap-6 ">
                    {usersStorage.map((us) => {
                      return (
                        <Link
                          onClick={() => dispatch(setopenLeft(false))}
                          className=""
                          to={`user/${us.id}`}
                        >
                          <div className="flex gap-6 items-center justify-between">
                            <div className="flex gap-6 items-center justify-between">
                              <Avatar
                                sx={{ width: 46, height: 46 }}
                                src={`${import.meta.env.VITE_APP_FILES_URL}${
                                  us.avatar
                                }`}
                              />
                              <div className="flex flex-col justify-between">
                                <h1 className="font-semibold text-black">
                                  {us.userName}
                                </h1>
                                <h1 className="text-gray-300">{us.fullName}</h1>
                              </div>
                            </div>
                            <div onClick={() => removeUser(us.id)}>
                              <ClearIcon className="" />{" "}
                            </div>
                          </div>{" "}
                        </Link>
                      );
                    })}
                    <div className="h-full w-full flex justify-center items-center">
                      <h1 className="text-gray-200">Нет недавних запросов.</h1>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 ">
                    {users?.data.data.map((user) => {
                      return (
                        <Link
                          onClick={() => {
                            handleClick(user), dispatch(setopenLeft(false));
                          }}
                          className=""
                          to={`user/${user.id}`}
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
                )}
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
    </div>
  );
};

export default OpenLeftMessage;
