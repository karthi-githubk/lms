// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import logo from "./images/logo.png";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
// import Swal from 'sweetalert2';

// function AdminHome() {
//   const [auth, setAuth] = useState(false);
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const isAuthenticated = sessionStorage.getItem('Authenticated') === 'true';

//   //////----------session Login--------------------//////

//   useEffect(() => {
//     // Perform authentication check on component mount
//     if (!isAuthenticated) {
//       navigate('/');
//     }
//     axios
//       .get('http://localhost:5000/api/admin/check-auth', { withCredentials: true })
//       .then((res) => {
//         if (res.data.Status === 'Success') {
//           setAuth(true);
//           setEmail(res.data.email);
//         } else {
//           setAuth(false);
//           setMessage(res.data.Message);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setAuth(false); // Set auth to false on error
//         setMessage('An error occurred while checking authentication.');
//       });
//   }, []);

//   //////--------------Session--Logout----------///

//   const handleLogout = async () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will be logged out',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, logout!',
//       cancelButtonText: 'Cancel'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         sessionStorage.clear();
//         try {
//           const response = await axios.post(
//             'http://localhost:5000/api/admin/logout',
//             {},
//             { withCredentials: true }
//           );

//           if (response.data.Status === 'Success') {
//             setAuth(false);
//             Swal.fire('Logged Out!', '', 'success');
//             // Redirect to the login page after successful logout
//             navigate('/'); // Use navigate instead of history.push
//           } else {
//             Swal.fire('Logout failed!', '', 'error');
//           }
//         } catch (err) {
//           console.error(err);
//           Swal.fire('An error occurred during logout.', '', 'error');
//         }
//       }
//     });
//   };

