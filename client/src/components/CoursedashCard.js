// import React, { useState, useEffect,} from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Slide,
//   TextField, // Import TextField from @mui/material
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AddIcon from "@mui/icons-material/Add";
// import AddCourseForm from "./Courseform";
// import UpdateCourseForm from "./UpdateCourseForm";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

// const CoursedashCard = () => {
//   const [data, setData] = useState([]);
//   const [open, setOpen] = useState(false); // State to control the image dialog
//   const [selectedImage, setSelectedImage] = useState(""); // State to store the selected image URL
//   const [editOpen, setEditOpen] = useState(false); // State to control the edit modal
//   const [selectedCourse, setSelectedCourse] = useState(null); // State to store the selected course for editing
//   const [createOpen, setCreateOpen] = useState(false); // State to control the create modal
//   const [selectedCourseDesc, setSelectedCourseDesc] = useState("");
//   const [openDescription, setOpenDescription] = useState(false);

//   // Form data state
//   const [formData, setFormData] = useState({
//     coursename: "", // Initialize with empty values
//     course_desc: "",
//   });

//   const loadData = async () => {
//     const response = await axios.get("http://localhost:5000/api/course/get");
//     setData(response.data);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const deleteCourse = (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       axios.delete(`http://localhost:5000/api/course/remove/${id}`);
//       toast.success("Course Deleted Successfully!!");
//       setTimeout(() => loadData(), 500);
//     }
//   };

//   const handleViewImage = (imageUrl) => {
//     setSelectedImage(imageUrl);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedImage("");
//   };

//   const handleViewDescription = (courseDesc) => {
//     setSelectedCourseDesc(courseDesc);
//     setOpenDescription(true); // Open the description modal
//   };

//   const handleCloseDescription = () => {
//     setOpenDescription(false);
//     setSelectedCourseDesc("");
//   };

//   const handleEdit = async (course) => {
//     setSelectedCourse(course);
//     setEditOpen(true);

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/course/get/${course.id}`
//       );
//       console.log("Edit Course Response:", response.data); // Log the response data
//       // Set the course data in your edit form (UpdateCourseForm) here
//       setFormData({
//         coursename: response.data.coursename,
//         course_desc: response.data.course_desc,
//       });
//     } catch (error) {
//       console.error("Edit Course Error:", error); // Log any errors
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/course/update/${selectedCourse.id}`,
//         {
//           coursename: formData.coursename, // Use formData values
//           course_desc: formData.course_desc,
//           // Add other fields as needed
//         }
//       );
//       toast.success("Course Updated Successfully!!");
//       handleCloseEdit();
//       loadData(); // Reload the data after updating
//     } catch (error) {
//       console.error("Save Edit Error:", error); // Log any errors
//       toast.error("Error updating course.");
//     }
//   };

//   const handleCloseEdit = () => {
//     setEditOpen(false);
//     setSelectedCourse(null);
//   };

//   const handleCreate = () => {
//     setCreateOpen(true);
//   };

//   const handleCloseCreate = () => {
//     setCreateOpen(false);
//     // Call the reset form function from the AddCourseForm component
//     // Reload the data after adding a course
//     loadData();
//   };

//   const handleInputChange = (e) => {
//     // Update the formData state when input fields change
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div style={{ marginTop: "10%", marginRight: "6%" }}>
//       <div style={{ marginLeft: "33%" }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#8854d0", color: "white" }}
//           onClick={handleCreate}
//         >
//           <AddIcon style={{ marginRight: "5px" }} /> Create Course
//         </Button>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           marginLeft: "21%",
//           justifyContent: "center",
//         }}
//       >
//         {data.map((item, index) => (
//           <Card
//             key={item.id}
//             style={{
//               marginTop: "23px",
//               marginBottom: "20px",
//               width: "30%", // Adjust the width to control the number of cards per row
//               height: "180px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//               marginLeft: "3%",
//             }}
//           >
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 sx={{ textTransform: "uppercase", color: "#e84393" }}
//               >
//                 {item.coursename}
//               </Typography>

//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: "10px",
//                 }}
//               >
//                 <Link
//                   style={{ textDecoration: "none", marginRight: "10px" }}
//                   to="#"
//                   onClick={() =>
//                     handleViewImage(`http://localhost:5000/${item.courseimg}`)
//                   }
//                 >
//                   <VisibilityIcon /> View Image
//                 </Link>

