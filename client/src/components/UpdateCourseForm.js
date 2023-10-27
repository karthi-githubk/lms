// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import './AddEdit.css';
// import { toast,ToastContainer } from 'react-toastify';
// import axios from 'axios';

// const initialState = {
//   coursename: '',
//   course_desc: '',
//   courseimg: null,
// };

// const UpdateCourseForm = () => {
//   const [state, setState] = useState(initialState);
//   const { coursename, course_desc, courseimg } = state;
//   const [errors, setErrors] = useState({});
//   const history = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/course/get/${id}`)
//         .then((resp) => setState({ ...resp.data[0] }));
//     }
//   }, [id]);

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate course name
//     if (!coursename || coursename.length < 3) {
//       newErrors.coursename = 'Course name must be at least 3 characters';
//     } else {
//       newErrors.coursename = ''; // Clear error when it's valid
//     }

//     // Validate course description
//     if (!course_desc || course_desc.length < 25) {
//       newErrors.course_desc = 'Course description must be at least 25 characters';
//     } else {
//       newErrors.course_desc = ''; // Clear error when it's valid
//     }

//     // Validate image file
//     if (!courseimg) {
//       newErrors.courseimg = 'Please select an image file';
//     } else {
//       newErrors.courseimg = ''; // Clear error when it's valid
//     }

//     setErrors(newErrors);

//     return Object.values(newErrors).every((error) => !error); // Form is valid if there are no errors
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//     validateForm();
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     setState({ ...state, courseimg: selectedImage });
//     validateForm();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const formData = new FormData();
//       formData.append('coursename', coursename);
//       formData.append('course_desc', course_desc);
//       formData.append('courseimg', courseimg);

//       try {
//         await axios.put(`http://localhost:5000/api/course/update/${id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         toast.success('Course updated successfully!!');
//       } catch (error) {
//         toast.error(error.response.data);
//       }
//       setTimeout(() => history('/admin/existingcourses'), 500);
//     } else {
//       toast.error('Please correct the validation errors before submitting.');
//     }
//   };

//   return (
//     <div style={{ marginTop: '8%' }}>
//       <form
//         style={{
//           margin: 'auto',
//           padding: '15px',
//           width: '40%',
//           alignContent: 'center',
//           boxShadow: '2px 2px 4px 4px pink',
//         }}
//         onSubmit={handleSubmit}
//       >
//         <label htmlFor="coursename">
//           Course Name<span style={{ color: 'red' }}>*</span>
//         </label>
//         <input
//           type="text"
//           id="coursename"
//           name="coursename"
//           placeholder="Course Name"
//           value={coursename || ''}
//           onChange={handleInputChange}
//           className={errors.coursename ? 'error-input' : ''}
//         />
//         {errors.coursename && <p className="error">{errors.coursename}</p>}

//         <label htmlFor="course_desc">
//           Course Description<span style={{ color: 'red' }}>*</span>
//         </label>
//         <input
//           type="text"
//           id="course_desc"
//           name="course_desc"
//           placeholder="Course Description"
//           value={course_desc || ''}
//           onChange={handleInputChange}
//           className={errors.course_desc ? 'error-input' : ''}
//         />
//         {errors.course_desc && <p className="error">{errors.course_desc}</p>}

//         <label htmlFor="courseimg">
//           Course Image<span style={{ color: 'red' }}>*</span>
//         </label>
//         <input
//           type="file"
//           id="courseimg"
//           name="courseimg"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={errors.courseimg ? 'error-input' : ''}
//         />
//         {errors.courseimg && <p className="error">{errors.courseimg}</p>}

//         {state.courseimg && (
//           <img
//             src={`http://localhost:5000/${state.courseimg}`} // Adjust the URL based on your server setup
//             alt="Course Image"
//             width="150"
//             height="150"
//           />
//         )}
//         <input type="submit" value={id ? 'UPDATE' : 'SAVE'} />
//         <Link to="/admin/existingcourses">
//           <input type="button" value="BACK" />
//         </Link>
//       </form>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default UpdateCourseForm;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import Breadcrumbs from "./Breadcrumb";

const initialState = {
  coursename: "",
  course_desc: "",
  courseimg: null,
};

