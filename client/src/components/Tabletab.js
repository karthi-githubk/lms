import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TopicIcon from "@mui/icons-material/Topic";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import AddCourseForm from "./Courseform";
import TopicsForm from "./TopicsForm";
import AddModuleForm from "./Coursemodule";
import TopicMcq from "./TopicMcq";
import Breadcrumbs from "./Breadcrumb";

export default function Tabletab() {
  const [value, setValue] = useState("1");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <div style={{ width: "80%", marginTop: "1%" }}>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon label tabs example"
          >
            {/* <Tab  label="Add Courses" value="1" sx={{ width: '25%' }} /> */}
            <Tab  label="Topics" value="1" sx={{ width: '40%' }} />
            <Tab  label="Materials" value="2" sx={{ width: '40%' }} />
            <Tab  label="practise questions" value="3" sx={{ width: '%' }} />
          </Tabs>
          {/* <TabPanel value="1"><AddCourseForm /></TabPanel> */}
          <TabPanel value="1"></TabPanel>
          <TabPanel value="2"></TabPanel>
          <TabPanel value="3"></TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
