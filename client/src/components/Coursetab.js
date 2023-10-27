import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SchoolIcon from "@mui/icons-material/School";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Learning from "./Learning";
import Testskill from "./Testskill";
import Leveltab from "./Leveltab";

export default function Coursetab() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="course-tab">
      <TabContext value={value}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<SchoolIcon />} label="Learning Material" value="1"  sx={{width:'40%'}}/>
          <Tab icon={<AssignmentIcon />} label="Practice" value="2" sx={{width:'40%'}} />
          <Tab icon={<AssessmentIcon />} label="Test Your Skills" value="3" sx={{width:'40%'}} />
        </Tabs>
        <TabPanel value="1"><Learning/></TabPanel>
        <TabPanel value="2"><Leveltab/></TabPanel>
        <TabPanel value="3"><Testskill/></TabPanel>
      </TabContext>
    </div>
  );
}
