import ClearIcon from "@mui/icons-material/Clear";
import Avatar from "@mui/material/Avatar";
import KeyboardCommandKeyIcon from "@mui/icons-material/KeyboardCommandKey";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UserInfoInterface } from "../../interfaces";
import { getUserByUserName } from "../../services/search";
import { setopenLeft } from "../../store/storeSlice";
import CircularIndeterminate from "../Progres";
import BasicTabs from "../tabs";
import { getToken } from "../../utils/token";

const OpenLeftMessage = () => {
  const getByUserName = new getUserByUserName();
  const openleftmessage = useSelector(({ modal }) => modal.openleftmessage);
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
          <div className="cursor-pointer">
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
    </div>
  );
};

export default OpenLeftMessage;
