// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import "./AddEdit.css";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const initialState = {
//   name: "",
//   email: "",
//   contact: "",
//   gender: "",
//   dob: "",
//   coursename: "",
//   password: "",
//   randomid:""
// };

// const genderOptions = ["Male", "Female", "Other"];

// const Adduser = () => {
//   const [state, setState] = useState(initialState);
//   const { name, email, contact, gender, dob, coursename, password,randomid } = state;
//   const history = useNavigate();
//   const { id } = useParams();
//   const [courses, setCourses] = useState([]);

//   // Validation error messages
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//     coursename: "",
//     contact: "",
//     dob: "",
//     randomid:"",
//   });

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/course/get")
//       .then((resp) => {
//         setCourses(resp.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   useEffect(() => {
//     if (id) {
//       axios.get(`http://localhost:5000/api/user/get/${id}`).then((resp) => {
//         setState({ ...resp.data[0] });
//       });
//     }
//   }, [id]);

//   const sendEmail = async () => {
//     try {
//       const emailData = {
//         to_email: email,
//         password: password,
//       };

//       await axios.post("http://localhost:5000/api/send-email", emailData);
//       console.log("Email sent successfully");
//     } catch (error) {
//       console.error("Error sending email: ", error);
//     }
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return emailRegex.test(email);
//   };

//   const isValidPassword = (password) => {
//     return password.length >= 8;
//   };

//   const isValidContact = (contact) => {
//     const contactRegex = /^[6-9]\d{9}$/;
//     return contactRegex.test(contact);
//   };

//   const isValidDOB = (dob) => {
//     // You can add more specific validation logic here if needed
//     return !!dob;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     let newErrors = { ...errors };

//     switch (name) {
//       case "name":
//         newErrors.name = value.length >= 3 ? "" : "Name must be at least 3 characters";
//         break;
//       case "email":
//         newErrors.email = isValidEmail(value) ? "" : "Invalid email format";
//         break;
//       case "password":
//         newErrors.password = isValidPassword(value) ? "" : "Password must be at least 8 characters";
//         break;
//       case "coursename":
//         newErrors.coursename = value ? "" : "Please select a course";
//         break;
//       case "contact":
//         newErrors.contact = isValidContact(value) ? "" : "Invalid contact number format";
//         break;
//       case "dob":
//         newErrors.dob = isValidDOB(value) ? "" : "Please enter a valid date of birth";
//         break;
//       default:
//         break;
//     }

//     setState({ ...state, [name]: value });
//     setErrors(newErrors);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if any of the required fields are empty
//     const requiredFields = ["name", "email", "password", "coursename", "contact", "dob","randomid"];
//     const isAnyFieldEmpty = requiredFields.some((field) => !state[field]);

//     if (isAnyFieldEmpty) {
//       toast.error("Please fill out all required fields.");
//     } else {
//       const hasErrors = Object.values(errors).some((error) => error !== "");

//       if (hasErrors) {
//         toast.error("Please correct the validation errors.");
//       } else {
//         const userData = {
//           name,
//           email,
//           contact,
//           gender,
//           dob,
//           coursename,
//           password,
//           randomid,
//         };

