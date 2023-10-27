import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Slide,
  ListItemText,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Box, // Import IconButton
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  Close as CloseIcon,
} from "@mui/icons-material"; // Import CloseIcon
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import EnquiryForm from "./EnquiryForm";
import { toast, ToastContainer } from "react-toastify";

const Footer = () => {
  const footerQuickLinks = [
    {
      display: "Home",
      url: "/",
    },
    {
      display: "Courses",
      url: "/featured",
    },
    {
      display: "Contact",
      url: "/",
    },
  ];

  const footerInfoLinks = [
    {
      display: "Mern stack",
      url: "/",
    },
    {
      display: "Mean stack",
      url: "/",
    },
    {
      display: "Full Stack",
      url: "/",
    },
    {
      display: "Java fullstack",
      url: "/",
    },
    {
      display: "Python fullstack",
      url: "/",
    },
  ];

  const [openEnquiryModal, setOpenEnquiryModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleOpenEnquiryModal = () => {
    setOpenEnquiryModal(true);
    setFormSubmitted(false); // Reset the formSubmitted state when the dialog is opened.
  };

  const handleCloseEnquiryModal = () => {
    setOpenEnquiryModal(false);

    if (formSubmitted) {
      // Show the success message only when the form is submitted.
      toast.success("Form submitted successfully!");
    }
  };

  const handleFormSubmit = () => {
    // Handle form submission logic here.
    setFormSubmitted(true); // Set formSubmitted to true when the form is successfully submitted.
  };

  return (
    <footer className="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={3} md={6} className="mb-5">
            <div className="follows" style={{}}>
              <Typography
                variant="body1"
                className="mb-0"
                style={{ fontSize: "13px", color: "white" }}
              >
                Follow us on social media
              </Typography>
              <span>
                <a href="https://www.facebook.com/smartcliff.in">
                  <Facebook
                    sx={{
                      "&:hover": {
                        color: "#3b5998",
                      },
                    }}
                  />
                </a>
              </span>
              <span>
                <a href="https://www.instagram.com/_smartcliff_/">
                  <Instagram
                    sx={{
                      "&:hover": { color: "#fd5d93" },
                    }}
                  />
                </a>
              </span>
              <span>
                <a href="https://www.linkedin.com/company/smartcliff/">
                  <LinkedIn
                    sx={{
                      "&:hover": { color: "#0072b1" },
                    }}
                  />
                </a>
              </span>
              <span>
                <a href="facebook.com">
                  <Twitter
                    sx={{
                      "&:hover": { color: "#00acee" },
                    }}
                  />
                </a>
              </span>
              <div>
                <Button
                  variant="outlined"
                  onClick={handleOpenEnquiryModal}
                  style={{
                    color: "white",
                    borderColor: "white",
                    marginTop: "10px",
                  }}
                >
                  Enquiry
                </Button>
              </div>
            </div>
          </Grid>

          <Grid item lg={3} md={6} className="mb-4">
            <Typography
              variant="h6"
              className="fw-bold"
              style={{ fontSize: "15px", color: "white" }}
            >
              Explore
            </Typography>
            <List className="link__list">
              {footerQuickLinks.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  className="border-0 ps-0 link__item"
                >
                  <ListItemText
                    className="links"
                    primary={
                      <Link to={item.url} style={{ fontSize: "13px" }}>
                        {item.display}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item lg={3} md={6} className="mb-4">
            <Typography
              variant="h6"
              className="fw-bold"
              style={{ fontSize: "15px", color: "white" }}
            >
              Courses
            </Typography>
            <List className="link__list">
              {footerInfoLinks.map((item, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  className="border-0 ps-0 link__item"
                >
                  <ListItemText
                    className="links"
                    primary={
                      <Link to={item.url} style={{ fontSize: "13px" }}>
                        {item.display}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item lg={3} md={6}>
            <Typography
              variant="h6"
              className="fw-bold"
              style={{ fontSize: "15px", color: "white" }}
            >
              Company
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "1rem", marginTop: "1rem", fontSize: "13px" }}
            >
              <LocationOnIcon
                style={{
                  color: "white",
                  verticalAlign: "middle",
                  fontSize: "22px",
                }}
              />
              <span style={{ color: "white" }}>
                Address: coimbatore,central studio,
              </span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "1rem", fontSize: "13px" }}
            >
              <PhoneIcon
                style={{
                  color: "white",
                  verticalAlign: "middle",
                  fontSize: "22px",
                }}
              />
              <span style={{ color: "white" }}> Phone: +91 1234567890</span>
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: "1rem", fontSize: "13px" }}
            >
              <EmailIcon
                style={{
                  color: "white",
                  verticalAlign: "middle",
                  fontSize: "20px",
                }}
              />
              <span style={{ color: "white" }}>
                Email: smartcliff@gmail.com
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Enquiry Modal */}
      <Dialog
        open={openEnquiryModal}
        onClose={handleCloseEnquiryModal}
        fullWidth
        TransitionComponent={Slide} // Use Slide transition
        transitionDuration={1000} // Adjust the animation duration as needed
        TransitionProps={{
          direction: 'up', // Set the transition direction within TransitionProps
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '500px',
            bgcolor: '#f5f6fa',
            borderRadius:'14px',
            p: 4,
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEnquiryModal}
            aria-label="close"
            style={{
              position: "absolute",
              top: '1%',
              right: "4%",
              color: "red",
            }}
          >
            <CloseIcon />
          </IconButton>
          <EnquiryForm onCloseModal={handleCloseEnquiryModal} />
          <ToastContainer/>
        </Box>
      </Dialog>
    </footer>
  );
};

export default Footer;
