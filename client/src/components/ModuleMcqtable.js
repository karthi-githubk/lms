import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button, Modal } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import AddModuleMcq from "./ModuleMcqForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import UpdateModuleMcq from "./UpdateModulemcq";
import Breadcrumbs from "./Breadcrumb";
import { Pagination, Stack, Typography } from "@mui/material";
import Swal from 'sweetalert2';


const ModuleMcqtable = () => {
  const [mcqData, setMcqData] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [deleteMcqId, setDeleteMcqId] = useState(null);
  const [LocaltopicData, setLocaltopicData] = useState([]);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);
  const [isAddMCQDialogOpen, setIsAddMCQDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editeddata, setediteddata] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const itemsPerPage = 5; // Number of items to display per page

  const addMcqToLocalStorage = (data) => {
    // Fetch existing data from localStorage (if any)
    const existingData = localStorage.getItem("modulemcq");

    // If there is existing data, parse it and add the new data to it
    if (existingData) {
      const parsedData = JSON.parse(existingData);
      parsedData.push(data);
      localStorage.setItem("modulemcq", JSON.stringify(parsedData));
    } else {
      // If there is no existing data, create a new array and add the data to it
      localStorage.setItem("modulemcq", JSON.stringify([data]));
    }
  };

  const loadMcqData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/modulemcq/get"
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


  const deleteMcqQuestion = (id) => {
    setDeleteMcqId(id);
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Module MCQ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Delete" button in SweetAlert
        confirmDelete();
      }
    });
  };

  const confirmDelete = () => {
    if (deleteMcqId !== null) {
      axios
        .delete(`http://localhost:5000/api/modulemcq/remove/${deleteMcqId}`)
        .then(() => {
          toast.success('Module MCQ Deleted Successfully!!');
          setTimeout(() => {
            loadMcqData();
            setShowConfirmationModal(false);
          }, 500);
        })
        .catch((error) => {
          console.error(error);
          toast.error('Error deleting MCQ');
          setShowConfirmationModal(false);
        });
    }
  };
  
  const [localmcqData, setLocalmcqData] = useState([]);
  useEffect(() => {
    // Fetch data from local storage and set it in the state
    const storedTopicData = localStorage.getItem("modulemcq");
    if (storedTopicData) {
      setLocalmcqData(JSON.parse(storedTopicData));
    }
  }, []);

  useEffect(() => {
    // Fetch data from local storage and set it in the state
    const storedTopicData = localStorage.getItem("topics");
    if (storedTopicData) {
      const parsedData = JSON.parse(storedTopicData);
      setLocaltopicData(parsedData);
      console.log("pd", parsedData);
      setBreadcrumbItems([
        { text: "Course Dashboard", url: "/coursedashboard" },
        {
          text: parsedData.course_name || "not found",
          url: "/coursedashboard",
        },
        { text: parsedData.module_name || "not found", url: "/moduletable" },
        // { text: "Module", url: "/modules" },
      ]);
    }
  }, []);

  const openAddMCQDialog = () => {
    setIsAddMCQDialogOpen(true);
  };

  const closeAddMCQDialog = () => {
    setIsAddMCQDialogOpen(false);
  };

  const openEditDialog = (item) => {
    setIsEditDialogOpen(true);
    setediteddata(item);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
  };

  // Calculate the range of items to display based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter your data to get the items to display on the current page
  const filteredMcqData = mcqData.filter(
    (item) => item.module_name === LocaltopicData.module_name
  );
  const displayedMcqData = filteredMcqData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredMcqData.length / itemsPerPage);

  // Create a function to handle page changes
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />,
      <div style={{ marginLeft: "200px", marginTop: "7%" }}></div>
      <div className="mcq-table-container">
        <h3
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            color: "#e84393",
          }}
        >
          Modules Mcq's
        </h3>
        <div
          className="d-flex justify-content-center "
          style={{ marginLeft: "76%" }}
        >
          <Button className="btn btn-primary" onClick={openAddMCQDialog}>
            <AddIcon /> Add Module's Mcq
          </Button>
        </div>
        <Table
          bordered
          hover
          style={{ marginTop: "1%", width: "70%", marginLeft: "23%" }}
        >
          <thead>
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                No.
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Module Name
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Question
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Option 1
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Option 2
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Option 3
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Option 4
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Correct Option
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mcqData.map((item, index) =>
              item.module_name === LocaltopicData.module_name ? (
                <tr key={item.id}>
                  <td style={{ textAlign: "right" }}>{index + 1}</td>
                  <td style={{ textAlign: "left" }}>{item.module_name}</td>
                  <td style={{ textAlign: "left" }}>{item.question}</td>
                  <td style={{ textAlign: "left" }}>{item.option_1}</td>
                  <td style={{ textAlign: "left" }}>{item.option_2}</td>
                  <td style={{ textAlign: "left" }}>{item.option_3}</td>
                  <td style={{ textAlign: "left" }}>{item.option_4}</td>
                  <td style={{ textAlign: "left" }}>{item.correct_option}</td>
                  <td className="d-flex">
                    <Button onClick={() => openEditDialog(item)}>
                      <EditIcon /> Edit
                    </Button>
                    <Button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                    >
                      <DeleteForeverIcon
                        size="sm"
                        onClick={() => deleteMcqQuestion(item.id)}
                      />{" "}
                      Delete
                    </Button>
                  </td>
                </tr>
              ) : (
                ""
              )
            )}
          </tbody>
        </Table>
        
        <Dialog
          open={isAddMCQDialogOpen} // Conditionally render the dialog based on state
          onClose={closeAddMCQDialog} // Close the dialog when needed
          TransitionComponent={Slide}
        >
          <DialogTitle>Add Modules MCQ's</DialogTitle>
          <DialogContent>
            <AddModuleMcq />
          </DialogContent>
          <DialogActions>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeAddMCQDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "8px",
                right: "6%",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog
          open={isEditDialogOpen} // Step 3: Open the edit dialog
          onClose={closeEditDialog} // Step 4: Close the edit dialog
          TransitionComponent={Slide}
        >
          <DialogTitle>
            <h3
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                color: "#e84393",
              }}
            >
              Update Module Mcq
            </h3>
          </DialogTitle>
          <DialogContent>
            <UpdateModuleMcq editeddata={editeddata} />
          </DialogContent>
          <DialogActions>
            <IconButton
              edge="end"
              color="inherit"
              onClick={closeEditDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "8px",
                right: "6%",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>

        <Stack
          spacing={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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

export default ModuleMcqtable;
