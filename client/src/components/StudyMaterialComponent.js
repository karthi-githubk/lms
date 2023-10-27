import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
import ClearIcon from "@mui/icons-material/Clear";
import { Collapse, Grow, Zoom } from "@mui/material";



const StudyMaterialComponent = ({
  topic_desc,
  topic_name,
  pdf_file,
  video_file,
  ppt_file,
  module_name,
}) => {
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);


  const openPdfDialog = () => {
    setPdfDialogOpen(true);
  };

  const openVideoDialog = () => {
    setVideoDialogOpen(true);
  };


  const closePdfDialog = () => {
    setPdfDialogOpen(false);
  };

  const closeVideoDialog = () => {
    setVideoDialogOpen(false);
  };

  const downloadPptFile = () => {
    Swal.fire({
      title: 'Confirm Download',
      text: 'Do you want to download the PowerPoint file?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Download',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, initiate the download
        const link = document.createElement('a');
        link.href = `http://localhost:5000/${ppt_file}`;
        link.download = 'presentation.pptx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        Swal.fire({
          icon: 'success',
          title: 'Download Successful',
          text: 'The PowerPoint file has been successfully downloaded.',
        });
      }
    });
  };


 

  return (
    <>
      <div
        className=""
        style={{
          marginLeft: "2%",
          width: "90%",
          textAlign: "justify",
          marginTop: "14px",
        }}
      >
        <h1
          className="text-center"
          style={{
            textTransform: "uppercase",
            fontSize: "30px",
            fontFamily: "Poppins",
          }}
        >
          {topic_name}
        </h1>

        <div
          className="row"
          style={{
            boxShadow: "1px 2px 9px #a55eea",
            borderRadius: "11px",
            marginTop: "2%",
            overflowY: "scroll", // Add this to make the content scrollable
            maxHeight: "300px", // Adjust the max height as needed
          }}
        >
          <div className="pt-2">
            <h2
              style={{
                textAlign: "justify",
                fontSize: "20px",
                lineHeight: "2",
              }}
            >
              {topic_desc}
            </h2>
          </div>
        </div>
        <div
          className="row "
          style={{
            marginTop: "40px",
            paddingBottom: "20px",
            borderRadius: "11px",
          }}
        >
          <div className="col-12">
            {/* <h4
              style={{
                textTransform: "uppercase",
                fontFamily: "Poppins",
              }}
            >
              {module_name} {topic_name} Study Material
            </h4> */}
            <div style={{ paddingLeft: "4%" }}>
              {/* Buttons for PDF and Video */}
              <Button
                variant="contained"
                onClick={openPdfDialog}
                sx={{
                  width: "30%",
                  height: "45px",
                  backgroundColor: "#ff3838",
                }}
              >
                View PDF
              </Button>
              <Button
                variant="contained"
                onClick={openVideoDialog}
                sx={{
                  width: "30%",
                  marginLeft: "5%",
                  height: "45px",
                  backgroundColor: "#26de81",
                }}
              >
                View Video
              </Button>
              <Button
              variant="contained"
              onClick={downloadPptFile}
              sx={{
                width: '30%',
                marginLeft: '5%',
                height: '45px',
                backgroundColor: '#6c5ce7',
              }}
            >
              Download PPT
            </Button>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Dialog */}
      <Dialog
        open={pdfDialogOpen}
        onClose={closePdfDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Collapse}
          transitionDuration={1000}
        sx={{ marginLeft: "12%" }}
      >
        <DialogTitle>PDF Viewer</DialogTitle>
        <DialogContent>
          <embed
            src={`http://localhost:5000/${pdf_file}`}
            width="100%"
            height="500px"
          />
        </DialogContent>
        <DialogActions>
        <Button
              onClick={closePdfDialog}
              color="primary"
              style={{
                position: "absolute",
                color: "red",
                top: "10px",
                right: "14px",
              }}
            >
              <ClearIcon /> {/* Add ClearIcon button for cancel */}
            </Button>
          <Button onClick={closePdfDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Video Dialog */}
      <Dialog
        open={videoDialogOpen}
        onClose={closeVideoDialog}
        fullWidth
        maxWidth="md"
        TransitionComponent={Zoom}
          transitionDuration={1000}
      >
        <DialogTitle>Video Player</DialogTitle>
        <DialogContent>
          <video controls width="100%" height="auto">
            <source
              src={`http://localhost:5000/${video_file}`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </DialogContent>
        <DialogActions>
        <Button
              onClick={closeVideoDialog}
              color="primary"
              style={{
                position: "absolute",
                color: "red",
                top: "10px",
                right: "14px",
              }}
            >
              <ClearIcon /> {/* Add ClearIcon button for cancel */}
            </Button>
          <Button onClick={closeVideoDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default StudyMaterialComponent;
