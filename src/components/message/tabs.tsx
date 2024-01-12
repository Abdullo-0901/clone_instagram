import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch } from "react-redux";
import { UserInfoInterface } from "../../interfaces";
import { setOpenMessageUser } from "../../store/storeSlice";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface TabPropsChild {
  child: UserInfoInterface[];
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

export default function BasicTabs(usersStorage: TabPropsChild) {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <div className="flex flex-col gap-6 ">
          {usersStorage.child.map((user) => {
            return (
              <div
                onClick={() => {
                  dispatch(setOpenMessageUser(false));
                  // handleClick(user);
                }}
                className="cursor-pointer"
              >
                <div className="flex gap-6 items-center">
                  <Avatar
                    sx={{ width: 46, height: 46 }}
                    src={`${import.meta.env.VITE_APP_FILES_URL}${user.avatar}`}
                  />
                  <div className="flex flex-col justify-between">
                    <h1 className="font-semibold text-black">
                      {user.userName}
                    </h1>
                    <h1 className="text-gray-300">{user.fullName}</h1>
                  </div>
                </div>{" "}
              </div>
            );
          })}
        </div>
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
