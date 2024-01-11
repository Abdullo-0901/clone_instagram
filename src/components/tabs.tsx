import ClearIcon from "@mui/icons-material/Clear";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useQuery } from "react-query";
import { UserInfoInterface } from "../interfaces";
import { getUserByUserName } from "../services/search";
import CircularIndeterminate from "./Progres";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const getByUserName = new getUserByUserName();
  const [value, setValue] = React.useState(0);
  const [valuee, setValuee] = React.useState<string>("");
  const values = valuee;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: users, isLoading } = useQuery(
    ["byUserName", values],
    () => getByUserName.getUser(values),
    {
      enabled: !!values,
    },
  );

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

  <div className="relative w-full">
    <input
      value={valuee}
      onChange={(e) => setValuee(e.target.value)}
      type="text"
      className="w-full pr-8 bg-gray-100 outline-none p-[8px_15px] rounded-xl mt-9"
      placeholder="Поиск"
    />
    <span
      onClick={() => setValuee("")}
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
  </div>;

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "black" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          aria-label="basic tabs example"
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab
            label={
              <span className={"text-black uppercase"}>
                P<span className={"text-black lowercase"}>rimary</span>
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <span className={"text-black uppercase"}>
                G<span className={"text-black lowercase"}>eneral</span>
              </span>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <span className={"text-black uppercase"}>
                R<span className={"text-black lowercase"}>equest</span>
              </span>
            }
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {users?.data.data.length == 0 || valuee == "" ? (
          <div className="flex flex-col gap-6 ">
            {usersStorage.map((us) => {
              return (
                <Link className="" to={`user/${us.id}`}>
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
                    handleClick(user);
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
