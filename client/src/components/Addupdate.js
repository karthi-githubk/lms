import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Breadcrumbs from "./Breadcrumb";

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dob: "",
  coursename: "", // Use coursename instead of course_id
  password: "",
};

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Addupdate = (props) => {
  const id = props.UserEdit;
  const [state, setState] = useState(initialState);
  const { name, email, contact, gender, dob, coursename, password } = state;
  const history = useNavigate();
  // const { id } = useParams();
  const [userCourse, setUserCourse] = useState(""); // State to store the course name

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/user/get/${id}`)
        .then((resp) => {
          const userData = resp.data[0];
          // Format the dob field before setting it in the state
          userData.dob = formatDate(userData.dob);
          setState(userData);
          setUserCourse(userData.coursename); // Use coursename instead of course_id
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !name ||
        !email ||
        !contact ||
        !gender ||
        !dob ||
        !coursename || // Use coursename instead of course_id
        !password
      ) {
        toast.error("Please provide a value for each input field!");
      } else {
        const formattedDob = formatDate(dob);
        const userData = {
          name,
          email,
          contact,
          gender,
          dob: formattedDob,
          coursename, // Use coursename instead of course_id
          password,
        };

        if (!id) {
          await axios.post("http://localhost:5000/api/user/post", userData);
          toast.success("User added successfully!!");
        } else {
          await axios.put(
            `http://localhost:5000/api/user/update/${id}`,
            userData
          );
          toast.success("User updated successfully!!");
        }

        setState(initialState);
        setTimeout(() => history("/admin/usermanage"), 800);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  const resetForm = () => {
    setState(initialState);
  };

  return (
    <div style={{ marginTop: "10px" }}>
    <div style={{ marginLeft: "4%" }}>
      <Col md={12}>
        <Form
          onSubmit={handleSubmit}
          style={{
            padding: "15px",
            borderRadius: "8px",
            width: "100%",
          }}
        >
          <Form.Group controlId="name">
            <Form.Label>Name<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="User Name"
              name="name"
              value={name || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group controlId="email">
            <Form.Label>Email<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Id"
              name="email"
              value={email || ""}
              disabled
            />
          </Form.Group>
  
          <Form.Group controlId="password">
            <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group controlId="coursename">
            <Form.Label>Course Name<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="text"
              value={userCourse}
              disabled
              style={{ background: "#f5f5f5", cursor: "not-allowed" }}
            />
          </Form.Group>
  
          <Form.Group controlId="contact">
            <Form.Label>Contact<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="number"
              placeholder="Contact Number"
              name="contact"
              value={contact || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
  
          <Form.Group controlId="gender">
            <Form.Label>Gender<span style={{ color: "red" }}>*</span></Form.Label>
            <Select
              options={genderOptions}
              value={genderOptions.find((opt) => opt.value === gender) || null}
              onChange={(selectedOption) => {
                handleInputChange({
                  target: {
                    name: "gender",
                    value: selectedOption ? selectedOption.value : "",
                  },
                });
              }}
            />
          </Form.Group>
  
          <Form.Group controlId="dob">
            <Form.Label>Date of Birth<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={dob || ""}
              onChange={handleInputChange}
            />
          </Form.Group>
          <br />
  
          <Button type="submit" variant="primary" style={{ width: '30%', height: '40px' }}>
            {id ? "UPDATE" : "SAVE"}
          </Button>
          <Link to="/admin/usermanage">
            <Button variant="success" style={{ marginLeft: "10px", width: '30%', height: '40px' }}>
              BACK
            </Button>
          </Link>
          <Button type="button" variant="danger" style={{ marginTop: "", width: '30%', height: '40px', marginLeft: '7px' }} onClick={resetForm}>
            RESET
          </Button>
        </Form>
        <ToastContainer />
      </Col>
    </div>
  </div>
  
  );
};

export default Addupdate;