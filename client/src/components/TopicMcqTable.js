// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Usermanage.css";
// import { toast } from "react-toastify";
// import axios from "axios";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// const TopicMcqTable = () => {
//   const [mcqData, setMcqData] = useState([]);

//   const loadMcqData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/mcq_questions/get");
//       setMcqData(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while fetching MCQ questions.");
//     }
//   };

//   useEffect(() => {
//     loadMcqData();
//   }, []);

//   const deleteMcqQuestion = async (id) => {
//     if (window.confirm("Are you sure you want to delete this MCQ question?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/mcq_questions/remove/${id}`);
//         toast.success("MCQ question deleted successfully.");
//         loadMcqData();
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while deleting the MCQ question.");
//       }
//     }
//   };

//   return (
//     <div className="mcq-table-container" style={{ marginTop: "6%", marginLeft: "21%", width: "75%" }}>
//        <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>mcq questions</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>No.</th>
//             <th>Topic Name</th>
//             {/* <th>Question</th> */}
//             <th>Option 1</th>
//             <th>Option 2</th>
//             <th>Option 3</th>
//             <th>Option 4</th>
//             <th>Correct Option</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mcqData.map((item, index) => (
//             <tr key={item.id}>
//               <td>{index + 1}</td>
//               <td>{item.topic_name}</td>
//               {/* <td>{item.question}</td> */}
//               <td>{item.option_1}</td>
//               <td>{item.option_2}</td>
//               <td>{item.option_3}</td>
//               <td>{item.option_4}</td>
//               <td>{item.correct_option}</td>
//               <td>
//                 <Link to={`/mcqupdate/${item.id}`}>
//                   <button className="btn btn-primary">
//                     <EditIcon/>
//                   </button>
//                 </Link>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => deleteMcqQuestion(item.id)}
//                 >
//                   <DeleteForeverIcon/>
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TopicMcqTable;

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import UpdateMCQForm from "./UpdateMcqForm";
import TopicMcq from "./TopicMcq";
import Breadcrumbs from "./Breadcrumb";
import { Slide } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from 'sweetalert2'; // Import SweetAlert

const TopicMcqTable = () => {
  const [mcqData, setMcqData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedMcq, setSelectedMcq] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const itemsPerPage = 2;

  const loadMcqData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/mcq_questions/get"
      );
      setMcqData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching MCQ questions.");
    }
  };

  useEffect(() => {
    loadMcqData();
  }, []);

  const deleteTopic = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this topic!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/mcq_questions/remove/${id}`);
        toast.success("Topic deleted successfully.");
        loadMcqData();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while deleting the topic.");
      }
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedMcqData = mcqData.slice(startIndex, endIndex);
  const pageCount = Math.ceil(mcqData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const openEditDialog = (mcq) => {
    setSelectedMcq(mcq.id);
    setEditDialogOpen(true);
  };
  console.log("sm", selectedMcq);

  const closeEditDialog = () => {
    setSelectedMcq(null);
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
    const moduleClickData = localStorage.getItem("topicclick");
    if (moduleClickData) {
      const parsedData = JSON.parse(moduleClickData);

      setSelectedTopic(parsedData);
      setBreadcrumbItems([
        { text: "Course Dashboard", url: "/coursedashboard" },
        {
          text: parsedData.course_name || "not found",
          url: "/coursedashboard",
        },
        { text: parsedData.module_name || "not found", url: "/topicstable" },
        { text: parsedData.topic_name || "not found", url: "/mcqtable" },
      ]);
    }
  }, []);

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />,
      <div
        className="mcq-table-container"
        style={{ marginTop: "8%", marginLeft: "20%", width: "75%" }}
      >
        <h3
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#e84393",
          }}
        >
          mcq questions
        </h3>
        <div>
          <Button
            variant="contained"
            style={{
              marginLeft: "86%",
              width: "150px",
              border: "none",
              backgroundColor: "#0984e3",
              color: "white",
              height: "40px",
            }}
            onClick={openAddDialog} // Open the "Add Mcq's" dialog
          >
            <AddIcon /> Add Mcq's
          </Button>
        </div>
        <table className="table table-bordered" style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <th className="text-center">No.</th>
              <th className="text-center">Topic Name</th>
              <th className="text-center">Option 1</th>
              <th className="text-center">Option 2</th>
              <th className="text-center">Option 3</th>
              <th className="text-center">Option 4</th>
              <th className="text-center">Correct Option</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedMcqData.map((item, index) =>
              selectedTopic.topic_name == item.topic_name ? (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.topic_name}</td>
                  <td>{item.option_1}</td>
                  <td>{item.option_2}</td>
                  <td>{item.option_3}</td>
                  <td>{item.option_4}</td>
                  <td>{item.correct_option}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => openEditDialog(item)}
                    >
                      <EditIcon />
                    </button>
                    <button
                  className="btn btn-danger"
                  onClick={() => deleteTopic(item.id)} // Use deleteTopic function
                >
                  <DeleteForeverIcon />
                </button>
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
          </tbody>
        </table>
        <Stack spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Typography>Page: {currentPage}</Typography>
          <Pagination
            count={pageCount}
            color="primary"
            page={currentPage}
            onChange={handlePageChange}
          />
        </Stack>
        <Dialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          fullWidth
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <DialogContent>
            <h3
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#e84393",
              }}
            >
              Update Mcq
            </h3>
            <hr />
            <UpdateMCQForm selectedMcq={selectedMcq} />
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
        {/* "Add Mcq's" Dialog */}
        <Dialog
          open={addDialogOpen}
          onClose={closeAddDialog}
          fullWidth
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <DialogContent>
            <TopicMcq />
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
      </div>
    </div>
  );
};

export default TopicMcqTable;
