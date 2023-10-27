// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast,ToastContainer } from "react-toastify";
// import axios from "axios";

// const UpdateModuleForm = () => {
//   const [state, setState] = useState({
//     module_name: "",
//     module_desc: "",
//     module_img: null,
//     course_id: "",
//   });

//   const [courseName, setCourseName] = useState(""); // Separate state for course name
//   const [errors, setErrors] = useState({});
//   const { module_name, module_desc, module_img, course_id } = state;
//   const history = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch the module data if an ID is provided
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/modules/get/${id}`)
//         .then((resp) => {
//           const moduleData = { ...resp.data[0] };
//           setState(moduleData);
//           // Fetch the associated course name based on course_id
//           axios
//             .get(`http://localhost:5000/api/course/get/${moduleData.course_id}`)
//             .then((courseResp) => {
//               setCourseName(courseResp.data[0].coursename);
//             })
//             .catch((error) => {
//               console.error(error);
//             });
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [id]);

//   const validateForm = () => {
//     const newErrors = {};

//     // Validate module name
//     if (!module_name || module_name.length < 3) {
//       newErrors.module_name = "Module name must be at least 3 characters";
//     } else {
//       newErrors.module_name = ""; // Clear error when it's valid
//     }

//     // Validate module description
//     if (!module_desc || module_desc.length < 25) {
//       newErrors.module_desc = "Module description must be at least 25 characters";
//     } else {
//       newErrors.module_desc = ""; // Clear error when it's valid
//     }

//     // Validate module image
//     if (!module_img) {
//       newErrors.module_img = "Please select an image file";
//     } else {
//       newErrors.module_img = ""; // Clear error when it's valid
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
//     setState({ ...state, module_img: selectedImage });
//     validateForm();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const formData = new FormData();
//       formData.append("module_name", module_name);
//       formData.append("module_desc", module_desc);
//       formData.append("course_id", course_id);

//       if (module_img) {
//         formData.append("module_img", module_img);
//       }

//       try {
//         await axios.put(
//           `http://localhost:5000/api/modules/update/${id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         toast.success("Module updated successfully!!");
//       } catch (error) {
//         toast.error(error.response.data);
//       }
//       setTimeout(() => history("#"), 500);
//     } else {
//       toast.error("Please correct the validation errors before submitting.");
//     }
//   };

//   return (
//     <div style={{ marginTop: "8%" }}>
//       <form
//         style={{
//           margin: "auto",
//           padding: "15px",
//           width: "45%",
//           alignContent: "center",
//           boxShadow: "2px 2px 4px 4px pink",
//         }}
//         onSubmit={handleSubmit}
//         encType="multipart/form-data"
//       >
//         <label htmlFor="course_name">
//           Course Name<span style={{ color: "red" }}>*</span>
//         </label>
//         <input
//           type="text"
//           id="course_name"
//           name="course_name"
//           placeholder="Course Name"
//           value={courseName}
//           readOnly // Set the input to read-only to make it disabled
//         />

//         <label htmlFor="module_name">
//           Module Name<span style={{ color: "red" }}>*</span>
//         </label>
//         <input
//           type="text"
//           id="module_name"
//           name="module_name"
//           placeholder="Module Name"
//           value={module_name}
//           onChange={handleInputChange}
//           className={errors.module_name ? "error-input" : ""}
//         />
//         {errors.module_name && <p className="error">{errors.module_name}</p>}

//         <label htmlFor="module_desc">
//           Module Description<span style={{ color: "red" }}>*</span>
//         </label>
//         <input
//           type="text"
//           id="module_desc"
//           name="module_desc"
//           placeholder="Module Description"
//           value={module_desc || ""}
//           onChange={handleInputChange}
//           className={errors.module_desc ? "error-input" : ""}
//         />
//         {errors.module_desc && <p className="error">{errors.module_desc}</p>}

//         <label htmlFor="module_img">
//           Module Image<span style={{ color: "red" }}>*</span>
//         </label>
//         <input
//           type="file"
//           id="module_img"
//           name="module_img"
//           accept="image/*"
//           onChange={handleImageChange}
//           className={errors.module_img ? "error-input" : ""}
//         />
//         {errors.module_img && <p className="error">{errors.module_img}</p>}

//         {state.module_img && (
//           <img
//             src={`http://localhost:5000/${state.module_img}`}
//             alt="Module Image"
//             width="150"
//             height="150"
//           />
//         )}

//         <input type="submit" value={id ? "UPDATE" : "SAVE"} />
//         <Link to="/admin/existingmodules">
//           <input type="button" value="BACK" />
//         </Link>
//       </form>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default UpdateModuleForm;

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

