// // import React, { useState, useEffect } from "react";
// // import {
// //   Button,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Box,
// //   Grid,
// // } from "@mui/material";
// // import BrushIcon from "@mui/icons-material/Brush";
// // import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// // import { Link } from "react-router-dom";
// // import AddIcon from "@mui/icons-material/Add";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   deletecourseFromServer,
// //   getcourseFromServer,
// //   removecourseFromList,
// //   setSelectedcourse,
// // } from "./slices/courseSlice";
// // import MyVerticallyCenteredModal from "./UpdateCourse";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const CourseCard = ({ course, updateCourse, showDeleteDialog }) => {
// //   return (
// //     <Card sx={{ border: "1px solid #e056fd", borderRadius: "10px", }}>
// //       <CardContent>
// //         <h3>{course.course}</h3>
// //         <img
// //           src={course.img}
// //           alt={`Image for ${course.course}`}
// //           width="100%"
// //           height="140px"
// //         />
// //         {/* <video controls muted style={{ width: "130px", height: "90px" }}>
// //           <source src={course.video} type="video/mp4" />
// //         </video>
// //         <p>Module: {course.module}</p>
// //         <p>Topics: {course.topic}</p>
// //         <p>Question: {course.question}</p>
// //         <p>
// //           Choices: {course.choices ? course.choices.join(", ") : "No choices available"}
// //         </p> */}
// //       </CardContent>
// //       <CardActions>
// //         <Link to="/new">
// //           <Button variant="outlined" sx={{ marginLeft: "40%",width:"100%" }}>
// //             View course
// //           </Button>
// //         </Link>

// //         {/* <Button
// //           variant="outlined"
// //           color="error"
// //           onClick={() => showDeleteDialog(course)}
// //           sx={{ marginLeft: "10px" }}
// //         >
// //           <DeleteForeverIcon />
// //         </Button> */}
// //       </CardActions>
// //     </Card>
// //   );
// // };

// // const Newcourse = () => {
// //   const { courseList } = useSelector((state) => state.course);
// //   const dispatch = useDispatch();

// //   const updateCourse = (course) => {
// //     console.log("update Task");
// //     setModalShow(true);
// //     dispatch(setSelectedcourse(course));
// //   };

// //   useEffect(() => {
// //     dispatch(getcourseFromServer());
// //   }, [dispatch]);

// //   const [modalShow, setModalShow] = useState(false);
// //   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);

// //   const showDeleteDialog = (task) => {
// //     setSelectedUser(task);
// //     setDeleteDialogOpen(true);
// //   };

// //   const hideDeleteDialog = () => {
// //     setDeleteDialogOpen(false);
// //     setSelectedUser(null);
// //   };

// //   const deleteTask = (course) => {
// //     dispatch(deletecourseFromServer(course))
// //       .unwrap()
// //       .then(() => {
// //         dispatch(removecourseFromList(course));
// //         hideDeleteDialog();
// //         toast.error("Course deleted successfully", {
// //           position: toast.POSITION.BOTTOM_RIGHT,
// //           autoClose: 3000,
// //           theme: "colored",
// //         });
// //       });
// //   };

// //   return (
// //     <div style={{ marginLeft: "7%", marginTop: "5%", marginRight:"6%"}}>
// //       <Link to="/admin/courseform">
// //         {/* <Button variant="contained" sx={{ marginLeft: "70%", backgroundColor: "#2ed573" }}>
// //           <AddIcon />
// //           Add New Course
// //         </Button> */}
// //       </Link>

// //       <div className="courseform" style={{ marginTop: "10%", marginLeft: "1%", }}>
// //         {/* <div
// //           style={{
// //             marginBottom: "10px",
// //             width: "25%",
// //             fontSize: "29px",
// //             color: "#6c5ce7",
// //             marginLeft: "5%",
// //           }}
// //         >
// //           Courses Created: {courseList.length}
// //         </div> */}

// //         <Grid container spacing={4} >
// //           {courseList.map((course) => (
// //             <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
// //               <CourseCard
// //                 course={course}
// //                 updateCourse={updateCourse}
// //                 showDeleteDialog={showDeleteDialog}
// //               />
// //             </Grid>
// //           ))}
// //         </Grid>

// //         {/* <Dialog open={deleteDialogOpen} onClose={hideDeleteDialog}>
// //           <DialogTitle>Confirm Deletion</DialogTitle>
// //           <DialogContent>
// //             <p>Are you sure you want to delete this user?</p>
// //           </DialogContent>
// //           <DialogActions>
// //             <Button onClick={hideDeleteDialog}>Cancel</Button>
// //             <Button onClick={() => deleteTask(selectedUser)} color="error" variant="contained">
// //               Delete
// //             </Button>
// //           </DialogActions>
// //         </Dialog> */}

