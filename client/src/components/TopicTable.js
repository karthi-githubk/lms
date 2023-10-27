// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Usermanage.css";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// const TopicTable = () => {
//   const [data, setData] = useState([]);
//   const [pdfFilePath, setPdfFilePath] = useState("");
//   const [videoFilePath, setVideoFilePath] = useState("");
//   const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
//   const [videoDialogOpen, setVideoDialogOpen] = useState(false);

//   const loadData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/topics/get");
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while fetching topics.");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const deleteTopic = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/topics/remove/${id}`);
//         toast.success("Topic Deleted Successfully!!");
//         loadData();
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while deleting the topic.");
//       }
//     }
//   };

//   const openPdfDialog = (pdfPath) => {
//     setPdfFilePath(pdfPath);
//     setPdfDialogOpen(true);
//   };

//   const openVideoDialog = (videoPath) => {
//     setVideoFilePath(videoPath);
//     setVideoDialogOpen(true);
//   };

//   const closePdfDialog = () => {
//     setPdfFilePath("");
//     setPdfDialogOpen(false);
//   };

//   const closeVideoDialog = () => {
//     setVideoFilePath("");
//     setVideoDialogOpen(false);
//   };

//   return (
//     <div style={{ marginTop: "",marginLeft:'2%', width: "90%" }}>
//        <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Topic</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>No.</th>
//             <th style={{ textAlign: "center" }}>Course Name</th>
//             <th style={{ textAlign: "center" }}>Module Name</th>
//             <th style={{ textAlign: "center" }}>Topic Name</th>
//             <th style={{ textAlign: "center" }}>PDF</th>
//             <th style={{ textAlign: "center" }}>Video</th>
//             {/* <th style={{ textAlign: "center" }}>Low Question</th>
//             <th style={{ textAlign: "center" }}>Medium Question</th>
//             <th style={{ textAlign: "center" }}>Hard Question</th> */}
//             <th style={{ textAlign: "center" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => {
//             return (
//               <tr key={item.id}>
//                 <td style={{ textAlign: "center" }}>{index + 1}</td>
//                 <td>{item.course_name}</td>
//                 <td>{item.module_name}</td>
//                 <td>{item.topic_name}</td>
//                 <td style={{ textAlign: "center" }}>
//                   <Link style={{textDecoration:"none"}}
//                     variant="contained"
//                     color="primary"
//                     onClick={() => openPdfDialog(item.pdf_file)}
//                   >
//                     View PDF
//                   </Link>
//                 </td>
//                 <td style={{ textAlign: "center" }}>
//                   <Link style={{textDecoration:"none"}}
//                     variant="contained"
//                     color="primary"
//                     onClick={() => openVideoDialog(item.video_file)}
//                   >
//                     View Video
//                   </Link>
//                 </td>
//                 {/* <td>{item.low}</td>
//                 <td>{item.medium}</td>
//                 <td>{item.hard}</td> */}
//                 <td style={{ textAlign: "center" }}>
//                   <Link to={`/topicupdate/${item.id}`}>
//                     <button
//                       className="btn btn-primary" variant="contained" color="warning">
//                       <EditIcon/>
//                     </button>
//                   </Link>
//                   <button
//                       className="btn btn-danger"
//                     variant="contained"
//                     color="error"
//                     onClick={() => deleteTopic(item.id)}
//                   >
//                     <DeleteForeverIcon/>
//                   </button>
//                   {/* <Link to={`/viewtopic/${item.id}`}>
//                     <button
//                       className="btn btn-success" variant="contained" color="warning">
//                       View
//                     </button>
//                   </Link> */}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* PDF Dialog */}
//       <Dialog
//         open={pdfDialogOpen}
//         onClose={closePdfDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>PDF Viewer</DialogTitle>
//         <DialogContent>
//           <embed
//             src={`http://localhost:5000/${pdfFilePath}`}
//             width="100%"
//             height="500px"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closePdfDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Video Dialog */}
//       <Dialog
//         open={videoDialogOpen}
//         onClose={closeVideoDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Video Player</DialogTitle>
//         <DialogContent>
//           <video controls width="100%" height="auto">
//             <source
//               src={`http://localhost:5000/${videoFilePath}`}
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeVideoDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TopicTable;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Usermanage.css";
// import { toast } from "react-toastify";
// import axios from "axios";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";

// const TopicTable = () => {
//   const [data, setData] = useState([]);
//   const [pdfFilePath, setPdfFilePath] = useState("");
//   const [videoFilePath, setVideoFilePath] = useState("");
//   const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
//   const [videoDialogOpen, setVideoDialogOpen] = useState(false);
//   const [searchFilter, setSearchFilter] = useState("");

