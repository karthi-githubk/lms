import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const glassmorphismStyle = {
  background: 'rgba(255, 255, 255, 0.2)',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  borderRadius: '10px',
  padding: '20px',
};

const ViewModule = () => {
  const [module, setModule] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/modules/get/${id}`)
      .then((resp) => {
        setModule({ ...resp.data[0] });
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
            Module Detail
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              ID: {id}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Module Name: {module.module_name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Module Description: {module.module_desc}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Module Image: {/* Display module image here */}
              <img
                src={`http://localhost:5000/${module.module_img}`}
                alt="Module Image"
                width="200"
                height="110"
              />
            </Typography>
            {/* Add more module details here */}
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

export default ViewModule;
