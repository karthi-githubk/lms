import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ModuleSideNav() {
  const { course_id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        // Fetch course data by course_id
        const courseResponse = await axios.get(
          `http://localhost:5000/api/course/get?id=${course_id}`
        );
        const courseData = await courseResponse.data;

        // Debugging: Log the course data to the console
        console.log("Course Data:", courseData);

        setCourse(courseData);

        // Fetch modules associated with the course by course_id
        const modulesResponse = await axios.get(
          `http://localhost:5000/api/modules/get?course_id=${course_id}`
        );
        const modulesData = await modulesResponse.data;

        // Debugging: Log the modules data to the console
        console.log("Modules Data:", modulesData);

        setModules(modulesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseAndModules();
  }, [course_id]);

  const [LocalcourseData, setLocalcourseData] = useState([]);
  useEffect(() => {
    // Fetch data from local storage and set it in the state
    const storedTopicData = localStorage.getItem("courseref");
    if (storedTopicData) {
      setLocalcourseData(JSON.parse(storedTopicData));
    }
  }, []);
  console.log("localcoursedata", LocalcourseData);
  const clearAndAddToLocalStorage = (data) => {
    localStorage.removeItem("moduleref");
    localStorage.setItem("moduleref", JSON.stringify(data));
  };

  return (
    <div>
      <div className="d-flex">
        {/* Sidebar */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          style={{ width: "200px", marginTop: "7%", overflowY: "scroll" }}
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
          {course && (
            <h2
              style={{
                marginTop: "23%",
                fontSize: "25px",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {course.coursename} Modules
            </h2>
          )}

          <li className="nav-item font">
            <ul
              style={{
                listStyleType: "disc",
                paddingLeft: "15px",
                marginTop: "1%",
                paddingTop: "5px",
              }}
            >
              {modules.map((module) =>
                LocalcourseData.coursename == module.course_name ? (
                  <li
                    key={module.id}
                    style={{ marginLeft: "14%", paddingTop: "12px" }}
                  >
                    <Link
                      to={`/course/${course_id}/modules/${module.id}/topics`}
                      className="hver increased-font-size"
                      activeClassName="active"
                      style={{
                        textDecoration: "none",
                        fontSize: "23px",
                        fontFamily: "serif",
                        color: "white",
                        transition: "color 0.3s", // Add a smooth transition for color change
                      }}
                      onClick={() => {
                        clearAndAddToLocalStorage(module);
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = "black"; // Change the text color on hover
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = "white"; // Reset the text color on hover out
                      }}
                    >
                      {module.module_name}
                    </Link>
                  </li>
                ) : (
                  ""
                )
              )}
            </ul>
          </li>
        </ul>

        {/* Course Description and Image */}
        <br />
        <br />
      </div>
    </div>
  );
}

export default ModuleSideNav;