// //         {/* Update Task Modal */}
// //         {/* <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} /> */}
// //       </div>
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default Newcourse;


// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setSelectedUser,
//   removeUserFromList,
//   getUsersFromServer,
//   deleteUserFromServer,
// } from "./slices/usersSlice";
// import UpdateCourse from "./UpdateCourse";
// import { Link } from "react-router-dom";
// import AddIcon from "@mui/icons-material/Add";
// import { Button, Card, CardContent, Typography, CardActions } from "@mui/material";
// import BrushIcon from "@mui/icons-material/Brush";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";


// const CourseCard = ({ user, updateUser, handleDeleteConfirmation }) => {
//   return (
//     <Card key={user.id} style={{ margin: "10px" ,borderRadius:"30px", border:"1px solid #6c5ce7",width:"280px"}}>
//       <CardContent>
//         {/* <Typography variant="h6" component="div">
//           Course {user.id}
//         </Typography> */}
//         <Typography variant="h4" component="div">
//           {user.coursename}
//         </Typography>
//         <img src={user.image} alt="Course Picture" height="150px" width="100%" />
        
//         {/* <Typography variant="body2" component="div">
//           {user.courseDescription}
//         </Typography>
//         <Typography variant="body2" component="div">
//           Modules: {Array.isArray(user.modules) ? user.modules.join(", ") : user.modules}
//         </Typography>
//         <Typography variant="body2" component="div">
//           Topics:{" "}
//           {Array.isArray(user.topics)
//             ? user.topics.map((topic) => topic[0] + "-" + topic[1]).join(", ")
//             : ""}
//         </Typography>
//         <Typography variant="body2" component="div">
//           {user.moduleDescriptions}
//         </Typography>
//         <Typography variant="body2" component="div">
//           <object data={user.pdfs} width="130" height="180">
//             Your browser does not support PDFs.
//           </object>
//         </Typography>
//         <Typography variant="body2" component="div">
//           <video controls height="100px" width="130px">
//             <source src={user.video} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         </Typography>
//         <Typography variant="body2" component="div">
//           {user.question}
//         </Typography>
//         <Typography variant="body2" component="div">
//           {user.choices ? user.choices.join(", ") : "No choices available"}
//         </Typography> */}
//       </CardContent>
//       <CardActions>
//         <Link to='/new'>
//         <Button variant="outlined"  sx={{marginLeft:"50%",width:"100%"}}>
//           View Course
//         </Button>
//         </Link>
       
//         {/* <Button variant="outlined" color="error" onClick={() => handleDeleteConfirmation(user)}>
//           <DeleteForeverIcon />
//         </Button> */}
//       </CardActions>
//     </Card>
//   );
// };

// const Newcourse = () => {

//   const { usersList } = useSelector((state) => state.users);
//   const dispatch = useDispatch();
//   const [modalShow, setModalShow] = useState(false);
//   const [confirmDeleteUser, setConfirmDeleteUser] = useState(null);

//   const updateUser = (user) => {
//     setModalShow(true);
//     dispatch(setSelectedUser(user));
//   };

//   useEffect(() => {
//     dispatch(getUsersFromServer());
//   }, [dispatch]);

//   const deleteUser = async (user) => {
//     try {
//       await dispatch(deleteUserFromServer(user.id));
//       setConfirmDeleteUser(null);
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };

//   const handleDeleteConfirmation = (user) => {
//     setConfirmDeleteUser(user);
//   };

//   return (
//     <>
//       <div style={{ marginLeft: "%", marginTop: "8%" }}>
//         {/* <h4 style={{ textAlign: "center", padding: "6px", fontFamily: "serif", fontWeight: "bold" }}>
//           COURSE DATA
//         </h4> */}

//         {/* <Link to="/admin/courseform">
//           <Button variant="contained" sx={{ marginLeft: "70%", backgroundColor: "#2ed573" }}>
//             <AddIcon />
//             Add New Course
//           </Button>
//         </Link> */}

//         {/* <p className="font-weight-bold mb-3">NUMBER OF AVAILABLE COURSES: {usersList.length}</p> */}

//         <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//           {usersList.map((user) => (
//             <CourseCard key={user.id} user={user} updateUser={updateUser} handleDeleteConfirmation={handleDeleteConfirmation} />
//           ))}
//         </div>
//       </div>
//       <UpdateCourse show={modalShow} onHide={() => setModalShow(false)} />

//       {/* Implement confirmation dialog for delete */}
//       <Dialog open={!!confirmDeleteUser} onClose={() => setConfirmDeleteUser(null)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <p>Are you sure you want to delete the course: {confirmDeleteUser?.coursename}?</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setConfirmDeleteUser(null)}>Cancel</Button>
//           <Button onClick={() => deleteUser(confirmDeleteUser)} color="error" variant="contained">
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Newcourse;
