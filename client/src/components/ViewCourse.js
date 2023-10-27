import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import './View.css';

// Add a CSS class for the glassmorphism style
const glassmorphismStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  borderRadius: '10px',
  padding: '20px', // Add some padding for readability
};

const ViewCourse = () => {
  const [course, setCourse] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/course/get/${id}`)
      .then((resp) => {
        setCourse({ ...resp.data[0] });
        console.log(resp.data[0]); // Log the API response
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, [id]);

  return (
    <Container style={{ marginTop: '150px' }}>
      <Card sx={{ width: '50%', marginLeft: '25%', ...glassmorphismStyle }}>
        <CardContent>
          <Typography variant="h4" component="div">
            Course Detail
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              ID: {id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Course Name: {course.coursename}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Course Description: {course.coursedesc}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Course Image: {/* Display course image here */}
              <img
                src={`http://localhost:5000/${course.courseimg}`}
                alt="Course Image"
                width="200"
                height="110"
              />
            </Typography>
            {/* Add more course details here */}
          </Box>
          <Box mt={2}>
            <Link to="/admin/existingcourses">
              <Button variant="contained" color="primary">
                Back
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ViewCourse;
