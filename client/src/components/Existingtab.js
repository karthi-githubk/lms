// import React, { useState } from "react";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import SchoolIcon from "@mui/icons-material/School";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import TopicIcon from "@mui/icons-material/Topic";
// import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
// import AddCourseForm from "./Courseform";
// import TopicsForm from "./TopicsForm";
// import CourseTable from "./Coursemanage";
// import ModuleTable from "./ModuleTable";
// import TopicTable from "./TopicTable";
// import TopicMcqTable from "./TopicMcqTable";
// import Breadcrumbs from "./Breadcrumb";

// export default function Existingtab() {
//   const [value, setValue] = useState("1");

//   const [breadcrumbs, setBreadcrumbs] = useState({
//     // 1: [
//     //   { text: "Dashboard", url: "/adminpanel" },
//     //   { text: "Course Details", url: "/admin/Coursemanage" },
//     //   { text: "Courses", url: "/admin/existingcourses" },
//     // ],
//     1: [
//       { text: "Dashboard", url: "/adminpanel" },
//       { text: "Course Details", url: "/admin/Coursemanage" },
//       { text: " Modules", url: "/admin/existingcourses" },
//     ],
//     2: [
//       { text: "Dashboard", url: "/adminpanel" },
//       { text: "Course Details", url: "/admin/Coursemanage" },
//       { text: " Topics", url: "/admin/existingcourses" },
//     ],
//     3: [
//       { text: "Dashboard", url: "/adminpanel" },
//       { text: "Coursemanage", url: "/admin/Coursemanage" },
//       { text: "Topic Mcq", url: "/admin/existingcourses" },
//     ],
//   });

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div>
//       <Breadcrumbs items={breadcrumbs[value]} />,
//       <div style={{ width: "80%", marginLeft: "20%", marginTop: "11%" }}>
//         <TabContext value={value}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="icon label tabs example"
//             TabIndicatorProps={{
//               style: {
//                 backgroundColor: "orange", // Set the desired color for the active indicator
//               },
//             }}
//           >
//             {/* <Tab
//               icon={<SchoolIcon />}
//               label="Courses"
//               value="1"
//               sx={{ width: "25%" }}
//             /> */}
//             <Tab
//               icon={<AssignmentIcon />}
//               label="Modules"
//               value="1"
//               sx={{ width: "33%" }}
//             />
//             <Tab
//               icon={<TopicIcon />}
//               label="Topics"
//               value="2"
//               sx={{ width: "33%" }}
//             />
//             <Tab
//               icon={<TopicIcon />}
//               label="MCQ"
//               value="3"
//               sx={{ width: "33%" }}
//             />
//           </Tabs>
//           {/* <TabPanel value="1">
//             <CourseTable />
//           </TabPanel> */}
//           <TabPanel value="1">
//             <ModuleTable />
//           </TabPanel>
//           <TabPanel value="2">
//             <TopicTable />
//           </TabPanel>
//           <TabPanel value="3">
//             <TopicMcqTable />
//           </TabPanel>
//         </TabContext>
//       </div>
//     </div>
//   );
// }
