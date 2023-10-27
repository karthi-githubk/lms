// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const initialState = {
//   module_name: "",
//   module_desc: "",
//   module_img: null,
//   course_id: "",
//   courseOptions: [],
// };

// const AddModuleForm = () => {
//   const [state, setState] = useState(initialState);
//   const {
//     module_name,
//     module_desc,
//     module_img,
//     course_id,
//     courseOptions,
//   } = state;
//   const history = useNavigate();
//   const { id } = useParams();
//   const [errors, setErrors] = useState({});
//   const [touchedFields, setTouchedFields] = useState({});

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/course/get")
//       .then((resp) => setState({ ...state, courseOptions: resp.data }));
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!course_id) {
//       newErrors.course_id = "Please select a course";
//     } else {
//       newErrors.course_id = "";
//     }

//     if (!module_name || module_name.length < 3) {
//       newErrors.module_name = "Module name must be at least 3 characters";
//     } else {
//       newErrors.module_name = "";
//     }

//     if (!module_desc || module_desc.length < 25) {
//       newErrors.module_desc =
//         "Module description must be at least 25 characters";
//     } else {
//       newErrors.module_desc = "";
//     }

//     if (!module_img) {
//       newErrors.module_img = "Please select an image file";
//     } else if (module_img.type && !module_img.type.startsWith("image/")) {
//       newErrors.module_img = "Please select a valid image file";
//     } else {
//       newErrors.module_img = "";
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
//     setState({ ...state, module_img: selectedImage });
//     validateForm(); // Validate when an image is selected
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const formData = new FormData();
//       formData.append("module_name", module_name);
//       formData.append("module_desc", module_desc);
//       formData.append("module_img", module_img);
//       formData.append("course_id", course_id);

//       try {
//         const response = await axios.post(
//           "http://localhost:5000/api/modules/post",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         toast.success("Module added successfully!!");
//       } catch (error) {
//         toast.error(error.response.data);
//       }
//       setTimeout(() => history("/admin/existingcourses"), 500);
//     } else {
//       toast.error("Please correct the validation errors before submitting.");
//     }
//   };

//   return (
//     <div className="container" style={{ marginTop: "1px" }}>
//       <form
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//         style={{
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//           borderRadius: "10px",
//           padding: "20px",
//           width:"80%",
//           marginLeft:'8%'
//         }}
//       >
//         <div className="mb-3">
//           <label htmlFor="course_id" className="form-label">
//             Course Name<span style={{ color: "red" }}>*</span>
//           </label>
//           <select
//             id="course_id"
//             name="course_id"
//             value={course_id}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className={`form-select ${
//               touchedFields.course_id && errors.course_id ? "is-invalid" : ""
//             }`}
//           >
//             <option value="" disabled>
//               Select a course
//             </option>
//             {courseOptions.map((course) => (
//               <option key={course.id} value={course.id}>
//                 {course.coursename}
//               </option>
//             ))}
//           </select>
//           {touchedFields.course_id && errors.course_id && (
//             <div className="invalid-feedback">{errors.course_id}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="module_name" className="form-label">
//             Module Name<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="text"
//             id="module_name"
//             name="module_name"
//             placeholder="Module Name"
//             value={module_name}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.module_name && errors.module_name
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.module_name && errors.module_name && (
//             <div className="invalid-feedback">{errors.module_name}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="module_desc" className="form-label">
//             Module Description<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="text"
//             id="module_desc"
//             name="module_desc"
//             placeholder="Module Description"
//             value={module_desc || ""}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.module_desc && errors.module_desc
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.module_desc && errors.module_desc && (
//             <div className="invalid-feedback">{errors.module_desc}</div>
//           )}
//         </div>

//         <div className="mb-3">
//           <label htmlFor="module_img" className="form-label">
//             Module Image<span style={{ color: "red" }}>*</span>
//           </label>
//           <input
//             type="file"
//             id="module_img"
//             name="module_img"
//             accept="image/*"
//             onChange={handleImageChange}
//             onBlur={handleBlur}
//             className={`form-control ${
//               touchedFields.module_img && errors.module_img
//                 ? "is-invalid"
//                 : ""
//             }`}
//           />
//           {touchedFields.module_img && errors.module_img && (
//             <div className="invalid-feedback">{errors.module_img}</div>
//           )}
//         </div>

//         {state.module_img && (
//           <img
//             src={`http://localhost:5000/uploads/course/${state.module_img}`}
//             alt="Module Image"
//             width="150"
//             height="150"
//           />
//         )}

//         <div className="mb-3">
//           <input type="submit" value={id ? "UPDATE" : "SUBMIT"} className="btn btn-primary me-2" />
//           <Link to="/admin/existingcourses" className="btn btn-secondary">
//             BACK
//           </Link>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AddModuleForm;

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
  module_name: "",
  module_desc: "",
  module_img: null,
  course_id: 0, // Initialize as 0
};

const AddModuleForm = () => {
  const [state, setState] = useState(initialState);
  const { module_name, module_desc, module_img, course_id } = state;
  const history = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [successModuleName, setSuccessModuleName] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  const [successImage, setSuccessImage] = useState("");
  const [courseOptions, setCourseOptions] = useState([]);
  const [LocalcourseData, setLocalcourseData] = useState([]);
  const [imageError, setImageError] = useState("");


  useEffect(() => {
    // Fetch data from local storage and set it in the state
    const storedTopicData = localStorage.getItem("courseclick");
    if (storedTopicData) {
      const parsedData = JSON.parse(storedTopicData);

      setLocalcourseData(parsedData);
    }
  }, []);
  console.log("localcoursedata", LocalcourseData);
  console.log("localcoursedata", LocalcourseData);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/get")
      .then((resp) => setCourseOptions(resp.data));

    if (id) {
      axios
        .get(`http://localhost:5000/api/modules/get/${id}`)
        .then((resp) => setState({ ...resp.data[0] }));
    }
  }, [id]);

  const resetForm = () => {
    setState(initialState);
    // ... (reset other state variables)
  };

  const validateForm = () => {
    const newErrors = {};

    if (!module_name || module_name.length <= 3) {
      newErrors.module_name = "Module name must be at least 3 characters";
    } else {
      newErrors.module_name = "";
    }

    if (!module_desc || module_desc.length < 25) {
      newErrors.module_desc =
        "Module description must be at least 25 characters";
    } else {
      newErrors.module_desc = "";
    }

    if (!module_img) {
      newErrors.module_img = "Please select an image file";
    } else {
      newErrors.module_img = "";
    }

    // if (!course_id) {
    //   newErrors.course_id = "Please select a course";
    // } else {
    //   newErrors.course_id = "";
    // }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "module_name") {
      const regex = /^[A-Za-z0-9._,-]{3,}$/;
      const isValid = regex.test(value);

      if (!isValid) {
        setErrors({ ...errors, module_name: "Invalid input" });
        setSuccessModuleName("");
        setTimeout(() => setSuccessModuleName(""), 2000);
        
      } else {
        setErrors({ ...errors, module_name: "" });
        setSuccessModuleName("Valid input");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleDescChange = (e) => {
    const { name, value } = e.target;

    if (name === "module_desc") {
      const minLength = 25;
      if (value.length < minLength) {
        setErrors({
          ...errors,
          module_desc: `Minimum ${minLength} characters required`,
        });
        setSuccessDesc("");
        setTimeout(() => setSuccessDesc(""), 2000);
      } else {
        setErrors({ ...errors, module_desc: "" });
        setSuccessDesc("Valid input");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
  
    if (!selectedImage) {
      setErrors({ ...errors, module_img: "Please select an image file" });
      setSuccessImage("");
      setImageError("");
    } else {
      const allowedFormats = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  
      if (allowedFormats.includes(selectedImage.type)) {
        setState({ ...state, module_img: selectedImage });
        setErrors({ ...errors, module_img: "" });
        setSuccessImage("Valid image format");
        setImageError("");
        setTimeout(() => setSuccessImage(""), 2000);
      } else {
        setErrors({
          ...errors,
          module_img: "Please select a valid image file (jpeg, png, gif, webp)",
        });
        setSuccessImage("");
        setImageError("Invalid image format. Supported formats: jpeg, png, gif, webp");
      }
    }
  };
  

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setState({ ...state, course_id: value });
    setErrors({ ...errors, course_id: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData();
      formData.append("module_name", module_name);
      formData.append("module_desc", module_desc);
      formData.append("module_img", module_img);
      formData.append("course_id", LocalcourseData.id);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/modules/post",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Module added successfully!!");
        setTimeout(() => history("/moduletable"), 800);
      } catch (error) {
        toast.error(error.response.data);
      }
    } else {
      toast.error("Please enter all the values before submitting");
    }
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Course management", url: "/course" },
    { text: "Module management", url: "/modules" },
    { text: "Add Module", url: "/addmodule" },
  ]);

  return (
    <div className="formbg">
      <div
        className="container form_main"
        style={{
          borderRadius: "10px 20px",
        }}
      >
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="custom-form"
          style={{
            borderRadius: "10px",
            padding: "20px",
            width: "100%",
            marginLeft: "5%",
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
            Add Module
          </h3>
          <FormGroup>
            <FormLabel htmlFor="course_name" className="custom-label">
              Course Name<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <input
              type="text"
              id="course_name"
              name="course_name"
              value={LocalcourseData.coursename}
              className={`custom-input ${
                errors.course_name ? "is-invalid" : ""
              }`}
              disabled
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="module_name" className="custom-label">
              Module Name<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <FormControl
              type="text"
              className={`custom-input ${
                errors.module_name ? "is-invalid" : ""
              }`}
              id="module_name"
              name="module_name"
              placeholder="Module Name"
              value={module_name || ""}
              onChange={handleInputChange}
            />
            {errors.module_name && (
              <Alert variant="danger">{errors.module_name}</Alert>
            )}
            {successModuleName && (
              <Alert variant="success">{successModuleName}</Alert>
            )}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel
              htmlFor="module_desc"
              className="form-label custom-label"
            >
              Module Description<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <FormControl
              as="textarea"
              rows={4}
              className={`form-control custom-input ${
                errors.module_desc ? "is-invalid" : ""
              }`}
              id="module_desc"
              name="module_desc"
              placeholder="Module Description"
              value={module_desc || ""}
              onChange={handleDescChange}
            />
            {errors.module_desc && (
              <Alert variant="danger">{errors.module_desc}</Alert>
            )}
            {successDesc && <Alert variant="success">{successDesc}</Alert>}
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel htmlFor="module_img" className="form-label custom-label">
              Module Image<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <FormControl
              type="file"
              className={`form-control custom-input ${
                touchedFields.module_img && errors.module_img
                  ? "is-invalid"
                  : ""
              }`}
              id="module_img"
              name="module_img"
              accept="image/*"
              onChange={handleImageChange}
            />
            {touchedFields.module_img && errors.module_img && (
              <div className="invalid-feedback">{errors.module_img}</div>
            )}
            {imageError && <div className="text-danger">{imageError}</div>}
            {successImage && <div className="text-success">{successImage}</div>}
          </FormGroup>

          {state.module_img && (
            <img
              src={`http://localhost:5000/uploads/module/${state.module_img}`}
              alt="Module Image"
              className="img-thumbnail custom-thumbnail"
            />
          )}

          <Button
            type="submit"
            className="btn btn-primary custom-button"
            style={{ width: "30%", height: "40px" }}
          >
            {id ? "UPDATE" : "SAVE"}
          </Button>
          <Link
            to="/admin/existingcourses"
            className="btn btn-success ms-2 custom-button"
            style={{ width: "30%", height: "40px" }}
          >
            BACK
          </Link>
          <Button
            type="button"
            variant="danger"
            style={{ width: "30%", height: "40px", marginLeft: "12px" }}
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

export default AddModuleForm;
