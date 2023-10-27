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

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dob: "",
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

const UpdateAdmin = (props) => {
  const adminId = props.editItemData;
  const [state, setState] = useState(initialState);
  const { name, email, contact, gender, dob, password } = state;
  const history = useNavigate();
  // const { adminId } = useParams();
  const [userCourse, setUserCourse] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (adminId) {
      axios
        .get(`http://localhost:5000/api/admin/get/${adminId}`)
        .then((resp) => {
          const userData = resp.data[0];
          // Format the dob field before setting it in the state
          userData.dob = formatDate(userData.dob);
          setState(userData);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !contact || !gender || !dob || !password) {
        toast.error("Please provide a value for each input field!");
      } else {
        const formattedDob = formatDate(dob);
        const userData = {
          name,
          email,
          contact,
          gender,
          dob: formattedDob,
          password,
        };

        if (!adminId) {
          await axios.post("http://localhost:5000/api/admin/post", userData);
          toast.success("User added successfully!!");
        } else {
          await axios.put(
            `http://localhost:5000/api/admin/update/${adminId}`,
            userData
          );
          toast.success("User updated successfully!!");
        }

        setState(initialState);
        history("/admin");
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


  return (
    <>

    
      <div className="d-flex justify-content-center">
      </div>
      <Container style={{ }}>
        <Row style={{marginLeft:'11%'}}>
          <Form
            onSubmit={handleSubmit}
            style={{
              padding: "15px",
              borderRadius: "8px",
              width: "87%",
            }}
          >
            <Row>
              <Col>
                <Form.Group controlId="name">
                  <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                    Name<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="User Name"
                    name="name"
                    value={name || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group controlId="email">
                  <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                    Email<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email Id"
                    name="email"
                    value={email || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="password">
                  <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                    Password<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="contact">
                  <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                    Contact<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Contact Number"
                    name="contact"
                    value={contact || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="dob" style={{marginTop:'7%'}}>
                  <Form.Label className="fw-bold d-flex justify-content-start mt-3">
                    Date of Birth<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={dob || ""}
                    onChange={handleInputChange}
                    style={{height:'50px'}} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group>
              <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                Gender
              </Form.Label>
              <div className="d-flex">
                {genderOptions.map((option) => (
                  <div key={option.value} className="ms-2 me-1">
                    <Form.Check
                      type="radio"
                      name="gender"
                      id={`gender-${option.value}`}
                      label={option.label}
                      value={option.value}
                      checked={gender === option.value}
                      onChange={handleInputChange}
                      isInvalid={!!errors.gender}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>

            <br />

            <Button type="submit" variant="primary" style={{ marginTop: "2%" }}>
              {adminId ? "UPDATE" : "SAVE"}
            </Button>
            <Link to="/admin">
              <Button
                variant="secondary"
                style={{ marginTop: "2%", marginLeft: "10px" }}
              >
                BACK
              </Button>
            </Link>
          </Form>
          <ToastContainer />
        </Row>
      </Container>
    </>
  );
};

export default UpdateAdmin;
