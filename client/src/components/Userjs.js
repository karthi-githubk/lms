import React from 'react';
import js from './images/js.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Userjs() {
  return (
    <div style={{marginLeft:'20%',marginTop:'6%'}}>
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
        <img src={js} alt='' style={{marginTop:'5%',width:'32%',height:'240px',}}/>
       
        <Grid item xs={8}>
        <Typography variant='h6' sx={{marginTop:'10%', marginLeft:'1%', fontFamily:'-moz-initial'}}>
        JavaScript (js) is a light-weight object-oriented programming language which is used by several websites for scripting the webpages. It is an interpreted, full-fledged programming language that enables dynamic interactivity on websites when applied to an HTML document. It was introduced in the year 1995 for adding programs to the webpages in the Netscape Navigator browser.
        </Typography>
        </Grid>
      </Grid>
    </Box>

   
    <Box>
    </Box>
    <Link to='/javascript/topic'>
    <Button variant='contained' sx={{marginTop:'5%',marginLeft:'40%',backgroundColor:'#f1c40f'}}>Javascript Topics</Button>
    </Link>
   

      
    </div>
  )
}
