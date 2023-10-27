import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const cardData = [
  {
    title: "Total Users",
    icon: <AccountCircleIcon fontSize="large" style={{ color: "#ff3838" }} />,
    count: 0,
  },
  {
    title: "Total Courses",
    icon: <LibraryBooksIcon fontSize="large" style={{ color: "#7d5fff" }} />,
    count: 0,
    link: '/coursedashboard' ,// Add the link to the Total Courses card,
    text:'Click to view course dashboard'
  },
  {
    title: "Enquirys",
    icon: (
      <SupervisedUserCircleIcon fontSize="large" style={{ color: "#4cd137" }} />
    ),
    count: 0,
  },
];

export default function AdminCards() {
  const [counts, setCounts] = useState({ users: 0, courses: 0, enquiries: 0 });

  useEffect(() => {
    // Fetch the total number of users
    axios
      .get("http://localhost:5000/api/user/get")
      .then((response) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          users: response.data.length,
        }));
      })
      .catch((error) => {
        console.error("Error fetching total users: ", error);
      });

    // Fetch the total number of courses
    axios
      .get("http://localhost:5000/api/course/get")
      .then((response) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          courses: response.data.length,
        }));
      })
      .catch((error) => {
        console.error("Error fetching total courses: ", error);
      });

    // Fetch the total number of enquiries
    axios
      .get("http://localhost:5000/api/notification")
      .then((response) => {
        setCounts((prevCounts) => ({
          ...prevCounts,
          enquiries: response.data.length,
        }));
      })
      .catch((error) => {
        console.error("Error fetching total enquiries: ", error);
      });
  }, []);

  return (
    <div style={{ marginLeft: "18%", marginTop: "8%", display: "flex" }}>
      {cardData.map((card, index) => (
        <Card
          key={index}
          sx={{
            width: 250,
            height: 150,
            backgroundColor: "whitesmoke",
            color: "white",
            borderRadius: "10px",
            marginLeft: index === 0 ? "9%" : "9%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          {card.title === "Total Courses" ? ( // Check if it's the Total Courses card
            <Link to={card.link} style={{ textDecoration: "none" }}>
              <CardContent sx={{ marginLeft: "18px" }}>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ marginTop: "", fontWeight: "bold", color: "black" }}
                >
                  {card.icon} {card.title}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: "",
                    fontSize: "40px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#3742fa",
                  }}
                >
                  {counts.courses}
                </Typography>
                <Typography sx={{textTransform:'uppercase',fontSize:'12px',color:'#e84393',fontWeight:'bold',textAlign:'center'}}>{card.text}</Typography>
                
              </CardContent>
            </Link>
          ) : (
            // For other cards, no link
            <CardContent sx={{ marginLeft: "18px" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ marginTop: "10px", fontWeight: "bold", color: "black" }}
              >
                {card.icon} {card.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "10px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#3742fa",
                }}
              >
                {card.title === "Total Users"
                  ? counts.users
                  : card.title === "Enquirys"
                  ? counts.enquiries
                  : null}
              </Typography>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}
