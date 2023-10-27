import React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Usercss() {
  return (
    <div style={{marginLeft:'20%', marginTop:'6%'}}>
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       

       
        <Grid item xs={8}>
        <Typography variant='h6' sx={{marginTop:'10%', marginLeft:'5%', fontFamily:'-moz-initial'}}>
        CSS stands for Cascading Style Sheets. It is the language for describing the presentation of Web pages, including colours, layout, and fonts, thus making our web pages presentable to the users. CSS is designed to make style sheets for the web.
        </Typography>
        </Grid>
      </Grid>
    </Box>

   
    <Box>
    </Box>
    <Link to='/css/topic'>
    <Button variant='contained' sx={{marginTop:'5%',marginLeft:'40%',backgroundColor:'blue'}}>CSS Topics</Button>
    </Link>
   

      
    </div>
  )
}