//       if (!id) {
//                 axios.post('http://localhost:5000/api/user/post', userData)
//                   .then(() => {
//                     // After adding contact, also register the user in the login table
//                     axios.post('http://localhost:5000/api/register', { email, password })
//                       .then(() => {
//                         toast.success('Contact added and user registered Successfully!!');
//                         setState(initialState);
//                         history('/admin/usermanage');
//                       })
//                       .catch((err) => {
//                         console.error('Error registering user:', err);
//                         toast.error('Error registering user');
//                       });
//                   })
//                   .catch((err) => {
//                     console.error('Error adding contact:', err);
//                     toast.error(err.response.data);
//                   });
//               } else {
//                 axios.put(`http://localhost:5000/api/user/update/${id}`, userData)
//                   .then(() => {
//                     toast.success('Contact Updated Successfully!!');
//                     history('/');
//                   })
//                   .catch((err) => {
//                     console.error('Error updating contact:', err);
//                     toast.error(err.response.data);
//                   });
//               }
//             }
//           };
//           };

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <form
//         style={{
//           padding: "15px",
//           width: "60%",
//           marginLeft: "25%",
//           alignContent: "center",
//           boxShadow: "2px 1px 3px 2px pink",
//           borderRadius: "8px",
//         }}
//         onSubmit={handleSubmit}
//       >
//         <div className="form-group">
//           <label htmlFor="name">
//             Name<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             placeholder="User Name"
//             value={name || ""}
//             onChange={handleInputChange}
//           />
//           <div className="error-message">{errors.name}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="email">
//             Email<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Email Id"
//             value={email || ""}
//             onChange={handleInputChange}
//           />
//           <div className="error-message">{errors.email}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="password">
//             Password<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Password"
//             value={password || ""}
//             onChange={handleInputChange}
//             style={{ display: "block", width: "100%", height: "50px" }}
//           />
//           <div className="error-message">{errors.password}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="coursename">
//             Course Name<span style={{ color: "red" }}>*</span>
//           </label>
//           <select
//             id="coursename"
//             name="coursename"
//             value={coursename || ""}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Course</option>
//             {courses.map((course) => (
//               <option
//                 key={course.id}
//                 value={course.id}
//                 style={{ color: "red", fontWeight: "bolder" }}
//               >
//                 {course.coursename}
//               </option>
//             ))}
//           </select>
//           <div className="error-message">{errors.coursename}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="contact">
//             Contact<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="number"
//             id="contact"
//             name="contact"
//             placeholder="Contact Number"
//             value={contact || ""}
//             onChange={handleInputChange}
//           />
//           <div className="error-message">{errors.contact}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="gender">
//             Gender<span style={{ color: "red" }}>*</span>
//           </label>
//           <select
//             id="gender"
//             name="gender"
//             value={gender || ""}
//             onChange={handleInputChange}
//           >
//             <option value="">Select Gender</option>
//             {genderOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <div className="error-message">{errors.gender}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="dob">
//             Date of Birth<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="date"
//             id="dob"
//             name="dob"
//             placeholder="Date of Birth"
//             value={dob || ""}
//             onChange={handleInputChange}
//             style={{ display: "block", width: "100%", height: "50px" }}
//           />
//           <div className="error-message">{errors.dob}</div>
//         </div>

//         <div className="form-group">
//           <label htmlFor="randomid">
//             Random ID<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="number"
//             id="randomid"
//             name="randomid"
//             placeholder="Random Id"
//             value={randomid || ""}
//             onChange={handleInputChange}
//           />
//           <div className="error-message">{errors.contact}</div>
//         </div>

//         <input type="submit" value={id ? "UPDATE" : "SUBMIT"} style={{ marginTop: "2%" }} />
//         <Link to="/admin/usermanage">
//           <input type="button" value="BACK" />
//         </Link>
//         <ToastContainer />
//       </form>
//     </div>
//   );
// };

// export default Adduser;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Breadcrumbs from "./Breadcrumb";

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dob: "",
  coursename: "",
  password: "",
};

const genderOptions = ["Male", "Female", "Other"];
const roleOptions = ["User", "Admin"];

