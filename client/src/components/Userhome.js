import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import lern from "./images/LearningSys.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Userhome() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img
            src={lern}
            alt=""
            style={{ marginLeft: "30px", marginTop: "14%", width: "90%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            style={{
              marginTop: "30%",
              textAlign: "justify",
              marginRight: "7%",
              fontFamily: "sans-seriff ",
              fontSize:'22px'
            
            }}
          >
            "Welcome to our Learning Management System (LMS) home page! At our
            LMS, we are dedicated to providing you with a dynamic and engaging
            online learning experience. Whether you're a student looking to
            expand your knowledge, an instructor aiming to share expertise, or
            an organization seeking to enhance employee skills, our platform
            offers a diverse range of courses to meet your learning goals. Start
            your learning journey today!"
          </Typography>
        </Grid>
      </Grid>

      {/* Welcome Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: "25px", color: "#614BC3" }}>
          Welcome to SmartClifff
        </DialogTitle>
        <DialogContent>
          <Typography
            sx={{ fontSize: "20px", fontFamily: "Poppins", color: "#e84393" }}
          >
            We're excited to have you on board. Start exploring our diverse
            range of courses and embark on a journey of continuous learning and
            growth.
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <button
              onClick={handleClose}
              style={{
                backgroundColor: "#0652DD",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