//   const loadData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/topics/get");
//       setData(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while fetching topics.");
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const deleteTopic = async (id) => {
//     if (window.confirm("Are you sure you want to delete?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/topics/remove/${id}`);
//         toast.success("Topic Deleted Successfully!!");
//         loadData();
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while deleting the topic.");
//       }
//     }
//   };

//   const openPdfDialog = (pdfPath) => {
//     setPdfFilePath(pdfPath);
//     setPdfDialogOpen(true);
//   };

//   const openVideoDialog = (videoPath) => {
//     setVideoFilePath(videoPath);
//     setVideoDialogOpen(true);
//   };

//   const closePdfDialog = () => {
//     setPdfFilePath("");
//     setPdfDialogOpen(false);
//   };

//   const closeVideoDialog = () => {
//     setVideoFilePath("");
//     setVideoDialogOpen(false);
//   };

//   const handleSearchChange = (e) => {
//     setSearchFilter(e.target.value); // Update the search filter state as the user types
//   };

//   const filteredTopics = data.filter((item) =>
//     item.topic_name.toLowerCase().includes(searchFilter.toLowerCase())
//   );

//   return (
//     <div style={{ marginTop: "", marginLeft: "21%", width: "80%" }}>
//       <h3
//         style={{
//           textAlign: "center",
//           textTransform: "uppercase",
//           color: "#e84393",
//         }}
//       >
//         Topic
//       </h3>
//       <div style={{display:'flex'}}>
//         <div className="d-flex justify-content-center mt-3">
//           <input
//             type="text"
//             placeholder="Filter by Module"
//             value={searchFilter}
//             onChange={handleSearchChange}
//            />
//         </div>

//         <button
//           style={{
//             background: "none",
//             border: "none",
//             padding: "0",
//             cursor: "pointer",
//             marginLeft:'1%'
//           }}
//         >
//           <ReactHTMLTableToExcel
//             id="export-excel-btn"
//             className="btn btn-success"
//             table="table-to-export"
//             filename="Topic Details"
//             sheet="user data"
//             buttonText="Export to Excel"
//           />
//         </button>
//       </div>

//       <table className="table table-bordered" id="table-to-export">
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>No.</th>
//             <th style={{ textAlign: "center" }}>Course Name</th>
//             <th style={{ textAlign: "center" }}>Module Name</th>
//             <th style={{ textAlign: "center" }}>Topic Name</th>
//             <th style={{ textAlign: "center" }}>PDF</th>
//             <th style={{ textAlign: "center" }}>Video</th>
//             {/* <th style={{ textAlign: "center" }}>Low Question</th>
//             <th style={{ textAlign: "center" }}>Medium Question</th>
//             <th style={{ textAlign: "center" }}>Hard Question</th> */}
//             <th style={{ textAlign: "center" }}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {searchFilter
//             ? filteredTopics.map((item, index) => (
//                 <tr key={item.id}>
//                   <td style={{ textAlign: "center" }}>{index + 1}</td>
//                   <td>{item.course_name}</td>
//                   <td>{item.module_name}</td>
//                   <td>{item.topic_name}</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Link
//                       style={{ textDecoration: "none" }}
//                       variant="contained"
//                       color="primary"
//                       onClick={() => openPdfDialog(item.pdf_file)}
//                     >
//                       View PDF
//                     </Link>
//                   </td>
//                   <td style={{ textAlign: "center" }}>
//                     <Link
//                       style={{ textDecoration: "none" }}
//                       variant="contained"
//                       color="primary"
//                       onClick={() => openVideoDialog(item.video_file)}
//                     >
//                       View Video
//                     </Link>
//                   </td>
//                   {/* <td>{item.low}</td>
//                 <td>{item.medium}</td>
//                 <td>{item.hard}</td> */}
//                   <td style={{ textAlign: "center" }}>
//                     <Link to={`/topicupdate/${item.id}`}>
//                       <button
//                         className="btn btn-primary"
//                         variant="contained"
//                         color="warning"
//                       >
//                         <EditIcon />
//                       </button>
//                     </Link>
//                     <button
//                       className="btn btn-danger"
//                       variant="contained"
//                       color="error"
//                       onClick={() => deleteTopic(item.id)}
//                     >
//                       <DeleteForeverIcon />
//                     </button>
//                     {/* <Link to={`/viewtopic/${item.id}`}>
//                     <button
//                       className="btn btn-success" variant="contained" color="warning">
//                       View
//                     </button>
//                   </Link> */}
//                   </td>
//                 </tr>
//               ))
//             : data.map((item, index) => (
//                 <tr key={item.id}>
//                   <td style={{ textAlign: "center" }}>{index + 1}</td>
//                   <td>{item.course_name}</td>
//                   <td>{item.module_name}</td>
//                   <td>{item.topic_name}</td>
//                   <td style={{ textAlign: "center" }}>
//                     <Link
//                       style={{ textDecoration: "none" }}
//                       variant="contained"
//                       color="primary"
//                       onClick={() => openPdfDialog(item.pdf_file)}
//                     >
//                       View PDF
//                     </Link>
//                   </td>
//                   <td style={{ textAlign: "center" }}>
//                     <Link
//                       style={{ textDecoration: "none" }}
//                       variant="contained"
//                       color="primary"
//                       onClick={() => openVideoDialog(item.video_file)}
//                     >
//                       View Video
//                     </Link>
//                   </td>
//                   {/* <td>{item.low}</td>
//                 <td>{item.medium}</td>
//                 <td>{item.hard}</td> */}
//                   <td style={{ textAlign: "center" }}>
//                     <Link to={`/topicupdate/${item.id}`}>
//                       <button
//                         className="btn btn-primary"
//                         variant="contained"
//                         color="warning"
//                       >
//                         <EditIcon />
//                       </button>
//                     </Link>
//                     <button
//                       className="btn btn-danger"
//                       variant="contained"
//                       color="error"
//                       onClick={() => deleteTopic(item.id)}
//                     >
//                       <DeleteForeverIcon />
//                     </button>
//                     {/* <Link to={`/viewtopic/${item.id}`}>
//                     <button
//                       className="btn btn-success" variant="contained" color="warning">
//                       View
//                     </button>
//                   </Link> */}
//                   </td>
//                 </tr>
//               ))}
//         </tbody>
//       </table>

//       {/* PDF Dialog */}
//       <Dialog
//         open={pdfDialogOpen}
//         onClose={closePdfDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>PDF Viewer</DialogTitle>
//         <DialogContent>
//           <embed
//             src={`http://localhost:5000/${pdfFilePath}`}
//             width="100%"
//             height="500px"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closePdfDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Video Dialog */}
//       <Dialog
//         open={videoDialogOpen}
//         onClose={closeVideoDialog}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Video Player</DialogTitle>
//         <DialogContent>
//           <video controls width="100%" height="auto">
//             <source
//               src={`http://localhost:5000/${videoFilePath}`}
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeVideoDialog} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default TopicTable;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Usermanage.css";
import { toast } from "react-toastify";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Slide } from "@mui/material";
import Typography from "@mui/material/Typography";
import UpdateTopicForm from "./UpdateTopicForm";
import TopicForm from "./TopicsForm";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import Breadcrumbs from "./Breadcrumb";
import Swal from "sweetalert2";

