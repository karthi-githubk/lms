// import React, { useState } from 'react';
// import {
//   TextField,
//   Button,
//   FormControl,
//   FormHelperText,
//   Box,
//   Typography,
//   Select,
//   MenuItem,
//   InputLabel,
// } from '@mui/material';

// const EnquiryForm = ({ onFormSubmit }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [courseName, setCourseName] = useState('');
//   const [gender, setGender] = useState('');
//   const [message, setMessage] = useState('');
//   const [errors, setErrors] = useState({});

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     const validationErrors = {};
//     if (name.trim() === '') {
//       validationErrors.name = 'Name is required';
//     }
//     if (email.trim() === '') {
//       validationErrors.email = 'Email is required';
//     }
//     if (courseName.trim() === '') {
//       validationErrors.courseName = 'Course Name is required';
//     }
//     if (gender.trim() === '') {
//       validationErrors.gender = 'Gender is required';
//     }
//     if (message.trim() === '') {
//       validationErrors.message = 'Message is required';
//     }

//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       // Submit logic
//       const formData = { name, email, courseName, gender, message };
//       onFormSubmit(formData);

//       // Clear form fields
//       setName('');
//       setEmail('');
//       setCourseName('');
//       setGender('');
//       setMessage('');
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100vh',
//       }}
//     >
//       <Box
//         sx={{
//           width: '500px',
//           marginTop: '200px',
//           padding: '1rem',
//           border: '1px solid #ccc',
//           borderRadius: '4px',
//           background: '#f7f7f7',
//         }}
//       >
//         <Typography variant="h4" align="center" sx={{ color: ' #00b894' }}>
//           Enquiry Form
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             label="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             margin="normal"
//             error={!!errors.name}
//           />
//           {errors.name && <FormHelperText>{errors.name}</FormHelperText>}

//           <TextField
//             fullWidth
//             label="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             margin="normal"
//             error={!!errors.email}
//           />
//           {errors.email && <FormHelperText>{errors.email}</FormHelperText>}

//           <TextField
//             fullWidth
//             label="Course Name"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             margin="normal"
//             error={!!errors.courseName}
//           />
//           {errors.courseName && <FormHelperText>{errors.courseName}</FormHelperText>}

//           <FormControl fullWidth margin="normal" error={!!errors.gender}>
//             <InputLabel>Gender</InputLabel>
//             <Select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <MenuItem value="">Select Gender</MenuItem>
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Other">Other</MenuItem>
//             </Select>
//             {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
//           </FormControl>

//           <TextField
//             fullWidth
//             label="Message"
//             multiline
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             margin="normal"
//             error={!!errors.message}
//           />
//           {errors.message && <FormHelperText>{errors.message}</FormHelperText>}

//           <Button
//             variant="contained"
//             color="primary"
//             type="submit"
//             fullWidth
//             mt={2}
//           >
//             Submit
//           </Button>
//         </form>
//       </Box>
//     </Box>
//   );
// };

// export default EnquiryForm;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  contact: "",
  gender: "",
  dob: "",
  coursename: "", // Add coursename to the initial state
};

const genderOptions = ["Male", "Female", "Other"];

const EnquiryForm = ({ onCloseModal }) => {
  const [state, setState] = useState(initialState);
  const { name, email, contact, gender, dob, coursename } = state; // Add coursename here
  const history = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [formDataFromServer, setFormDataFromServer] = useState({});

  // Validation error messages
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    contact: "",
    gender: "",
    dob: "",
    coursename: "", // Add coursename here
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidContact = (contact) => {
    const contactRegex = /^[6-9]\d{9}$/;
    return contactRegex.test(contact);
  };

  const isValidDOB = (dob) => {
    // You can add more specific validation logic here if needed
    return !!dob;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        newErrors.name =
          value.length >= 3 ? "" : "Name must be at least 3 characters";
        break;
      case "email":
        newErrors.email = isValidEmail(value) ? "" : "Invalid email format";
        break;
      case "contact":
        newErrors.contact = isValidContact(value)
          ? ""
          : "Invalid contact number format";
        break;
      case "gender":
        newErrors.gender = value ? "" : "Please select a gender";
        break;
      case "dob":
        newErrors.dob = isValidDOB(value)
          ? ""
          : "Please enter a valid date of birth";
        break;
      case "coursename": // Add a case for coursename
        newErrors.coursename =
          value.length >= 3 ? "" : "Course name must be at least 3 characters";
        break;
      default:
        break;
    }

    setState({ ...state, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    const requiredFields = [
      "name",
      "email",
      "contact",
      "gender",
      "dob",
      "coursename",
    ];
    const isAnyFieldEmpty = requiredFields.some((field) => !state[field]);

    if (isAnyFieldEmpty) {
      toast.error("Please fill out all required fields.");
    } else {
      const hasErrors = Object.values(errors).some((error) => error !== "");

      if (hasErrors) {
        toast.error("Please correct the validation errors.");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/notification",
            state
          );

          if (response.status === 200) {
            toast.success("Form submitted successfully!");
            setState(initialState);
            onCloseModal(); // Close the modal after successful submission
          }
        } catch (error) {
          console.error("Error submitting the form:", error);
          toast.error("An error occurred while submitting the form.");
        }
      }
    }
  };

  return (
    <div style={{ marginTop: "" }}>
      <h3
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          color: "#e84393",
          fontWeight:'bold',
          background: "linear-gradient(to right, #e84393, #4a90e2)",
          WebkitBackgroundClip: "text", // For webkit-based browsers
          WebkitTextFillColor: "transparent", // For webkit-based browsers
        }}
      >
        Enquiry Form
      </h3>

      <form
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          padding: "9 vpx",
          width: "86%",
          marginLeft: "8%",
          alignContent: "center",
          borderRadius: "8px",
          color: "black",
          fontWeight: "bold",
          marginTop:'4%'
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="name">
            Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={name || ""}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.name}</div>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Id"
            value={email || ""}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.email}</div>
        </div>

        <div className="form-group">
          <label htmlFor="contact">
            Contact<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="number"
            id="contact"
            name="contact"
            placeholder="Contact Number"
            value={contact || ""}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.contact}</div>
        </div>

        <div className="form-group">
          <label htmlFor="coursename">
            Course Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="coursename"
            name="coursename"
            placeholder="Course Name"
            value={coursename || ""}
            onChange={handleInputChange}
          />
          <div className="error-message">{errors.coursename}</div>
        </div>

        <div className="form-group">
          <label htmlFor="gender">
            Gender<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={gender || ""}
            onChange={handleInputChange}
          >
            <option value="">Select Gender</option>
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="error-message">{errors.gender}</div>
        </div>

        <div className="form-group">
          <label htmlFor="dob">
            Date of Birth<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            placeholder="Date of Birth"
            value={dob || ""}
            onChange={handleInputChange}
            style={{
              display: "block",
              width: "100%",
              height: "50px",
              marginTop: "3%",
            }}
          />
          <div className="error-message">{errors.dob}</div>
        </div>

        <button
          type="submit"
          value={id ? "UPDATE" : "SUBMIT"}
          className="btn btn-primary"
          style={{
            gridColumn: "span 2",
            width: "50%",
            height: "40px",
            marginLeft: "25%",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EnquiryForm;
