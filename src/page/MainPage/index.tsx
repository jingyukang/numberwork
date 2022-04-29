import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import AboutStudent from "../../components/AboutStudent";
import BehaviourList from "../../components/BehaviourList";
import SimpleExperiment from "../../components/SimpleExperiment";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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

const MainPage = (): JSX.Element => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Behaviour" {...a11yProps(0)} />
          <Tab label="Simple Experiment" {...a11yProps(1)} />
          <Tab label="About Students" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BehaviourList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SimpleExperiment />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AboutStudent />
      </TabPanel>
    </Box>
  );
};

export default MainPage;
