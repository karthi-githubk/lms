import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import e from "../components/images/elrn.jpg";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// Import the Modal and Dialog components from Material-UI
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";
import Startlearn from "./Startlearn";
import Courses from "./Courses";
// You need to create this component

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  // Set up state for the modal visibility
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  // Handle the modal open/close
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle the dialog open/close
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography
            variant="h2"
            sx={{ marginTop: "8%", marginLeft: "11%" }}
            className="txt"
          >
            <span style={{ fontSize: "90px",color:"#e84393",fontFamily:"Poppins" }}>A</span> broad selection <br />
            of Courses
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginTop: "1%", marginLeft: "10%", fontSize: "35px",textAlign:"justify" }}
            className="txt"
          >
            Join our community of lifelong learners and embark on a path of
            continuous growth and knowledge acquisition. Start your learning
            journey today!"
            <Stack direction="row" spacing={3} sx={{ marginTop: "4%" }}>
              {/* Open the dialog on button click */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6c5ce7",
                  borderRadius: "10px",
                  width: "30%",
                }}
                onClick={handleDialogOpen}
              >
                Explore Courses
              </Button>

              {/* Open the modal on button click */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e84393",
                  borderRadius: "10px",
                  width: "30%",
                }}
                onClick={handleOpen}
              >
                Watch Demo
              </Button>
            </Stack>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img src={e} alt="" className="elearn" style={{marginTop:"7%"}} />
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 1100,
            marginTop: "7%",
            marginLeft: "17%",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <Button
            variant="outlined"
            sx={{
              position: "absolute",
              top: 0,
              right: -13,
              m: 2,
              backgroundColor: "white",
              color: "red",
            }}
            onClick={handleClose}
          >
            Close
          </Button>

          {/* Place your video component here */}
          <Startlearn />
        </Box>
      </Modal>

      {/* Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
      >
        <Box sx={{ p: 2 }}>
          <Courses />
        </Box>
      </Dialog>
    </Box>
  );
}
