import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LoginIcon from "@mui/icons-material/Login";
import Modal from "@mui/material/Modal";
import LabTabs from "./tabs";
import CloseIcon from "@mui/icons-material/Close";
import logo from './images/logo.png';
const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  boxShadow: "0 4px 2px rgba(0, 0, 0, 0.1), 0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "30px",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(3px)",
};


function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElCourses, setAnchorElCourses] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const settings = ["User", "Admin"];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenCoursesMenu = (event) => {
    setAnchorElCourses(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseCoursesMenu = () => {
    setAnchorElCourses(null);
  };

  // Tab function

  return (
    <AppBar position="static">
      <Container maxWidth="" className="app-bar">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins_100Thin",
              fontWeight: 700,
              fontSize: "25px",
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
             <img src={logo} alt="Logo" style={{  backgroundColor:'#ffffff',borderTopLeftRadius:'12px',borderBottomRightRadius:'12px',borderBottom:'21px' }} />
          </Typography>
          <Typography
            sx={{
              fontSize: "31px",
              fontFamily: "Poppins_100Thin",
              marginLeft: "30%",
            }}
          >
            LMS
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-start",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                marginRight: "8rem",
              }}
            >
              <Tooltip title="Open courses">
                <Button
                  onClick={handleOpenCoursesMenu}
                  sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                  }}
                  href="/featured"
                >
                  Courses
                </Button>
              </Tooltip>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "23%",
                }}
                component="a"
                href="/contact"
              >
                Contact
              </Button>

              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "23%",
                }}
                component="a"
                href="/contact"
              >
                Enquiry
              </Button>

              <Menu>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <div>
              <Button sx={{ color: "white" }} onClick={handleOpen}>
                Login
                <div style={{ color: "white" }} className="Loginicon">
                  <LoginIcon />
                </div>
              </Button>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                
              >
                <center>
                  <Box className="modelbox" sx={style}>
                    <Button
                      onClick={handleClose} // Call handleClose when the button is clicked
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: "white", // Change the color as needed
                      }}
                    >
                      <CloseIcon />
                    </Button>

                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{color:'white'}}
                    >
                     LOGIN
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <LabTabs />
                    </Typography>
                  </Box>
                </center>
              </Modal>
            </div>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
