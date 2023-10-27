import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const CourseTable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false); // State to control the image dialog
  const [selectedImage, setSelectedImage] = useState(""); // State to store the selected image URL

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/course/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteCourse = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:5000/api/course/remove/${id}`);
      toast.success("Course Deleted Successfully!!");
      setTimeout(() => loadData(), 500);
    }
  };

  const handleViewImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  return (
    <div style={{ marginTop: "", marginRight: "6%" }}>
      <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Course</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Course Name</th>
            <th style={{ textAlign: "center" }}>Course Image</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td style={{ textAlign: "center" }}>{index + 1}</td>
              <td>{item.coursename}</td>
              <td style={{ textAlign: "center" }}>
              <Link style={{textDecoration:"none"}}
                  to="#"
                  onClick={() =>
                    handleViewImage(`http://localhost:5000/${item.courseimg}`)
                  }
                >
                  View Image
                </Link>
              </td>
              <td style={{ textAlign: "center" }}>
                <Link to={`/courseupdate/${item.id}`}>
                  <button className="btn btn-primary"><EditIcon /></button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCourse(item.id)}
                >
                 <DeleteForeverIcon/>
                </button>
                {/* <Link to={`/viewcourse/${item.id}`}>
                  <button className="btn btn-success">View</button>
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={open}
        TransitionComponent={Slide}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Course Image</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <img
              src={selectedImage}
              alt="Course Image"
              style={{ width: "100%", height: "auto" }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseTable;
