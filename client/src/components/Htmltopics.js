import { Box, Typography } from "@mui/material";
import React from "react";
import htmlbasic from "./images/html-basic.jpg";
import htmltopic from './images/html-topic.jpg'

export default function Htmltopics() {
  return (
    <div style={{ marginLeft: "20%", marginTop: "8%" }}>
      <Box>

        <Typography variant="h4" sx={{color:"#6c5ce7"}}>Here the Basic Topics of Html</Typography>

      <img src={htmltopic} alt="" style={{width:'500px', height:'400px', marginLeft:'4%',marginTop:'10px'}}/>

         <img src={htmlbasic} alt="" style={{marginLeft:'8%'}}/>
      
        
      
       
       
      </Box>
    </div>
  );
}