//   return (
//     <div>
//       <div className="navbar navbar-expand-lg navbar-light bg-light app-bar fixed-top" style={{ height: '70px' }}>
//         <div className="container-fluid">
//                <img src={logo} alt="Logo" style={{ filter: 'drop-shadow(5px 1px 1px #ffffff' }} />
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-toggle="collapse"
//             data-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div style={{marginLeft:'30%', color:'white',fontWeight:'bold',letterSpacing:'11px'}}>
//           <h2>LMS</h2>
//         </div>
//           <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
//             <ul className="navbar-nav">
//               {/* Empty li for spacing */}
//               <li className="nav-item"></li>
//             </ul>
//             <ul className="navbar-nav ml-auto">
//               {auth ? (
//                 <li className="">
//                   <span style={{ marginRight: '0.5rem', color: 'white', fontSize: '18px' }}>
//                     Logged in as,
//                   </span>
//                   <span style={{ marginRight: '1rem', color: 'white', fontSize: '18px' }}>
//                   <ManageAccountsIcon/> {email}
//                   </span>
//                   <button
//                     className="btn btn-danger"
//                     onClick={handleLogout}
//                     style={{marginRight:'2rem',height:'40px',width:'130px',backgroundColor:'#ff3838'}}>
//                     <ExitToAppIcon style={{ marginRight: '5px' }} /> Logout
//                   </button>
//                 </li>
//               ) : (
//                 <li className="nav-item">
//                   <span className="navbar-text mr-3">
//                     {message}
//                   </span>
//                   <Link to="/" className="btn btn-primary">
//                     Login
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminHome;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./images/logo.png";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Swal from "sweetalert2";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function AdminHome() {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [formDataFromServer, setFormDataFromServer] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [currentFormDataIndex, setCurrentFormDataIndex] = useState(0);

  // State variable to track read/unread status of notifications
  const [notificationStatus, setNotificationStatus] = useState([]);

  const navigate = useNavigate();

  const isAuthenticated = sessionStorage.getItem("Authenticated") === "true";

  // Function to mark a notification as read
  const markNotificationAsRead = (index) => {
    const updatedStatus = [...notificationStatus];
    updatedStatus[index] = true; // Mark notification as read
    setNotificationStatus(updatedStatus);

    // Update the currentFormDataIndex to the next unread notification, if any
    for (let i = index + 1; i < updatedStatus.length; i++) {
      if (!updatedStatus[i]) {
        setCurrentFormDataIndex(i);
        break;
      }
    }

    // Update the count of unread notifications in local storage
    const unreadCount = updatedStatus.filter((status, index) => {
      return !status && index >= currentFormDataIndex;
    }).length;
    localStorage.setItem("unreadNotificationCount", unreadCount.toString());
  };

  // Initialize unread notification count from local storage on component mount
  useEffect(() => {
    const storedCount = localStorage.getItem("unreadNotificationCount");
    if (storedCount) {
      setNotificationCount(parseInt(storedCount));
    }
  }, []);

  // Update the count of unread notifications
  const unreadNotificationCount = notificationStatus.filter((status, index) => {
    return !status && index >= currentFormDataIndex;
  }).length;

  //////----------session Login--------------------//////

  useEffect(() => {
    // Perform authentication check on component mount
    if (!isAuthenticated) {
      navigate("/");
    }
    axios
      .get("http://localhost:5000/api/admin/check-auth", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setEmail(res.data.email);
        } else {
          setAuth(false);
          setMessage(res.data.Message);
        }
      })
      .catch((err) => {
        console.error(err);
        setAuth(false); // Set auth to false on error
        setMessage("An error occurred while checking authentication.");
      });
  }, [isAuthenticated, navigate]); // Include isAuthenticated and navigate in the dependency array

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/notification")
      .then((res) => {
        console.log("Response from server:", res.data);
        setFormDataFromServer(res.data);

        // Initialize the notification status for each notification as unread
        setNotificationStatus(new Array(res.data.length).fill(false));

        // Set the notification count based on the fetched data
        setNotificationCount(res.data.length);

        // Reset the currently displayed form data index
        setCurrentFormDataIndex(0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleNextFormData = () => {
    if (currentFormDataIndex < formDataFromServer.length - 1) {
      setCurrentFormDataIndex(currentFormDataIndex + 1);
    }
  };

  const handlePreviousFormData = () => {
    if (currentFormDataIndex > 0) {
      setCurrentFormDataIndex(currentFormDataIndex - 1);
    }
  };

  //////--------------Session--Logout----------///

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        try {
          const response = await axios.post(
            "http://localhost:5000/api/admin/logout",
            {},
            { withCredentials: true }
          );

          if (response.data.Status === "Success") {
            setAuth(false);
            Swal.fire("Logged Out!", "", "success");
            // Redirect to the login page after successful logout
            navigate("/"); // Use navigate instead of history.push
          } else {
            Swal.fire("Logout failed!", "", "error");
          }
        } catch (err) {
          console.error(err);
          Swal.fire("An error occurred during logout.", "", "error");
        }
      }
    });
  };

  const openNotificationDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the notification dialog
  const closeNotificationDialog = () => {
    setOpenDialog(false);
  };

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <div
        className="navbar navbar-expand-lg navbar-light bg-light app-bar fixed-top"
        style={{ height: "70px" }}
      >
        <div className="container-fluid">
          <img
            src={logo}
            alt="Logo"
            style={{ backgroundColor:'#ffffff',borderTopLeftRadius:'12px',borderBottomRightRadius:'12px' }}
          />
          <div
            style={{
              marginLeft: "30%",
              color: "white",
              fontWeight: "bold",
              letterSpacing: "11px",
            }}
          >
            <h2>LMS</h2>
          </div>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {/* Empty li for spacing */}
              <li className="nav-item"></li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {auth ? (
                <li className="">
                  <span
                    style={{
                      marginRight: "0.5rem",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    Logged in as,
                  </span>
                  <span
                    style={{
                      marginRight: "1rem",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    <ManageAccountsIcon /> {email}
                  </span>
                  <span
                    style={{ marginRight: "1.5rem", cursor: "pointer" }}
                    onClick={openNotificationDialog}
                  >
                    <NotificationsActiveIcon
                      style={{ color: "white", fontSize: "28px" }}
                    />
                    {unreadNotificationCount > 0 && ( // Display count label if there are unread notifications
                      <span
                        style={{
                          backgroundColor: "#ff3838",
                          color: "white",
                          borderRadius: "50%",
                          padding: "2px 10px",
                          marginRight: "20px",
                        }}
                      >
                        {unreadNotificationCount}
                      </span>
                    )}
                  </span>

                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                    style={{
                      marginRight: "0.8rem",
                      height: "40px",
                      width: "130px",
                      backgroundColor: "#ff3838",
                    }}
                  >
                    <ExitToAppIcon style={{ marginRight: "5px" }} /> Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <span className="navbar-text mr-3">{message}</span>
                  <Link to="/" className="btn btn-primary">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Notification Dialog */}
      <Dialog open={openDialog} onClose={closeNotificationDialog}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {Array.isArray(formDataFromServer) &&
          formDataFromServer.length > 0 ? (
            <div>
              <div key={currentFormDataIndex}>
                <div>
                  <strong>Name:</strong>{" "}
                  {formDataFromServer[currentFormDataIndex].name}
                </div>
                <div>
                  <strong>Email:</strong>{" "}
                  {formDataFromServer[currentFormDataIndex].email}
                </div>
                <div>
                  <strong>Contact:</strong>{" "}
                  {formDataFromServer[currentFormDataIndex].contact}
                </div>
                <div>
                  <strong>Course Name:</strong>{" "}
                  {formDataFromServer[currentFormDataIndex].coursename}
                </div>
                <div>
                  <strong>Gender:</strong>{" "}
                  {formDataFromServer[currentFormDataIndex].gender}
                </div>
                <div>
                  <strong>Date of Birth:</strong>{" "}
                  {formatDate(formDataFromServer[currentFormDataIndex].dob)}
                </div>
                <div style={{marginTop:'3%'}}>
                  <strong>Mark as Read:</strong>
                  <input
                    type="checkbox"
                    checked={notificationStatus[currentFormDataIndex]}
                    onChange={() => {
                      const updatedStatus = [...notificationStatus];
                      updatedStatus[currentFormDataIndex] =
                        !notificationStatus[currentFormDataIndex];
                      setNotificationStatus(updatedStatus);
                      // Optionally, you can also call markNotificationAsRead here if needed
                    }}
                    style={{ verticalAlign: "middle", marginLeft: "4px" }}
                  />
                </div>
              </div>
              {/* Navigation buttons */}
              <div style={{ marginTop: "20px" }}>
                <IconButton
                  aria-label="previous"
                  onClick={handlePreviousFormData}
                  disabled={currentFormDataIndex === 0}
                >
                  <ArrowBackIcon />
                </IconButton>
                <IconButton
                  aria-label="next"
                  onClick={handleNextFormData}
                  disabled={
                    currentFormDataIndex === formDataFromServer.length - 1
                  }
                >
                  <ArrowForwardIcon />
                </IconButton>
              </div>
            </div>
          ) : (
            <div>No notifications to display</div>
          )}
        </DialogContent>

        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: "5px", right: "5px" }}
          onClick={closeNotificationDialog}
        >
          <CancelIcon />
        </IconButton>
      </Dialog>
    </div>
  );
}

export default AdminHome;
