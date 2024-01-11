import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
  const [value, setValue] = React.useState(0);

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
        Item One
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