const Adduser = () => {
  const [state, setState] = useState(initialState);
  const history = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [coursename, setCoursename] = useState("");
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

  const genderOptions = ["Male", "Female", "Other"];

  // Validation error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    coursename: "",
    contact: "",
    dob: "",
  });

  // State to determine if the coursename field should be shown or hidden
  const [showCoursenameField, setShowCoursenameField] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/get")
      .then((resp) => {
        setCourses(resp.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/user/get/${id}`).then((resp) => {
        setState({ ...resp.data[0] });
      });
    }
  }, [id]);

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
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[#@]).{6,}$/;

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

  const handleCourseChange = (event) => {
    const selectedCourseId = event.target.value;

    if (selectedCourseId === "") {
      setErrors({ coursename: "Please select a course" });
    } else {
      setErrors({ coursename: "" });
      setCoursename(selectedCourseId);
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
    const selectedRole = e.target.value;
    setRole(selectedRole);

    // Toggle the showCoursenameField based on the selected role
    setShowCoursenameField(selectedRole === "User");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");

    // Check if any of the required fields are empty
    const requiredFields = [
      "name",
      "email",
      "password",
      "coursename",
      "contact",
      "dob",
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !state[field]);

    if (hasErrors) {
      toast.error("Please correct the validation errors.");
    } else {
      const userData = {
        name,
        email,
        contact,
        gender,
        dob,
        coursename,
        password,
      };

      const adminData = {
        name,
        email,
        contact,
        gender,
        dob,
        password,
      };

      if (role === "Admin") {
        console.log("clicked");

        // If role is admin, call the admin API
        axios
          .post("http://localhost:5000/api/admin/post", adminData)
          .then(() => {
            toast.success("Admin added Successfully!!");
            setState(initialState);
            history("/admin");
          })
          .catch((err) => {
            console.error("Error adding admin:", err);
            toast.error(err.response.data);
          });
      } else {
        // If role is user, call the user API
        axios
          .post("http://localhost:5000/api/user/post", userData)
          .then(() => {
            axios
              .post("http://localhost:5000/api/register", {
                email,
                password,
                coursename,
              })
              .then(() => {
                toast.success("User registered Successfully!!");
                setState(initialState);
                history("/admin/usermanage");
              })
              .catch((err) => {
                console.error("Error registering user:", err);
                toast.error("Error registering user");
              });
          })
          .catch((err) => {
            console.error("Error adding user:", err);
            toast.error(err.response.data);
          });
      }
    }
  };

  const resetForm = () => {
    setState(initialState);
    setName("");
    setEmail("");
    setPassword("");
    setDob("");
    setCoursename("");
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
      password: "",
      coursename: "",
      contact: "",
      dob: "",
    });
  };

  return (
    <div className="formbg">
      {/* <Breadcrumbs items={breadcrumbItems} />, */}
      <div className="d-flex justify-content-center"></div>
      <div className="container form_main">
        <Form
          style={{
            padding: "6px",
            width: "100%",
            paddingTop: "24px",
            marginLeft: "9%",
            alignContent: "center",
            borderRadius: "8px",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">
              Email Id<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              id="email"
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

          {/* <Form.Group>
                <Form.Label className="fw-bold d-flex justify-content-start">Role</Form.Label>
                <Form.Control
                  as="select"
                 
                  name="role" 
                  value={role} 
                  onChange={handleRoleChange}
                  isInvalid={!!errors.role}
                  isValid={role === 'User' || role === 'Admin'}
                >
                  <option value="Role">Select Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </Form.Control>
                {errors.role && (
                  <div className="error-message">{errors.role}</div>
                )}
              </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">
              Password<span className="text-danger ms-1">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              id="password"
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

          {showCoursenameField && (
            <Form.Group className="mb-3" controlId="formBasicCourse">
              <Form.Label className="fw-bold d-flex justify-content-start ">
                Select a Course
              </Form.Label>
              <Form.Control
                as="select"
                name="coursename"
                value={coursename}
                onChange={handleCourseChange}
                isInvalid={!!errors.coursename}
                isValid={coursename !== ""}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option
                    key={course.id}
                    value={course.id}
                    style={{ color: "red", fontWeight: "bolder" }}
                  >
                    {course.coursename}
                  </option>
                ))}
              </Form.Control>
              {errors.coursename && (
                <div className="error-message">{errors.coursename}</div>
              )}
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label className="fw-bold">Contact</Form.Label>
            <Form.Control
              type="number"
              id="contact"
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

          <Form.Group style={{ marginTop: "3%" }}>
            <Form.Label className="fw-bold">Gender</Form.Label>
            <div>
              {genderOptions.map((option) => (
                <Form.Check
                  key={option}
                  type="radio"
                  name="gender"
                  id={`gender-${option}`}
                  label={option}
                  value={option}
                  checked={gender === option}
                  onChange={handleInputChange}
                  isInvalid={!!errors.gender}
                  style={{ marginTop: "8px" }}
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

          <Form.Group style={{ marginTop: "2%" }}>
            <Form.Label className="fw-bold">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              id="dob"
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

          <Button
            type="submit"
            variant="primary"
            style={{ marginTop: "4%", width: "30%", height: "40px" }}
          >
            {id ? "UPDATE" : "SAVE"}
          </Button>
          <Link to="/admin/usermanage">
            <Button
              variant="success"
              style={{
                marginTop: "4%",
                width: "30%",
                height: "40px",
                marginLeft: "7px",
              }}
            >
              BACK
            </Button>
          </Link>
          <Button
            type="button"
            variant="danger"
            style={{
              marginTop: "4%",
              width: "30%",
              height: "40px",
              marginLeft: "7px",
            }}
            onClick={resetForm}
          >
            RESET
          </Button>
          <ToastContainer />
        </Form>
      </div>
    </div>
  );
};

export default Adduser;
