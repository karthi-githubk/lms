import { Box, Typography } from "@mui/material";
import React from "react";
import csstopic from './images/css-topic.jpg'

export default function CSStopics() {
  return (
    <div style={{ marginLeft: "20%", marginTop: "8%" }}>
      <Box>

        <Typography variant="h4" sx={{color:"#6c5ce7"}}>Here the Basic Topics of Css</Typography>

      <img src={csstopic} alt="" style={{width:'500px', height:'400px', marginLeft:'14%',marginTop:'10px'}}/>
      
        
      
       
       
      </Box>
    </div>
  );
}