const TopicTable = () => {
  const [data, setData] = useState([]);
  const [pdfFilePath, setPdfFilePath] = useState("");
  const [videoFilePath, setVideoFilePath] = useState("");
  const [pdfDialogOpen, setPdfDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const itemsPerPage = 5; // Number of items to display per page
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [edittopic, setedittopic] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/topics/get");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching topics.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteTopic = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this topic!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/topics/remove/${id}`);
        toast.success("Topic Deleted Successfully!!");
        loadData();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the topic.");
      }
    }
  };

  const openPdfDialog = (pdfPath) => {
    setPdfFilePath(pdfPath);
    setPdfDialogOpen(true);
  };

  const openVideoDialog = (videoPath) => {
    setVideoFilePath(videoPath);
    setVideoDialogOpen(true);
  };

  const closePdfDialog = () => {
    setPdfFilePath("");
    setPdfDialogOpen(false);
  };

  const closeVideoDialog = () => {
    setVideoFilePath("");
    setVideoDialogOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value); // Update the search filter state as the user types
    setCurrentPage(1); // Reset to page 1 when changing the search filter
  };

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredTopics = data.filter((item) =>
    item.topic_name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredTopics.length / itemsPerPage);

  // Get the topics to display based on the current page
  const displayedTopics = filteredTopics.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const openEditDialog = (topic) => {
    setedittopic(topic.id);
    setEditDialogOpen(true);
  };

  // Function to close the edit dialog
  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const openAddDialog = () => {
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setAddDialogOpen(false);
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const moduleClickData = localStorage.getItem("moduleclick");
    if (moduleClickData) {
      const parsedData = JSON.parse(moduleClickData);
      console.log("parsed data", parsedData);

      setSelectedModule(parsedData);
      setBreadcrumbItems([
        { text: "Course Dashboard", url: "/coursedashboard" },
        {
          text: parsedData.course_name || "not found",
          url: "/coursedashboard",
        },
        { text: "Modules", url: "/moduletable" },
        { text: parsedData.module_name || "not found", url: "/topicstable" },
      ]);
    }
  }, []);

  const handleAddModules = (topic) => {
    localStorage.setItem("topicclick", JSON.stringify(topic));
  };

  console.log('edit topiccccc',edittopic);

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />,
      <div style={{ marginTop: "6%", marginLeft: "21%", width: "75%" }}>
        <h3
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#e84393",
          }}
        >
          Topics
        </h3>
        <div style={{ display: "flex" }}>
          <div className="d-flex justify-content-center mt-3">
            <input
              type="text"
              placeholder="Filter by Module"
              value={searchFilter}
              onChange={handleSearchChange}
            />
          </div>

          <button
            style={{
              background: "none",
              border: "none",
              padding: "0",
              cursor: "pointer",
              marginLeft: "1%",
            }}
          >
            <ReactHTMLTableToExcel
              id="export-excel-btn"
              className="btn btn-success"
              table="table-to-export"
              filename="Topic Details"
              sheet="user data"
              buttonText="Export to Excel"
            />
          </button>
          <Button
            variant="contained"
            style={{
              marginLeft: "54%",
              width: "150px",
              border: "none",
              backgroundColor: "#0984e3",
              color: "white",
              height: "40px",
            }}
            onClick={openAddDialog}
          >
            <AddIcon /> Add Topics
          </Button>
        </div>

        <table className="table table-bordered" id="table-to-export">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Course Name</th>
              <th style={{ textAlign: "center" }}>Module Name</th>
              <th style={{ textAlign: "center" }}>Topic Name</th>
              <th style={{ textAlign: "center" }}>PDF</th>
              <th style={{ textAlign: "center" }}>Video</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTopics.map((item, index) =>
              selectedModule.module_name == item.module_name ? (
                <tr key={item.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{item.course_name}</td>
                  <td>{item.module_name}</td>
                  <td>{item.topic_name}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      variant="contained"
                      color="primary"
                      onClick={() => openPdfDialog(item.pdf_file)}
                    >
                      View PDF
                    </Link>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Link
                      style={{ textDecoration: "none" }}
                      variant="contained"
                      color="primary"
                      onClick={() => openVideoDialog(item.video_file)}
                    >
                      View Video
                    </Link>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-primary"
                      variant="contained"
                      color="warning"
                      onClick={() => openEditDialog(item)} // Open edit dialog
                    >
                      <EditIcon />
                    </button>

                    <button
                      className="btn btn-danger"
                      variant="contained"
                      color="error"
                      onClick={() => deleteTopic(item.id)}
                      style={{ marginLeft: "9px" }}
                    >
                      <DeleteForeverIcon />
                    </button>
                    <Link to="/mcqtable">
                      <Button
                        var
                        sx={{
                          backgroundColor: "#26de81",
                          color: "white",
                          marginLeft: "12px",
                        }}
                        onClick={() => handleAddModules(item)}
                      >
                        {" "}
                        <KeyboardDoubleArrowRightIcon /> Add Mcq
                      </Button>
                    </Link>
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
          </tbody>
        </table>

        {/* PDF Dialog */}
        <Dialog
          open={pdfDialogOpen}
          onClose={closePdfDialog}
          fullWidth
          maxWidth="md"
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <DialogTitle>PDF Viewer</DialogTitle>
          <DialogContent>
            <embed
              src={`http://localhost:5000/${pdfFilePath}`}
              width="100%"
              height="500px"
            />
          </DialogContent>
          <DialogActions>
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
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <DialogTitle>Video Player</DialogTitle>
          <DialogContent>
            <video controls width="100%" height="auto">
              <source
                src={`http://localhost:5000/${videoFilePath}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeVideoDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          fullWidth
          maxWidth="lg"
          TransitionComponent={Slide}
          transitionDuration={1000}
          
        >
          <DialogTitle>
            <h3
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#e84393",
              }}
            >
              Update Topic
            </h3>
          </DialogTitle>
          <DialogContent>
            {/* Add content for the edit dialog here */}
            <UpdateTopicForm edittopic={edittopic} />
          </DialogContent>
          <DialogActions>
          <Button
              onClick={closeEditDialog}
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
            <Button onClick={closeEditDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={addDialogOpen}
          onClose={closeAddDialog}
          fullWidth
          maxWidth="lg"
          TransitionComponent={Slide}
          transitionDuration={1000}
          PaperProps={{
            style: {
              maxHeight: "85%", // Adjust the percentage as needed
            },
          }}
        >
          <DialogTitle>
            {" "}
            <h3
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#e84393",
              }}
            >
              Add Topic
            </h3>
          </DialogTitle>
          <DialogContent>
            {/* Add content for the add dialog here */}
            <TopicForm />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeAddDialog}
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
            <Button onClick={closeAddDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Material-UI Pagination */}
        <Stack spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Typography>Page: {currentPage}</Typography>
          <Pagination
            count={pageCount}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default TopicTable;
