import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import { Container, Row } from "react-bootstrap";

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dob: "",
  password: "",
};

const genderOptions = ["Male", "Female", "Other"];
const roleOptions = ["User", "Admin"];

const AddAdmin = () => {
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();
  const { adminId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [contact, setContact] = useState("");
  const [numberError, setNumberError] = useState("");
  const [successMessageName, setSuccessMessageName] = useState("");
  const [successMessageEmail, setSuccessMessageEmail] = useState("");
  const [successMessagepassword, setSuccessMessagepassword] = useState("");
  const [successMessageNumber, setSuccessMessageNumber] = useState("");
  const [successMessageDob, setSuccessMessageDob] = useState("");
  const [role, setRole] = useState("");

  // Validation error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    password: "",
  });

  useEffect(() => {
    if (adminId) {
      axios
        .get(`http://localhost:5000/api/admin/get/${adminId}`)
        .then((resp) => {
          setState({ ...resp.data[0] });
        });
    }
  }, [adminId]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    if (!/^[A-Za-z][a-zA-Z\s.]{2,}$/.test(newName)) {
      setNameError(
        "Invalid format. It should start with a capital letter and have at least 3 letters."
      );
      setSuccessMessageName("");
    } else {
      setNameError("");
      setSuccessMessageName("Validation successful");
    }
    setName(newName);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    // Regular expression for a simple email validation (not comprehensive)
    const emailPattern =
      /^(?=.[a-zA-Z])[a-zA-Z0-9._%+-][a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]{2,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (!emailPattern.test(newEmail)) {
      setEmailError("Invalid email format");
      setSuccessMessageEmail("");
    } else {
      setEmailError("");
      setSuccessMessageEmail("Validation successful");
    }
    setEmail(newEmail);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    const passwordPattern = /^(?=.[A-Z])(?=.[a-z])(?=.*[#@]).{6,}$/;

    if (!passwordPattern.test(newPassword)) {
      setPasswordError(
        'Password must contain at least one uppercase letter, one lowercase letter, and either "#" or "@", and be at least 6 characters long.'
      );
      setSuccessMessagepassword("");
    } else {
      setPasswordError("");
      setSuccessMessagepassword("Validation successful");
    }
    setPassword(newPassword);
  };

  const handleNumberChange = (e) => {
    const newNumber = e.target.value;
    // Regular expression for Indian mobile numbers with optional +91
    const numberPattern = /^(?:\+91[\s-]?)?[6789]\d{9}$/;

    if (!numberPattern.test(newNumber)) {
      setNumberError("Invalid Indian phone number format");
      setSuccessMessageNumber("");
    } else {
      setNumberError("");
      setSuccessMessageNumber("Validation successful");
    }
    setContact(newNumber);
  };

  const handleDobChange = (event) => {
    const inputDate = new Date(event.target.value);
    const currentDate = new Date();
    const minAgeDate = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (inputDate > minAgeDate) {
      setDobError("You must be at least 18 years old.");
      setSuccessMessageDob("");
    } else {
      setDob(event.target.value);
      setDobError("");
      setSuccessMessageDob("Date of birth is valid.");
    }
  };

  const handleInputChange = (event) => {
    const selectedGender = event.target.value;

    if (!selectedGender) {
      setErrors({ gender: "Please select a gender" });
    } else {
      setErrors({ gender: "" });
      setGender(selectedGender);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Check if any of the required fields are empty
    const requiredFields = [
      "name",
      "email",
      "contact",
      "gender",
      "dob",
      "password",
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !state[field]);

    if (hasErrors || isAnyFieldEmpty) 
    if (
      nameError ||
      emailError ||
      passwordError ||
      dobError ||
      numberError ||
      errors.gender ||
      !name ||
      !email ||
      !password ||
      !dob ||
      !contact ||
      !gender
    )
    {
      toast.error(
        "Please correct the validation errors and fill in all required fields."
      );
    } else {
      const userData = {
        name,
        email,
        contact,
        gender,
        dob,
        password,
      };

      if (!adminId) {
      axios
        .post("http://localhost:5000/api/admin/post", userData)
        .then(() => {
          // Handle success and navigation
          toast.success("Contact added and user registered Successfully!!");
          resetForm(); // Optionally reset the form after successful submission
          navigate("/admin");
        })
        .catch((err) => {
          console.error("Error registering user:", err);
          toast.error("Error registering user");
        }); 
      } else {
        axios
          .put(`http://localhost:5000/api/admin/update/${adminId}`, userData)
          .then(() => {
            toast.success("Contact Updated Successfully!!");
            navigate("/admin");
          })
          .catch((err) => {
            console.error("Error updating contact:", err);
            toast.error(err.response.data);
          });
      }
    }
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "User Management", url: "/admin" },
    { text: "Add User", url: "/adduser" },
  ]);

  const resetForm = () => {
    setState(initialState);
    setName("");
    setEmail("");
    setPassword("");
    setDob("");
    setGender("");
    setContact("");
    setNameError("");
    setDobError("");
    setEmailError("");
    setPasswordError("");
    setNumberError("");
    setSuccessMessageName("");
    setSuccessMessageEmail("");
    setSuccessMessagepassword("");
    setSuccessMessageNumber("");
    setSuccessMessageDob("");
    setErrors({
      name: "",
      email: "",
      contact: "",
      gender: "",
      dob: "",
      password: "",
    });
  };

  return (
    <div className="formbg">
      <div className="d-flex justify-content-center mt-4">
        <h4
          className="fw-bold mt-3"
          style={{ marginLeft: "210px", color: "#0C356A" }}
        >
          Add User
        </h4>
      </div>
      <Container style={{ marginTop: "20px" }}>
        <Form
          onSubmit={handleSubmit}
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            marginLeft: "280px",
            width: "800px",
          }}
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="fw-bold d-flex justify-content-start ">
                  Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="User Name"
                  value={name || ""}
                  onChange={handleNameChange}
                  isInvalid={!!nameError}
                  isValid={!!successMessageName}
                />
                <Form.Control.Feedback type="invalid">
                  {nameError}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {successMessageName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fw-bold d-flex justify-content-start ">
                  Email Id<span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                 
                  name="email"
                  placeholder="Email Id"
                  value={email || ""}
                  onChange={handleEmailChange}
                  isInvalid={!!emailError}
                  isValid={!!successMessageEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {successMessageEmail}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold d-flex justify-content-start ">
                  Contact
                </Form.Label>
                <Form.Control
                  type="number"
                 
                  name="contact"
                  placeholder="Contact Number"
                  value={contact || ""}
                  onChange={handleNumberChange}
                  isInvalid={!!numberError}
                  isValid={!!successMessageNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {numberError}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {successMessageNumber}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Gender
                </Form.Label>
                <div className="d-flex">
                  {genderOptions.map((option) => (
                    <Form.Check
                      className="ms-2 me-1"
                      key={option}
                      type="radio"
                      name="gender"
                      // id={`gender-${option}`}
                      label={option}
                      value={option}
                      checked={gender === option}
                      onChange={handleInputChange}
                      isInvalid={!!errors.gender}
                    />
                  ))}
                </div>
                {errors.gender && (
                  <div className="error-message" style={{ color: "red" }}>
                    {errors.gender}
                  </div>
                )}
                {gender && (
                  <div className="success-message" style={{ color: "green" }}>
                    Gender selected successfully.
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label className="fw-bold d-flex justify-content-start mt-3">
                  Date of Birth
                </Form.Label>
                <Form.Control
                  type="date"
                 
                  name="dob"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={handleDobChange}
                  isInvalid={!!dobError}
                  isValid={!!successMessageDob}
                />

                {dobError && (
                  <Form.Control.Feedback type="invalid">
                    {dobError}
                  </Form.Control.Feedback>
                )}
                {successMessageDob && (
                  <Form.Control.Feedback type="valid">
                    {successMessageDob}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="fw-bold d-flex justify-content-start ">
                  Password<span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                 
                  name="password"
                  placeholder="Password"
                  value={password || ""}
                  onChange={handlePasswordChange}
                  isInvalid={!!passwordError}
                  isValid={!!successMessagepassword}
                />
                <Form.Control.Feedback type="invalid">
                  {passwordError}
                </Form.Control.Feedback>
                <Form.Control.Feedback type="valid">
                  {successMessagepassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Button
            className="me-2"
            type="submit"
            variant="primary"
            style={{ marginTop: "2%" }}
          >
            {adminId ? "UPDATE" : "SAVE"}
          </Button>
          <Link to="/admin">
            <Button variant="secondary" style={{ marginTop: "2%" }}>
              BACK
            </Button>
          </Link>
          <Button
            type="button"
            variant="danger"
            style={{
              marginTop: "2%",
              width: "10%",
              height: "40px",
              marginLeft: "7px",
            }}
            onClick={resetForm}
          >
            RESET
          </Button>
          <ToastContainer />
        </Form>
      </Container>
    </div>
  );
};

export default AddAdmin;