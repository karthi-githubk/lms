import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Breadcrumbs from "./Breadcrumb";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import UpdateAdmin from "./UpdateAdmin";

const TableAdmin = () => {
  const [data, setData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get");
      setData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error loading data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (adminId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`http://localhost:5000/api/admin/remove/${adminId}`)
        .then(() => {
          toast.success("Contact Deleted Successfully!!");
          setTimeout(() => loadData(), 500);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Error deleting contact");
        });
    }
  };

  const openEditDialog = (itemData) => {
    setEditItemData(itemData.id);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditItemData(null);
    setEditDialogOpen(false);
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Dashboard", url: "/adminpanel" },
    { text: "Usermanage", url: "/admin/usermanage" },
    { text: "Existing Admins", url: "/admin/usermanage" },
  ]);

  return (
    <>
      <div>
        <Breadcrumbs items={breadcrumbItems} />,
        <div
          className="d-flex"
          style={{ marginLeft: "300px", marginTop: "11%" }}
        >
          <div>
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
        <Table
          bordered
          hover
          style={{
            marginTop: "22px",
            width: "70%",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.5)",
            marginLeft: "300px",
          }}
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
                Mobile Number
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Gender
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Date of Birth
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Password
              </th>
              <th scope="col" style={{ textAlign: "center" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const formattedDOB = new Date(item.dob).toLocaleDateString();

              return (
                <tr key={item.adminId}>
                  <td style={{ textAlign: "left" }} scope="row">
                    {index + 1}
                  </td>
                  <td style={{ textAlign: "left" }}>{item.name}</td>
                  <td style={{ textAlign: "left" }}>{item.email}</td>

                  <td style={{ textAlign: "left" }}>{item.contact}</td>
                  <td style={{ textAlign: "left" }}>{item.gender}</td>
                  <td style={{ textAlign: "left" }}>{formattedDOB}</td>
                  <td style={{ textAlign: "left" }}>{item.password}</td>
                  <td>
                    <Button
                      style={{ marginLeft: "10px" }}
                      onClick={() => openEditDialog(item)}
                    >
                      <EditIcon size="lg" className="mr-2" />
                    </Button>

                    <Button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                    >
                      <DeleteForeverIcon
                        size="lg"
                        onClick={() => deleteContact(item.adminId)}
                      />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Dialog
          open={editDialogOpen}
          onClose={closeEditDialog}
          TransitionComponent={Slide}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <UpdateAdmin editItemData={editItemData}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TableAdmin;
