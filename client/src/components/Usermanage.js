import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./Usermanage.css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Breadcrumbs from "./Breadcrumb";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Tooltip,
} from "@mui/material";
import Adduser from "./Adduser";
import Addupdate from "./Addupdate";
import UserUpload from "./UserUpload";
import Pagination from "@mui/material/Pagination";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from 'sweetalert2';
 

const Usermanage = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(""); // State for selected course
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [UserEdit, setUserEdit] = useState("");

  // Pagination states
  const [page, setPage] = useState(1); // Current page
  const [itemsPerPage, setItemsPerPage] = useState(5); // Items per page

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/get");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id, name) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: 'Confirm Deletion',
      html: `Are you sure you want to delete the user <span style="color: red;">"${name}"</span>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Delete" button in SweetAlert
        axios
          .delete(`http://localhost:5000/api/user/remove/${id}`)
          .then(() => {
            toast.success('User Deleted Successfully!!');
            setTimeout(() => loadData(), 500);
          })
          .catch((error) => {
            console.error(error);
            toast.error('Error deleting user');
          });
      }
    });
  };
  

  const uniqueCourseNames = [...new Set(data.map((item) => item.coursename))]; // Extract unique course names

  const filterData = () => {
    if (selectedCourse) {
      const filtered = data.filter(
        (item) => item.coursename === selectedCourse
      );
      return filtered;
    } else {
      return data;
    }
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Dashboard", url: "/adminpanel" },
    { text: "Usermanage", url: "/admin/usermanage" },
    { text: "Existing users", url: "/admin/usermanage" },
  ]);

  const handleOpenAddUserDialog = () => {
    setOpenAddUserDialog(true);
  };

  const handleCloseAddUserDialog = () => {
    setOpenAddUserDialog(false);
  };

  const handleOpenEditUserDialog = (item) => {
    setOpenEditUserDialog(true);
    setUserEdit(item.id);
  };

  const handleCloseEditUserDialog = () => {
    setOpenEditUserDialog(false);
  };

  // Handle page changes
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />,
      <div
        className=""
        style={{ width: "70%", marginLeft: "20%", marginTop: "12%" }}
      >
        {/* <div style={{ marginLeft: "60%" }}>
          <UserUpload />
        </div> */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddUserDialog}
          style={{
            float: "right",
            width: "15%",
            height: "40px",
            backgroundColor: "#e84393",
          }}
        >
          <AddIcon style={{ marginRight: "5px" }} /> Add User
        </Button>

        <div style={{ display: "flex", marginLeft: "5%" }}>
          <Tooltip
            title="Filter Users By Coursename"
            placement="top"
            style={{ fontSize: "70px" }}
          >
            <div className="mb-3 me-3">
              <select
                className="form-select"
                id="courseFilter"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{
                  backgroundColor: "#a55eea",
                  border: "none",
                  color: "white",
                }} // Add the border style here
              >
                <option value="">All Courses</option>
                {uniqueCourseNames.map((courseName, index) => (
                  <option
                    key={index}
                    value={courseName}
                    style={{ backgroundColor: "#fed330" }}
                  >
                    {courseName}
                  </option>
                ))}
              </select>
            </div>
          </Tooltip>
          <div style={{ marginTop: "5px" }}>
            <ReactHTMLTableToExcel
              id="export-excel-btn"
              className="btn btn-success"
              table="table-to-export"
              filename="user_data"
              sheet="user_data"
              buttonText={
                <span>
                  <SaveIcon style={{ marginRight: "2px" }} /> Export to Excel
                </span>
              }
            />
          </div>
        </div>
        <table
          className="table table-bordered table-hover"
          style={{ marginTop: "", marginLeft: "5%" }}
          id="table-to-export"
        >
          <thead className="thead-dark">
            <tr>
              <th scope="col" style={{ textAlign: "center" }}>
                No.
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Name
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Email
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Course Name
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Contact
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Gender
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Date of Birth
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData()
              .slice((page - 1) * itemsPerPage, page * itemsPerPage) // Slice data based on current page
              .map((item, index) => {
                // Format the date of birth to display only the date
                const formattedDOB = new Date(item.dob).toLocaleDateString();

                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.coursename}</td>
                    <td>{item.contact}</td>
                    <td>{item.gender}</td>
                    <td>{formattedDOB}</td>
                    <td>
                      <Tooltip title="Edit">
                        <button
                          className="btn btn-info btn-sm mr-2"
                          onClick={() => handleOpenEditUserDialog(item)}
                        >
                          <EditIcon />
                        </button>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteContact(item.id, item.name)}
                          style={{ marginLeft: "8px" }}
                        >
                          <DeleteForeverIcon />
                        </button>
                      </Tooltip>
                      <Link to={`/view/${item.id}`}>
                        <Tooltip title="View">
                          <button
                            className="btn btn-primary btn-sm ml-2"
                            style={{ marginLeft: "8px" }}
                          >
                            <VisibilityIcon />
                          </button>
                        </Tooltip>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Pagination
          count={Math.ceil(filterData().length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          size="large"
          style={{ marginTop: "20px" }}
        />
      </div>
      {/* Add User Dialog */}
      <Dialog
        open={openAddUserDialog}
        onClose={handleCloseAddUserDialog}
        fullWidth
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
            Add User
          </h3>
        </DialogTitle>
        <DialogContent>
          <Adduser />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseAddUserDialog}
            color="primary"
            style={{
              position: "absolute",
              color: "red",
              top: "10px",
              right: "10px",
            }}
          >
            <ClearIcon /> {/* Add ClearIcon button for cancel */}
          </Button>
          <Button onClick={handleCloseAddUserDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit User Dialog */}
      <Dialog
        open={openEditUserDialog}
        onClose={handleCloseEditUserDialog}
        fullWidth
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
            Update User
          </h3>
        </DialogTitle>
        <DialogContent>
          <Addupdate UserEdit={UserEdit} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEditUserDialog}
            color="primary"
            style={{
              position: "absolute",
              color: "red",
              top: "10px",
              right: "10px",
            }}
          >
            <ClearIcon /> {/* Add ClearIcon button for cancel */}
          </Button>
          <Button onClick={handleCloseEditUserDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Usermanage;
