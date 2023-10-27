import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Card } from "react-bootstrap";
import { Button } from "@mui/material";

const Courses11 = () => {
  const [coursesList, setCoursesList] = useState([]);

  useEffect(() => {
    // Fetch courses from your server when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/course/get"); // Replace with your server's API endpoint
        const data = await response.json();
        setCoursesList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const chunkedCourses = chunkArray(coursesList, 3);

  return (
    <div className="" style={{ marginTop: "2%" }}>
      <div className="pt-5">
        {chunkedCourses.map((chunk, rowIndex) => (
          <div key={rowIndex} className="d-flex justify-content-center">
            {chunk.map((course) => (
              <Col sm={4} key={course.id}>
                <Link
                  to={`/courses/${course.id}`}
                  className="text-decoration-none"
                >
                  <Card
                    className="custom-card"
                    style={{
                      margin: "7px",
                      borderRadius: "30px",
                      border: "2px solid #F4AAB9",
                      width: "80%",
                      height: "380px",
                      marginTop: "2%",
                      marginLeft: "11%",
                      boxShadow: "1px 2px 9px #F4AAB9",
                      transition: "transform 0.3s", // Added transition property
                    }}
                    // Added hover effect
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <h3
                      style={{
                        marginLeft: "30px",
                        textTransform: "uppercase",
                        color: "#3c40c6",
                        fontFamily: "Poppins",
                      }}
                    >
                      {course.courseName}
                    </h3>
                    <img
                      className="no-hover"
                      src={`http://localhost:5000/${course.courseimg}`} // Make sure the image URL is correct
                      style={{ height: "280px", width: "100%" }}
                      alt={`Course: ${course.courseName}`}
                    />
                    <Button
                      style={{
                        marginTop: "10px",
                        width: "70%",
                        marginLeft: "13%",
                        backgroundColor: "#5f27cd",
                        border: "none",
                        color: "white",
                      }}
                    >
                      Go to course
                    </Button>
                  </Card>
                </Link>
              </Col>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses11;
