import { Box, Typography } from "@mui/material";
import React from "react";
import jstopic from './images/jstopic.png'

export default function Jstopics() {
  return (
    <div style={{ marginLeft: "20%", marginTop: "8%" }}>
      <Box>

        <Typography variant="h4" sx={{color:"#6c5ce7"}}>Here the Basic Topics of Javascript</Typography>

      <img src={jstopic} alt="" style={{width:'500px', height:'400px', marginLeft:'16%',marginTop:'10px'}}/>
      
        
      
       
       
      </Box>
    </div>
  );
}
