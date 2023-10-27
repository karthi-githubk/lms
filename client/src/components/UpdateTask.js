import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskInServer } from "./slices/tasksSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyVerticallyCenteredModal = (props) => {
  const { selectedTask } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState(0);
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseNameError, setCourseNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState("");

  const nameRegex = /^.{4,}$/; // At least 4 characters
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneNumberRegex = /^[6-9]\d{9}$/; // Starts with 6-9 and 10 digits

  const updateTask = () => {
    if (!validateForm()) {
      return;
    }

    props.onHide();
    const updatedFields = {
      name,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      courseName,
    };

    dispatch(updateTaskInServer({ id, ...updatedFields }));

    toast.success("User updated successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      theme: "colored",
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Validate Name
    if (!nameRegex.test(name)) {
      setNameError("Name must be at least 4 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate Email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else if (!email.endsWith(".com") && !email.endsWith(".net")) {
      setEmailError("Only .com and .net domains are allowed");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate Phone Number
    if (!phoneNumber) {
      setPhoneNumberError("Phone Number is required");
      isValid = false;
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError("Please enter a valid phone number");
      isValid = false;
    } else if (!/^[6-9]/.test(phoneNumber)) {
      setPhoneNumberError("Phone number must start with 6-9");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    // Validate Gender
    if (!gender) {
      setGenderError("Please select a Gender");
      isValid = false;
    } else {
      setGenderError("");
    }

    // Validate Date of Birth
    if (!dateOfBirth) {
      setDateOfBirthError("Date of Birth is required");
      isValid = false;
    } else {
      setDateOfBirthError("");
    }

    // Validate Course Name
    if (courseName.length < 4) {
      setCourseNameError("Course Name must be at least 4 characters");
      isValid = false;
    } else {
      setCourseNameError("");
    }

    return isValid;
  };

  useEffect(() => {
    if (Object.keys(selectedTask).length !== 0) {
      setId(selectedTask.id);
      setName(selectedTask.name);
      setEmail(selectedTask.email);
      setPhoneNumber(selectedTask.phoneNumber);
      setGender(selectedTask.gender);
      setDateOfBirth(selectedTask.dateOfBirth || "");
      setCourseName(selectedTask.courseName || "");
    }
  }, [selectedTask]);

  return (
    <Modal
      style={{ marginTop: "3%", marginLeft: "8%" }}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicID">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              disabled // Disable the ID input field
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={nameError}
              isValid={name && !nameError}
            />
            {nameError && <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>}
            {name && !nameError && <Form.Control.Feedback type="valid">Valid</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCourseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter CourseName"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              isInvalid={courseNameError}
              isValid={courseName && !courseNameError}
            />
            {courseNameError && <Form.Control.Feedback type="invalid">{courseNameError}</Form.Control.Feedback>}
            {courseName && !courseNameError && <Form.Control.Feedback type="valid">Valid</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError}
              isValid={email && !emailError}
            />
            {emailError && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
            {email && !emailError && <Form.Control.Feedback type="valid">Valid</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              isInvalid={phoneNumberError}
              isValid={phoneNumber && !phoneNumberError}
            />
            {phoneNumberError && <Form.Control.Feedback type="invalid">{phoneNumberError}</Form.Control.Feedback>}
            {phoneNumber && !phoneNumberError && <Form.Control.Feedback type="valid">Valid</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              isInvalid={genderError}
              isValid={gender && !genderError}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
            {genderError && <Form.Control.Feedback type="invalid">{genderError}</Form.Control.Feedback>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicDateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter Date of Birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              isInvalid={dateOfBirthError}
              isValid={dateOfBirth && !dateOfBirthError}
            />
            {dateOfBirthError && <Form.Control.Feedback type="invalid">{dateOfBirthError}</Form.Control.Feedback>}
            {dateOfBirth && !dateOfBirthError && <Form.Control.Feedback type="valid">Valid</Form.Control.Feedback>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div className="text-end">
          <Button
            variant=""
            type="submit"
            onClick={updateTask}
            style={{ backgroundColor: "#F79F1F", color: "white" }}
          >
            Update User
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
