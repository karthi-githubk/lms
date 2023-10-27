import React, { useEffect } from "react";
import htmlvideo from "./videos/html.mp4";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import pdf from "./pdf/html.pdf";
import ppt from "./ppt/html.pptx";
import Fileuploadbtn from "./Fileuploadbtn";
import Ppt from "./Ppt";
import video from './videos/html.mp4';
export default function Learning() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = "https://web.stanford.edu/class/cs142/lectures/HTML.pdf";
    link.click();
  };

  const handleDownload2 = () => {
    const link = document.createElement("a");
    link.href = ppt;
    link.download = "";
    link.click();
  };

  return (
    <div>
      {/* Display the video for the first course only */}
    
        <video controls muted style={{ width: "80%", height: "50%" }}>
          <source src={video} type="video/mp4"></source>
        </video>

      <Box sx={{ marginTop: "3%" }}>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "4%" }}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: "4%", marginLeft: "28px" }}
          onClick={handleDownload2}
        >
          Download ppt
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{
            marginTop: "4%",
            marginLeft: "3%",
            width: "30%",
            height: "37px",
          }}
        >
          <Ppt />
        </Button>

        <Typography sx={{ textTransform: "uppercase", marginTop: "2%" }}>
          upload the Assessment:
        </Typography>
        <Button variant="outlined" color="secondary" sx={{ marginTop: "5px" }}>
          <Fileuploadbtn />
        </Button>
      </Box>
    </div>
  );
}
