import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addTaskToServer } from "./slices/tasksSlice";

const AddTask = () => {
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const [courseName, setCourseName] = useState(""); // New state variable
  const [courseNameError, setCourseNameError] = useState("");

  const nameRegex = /^.{4,}$/; // At least 4 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and 10 digits


  const addTask = (e) => {
    e.preventDefault();

    // form validation
    let isValid = true;

    if (!id) {
      setIdError("ID is required");
      isValid = false;
    } else {
      setIdError("");
    }

    if (name.length < 4) {
      setNameError("Name must be at least 4 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (courseName.length < 4) {
      setCourseNameError("Course Name must be at least 4 characters");
      isValid = false;
    } else {
      setCourseNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      isValid = false;
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!gender) {
      setGenderError("Please select a Gender");
      isValid = false;
    } else {
      setGenderError("");
    }

    if (!dateOfBirth) {
      setDateOfBirthError("Date of Birth is required");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }

    if (!isValid) {
      return;
    }

    // If all validations pass, dispatch the data to the server
    console.log({ id, name, email, phoneNumber, gender, dateOfBirth });
    dispatch(
      addTaskToServer({ id, name, email, phoneNumber, gender, dateOfBirth,courseName})
    );

    // Use toast to show the success message
    toast.success("User added successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    // Clear the form fields after adding the user
    setId("");
    setName("");
    setEmail("");
    setPhoneNumber("");
    setGender("");
    setDateOfBirth("");
    setCourseName(""); 
  };

  const handleIdChange = (e) => {
    const value = e.target.value;
    setId(value);
    setIdError(value ? "" : "ID is required");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(value.length >= 4 ? "" : "Name must be at least 4 characters");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else if (!value.endsWith(".com") && !value.endsWith(".net") && !value.endsWith(".org")) {
      setEmailError("Only .com, .net, and .org domains are allowed");
    } else {
      setEmailError("");
    }
  };
  
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneNumberError(value ? (phoneNumberRegex.test(value) ? "" : "Please enter a valid phone number") : "Phone Number is required");
  };

  const handleGenderChange = (e) => {
    const value = e.target.value;
    setGender(value);
    setGenderError(value ? "" : "Please select a Gender");
  };

  const handleDateOfBirthChange = (e) => {
    const value = e.target.value;
    setDateOfBirth(value);
    setDateOfBirthError(value ? "" : "Date of Birth is required");
  };

  const handleCourseNameChange = (e) => {
    const value = e.target.value;
    setCourseName(value);
    setCourseNameError(value.length >= 4 ? "" : "Course Name must be at least 4 characters");
  };

  return (
    <div style={{ marginTop: "2%", marginLeft: "20%", height: "110vh" }}>
      <Link to="/admin/usermanage">
        <Button
          variant=""
          style={{ marginLeft: "7%", backgroundColor: "#ff4757", color: "white" }}
        >
          <ReplyAllIcon sx={{ marginRight: "3px" }} /> GO BACK
        </Button>
      </Link>
      <h4
        style={{
          textAlign: "center",
          fontFamily: "serif",
          fontWeight: "bold",
        }}
      >
        ADD NEW USER
      </h4>

      <Col lg="6" style={{ marginLeft: "20%", boxShadow: '1px 2px 9px #F4AAB9', borderRadius:"23px"}}>
        <Form style={{marginLeft:"7%",}}>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter ID"
              value={id}
              onChange={handleIdChange}
            />
            {idError && <div style={{ color: "red" }}>{idError}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={handleNameChange}
            />
            {nameError && <div style={{ color: "red" }}>{nameError}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCourseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={handleCourseNameChange}
            />
            {courseNameError && <div style={{ color: "red" }}>{courseNameError}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {phoneNumberError && (
              <div style={{ color: "red" }}>{phoneNumberError}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
            {genderError && <div style={{ color: "red" }}>{genderError}</div>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date of Birth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
            {dateOfBirthError && (
              <div style={{ color: "red" }}>{dateOfBirthError}</div>
            )}
          </Form.Group>

          <div className="text-end">
            <Button
              variant=""
              style={{ marginLeft: "5%",marginRight:"3px", backgroundColor: "#5352ed", color: "white",width:"40%" }}
              type="submit"
              onClick={addTask}
            >
              Submit 
            </Button>
          </div>
        </Form>
      </Col>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
