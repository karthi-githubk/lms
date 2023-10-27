// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const initialState = {
//   coursename: "",
//   course_desc: "",
//   courseimg: null,
// };

// const AddCourseForm = () => {
//   const [state, setState] = useState(initialState);
//   const { coursename, course_desc, courseimg } = state;
//   const history = useNavigate();
//   const { id } = useParams();
//   const [errors, setErrors] = useState({});
//   const [touchedFields, setTouchedFields] = useState({});

//   useEffect(() => {
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/course/get/${id}`)
//         .then((resp) => setState({ ...resp.data[0] }));
//     }
//   }, [id]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!coursename || coursename.length < 2) {
//       newErrors.coursename = "Course name must be at least 2 characters";
//     } else {
//       newErrors.coursename = "";
//     }

//     if (!course_desc || course_desc.length < 25) {
//       newErrors.course_desc =
//         "Course description must be at least 25 characters";
//     } else {
//       newErrors.course_desc = "";
//     }

//     if (!courseimg) {
//       newErrors.courseimg = "Please select an image file";
//     } else {
//       newErrors.courseimg = "";
//     }

//     setErrors(newErrors);

//     return Object.values(newErrors).every((error) => !error);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });

//     if (touchedFields[name]) {
//       validateForm();
//     }
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouchedFields({ ...touchedFields, [name]: true });
//     validateForm();
//   };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];

//     if (!selectedImage) {
//       setErrors({ ...errors, courseimg: "Please select an image file" });
//     } else if (
//       selectedImage.type &&
//       !selectedImage.type.startsWith("image/")
//     ) {
//       setErrors({
//         ...errors,
//         courseimg: "Please select a valid image file",
//       });
//     } else {
//       setState({ ...state, courseimg: selectedImage });
//       setErrors({ ...errors, courseimg: "" });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const formData = new FormData();
//       formData.append("coursename", coursename);
//       formData.append("course_desc", course_desc);
//       formData.append("courseimg", courseimg);

//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/course/post",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         toast.success("Course added successfully!!");
//         setTimeout(() => history("/admin/existingcourses"), 3000);
//       } catch (error) {
//         toast.error(error.response.data);
//       }
//     } else {
//       toast.error("Please correct the validation errors before submitting.");
//     }
//   };

//   return (
//     <div className="container" style={{ marginTop: "20px" }}>
//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         style={{
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           borderRadius: "10px",
//           padding: "20px",
//           width:"80%",
//           marginLeft:"8%"
//         }}
//       >
//         <div className="mb-3">
//           <label htmlFor="coursename" className="form-label">
//             Course Name<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="text"
//             id="coursename"
//             name="coursename"
//             placeholder="Course Name"
//             value={coursename || ""}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.coursename && errors.coursename
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.coursename && errors.coursename && (
//             <div className="invalid-feedback">{errors.coursename}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="course_desc" className="form-label">
//             Course Description<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="text"
//             id="course_desc"
//             name="course_desc"
//             placeholder="Course Description"
//             value={course_desc || ""}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.course_desc && errors.course_desc
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.course_desc && errors.course_desc && (
//             <div className="invalid-feedback">{errors.course_desc}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="courseimg" className="form-label">
//             Course Image<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="file"
//             id="courseimg"
//             name="courseimg"
//             accept="image/*"
//             onChange={handleImageChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.courseimg && errors.courseimg
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.courseimg && errors.courseimg && (
//             <div className="invalid-feedback">{errors.courseimg}</div>
//           )}
//         </div>

//         {state.courseimg && (
//           <img
//             src={`http://localhost:5000/uploads/course/${state.courseimg}`}
//             alt="Course Image"
//             width="150"
//             height="150"
//           />
//         )}

//         <div className="mb-3">
//           <input
//             type="submit"
//             value={id ? "UPDATE" : "SUBMIT"}
//             className="btn btn-primary me-2"
//           />
//           <Link to="/admin/existingcourses" className="btn btn-secondary">
//             BACK
//           </Link>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddCourseForm;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";

const initialState = {
  coursename: "",
  course_desc: "",
  courseimg: null,
};

const AddCourseForm = () => {
  const [state, setState] = useState(initialState);
  const { coursename, course_desc, courseimg } = state;
  const history = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [successCoursename, setSuccessCoursename] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  const [successImage, setSuccessImage] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/course/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [id]);

  const resetForm = () => {
    setState(initialState);
    // ... (reset other state variables)
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate course name
    if (!coursename || coursename.length <= 3) {
      // Changed from 2 to 3 characters
      newErrors.coursename = "Course name must be at least 3 characters";
    } else {
      newErrors.coursename = "";
    }

    // Validate course description
    if (!course_desc || course_desc.length < 25) {
      newErrors.course_desc =
        "Course description must be at least 25 characters";
    } else {
      newErrors.course_desc = "";
    }

    // Validate image file
    if (!courseimg) {
      newErrors.courseimg = "Please select an image file";
    } else {
      newErrors.courseimg = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "coursename") {
      const regex = /^[A-Za-z0-9._,-]{3,}$/;
      const isValid = regex.test(value);

      if (!isValid) {
        setErrors({ ...errors, coursename: "Invalid input" });
        setSuccessCoursename("");
        setTimeout(() => setSuccessCoursename(""), 2000);
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
        setTimeout(() => setSuccessDesc(""), 2000);
      } else {
        setErrors({ ...errors, course_desc: "" });
        setSuccessDesc("Valid input");
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
      const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  
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
        setImageError("Invalid image format. Supported formats: jpeg, png, gif, webp");
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
        const response = await axios.post(
          "http://localhost:5000/api/course/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Course added successfully!!");
        setTimeout(() => history("/coursedashboard"), 1000);
      } catch (error) {
        toast.error(error.response.data);
      }
    } else {
      toast.error("Please enter all the values before submitting");
    }
  };

  return (
    <div className="formbg">
      <div className="d-flex justify-content-center">
        {/* <h1 className="fw-bolder">Add Course</h1> */}
      </div>
      <div className="container form_main" style={{}}>
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="custom-form"
          style={{
            borderRadius: "10px",
            padding: "12px",
            width: "90%",
            marginLeft: "2%",
            fontWeight: "bold",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              textTransform: "uppercase",
              color: "#e84393",
            }}
          >
            Add Course
          </h3>
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
              onChange={handleInputChange}
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
            <FormLabel htmlFor="courseimg" className="form-label custom-label">
              Course Image<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <FormControl
              type="file"
              className={`form-control custom-input ${
                touchedFields.courseimg && errors.courseimg ? "is-invalid" : ""
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
            {successImage && <div className="text-success">{successImage}</div>}
          </FormGroup>

          {state.courseimg && (
            <img
              src={`http://localhost:5000/uploads/course/${state.courseimg}`}
              alt="Course Image"
              className="img-thumbnail custom-thumbnail"
            />
          )}

          <button
            type="submit"
            className="btn btn-primary custom-button"
            style={{ width: "30%", height: "40px" }}
          >
            {id ? "UPDATE" : "SUBMIT"}
          </button>
          <Link
            to="/admin/existingcourses"
            className="btn btn-success ms-2 custom-button"
            style={{ width: "30%", height: "40px", marginLeft: "15px" }}
          >
            BACK
          </Link>
          <Button
            type="button"
            variant="danger"
            style={{ width: "30%", height: "40px", marginLeft: "11px" }}
            onClick={resetForm}
          >
            RESET
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AddCourseForm;