const UpdateModuleForm = (props) => {
  const id = props.moduleEditData;
  const [state, setState] = useState({
    module_name: "",
    module_desc: "",
    module_img: null,
    course_id: "",
  });

  const [courseName, setCourseName] = useState(""); // Separate state for course name
  const [errors, setErrors] = useState({});
  const { module_name, module_desc, module_img, course_id } = state;
  const [successImage, setSuccessImage] = useState("");
  const [selectedCourseName, setSelectedCourseName] = useState([]);
  const [touchedFields, setTouchedFields] = useState({});
  const [successModuleName, setSuccessModuleName] = useState("");
  const [successDesc, setSuccessDesc] = useState("");
  const [imageError, setImageError] = useState("");

  const history = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    // Fetch the module data if an ID is provided
    if (id) {
      axios
        .get(`http://localhost:5000/api/modules/get/${id}`)
        .then((resp) => {
          const moduleData = { ...resp.data[0] };
          setState(moduleData);
          // Fetch the associated course name based on course_id
          axios
            .get(`http://localhost:5000/api/course/get/${moduleData.course_id}`)
            .then((courseResp) => {
              setCourseName(courseResp.data[0].coursename);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!module_name || module_name.length <= 2) {
      newErrors.module_name = "Module name must be at least 2 characters";
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

    if (!course_id) {
      newErrors.course_id = "Please select a course";
    } else {
      newErrors.course_id = "";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "module_name") {
      const regex = /^[A-Za-z0-9.,-_]+$/;
      const isValid = regex.test(value);

      if (!isValid) {
        setErrors({ ...errors, module_name: "Invalid input" });
        setSuccessModuleName("");
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
      } else {
        setErrors({ ...errors, module_desc: "" });
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
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      if (allowedFormats.includes(selectedImage.type)) {
        setState({ ...state,  module_img: selectedImage });
        setErrors({ ...errors,  module_img: "" });
        setSuccessImage("Valid image format");
        setImageError("");
        setTimeout(() => setSuccessImage(""), 2000);
      } else {
        setErrors({
          ...errors,
          module_img: "Please select a valid image file (jpeg, png, gif, webp)",
        });
        setSuccessImage("");
        setImageError(
          "Invalid image format. Supported formats: jpeg, png, gif, webp"
        );
      }
    }
  };

  const handleSelectChange = (e) => {
    const { value, options } = e.target;
    const selectedCourseName = options[options.selectedIndex].text;
    setState({ ...state, course_id: parseInt(value, 10), selectedCourseName });
    setErrors({ ...errors, course_id: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("module_name", module_name);
      formData.append("module_desc", module_desc);
      formData.append("course_id", course_id);

      if (module_img) {
        formData.append("module_img", module_img);
      }

      try {
        await axios.put(
          `http://localhost:5000/api/modules/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Module updated successfully!!");
      } catch (error) {
        toast.error(error.response.data);
      }
      setTimeout(() => history("/moduletable"), 3000);
    } else {
      toast.error("Please correct the validation errors before submitting.");
    }
  };
  return (
    <div className="formbg">
      {/* <Breadcrumbs items={breadcrumbItems} />, */}
      <div className="d-flex justify-content-center"></div>
      <div className="container form_main mt-1">
        <Form
          style={{
            margin: "auto",
            padding: "15px",
            width: "95%",
            alignContent: "center",
            marginLeft: "8%",
            borderRadius: "7px",
            fontWeight: "bold",
          }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <FormGroup>
            <FormLabel htmlFor="course_id" className="custom-label">
              Course Name<span style={{ color: "red" }}>*</span>
            </FormLabel>
            <input
              type="text"
              id="course_id"
              name="course_id"
              value={courseName || ""}
              className={`custom-input`}
              disabled
            />
            {errors.course_id && (
              <Alert variant="danger" className="mt-2">
                {errors.course_id}
              </Alert>
            )}
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
              src={`http://localhost:5000/${state.module_img}`}
              alt="Module Image"
              width="150"
              height="100"
            />
          )}
           <div className="mt-3">
          <button
            type="submit"
            value={id ? "UPDATE" : "SAVE"}
            style={{
              width: "40%",
              marginLeft: "5%",
              height: "40px",
              backgroundColor: "#5352ed",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "7%",
            }}
          >
            Update
          </button>
          <Link to="/admin/existingcourses">
            <button
              type="button"
              value="BACK"
              style={{
                width: "40%",
                marginLeft: "5%",
                height: "40px",
                backgroundColor: "#009432",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              Back
            </button>
          </Link>
          </div>
        </Form>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default UpdateModuleForm;