//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={() => handleEdit(item)} // Pass the course data to the edit modal
//                   startIcon={<EditIcon />}
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="error"
//                   onClick={() => deleteCourse(item.id)}
//                   startIcon={<DeleteForeverIcon />}
//                   style={{ marginLeft: "3%" }}
//                 >
//                   Delete
//                 </Button>
//               </div>
//               <div>
//                 {" "}
//                 <Link
//                   style={{ textDecoration: "none", marginRight: "10px" }}
//                   to="#"
//                   onClick={() => handleViewDescription(item.course_desc)}
//                 >
//                   <VisibilityIcon /> View Description
//                 </Link>
//               </div>

//               <Link to="/admin/Coursemanage">
//                 <Button
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#009432",
//                     color: "white",
//                     marginTop: "",
//                     float: "right",
//                   }}
//                 >
//                   <KeyboardDoubleArrowRightIcon /> Add Modules
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog
//         open={open}
//         TransitionComponent={Slide}
//         keepMounted
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle id="alert-dialog-slide-title">Course Image</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             <img
//               src={selectedImage}
//               alt="Course Image"
//               style={{ width: "100%", height: "auto" }}
//             />
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog
//         open={openDescription}
//         TransitionComponent={Slide}
//         keepMounted
//         onClose={handleCloseDescription}
//         aria-labelledby="alert-dialog-slide-title"
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle id="alert-dialog-slide-title">
//           Course Description
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-slide-description">
//             {selectedCourseDesc}
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDescription} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Edit Course Modal */}
//       {selectedCourse && (
//         <Dialog
//           open={editOpen}
//           TransitionComponent={Slide}
//           keepMounted
//           onClose={handleCloseEdit}
//           aria-labelledby="edit-course-dialog-title"
//           sx={{ marginTop: "3%" }}
//         >
//           <DialogTitle id="edit-course-dialog-title">Edit Course</DialogTitle>
//           <DialogContent>
//             {/* Pass the course data as props to UpdateCourseForm */}
//             <UpdateCourseForm
//               selectedCourse={selectedCourse.id}
//               // You may need to modify this depending on how your form handles changes
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseEdit} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleSaveEdit} color="primary">
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>
//       )}
//       {/* Create Course Modal */}
//       <Dialog
//         open={createOpen}
//         TransitionComponent={Slide}
//         keepMounted
//         onClose={handleCloseCreate}
//         aria-labelledby="create-course-dialog-title"
//       >
//         <DialogTitle id="create-course-dialog-title">Create Course</DialogTitle>
//         <DialogContent>
//           {/* Add your create form here */}
//           {/* This is where you can input the details for creating a new course */}
//           <AddCourseForm />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseCreate} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleCloseCreate} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CoursedashCard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Zoom,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import UpdateCourseForm from "./UpdateCourseForm";
import Swal from "sweetalert2"; // Import SweetAlert
import AddCourseForm from "./Courseform";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const CoursedashCard = () => {
  const [data, setData] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const [formData, setFormData] = useState({
    coursename: "",
    course_desc: "",
  });

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/course/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteCourse = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/api/course/remove/${id}`);
        toast.success("Course Deleted Successfully!!");
        setTimeout(() => loadData(), 500);
      }
    } catch (error) {
      console.error("Delete Course Error:", error);
      toast.error("Error deleting course.");
    }
  };
  const handleEdit = async (course) => {
    setSelectedCourse(course);
    setEditOpen(true);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/course/get/${course.id}`
      );
      setFormData({
        coursename: response.data.coursename,
        course_desc: response.data.course_desc,
      });
    } catch (error) {
      console.error("Edit Course Error:", error);
      toast.error("Error loading course details.");
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/course/update/${selectedCourse.id}`,
        {
          coursename: formData.coursename,
          course_desc: formData.course_desc,
        }
      );
      toast.success("Course Updated Successfully!!");
      handleCloseEdit();
      loadData();
    } catch (error) {
      console.error("Save Edit Error:", error);
      toast.error("Error updating course.");
    }
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedCourse(null);
  };

  const handleCreate = () => {
    setCreateOpen(true);
  };

  // Define the handleInputChange function
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddModules = (courseId) => {
    localStorage.setItem("courseclick", JSON.stringify(courseId));
  };

  return (
    <div style={{ marginTop: "7%", marginRight: "6%" }}>
      <h2
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "#e84393",
          marginLeft: "15%",
        }}
      >
        Course dashboard
      </h2>
      <div style={{ marginLeft: "86%" }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#0984e3", color: "white" }}
          onClick={handleCreate}
        >
          <AddIcon style={{ marginRight: "5px" }} /> Create Course
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "18%",
          justifyContent: "center",
        }}
      >
        {data.map((item, index) => (
          <Card
            key={item.id}
            style={{
              marginTop: "28px",
              marginBottom: "20px",
              width: "30%",
              height: "300px", // Increase the height to accommodate the image
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              marginLeft: "3%",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                sx={{ textTransform: "uppercase", color: "#e84393" }}
              >
                {item.coursename}
              </Typography>

              <img
                src={`http://localhost:5000/${item.courseimg}`}
                alt={item.coursename}
                style={{ width: "100%", height: "150px", marginTop: "10px" }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "14px",
                }}
              >
                <Tooltip title="Update Course">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(item)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </button>
                </Tooltip>

                <Tooltip title="Delete Course">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCourse(item.id)}
                    startIcon={<DeleteForeverIcon />}
                    sx={{ marginLeft: "" }}
                  >
                    Delete
                  </button>
                </Tooltip>

                <Link to="/moduletable">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#009432",
                      color: "white",
                      marginLeft: "11px",
                    }}
                    onClick={() => handleAddModules(item)} // Call the function with courseId
                  >
                    <KeyboardDoubleArrowRightIcon /> Add Modules
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Course Modal */}
      {selectedCourse && (
        <Dialog
          open={editOpen}
          TransitionComponent={Zoom}
          transitionDuration={1000}
          keepMounted
          onClose={handleCloseEdit}
          aria-labelledby="edit-course-dialog-title"
          sx={{ marginTop: "3%" }}
        >
          {" "}
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseEdit}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "8px",
                right: "7%",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>

          <DialogContent>
          <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Update Course</h3>
            <UpdateCourseForm
              selectedCourse={selectedCourse.id}
              formData={formData} // Pass formData to the form for editing
              onInputChange={handleInputChange} // Pass the input change handler
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      )}

      {/* Create Course Modal */}
      <Dialog
        open={createOpen}
        TransitionComponent={Zoom}
        transitionDuration={1000}
        keepMounted
        onClose={() => setCreateOpen(false)} // Close the dialog
        aria-labelledby="create-course-dialog-title"
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setCreateOpen(false)}
          aria-label="close"
          sx={{
            position: "absolute",
            top: "8px",
            right: "5%",
            color: "red",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {/* Add your create form here */}
          <AddCourseForm />
          {/* You should implement the form for creating a new course */}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default CoursedashCard;




/////----REacct responsive------//


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Tooltip from "@mui/material/Tooltip";

// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Slide,
//   Zoom,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import AddIcon from "@mui/icons-material/Add";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// import UpdateCourseForm from "./UpdateCourseForm";
// import Swal from "sweetalert2";
// import AddCourseForm from "./Courseform";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import { useMediaQuery } from "react-responsive";

// const CoursedashCard = () => {
//   const [data, setData] = useState([]);
//   const [editOpen, setEditOpen] = useState(false);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [createOpen, setCreateOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     coursename: "",
//     course_desc: "",
//   });

//   const isMobile = useMediaQuery({ maxWidth: 768 }); // Define mobile breakpoint

//   const loadData = async () => {
//     const response = await axios.get("http://localhost:5000/api/course/get");
//     setData(response.data);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const deleteCourse = async (id) => {
//     try {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "Cancel",
//       });

//       if (result.isConfirmed) {
//         await axios.delete(`http://localhost:5000/api/course/remove/${id}`);
//         toast.success("Course Deleted Successfully!!");
//         setTimeout(() => loadData(), 500);
//       }
//     } catch (error) {
//       console.error("Delete Course Error:", error);
//       toast.error("Error deleting course.");
//     }
//   };

//   const handleEdit = async (course) => {
//     setSelectedCourse(course);
//     setEditOpen(true);

//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/course/get/${course.id}`
//       );
//       setFormData({
//         coursename: response.data.coursename,
//         course_desc: response.data.course_desc,
//       });
//     } catch (error) {
//       console.error("Edit Course Error:", error);
//       toast.error("Error loading course details.");
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/course/update/${selectedCourse.id}`,
//         {
//           coursename: formData.coursename,
//           course_desc: formData.course_desc,
//         }
//       );
//       toast.success("Course Updated Successfully!!");
//       handleCloseEdit();
//       loadData();
//     } catch (error) {
//       console.error("Save Edit Error:", error);
//       toast.error("Error updating course.");
//     }
//   };

//   const handleCloseEdit = () => {
//     setEditOpen(false);
//     setSelectedCourse(null);
//   };

//   const handleCreate = () => {
//     setCreateOpen(true);
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleAddModules = (courseId) => {
//     localStorage.setItem("courseclick", JSON.stringify(courseId));
//   };

//   return (
//     <div style={{ marginTop: "7%", marginRight: "6%" }}>
//       <h2
//         style={{
//           textAlign: "center",
//           textTransform: "uppercase",
//           color: "#e84393",
//           marginLeft: "15%",
//         }}
//       >
//         Course dashboard
//       </h2>
//       <div style={{ marginLeft: "86%" }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: "#0984e3", color: "white" }}
//           onClick={handleCreate}
//         >
//           <AddIcon style={{ marginRight: "5px" }} /> Create Course
//         </Button>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           marginLeft: "18%",
//           justifyContent: "center",
//         }}
//       >
//         {data.map((item, index) => (
//           <Card
//             key={item.id}
//             style={{
//               marginTop: isMobile ? "10px" : "28px",
//               marginBottom: isMobile ? "10px" : "20px",
//               width: isMobile ? "90%" : "30%",
//               height: isMobile ? "auto" : "300px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//               marginLeft: isMobile ? "0%" : "3%",
//             }}
//           >
//             <CardContent>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 sx={{ textTransform: "uppercase", color: "#e84393" }}
//               >
//                 {item.coursename}
//               </Typography>

//               <img
//                 src={`http://localhost:5000/${item.courseimg}`}
//                 alt={item.coursename}
//                 style={{
//                   width: "100%",
//                   height: isMobile ? "auto" : "150px",
//                   marginTop: isMobile ? "10px" : "10px",
//                 }}
//               />
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   marginTop: isMobile ? "10px" : "14px",
//                 }}
//               >
//                 <Tooltip title="Update Course">
//                   <button
//                     className="btn btn-primary"
//                     onClick={() => handleEdit(item)}
//                     startIcon={<EditIcon />}
//                   >
//                     Edit
//                   </button>
//                 </Tooltip>

//                 <Tooltip title="Delete Course">
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => deleteCourse(item.id)}
//                     startIcon={<DeleteForeverIcon />}
//                     sx={{ marginLeft: "" }}
//                   >
//                     Delete
//                   </button>
//                 </Tooltip>

//                 <Link to="/moduletable">
//                   <Button
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#009432",
//                       color: "white",
//                       marginLeft: "11px",
//                     }}
//                     onClick={() => handleAddModules(item)}
//                   >
//                     <KeyboardDoubleArrowRightIcon /> Add Modules
//                   </Button>
//                 </Link>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {selectedCourse && (
//         <Dialog
//           open={editOpen}
//           TransitionComponent={Zoom}
//           transitionDuration={1000}
//           keepMounted
//           onClose={handleCloseEdit}
//           aria-labelledby="edit-course-dialog-title"
//           sx={{ marginTop: "3%" }}
//         >
//           {" "}
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleCloseEdit}
//             aria-label="close"
//             sx={{
//               position: "absolute",
//               top: "8px",
//               right: "7%",
//               color: "red",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>

//           <DialogContent>
//             <h3
//               style={{
//                 textAlign: "center",
//                 textTransform: "uppercase",
//                 color: "#e84393",
//               }}
//             >
//               Update Course
//             </h3>
//             <UpdateCourseForm
//               selectedCourse={selectedCourse.id}
//               formData={formData}
//               onInputChange={handleInputChange}
//             />
//           </DialogContent>
//           <DialogActions></DialogActions>
//         </Dialog>
//       )}

//       <Dialog
//         open={createOpen}
//         TransitionComponent={Zoom}
//         transitionDuration={1000}
//         keepMounted
//         onClose={() => setCreateOpen(false)}
//         aria-labelledby="create-course-dialog-title"
//       >
//         <IconButton
//           edge="end"
//           color="inherit"
//           onClick={() => setCreateOpen(false)}
//           aria-label="close"
//           sx={{
//             position: "absolute",
//             top: "8px",
//             right: "5%",
//             color: "red",
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent>
//           <AddCourseForm />
//         </DialogContent>
//         <DialogActions></DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default CoursedashCard;

