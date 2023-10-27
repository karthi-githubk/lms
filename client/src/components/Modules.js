import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { CardContent, CardHeader, CardMedia } from "@mui/material";
// import { Card, CardHeader, CardContent, CardMedia } from "@material-ui";
// import './Modules.css'

function Modules() {
  const cardStyle = {
    marginBottom: "20px",
  };

  const contentStyle = {
    lineHeight: "1.5", // Adjust the line spacing here (1.5 = 1.5 times the font size)
  };
  

  const { id } = useParams();
  const coursesList = useSelector((state) => state.courses.coursesList);
  const course = coursesList.find((c) => c.id === parseInt(id));

  if (!course) {
    return <div></div>;
  }

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
          style={{
            width: "250px",
            height: "",
            background: "",
            overflowX: "hidden",
            position: "fixed",
            top:'5%'
          }}
        >
          <hr className="sidebar-divider my-0" />
          <br />
          <h2 className="text-center mt-3" style={{textTransform:"uppercase",color:"#fff200",fontWeight:"bold"}}>{course.courseName}</h2>
          <li className="nav-item font">
            {course.modules.map((module) => (
              <div
                key={module.moduleName}
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "yellow",
                  marginTop: "40px",
                }}
              >
                <h6>
                  <Link to={`/courses/${id}/modules/${module.moduleName}`} style={{color:"white",textDecoration:"none",fontSize:"22px"}}>
                    {module.moduleName}
                  </Link>
                </h6>
              </div>
            ))}
          </li>
          {/* Add more list items for other links if needed */}
          {/* ... */}
        </div>

        {/* Course Description and Image */}
        <br />
        <br />
        <div
          className="d-flex flex-column  justify-content-center align-items-center"
          style={{ marginTop: "1px", marginLeft: "25%", fontFamily: "sans-seriff" ,width:"70%"}}
        >
          <div className="content mt-5 me-5">
            <Card variant="outlined" style={{border:"4px solid #f368e0",boxShadow:"3px 3px 3px 3px #f368e0"}}>
              <CardHeader
                title={course.courseName}
                style={{ textAlign: "center",fontWeight:'bolder',textTransform:"uppercase" }}
              />
              <CardContent>
                <div className="row ">
                  <div className="col-8">
                    <h5 style={{textAlign: "justify",fontSize:"24px", fontFamily: "Poppins,",}}>{course.courseDescription}</h5>
                  </div>
                  <div className="col-4">
                    {/* Uncomment the below code if you want to display an image */}
                    <CardMedia
            component="img"
            image={course.courseImage}
            alt={course.courseName}
            style={{ width: "100%", height: "auto" }}
          />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modules;