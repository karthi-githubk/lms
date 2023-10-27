import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import NewCourseDescription from "./NewCourseDescription";
import ModuleSideNav from "./ModuleSideNav";
import UserLoginpage from "./UserLoginPage";
import BreadcrumbUser from "./BreadcrumbUser"; // Assuming you have a BreadcrumbUser component

function AddNewModuleComponent() {
  const location = useLocation();
  const { id } = useParams();
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    console.log("Fetching course name for id:", id);
    async function fetchCourseName() {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/get/${id}`);
        const data = response.data;
        console.log("Fetched course data:", data);
        const fetchedCourseName = data[0].coursename;
        if (fetchedCourseName) {
          setCourseName(fetchedCourseName);
        } else {
          console.error('Course name not found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }

    // Fetch the selected module from local storage
    const storedModuleData = JSON.parse(localStorage.getItem("moduleref"));
    if (storedModuleData) {
      fetchCourseName(storedModuleData);
    }
  }, [id]);

  const breadcrumbItems6 = [
    { text: "Home", url: "/userloginpage" },
    // Include course name dynamically based on the fetched courseName
    { text: courseName, url: location.pathname },
  ];

  return (
    <div>
      <BreadcrumbUser items={breadcrumbItems6} />
      <UserLoginpage />

      <div className="d-flex flex-row">
        <div className="col-5 sidebar-container">
          <ModuleSideNav />
        </div>

        <div className="sidebar-content w-99 pt-5 me-5">
          <NewCourseDescription />
        </div>
      </div>
    </div>
  );
}

export default AddNewModuleComponent;
