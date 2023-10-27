import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import "./View.css";

// Add a CSS class for the glassmorphism style
const glassmorphismStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(5px)",
  borderRadius: "10px",
  padding: "20px", // Add some padding for readability
  fontSize: "1.2rem", // Increase font size
};

const circleStyle = {
  content: "",
  backgroundColor: "#c56cf0",
  position: "absolute",
  borderRadius: "50%",
  width: "16rem",
  height: "16rem",
  top: "30%",
  right: "7%",
};

const lineStyle = {
  content: "",
  position: "absolute",
  height: "6rem",
  top: "8%",
  right: "5%",
  border: "1px solid",
};

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/user/get/${id}`)
      .then((resp) => {
        setUser({ ...resp.data[0] });
        console.log(resp.data[0]); // Log the API response
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container style={{ marginTop: "150px" }}>
      <Card sx={{ width: "80%", marginLeft: "20%", ...glassmorphismStyle }}>
        <CardContent>
          <div className="container">
            <div style={circleStyle}></div>
            <div style={lineStyle}></div>
            <div className="box">
              <Typography
                variant="h4"
                component="div"
                className="title"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #ff00ff, #00ffff)", // Replace with your desired gradient colors
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                User Detail
              </Typography>
              <Box
                mt={2}
                sx={{
                  fontFamily: "cursive",
                  // backgroundImage:
                  //   "linear-gradient(to right, #ff00ff, #00ffff)", // Replace with your desired gradient colors
                  // WebkitBackgroundClip: "text",
                  // backgroundClip: "text",
                  // color: "transparent",
                  // fontSize:'21px'
                }}
              >
                <div style={{ marginTop: "10px" }}>
                  <strong>ID:</strong> <span>{id}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Name:</strong> <span>{user.name}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Email:</strong> <span>{user.email}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Password:</strong> <span>{user.password}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Course:</strong>{" "}
                  <span>{user.coursename || "N/A"}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Contact:</strong> <span>{user.contact}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Gender:</strong> <span>{user.gender}</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <strong>Date of Birth:</strong>{" "}
                  <span>{formatDate(user.dob)}</span>
                </div>
              </Box>
            </div>
          </div>
          <Box mt={2}>
            <Link to="/admin/usermanage">
              <Button variant="contained" color="primary" style={{width:'30%',backgroundColor:'#e84393'}}>
                Back
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default View;