const UpdateCourseForm = (props) => {
  const id = props.selectedCourse;
  const [state, setState] = useState(initialState);
  const { coursename, course_desc, courseimg } = state;
  const [successCoursename, setSuccessCoursename] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  const [successImage, setSuccessImage] = useState("");
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/course/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    // Validate course name
    if (!coursename || coursename.length <= 3) {
      newErrors.coursename = "Course name must be at least 3 characters";
    } else {
      newErrors.coursename = ""; // Clear error when it's valid
    }

    // Validate course description
    if (!course_desc || course_desc.length < 25) {
      newErrors.course_desc =
        "Course description must be at least 25 characters";
    } else {
      newErrors.course_desc = ""; // Clear error when it's valid
    }

    // Validate image file
    if (!courseimg) {
      newErrors.courseimg = "Please select an image file";
    } else {
      newErrors.courseimg = ""; // Clear error when it's valid
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error); // Form is valid if there are no errors
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "coursename") {
      const regex = /^[A-Za-z0-9._,-]{3,}$/;
      const isValid = regex.test(value);

      if (!isValid) {
        setErrors({ ...errors, coursename: "Invalid input" });
        setSuccessCoursename("");
      } else {
        setErrors({ ...errors, coursename: "" });
        setSuccessCoursename("Valid input");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleDescChange = (e) => {
    const { name, value } = e.target;

    // Validate the input value
    if (name === "course_desc") {
      const minLength = 25;
      if (value.length < minLength) {
        setErrors({
          ...errors,
          course_desc: `Minimum ${minLength} characters required`,
        });
        setSuccessDesc("");
      } else {
        setErrors({ ...errors, course_desc: "" });
        setSuccessDesc("Valid input");
        setTimeout(() => setSuccessDesc(""), 2000);
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (!selectedImage) {
      setErrors({ ...errors, courseimg: "Please select an image file" });
      setSuccessImage("");
      setImageError("");
    } else {
      // Check if the selected file is an image (you can modify this check as needed)
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (allowedFormats.includes(selectedImage.type)) {
        setState({ ...state, courseimg: selectedImage });
        setErrors({ ...errors, courseimg: "" });
        setSuccessImage("Valid image format");
        setImageError("");
        setTimeout(() => setSuccessImage(""), 2000);
      } else {
        setErrors({
          ...errors,
          courseimg: "Please select a valid image file (jpeg, png, gif, webp)",
        });
        setSuccessImage("");
        setImageError(
          "Invalid image format. Supported formats: jpeg, png, gif, webp"
        );
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("coursename", coursename);
      formData.append("course_desc", course_desc);
      formData.append("courseimg", courseimg);

      try {
        await axios.put(
          `http://localhost:5000/api/course/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Course updated successfully!!");
      } catch (error) {
        toast.error(error.response.data);
      }
      setTimeout(() => history("/coursedashboard"), 800);
    } else {
      toast.error("Please correct the validation errors before submitting.");
    }
  };

  return (
    <div>
      {/* <Breadcrumbs items={breadcrumbItems} />, */}
      <div className="formbg" style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-center"></div>
        <div className="container form_main" style={{}}>
          <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="custom-form"
            style={{
              margin: "auto",
              padding: "15px",
              width: "100%",
              alignContent: "center",
              marginLeft: "7%",
              fontWeight: "bold",
            }}
          >
            <FormGroup>
              <FormLabel htmlFor="coursename" className="custom-label">
                Course Name<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl
                type="text"
                className={`custom-input ${
                  errors.coursename ? "is-invalid" : ""
                }`}
                id="coursename"
                name="coursename"
                placeholder="Course Name"
                value={coursename || ""}
                disabled
                // onChange={handleInputChange}
              />
              {errors.coursename && (
                <Alert variant="danger">{errors.coursename}</Alert>
              )}
              {successCoursename && (
                <Alert variant="success">{successCoursename}</Alert>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel
                htmlFor="course_desc"
                className="form-label custom-label"
              >
                Course Description<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl
                as="textarea"
                rows={4}
                className={`form-control custom-input ${
                  errors.course_desc ? "is-invalid" : ""
                }`}
                id="course_desc"
                name="course_desc"
                placeholder="Course Description"
                value={course_desc || ""}
                onChange={handleDescChange}
              />
              {errors.course_desc && (
                <Alert variant="danger">{errors.course_desc}</Alert>
              )}
              {successDesc && <Alert variant="success">{successDesc}</Alert>}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel
                htmlFor="courseimg"
                className="form-label custom-label"
              >
                Course Image<span style={{ color: "red" }}>*</span>
              </FormLabel>
              <FormControl
                type="file"
                className={`form-control custom-input ${
                  touchedFields.courseimg && errors.courseimg
                    ? "is-invalid"
                    : ""
                }`}
                id="courseimg"
                name="courseimg"
                accept="image/*"
                onChange={handleImageChange}
              />
              {touchedFields.courseimg && errors.courseimg && (
                <div className="invalid-feedback">{errors.courseimg}</div>
              )}
              {imageError && <div className="text-danger">{imageError}</div>}
              {successImage && (
                <div className="text-success">{successImage}</div>
              )}
            </FormGroup>

            {state.courseimg && (
              <img
                src={`http://localhost:5000/${state.courseimg}`} // Adjust the URL based on your server setup
                alt="Course Image"
                width="150"
                height="100"
              />
            )}
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary custom-button"
                style={{ width: "30%", height: "40px" }}
              >
                {id ? "UPDATE" : "SAVE"}
              </button>
              <Link
                to="/admin/existingcourses"
                className="btn btn-success ms-2 custom-button"
                style={{ width: "30%", height: "40px" }}
              >
                BACK
              </Link>
            </div>
          </Form>
          <ToastContainer/>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourseForm;
