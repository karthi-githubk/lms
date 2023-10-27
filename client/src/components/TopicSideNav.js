// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Tab, Tabs } from "@mui/material";
// import axios from "axios";
// import StudyMaterialComponent from "./StudyMaterialComponent";
// import PracticeComponent from "./PracticeComponent";
// import TestComponent from "./TestComponent";
// import NewModuleDescription from "./NewModuleDescription";

// const TopicSideNav = () => {
//   const { module_name } = useParams();
//   const [topics, setTopics] = useState([]);
//   const [selectedTopic, setSelectedTopic] = useState(null);
//   const [selectedModule, setSelectedModule] = useState({
//     module_name: "",
//     module_desc: "",
//   });
//   const [mcqQuestions, setMcqQuestions] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/modules/get/${module_name}`)
//       .then((response) => {
//         const data = response.data;
//         if (data.length > 0) {
//           setSelectedModule({
//             module_name: data[0].module_name,
//             module_image: data[0].module_img,
//             description: data[0].module_desc,
//           });
//         } else {
//           console.error("Module data not found.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching module data:", error);
//       });

//     axios
//       .get(`http://localhost:5000/api/topics/get`)
//       .then((response) => {
//         const data = response.data;
//         setTopics(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching topics data:", error);
//       });
//   }, [module_name]);

//   const handleContentClick = (contentType, topic) => {
//     setSelectedTopic({ ...topic, contentType });
//     if (contentType === "test") {
//       fetchMcqQuestions(topic.id);
//     }
//   };

//   const fetchMcqQuestions = (topicId) => {
//     axios
//       .get(`http://localhost:5000/api/mcq_questions/get?topic_id=${topicId}`)
//       .then((response) => {
//         const data = response.data;
//         setMcqQuestions(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching MCQ questions:", error);
//       });
//   };

//   const [LocalmoduleData, setLocalmoduleData] = useState([]);
//   useEffect(() => {
//     // Fetch data from local storage and set it in the state
//     const storedTopicData = localStorage.getItem("moduleref");
//     if (storedTopicData) {
//       setLocalmoduleData(JSON.parse(storedTopicData));
//     }
//   }, []);
//   console.log("localmoduledata", LocalmoduleData);

//   return (
//     <div className="d-flex" style={{ marginTop: "" }}>
//       <div
//         className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
//         style={{
//           width: "200px",
//           position: "fixed",
//           height: "100%",
//           paddingTop: "60px", 
//           // overflowY:'scroll', // Adjust this value based on your design
//         }}
//       >
//         <hr className="sidebar-divider my-0" />
//         <br />

//         <>
//           <h2
//             className=""
//             style={{
//               marginTop: "3px",
//               fontSize: "23px",
//               color: "white",
//               border: "none",
//               marginLeft: "25%",
//               textTransform: "uppercase",
//             }}
//           >
//             {selectedModule.module_name} Topics
//           </h2>
//           <p className="text-white ms-3" style={{ fontSize: "18px" }}>
//             {selectedModule.module_desc}
//           </p>
//         </>
//         <li className="nav-item font">
//           <ul
//             style={{
//               listStyleType: "disc",
//               paddingLeft: "15px",
//             }}
//           >
//             {topics.map((topic) =>
//               LocalmoduleData.module_name == topic.module_name ? (
//                 <li
//                   key={topic.id}
//                   style={{
//                     marginLeft: "12%",
//                   }}
//                 >
//                   <a
//                     variant="outlined"
//                     onClick={() => handleContentClick("studyMaterial", topic)}
//                     className={`list-group-item list-group-item-action ${
//                       selectedTopic === topic ? "active" : ""
//                     }`}
//                     style={{
//                       width: "100%",
//                       textAlign: "start",
//                       padding: "5px",
//                       color: selectedTopic === topic ? "#071952" : "white",
//                       fontSize: "25px",
//                       fontFamily: "serif",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {topic.topic_name}
//                   </a>
//                 </li>
//               ) : (
//                 ""
//               )
//             )}
//           </ul>
//         </li>
//       </div>
//       <div
//         className="content"
//         style={{
//           marginLeft: "280px",
//           marginTop: "60px",
//           boxShadow: "none",
//           width: "80%",

