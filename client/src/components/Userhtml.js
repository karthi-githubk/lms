import React from 'react';
import html from './images/html.png';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function Userhtml() {
  return (
    <div style={{marginLeft:'20%',marginTop:'6%'}}>
       <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
       
        <img src={html} alt='' style={{marginTop:'5%',width:'24%',height:'260px'}}/>
       
        <Grid item xs={8}>
        <Typography variant='h6' sx={{marginTop:'10%', fontFamily:'-moz-initial'}}>HTML stands for HyperText Markup Language. It is a markup language used to create web pages and applications that can be displayed on the internet. HTML is a straightforward computer coding language that was developed in the 90s. It is used to design web pages using a markup language. HTML is the combination of Hypertext and Markup language. Hypertext defines the link between web pages.</Typography>
        </Grid>
      </Grid>
    </Box>

   
    <Box>
    </Box>
    <Link to='/html/topic'>
    <Button variant='contained' sx={{marginTop:'5%',marginLeft:'40%',backgroundColor:'orangered'}}>Html Topics</Button>
    </Link>
   

      
    </div>
  )
}
