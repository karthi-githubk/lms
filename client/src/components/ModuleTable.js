import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Usermanage.css";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
  Typography,
  Stack,
  Tooltip,
  Zoom,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import AddModuleForm from "./Coursemodule";
import UpdateModuleForm from "./UpdateModuleForm";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Swal from "sweetalert2"; // Import SweetAlert
import Pagination from "@mui/material/Pagination";
import Breadcrumbs from "./Breadcrumb";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const ModuleTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [openEditModuleDialog, setOpenEditModuleDialog] = useState(false);
  const [openAddModulesDialog, setOpenAddModulesDialog] = useState(false);
  const [moduleEditData, setmoduleEditData] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/modules/get");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching modules:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteModule = async (id) => {
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
        await axios.delete(`http://localhost:5000/api/modules/remove/${id}`);
        toast.success("Module Deleted Successfully!!");
        loadData();
      }
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const showImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenImageDialog(true);
  };

  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  const handleOpenAddModulesDialog = () => {
    setOpenAddModulesDialog(true);
  };

  const handleCloseAddModulesDialog = () => {
    setOpenAddModulesDialog(false);
  };

  const handleOpenEditModuleDialog = (editmodule) => {
    setmoduleEditData(editmodule.id);

    setOpenEditModuleDialog(true);
  };

  const handleCloseEditModuleDialog = () => {
    setOpenEditModuleDialog(false);
  };

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter modules based on selected course
  const filteredModules = selectedCourse
    ? data.filter((item) => item.course_name === selectedCourse.coursename)
    : data;

  const displayedData = filteredModules.slice(startIndex, endIndex);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const courseClickData = localStorage.getItem("courseclick");
    if (courseClickData) {
      const parsedData = JSON.parse(courseClickData);

      setSelectedCourse(parsedData);
      setBreadcrumbItems([
        { text: "Course Dashboard", url: "/coursedashboard" },
        { text: parsedData.coursename || "not found", url: "/coursedashboard" },
        { text: "Modules", url: "/moduletable" },
      ]);
    }
  }, []);

  console.log("courseclick", selectedCourse);

  const handleAddModules = (module) => {
    localStorage.setItem("moduleclick", JSON.stringify(module));
  };

  const clearAndAddToLocalStorage = (data) => {
    localStorage.removeItem("topics");
    localStorage.setItem("topics", JSON.stringify(data));
    // toast.success("Topics added to local storage!");
  };

  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />,
      <div style={{ marginTop: "6%", marginLeft: "27%" }}>
        <h3
          style={{
            marginLeft: "34%",
            textTransform: "uppercase",
            color: "#e84393",
          }}
        >
          Modules
        </h3>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#0984e3", color: "white", marginLeft: "65%" }}
          onClick={handleOpenAddModulesDialog}
        >
          <AddIcon style={{ marginRight: "5px" }} /> Add Modules
        </Button>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <table
              className="table table-bordered"
              style={{ width: "85%", marginTop: "3%" }}
            >
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No.</th>
                  <th style={{ textAlign: "center" }}>Course Name</th>
                  <th style={{ textAlign: "center" }}>Module Name</th>
                  <th style={{ textAlign: "center" }}>Module Image</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => {
                  const rowIndex = startIndex + index + 1;
                  return selectedCourse.coursename == item.course_name ? (
                    <tr key={item.id}>
                      <td style={{ textAlign: "center" }}>{rowIndex}</td>
                      <td>{item.course_name}</td>
                      <td>{item.module_name}</td>
                      <td style={{ textAlign: "center" }}>
                        <Link
                          style={{ textDecoration: "none" }}
                          to="#"
                          onClick={() =>
                            showImage(
                              `http://localhost:5000/${item.module_img}`
                            )
                          }
                        >
                          View Image
                        </Link>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <Tooltip title='Edit Module'>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleOpenEditModuleDialog(item)}
                        >
                          <EditIcon />
                        </button>
                        </Tooltip>
                        <Tooltip title='Delete Module'>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteModule(item.id)}
                         style={{marginLeft:'7px'}}>
                          <DeleteForeverIcon />
                        </button>
                        </Tooltip>

                        <Link to='/modulemcq'>
                        <Button
                          className="btn btn-success"
                         style={{marginLeft:'12px',backgroundColor:'#a55eea',color:'white',}}
                         onClick={() => clearAndAddToLocalStorage(item)} >
                          <AddIcon />Add Mcq's
                        </Button>
                        </Link>

                        <Link to="/topicstable">
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
                            <KeyboardDoubleArrowRightIcon /> Add Topics
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    ""
                  );
                })}
              </tbody>
            </table>
            <Stack spacing={2} sx={{display:'flex',alignItems:'center',justifyContent:'center',marginRight:'17%'}}>
              <Typography>Page: {currentPage}</Typography>
              <Pagination
                count={pageCount}
                color="primary"
                page={currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        )}
        {/* Image Dialog */}
        <Dialog
          open={openImageDialog}
          TransitionComponent={Slide}
          keepMounted
          onClose={handleCloseImageDialog}
        >
          <DialogTitle>Module Image</DialogTitle>
          <DialogContent>
            <img
              src={selectedImage}
              alt="Module Image"
              style={{ width: "100%", height: "auto" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseImageDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        {/* "Add Modules" Dialog */}
        <Dialog
          open={openAddModulesDialog}
          TransitionComponent={Zoom}
          transitionDuration={1000}
          keepMounted
          onClose={handleCloseAddModulesDialog}
        >
          <DialogContent>
            <AddModuleForm />
          </DialogContent>
          <DialogActions>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseAddModulesDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "8px",
                right: "9%",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
        {/* "Edit Module" Dialog */}
        <Dialog
          open={openEditModuleDialog}
          TransitionComponent={Zoom}
          transitionDuration={1000}
          keepMounted
          onClose={handleCloseEditModuleDialog}
        >
          <DialogContent>
          <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Update Module</h3>
            <UpdateModuleForm moduleEditData={moduleEditData} />
          </DialogContent>
          <DialogActions>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseEditModuleDialog}
              aria-label="close"
              sx={{
                position: "absolute",
                top: "8px",
                right: "9%",
                color: "red",
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ModuleTable;