//           height: "80vh",
//           // overflowY: "scroll",
//         }}
//       >
//         {selectedTopic ? (
//           <>
//             <div
//               style={{
//                 position: "sticky",
//                 top: "14%",
//                 zIndex: "100",
//                 backgroundColor: "white",
//                 marginTop: "8%",
//               }}
//             >
//               <Tabs
//                 value={selectedTopic?.contentType}
//                 onChange={(event, newValue) =>
//                   setSelectedTopic({ ...selectedTopic, contentType: newValue })
//                 }
//                 variant="fullWidth"
//                 TabIndicatorProps={{
//                   style: {
//                     backgroundColor: "orange",
//                   },
//                 }}
//               >
//                 <Tab label="Materials" value="studyMaterial" />
//                 <Tab label="Practice" value="practice" />
//                 <Tab label="Test Your Skills" value="test" />
//               </Tabs>
//             </div>
//             <div
//               style={{
//                 width: "100%",
//                 paddingTop: "1px", // Adjust this value based on your tab height
//               }}
//             >
//               {selectedTopic?.contentType === "studyMaterial" && (
//                 <StudyMaterialComponent
//                   topic_desc={selectedTopic.topic_desc}
//                   topic_name={selectedTopic.topic_name}
//                   module_name={selectedModule.module_name}
//                   pdf_file={selectedTopic.pdf_file}
//                   video_file={selectedTopic.video_file}
//                 />
//               )}
//               {selectedTopic?.contentType === "practice" && (
//                 <PracticeComponent
//                   lowQuestion={selectedTopic.low}
//                   mediumQuestion={selectedTopic.medium}
//                   hardQuestion={selectedTopic.hard}
//                   topicname={selectedTopic.topic_name}
//                 />
//               )}
//               {selectedTopic?.contentType === "test" && (
//                 <TestComponent
//                   selectedTopic={selectedTopic} // Pass the selectedTopic prop to TestComponent
//                 />
//               )}
//             </div>
//           </>
//         ) : (
//           <NewModuleDescription />
//         )}
//       </div>
//     </div>
//   );
// };

// export default TopicSideNav;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs } from "@mui/material";
import axios from "axios";
import StudyMaterialComponent from "./StudyMaterialComponent";
import PracticeComponent from "./PracticeComponent";
import TestComponent from "./TestComponent";
import NewModuleDescription from "./NewModuleDescription";

