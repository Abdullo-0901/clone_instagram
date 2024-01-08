import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { getUserByUserName } from "../../services/search";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CircularIndeterminate from "../Progres";

const OpenLeft = () => {
  const getByUserName = new getUserByUserName();
  const openleft = useSelector(({ modal }) => modal.openleft);
  const [value, setValue] = useState<string>("");
  const values = value;
  const { data: users,isLoading } = useQuery(
    ["byUserName", values],
    () => getByUserName.getUser(values),
    {
      enabled: !!values,
    },
  );
  console.log(users?.data.data.length == 0);

  return (
    <div className="absolute  min-h-full  ">
      <div
        className={`fixed w-[350px] p-[15px_10px] bg-white border-l border-r rounded-[0_10px_10px_0] border-gray-200 ${
          openleft ? "left-[65px]" : "left-[-65px]"
        } h-full`}
      >
        <h1 className="font-semibold text-2xl">Поисковый запрос</h1>
        <div className="relative w-full">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            className="w-full pr-8 bg-gray-100 outline-none p-[8px_15px] rounded-xl mt-9"
            placeholder="Поиск"
          />
          <span
            onClick={() => setValue("")}
            className="absolute top-10 right-2 cursor-pointer"
          >
            {
                isLoading ? <div className="mt-[3px]"><CircularIndeterminate /></div> :
            <ClearIcon className="" />
            }
          </span>
        </div>
        <hr className="my-10" />
        <h1 className="ml-4 font-medium mb-5">Недавнее</h1>
        {users?.data.data.length == 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <h1 className="text-gray-200">Нет недавних запросов.</h1>
          </div>
        ) : (
          <div className="flex flex-col gap-6 ">
            {users?.data.data.map((user) => {
              return (
                <Link className="" to={`user/${user.id}`}>
                  <div className="flex gap-6 items-center">
                    <Avatar
                     sx={{ width: 46, height: 46 }}

                      src={`${import.meta.env.VITE_APP_FILES_URL}${
                        user.avatar
                      }`}
                    />
                    <div className="flex flex-col justify-between">
                        <h1 className="font-semibold text-black">{user.userName}</h1>
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

export default OpenLeft;