const TopicSideNav = ({ onTopicSelect }) => {
  const { module_name } = useParams();
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedModule, setSelectedModule] = useState({
    module_name: "",
    module_desc: "",
  });
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [activeTopicId, setActiveTopicId] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/modules/get/${module_name}`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          setSelectedModule({
            module_name: data[0].module_name,
            module_image: data[0].module_img,
            description: data[0].module_desc,
          });
        } else {
          console.error("Module data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching module data:", error);
      });

    axios
      .get(`http://localhost:5000/api/topics/get`)
      .then((response) => {
        const data = response.data;
        setTopics(data);
      })
      .catch((error) => {
        console.error("Error fetching topics data:", error);
      });
  }, [module_name]);

  const fetchMcqQuestions = (topicId) => {
    axios
      .get(`http://localhost:5000/api/mcq_questions/get?topic_id=${topicId}`)
      .then((response) => {
        const data = response.data;
        setMcqQuestions(data);
      })
      .catch((error) => {
        console.error("Error fetching MCQ questions:", error);
      });
  };
  

  const handleContentClick = (contentType, topic) => {
    setSelectedTopic({ ...topic, contentType });
    setActiveTopicId(topic.id);
    if (contentType === "test") {
      fetchMcqQuestions(topic.id);
    }
    onTopicSelect(topic.topic_name);
  };

  const [LocalmoduleData, setLocalmoduleData] = useState([]);
  useEffect(() => {
    const storedTopicData = localStorage.getItem("moduleref");
    if (storedTopicData) {
      setLocalmoduleData(JSON.parse(storedTopicData));
    }
  }, []);


  return (
    <div className="d-flex" style={{ marginTop: "" }}>
      <div
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        style={{
          width: "200px",
          position: "fixed",
          height: "100%",
          paddingTop: "60px",
          overflowY:'scroll',
        }}
      >
         <style>
          {`
            .navbar-nav::-webkit-scrollbar {
              width: 10px;
            }

            .navbar-nav::-webkit-scrollbar-thumb {
              background-color: white; // Change the scrollbar thumb color to white
              border-radius: 5px;
            }

            .navbar-nav::-webkit-scrollbar-track {
              background-color: transparent;
            }
          `}
        </style>
        <hr className="sidebar-divider my-0" />
        <br />

        <>
          <h2
            className=""
            style={{
              marginTop: "3px",
              fontSize: "23px",
              color: "white",
              border: "none",
              marginLeft: "25%",
              textTransform: "uppercase",
            }}
          >
            {selectedModule.module_name} Topics
          </h2>
          <p className="text-white ms-3" style={{ fontSize: "18px" }}>
            {selectedModule.module_desc}
          </p>
        </>
        <li className="nav-item font">
          <ul
            style={{
              listStyleType: "disc",
              paddingLeft: "15px",
            }}
          >
            {topics.map((topic) =>
              LocalmoduleData.module_name == topic.module_name ? (
                <li
                  key={topic.id}
                  style={{
                    marginLeft: "12%",
                  }}
                >
                  <a
                    variant="outlined"
                    onClick={() => handleContentClick("studyMaterial", topic)}
                    className={`list-group-item list-group-item-action`}
                    style={{
                      width: "100%",
                      textAlign: "start",
                      padding: "5px",
                      fontSize: "25px",
                      fontFamily: "serif",
                      cursor: "pointer",
                      borderTopLeftRadius:'20px',
                      borderBottomLeftRadius: "20px",
                      background:
                        topic.id === activeTopicId ? "white" : "transparent",
                      color:
                        topic.id === activeTopicId ? "#071952" : "white",
                    }}
                    
                  >
                    {topic.topic_name}
                  </a>
                </li>
              ) : (
                ""
              )
            )}
          </ul>
        </li>
      </div>
      <div
        className="content"
        style={{
          marginLeft: "280px",
          marginTop: "60px",
          boxShadow: "none",
          width: "80%",
          height: "80vh",
        }}
      >
        {selectedTopic ? (
          <>
            <div
              style={{
                position: "sticky",
                top: "14%",
                zIndex: "100",
                backgroundColor: "white",
                marginTop: "8%",
              }}
            >
              <Tabs
                value={selectedTopic?.contentType}
                onChange={(event, newValue) =>
                  setSelectedTopic({ ...selectedTopic, contentType: newValue })
                }
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "orange",
                  },
                }}
              >
                <Tab label="Materials" value="studyMaterial" />
                <Tab label="Practice" value="practice" />
                <Tab label="Test Your Skills" value="test" />
              </Tabs>
            </div>
            <div
              style={{
                width: "100%",
                paddingTop: "1px",
              }}
            >
              {selectedTopic?.contentType === "studyMaterial" && (
                <StudyMaterialComponent
                  topic_desc={selectedTopic.topic_desc}
                  topic_name={selectedTopic.topic_name}
                  module_name={selectedModule.module_name}
                  pdf_file={selectedTopic.pdf_file}
                  video_file={selectedTopic.video_file}
                  ppt_file={selectedTopic.ppt_file}
                />
              )}
              {selectedTopic?.contentType === "practice" && (
                <PracticeComponent
                 topic={selectedTopic}
                />
              )}
              {selectedTopic?.contentType === "test" && (
                <TestComponent
                  selectedTopic={selectedTopic}
                />
              )}
            </div>
          </>
        ) : (
          <NewModuleDescription />
        )}
      </div>
    </div>
  );
};

export default TopicSideNav;

