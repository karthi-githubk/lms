// // // import React, { useState, useEffect } from "react";
// // // import { useParams, Link, useNavigate } from "react-router-dom";
// // // import "./AddEdit.css";
// // // import { toast, ToastContainer } from "react-toastify";
// // // import axios from "axios";

// // // const initialState = {
// // //   module_id: "",
// // //   topic_name: "",
// // //   topic_desc: "",
// // //   pdf_file: null,
// // //   video_file: null,
// // //   low: "",
// // //   medium: "",
// // //   hard: "",
// // //   moduleOptions: [],
// // // };

// // // const TopicForm = () => {
// // //   const [state, setState] = useState(initialState);
// // //   const {
// // //     module_id,
// // //     topic_name,
// // //     topic_desc,
// // //     moduleOptions,
// // //     pdf_file,
// // //     video_file,
// // //     low,
// // //     medium,
// // //     hard,
// // //   } = state;
// // //   const history = useNavigate();
// // //   const { id } = useParams();

// // //   useEffect(() => {
// // //     // Fetch the list of modules here and populate the moduleOptions state.
// // //     axios
// // //       .get("http://localhost:5000/api/modules/get")
// // //       .then((resp) => setState({ ...state, moduleOptions: resp.data }));
// // //   }, []);

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setState({ ...state, [name]: value });
// // //   };

// // //   const handleFileChange = (e) => {
// // //     const { name, files } = e.target;
// // //     setState({ ...state, [name]: files[0] });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!module_id || !topic_name || !topic_desc || !pdf_file || !video_file) {
// // //       toast.error("Please provide a value for each input field.");
// // //     } else {
// // //       const formData = new FormData();
// // //       formData.append("module_id", module_id);
// // //       formData.append("topic_name", topic_name);
// // //       formData.append("topic_desc", topic_desc);
// // //       formData.append("pdf_file", pdf_file);
// // //       formData.append("video_file", video_file);
// // //       formData.append("low", low);
// // //       formData.append("medium", medium);
// // //       formData.append("hard", hard);

// // //       try {
// // //         await axios.post("http://localhost:5000/api/topics/post", formData, {
// // //           headers: {
// // //             "Content-Type": "multipart/form-data",
// // //           },
// // //         });

// // //         toast.success("Topic added successfully!!");
// // //         setTimeout(() => history("/admin/existingtopics"), 500);
// // //       } catch (error) {
// // //         toast.error(error.response ? error.response.data : "An error occurred.");
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="form-container">
// // //       <form
// // //         className="form"
// // //         onSubmit={handleSubmit}
// // //         encType="multipart/form-data"
// // //         style={{
// // //           width: "80%",
// // //           marginLeft: "11%",
// // //           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// // //           borderRadius: "8px",
// // //           padding: "10px",
// // //         }}
// // //       >
// // //         <div className="form-group">
// // //           <label htmlFor="module_id">
// // //             Module Name<span style={{ color: "red" }}>*</span>
// // //           </label>
// // //           <select
// // //             id="module_id"
// // //             name="module_id"
// // //             value={module_id}
// // //             onChange={handleInputChange}
// // //           >
// // //             <option value="" disabled>
// // //               Select a module
// // //             </option>
// // //             {moduleOptions.map((module) => (
// // //               <option key={module.id} value={module.id}>
// // //                 {module.module_name}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="topic_name">
// // //             Topic Name<span style={{ color: "red" }}>*</span>
// // //           </label>
// // //           <input
// // //             type="text"
// // //             id="topic_name"
// // //             name="topic_name"
// // //             placeholder="Topic Name"
// // //             value={topic_name}
// // //             onChange={handleInputChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="topic_desc">
// // //             Topic Description<span style={{ color: "red" }}>*</span>
// // //           </label>
// // //           <textarea
// // //             id="topic_desc"
// // //             name="topic_desc"
// // //             placeholder="Topic Description"
// // //             value={topic_desc || ""}
// // //             onChange={handleInputChange}
// // //             className="form-control"
// // //           ></textarea>
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="pdf_file">
// // //             PDF File<span style={{ color: "red" }}>*</span>
// // //           </label>
// // //           <input
// // //             type="file"
// // //             id="pdf_file"
// // //             name="pdf_file"
// // //             accept=".pdf"
// // //             onChange={handleFileChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="video_file">
// // //             Video File<span style={{ color: "red" }}>*</span>
// // //           </label>
// // //           <input
// // //             type="file"
// // //             id="video_file"
// // //             name="video_file"
// // //             accept="video/*"
// // //             onChange={handleFileChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="low">Low</label>
// // //           <input
// // //             type="text"
// // //             id="low"
// // //             name="low"
// // //             placeholder="Low"
// // //             value={state.low}
// // //             onChange={handleInputChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="medium">Medium</label>
// // //           <input
// // //             type="text"
// // //             id="medium"
// // //             name="medium"
// // //             placeholder="Medium"
// // //             value={state.medium}
// // //             onChange={handleInputChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <label htmlFor="hard">Hard</label>
// // //           <input
// // //             type="text"
// // //             id="hard"
// // //             name="hard"
// // //             placeholder="Hard"
// // //             value={state.hard}
// // //             onChange={handleInputChange}
// // //             className="form-control"
// // //           />
// // //         </div>

// // //         <div className="form-group">
// // //           <input
// // //             type="submit"
// // //             value={id ? "UPDATE" : "SAVE"}
// // //             className="btn btn-primary"
// // //           />

// // //           <Link to="/admin/existingcourse">
// // //             <input type="button" value="BACK" className="btn btn-secondary" />
// // //           </Link>
// // //         </div>
// // //       </form>
// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // };

// // // export default TopicForm;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import { Form } from "react-bootstrap";
// import {
//   FormGroup,
//   FormLabel,
//   FormSelect,
//   Alert,
//   FormControl,
// } from "react-bootstrap";
// import { Button } from "@mui/material";

// const initialState = {
//   module_id: "",
//   topic_name: "",
//   topic_desc: "",
//   pdf_file: null,
//   video_file: null,
//   low: "",
//   medium: "",
//   hard: "",
//   moduleOptions: [],
// };

// const TopicForm = () => {
//   const [state, setState] = useState(initialState);
//   const {
//     module_id,
//     topic_name,
//     topic_desc,
//     pdf_file,
//     video_file,
//     moduleOptions,
//   } = state;
//   const history = useNavigate();
//   const { id } = useParams();
//   const [errors, setErrors] = useState({});
//   const [successMessageModule, setSuccessMessageModule] = useState("");
//   const [descValidation, setDescValidation] = useState({
//     value: "",
//     isValid: false,
//   });
//   const [successDesc, setSuccessDesc] = useState("");
//   const [success, setSuccess] = useState("");
//   const [low, setLow] = useState("");
//   const [medium, setMedium] = useState("");
//   const [hard, setHard] = useState("");

//   const [lowError, setLowError] = useState("");
//   const [mediumError, setMediumError] = useState("");
//   const [hardError, setHardError] = useState("");

//   const validateField = (input) => {
//     const regex = /^[A-Za-z\s,.?]{15,}$/; // Matches 15 or more letters, spaces, commas, dots, or question marks
//     return regex.test(input);
//   };

//   useEffect(() => {
//     // Fetch the list of modules here and populate the moduleOptions state.
//     axios
//       .get("http://localhost:5000/api/modules/get")
//       .then((resp) => setState({ ...state, moduleOptions: resp.data }));
//   }, []);

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setState({ ...state, [name]: files[0] });
//   };

//     const resetForm = () => {
//     setState(initialState);
//     setErrors({});
//     setSuccessMessageModule("");
//     setDescValidation({ value: "", isValid: false });
//     setSuccessDesc("");
//     setSuccess("");
//     setLow("");
//     setMedium("");
//     setHard("");
//     setLowError("");
//     setMediumError("");
//     setHardError("");
//   };

//   const handleModuleChange = (e) => {
//     const { name, value } = e.target;

//     // Validation logic
//     if (name === "module_id") {
//       if (!value) {
//         setErrors({ ...errors, [name]: "Module is required" });
//         setSuccessMessageModule("");
//       } else {
//         setErrors({ ...errors, [name]: "" });
//         setSuccessMessageModule("Module selected successfully");
//       }
//     }

//     setState({ ...state, [name]: value });
//   };

//   const handleTopicChange = (e) => {
//     const { name, value } = e.target;

//     // Validation logic
//     if (name === "topic_name") {
//       if (!value) {
//         setErrors("Topic name is required");
//         setSuccess("");
//       } else {
//         setErrors("");
//         setSuccess("Topic name is valid");
//       }
//     }

//     setState({ ...state, [name]: value });
//   };

//   const handleDescChange = (e) => {
//     const { name, value } = e.target;

//     // Validation logic
//     if (name === "topic_desc") {
//       if (value.length >= 25) {
//         setDescValidation({ value, isValid: true });
//         setSuccessDesc("Topic description is valid");
//         setErrors({ ...errors, topic_desc: "" });
//       } else {
//         setDescValidation({ value, isValid: false });
//         setSuccessDesc("");
//         setErrors({
//           ...errors,
//           topic_desc: "Topic description must be at least 25 characters long",
//         });
//       }
//     }

//     setState({ ...state, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!module_id || !topic_name || !topic_desc || !pdf_file || !video_file) {
//       toast.error("Please provide a value for each input field.");
//     } else {
//       const formData = new FormData();
//       formData.append("module_id", module_id);
//       formData.append("topic_name", topic_name);
//       formData.append("topic_desc", topic_desc);
//       formData.append("pdf_file", pdf_file);
//       formData.append("video_file", video_file);
//       formData.append("low", low);
//       formData.append("medium", medium);
//       formData.append("hard", hard);

//       try {
//         await axios.post("http://localhost:5000/api/topics/post", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         toast.success("Topic added successfully!!");
//         setTimeout(() => history("/admin/existingcourses"), 500);
//       } catch (error) {
//         toast.error(
//           error.response ? error.response.data : "An error occurred."
//         );
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Update the corresponding state based on the input name
//     if (name === "low") {
//       setLow(value);
//       validateAndSetError(value, setLowError);
//     } else if (name === "medium") {
//       setMedium(value);
//       validateAndSetError(value, setMediumError);
//     } else if (name === "hard") {
//       setHard(value);
//       validateAndSetError(value, setHardError);
//     }
//   };

//   const validateAndSetError = (inputValue, setErrorFunction) => {
//     // Perform onchange validation for the input field
//     if (!validateField(inputValue)) {
//       setErrorFunction(
//         "Please enter at least 15 letters, spaces, commas, dots, or question marks."
//       );
//     } else {
//       setErrorFunction(""); // Clear any previous error message
//     }
//   };

//   // Function to retrieve topic data from local storage
//   const getTopicDataFromLocalStorage = () => {
//     const storedTopicData = localStorage.getItem("topics");
//     if (storedTopicData) {
//       return JSON.parse(storedTopicData);
//     }
//     return [];
//   };
//   const moduleselectedData = getTopicDataFromLocalStorage();

//   const [breadcrumbItems, setBreadcrumbItems] = useState([
//     { text: "Course management", url: "/course" },
//     { text: "Module management", url: "/modules" },
//     { text: "Topic management", url: "/topics" },
//     { text: "Add Topic", url: "/addtopic" },
//   ]);

//   return (
//     <>
//       <div className="form-container" style={{}}>
//         <div className=" d-flex justify-content-center"></div>
//         <Form
//           className="form"
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           style={{
//             width: "88%",
//             marginLeft: "8%",
//             borderRadius: "8px",
//             padding: "10px",
//             fontWeight:'bold'
//           }}
//         >
//           <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Add  Topic</h3>
//           <div className="row mt-4">
//             {/* First Column */}
//             <div className="col-md-6">
//               <FormGroup>
//                 <FormLabel htmlFor="module_id">
//                   Module Name<span style={{ color: "red" }}>*</span>
//                 </FormLabel>
//                 <FormSelect
//                   id="module_id"
//                   name="module_id"
//                   value={module_id}
//                   onChange={handleModuleChange}
//                   isInvalid={!!errors.module_id}
//                 >
//                   <option value="" disabled>
//                     Select a module
//                   </option>
//                   {moduleOptions.map((module) => (
//                     <option key={module.id} value={module.id}>
//                       {module.module_name}
//                     </option>
//                   ))}
//                 </FormSelect>
//                 {errors.module_id && (
//                   <Alert variant="danger" className="mt-2">
//                     {errors.module_id}
//                   </Alert>
//                 )}
//                 {successMessageModule && (
//                   <Alert variant="success" className="mt-2">
//                     {successMessageModule}
//                   </Alert>
//                 )}
//               </FormGroup>

//               <FormGroup>
//                 <FormLabel htmlFor="topic_name">
//                   Topic Name<span style={{ color: "red" }}>*</span>
//                 </FormLabel>
//                 <FormControl
//                   type="text"
//                   id="topic_name"
//                   name="topic_name"
//                   placeholder="Topic Name"
//                   value={topic_name}
//                   onChange={handleTopicChange}
//                   isInvalid={!!errors.topic_name}
//                 />
//                 {errors.topic_name && (
//                   <Alert variant="danger" className="mt-2">
//                     {errors.topic_name}
//                   </Alert>
//                 )}
//                 {success && (
//                   <Alert variant="success" className="mt-2">
//                     {success}
//                   </Alert>
//                 )}
//               </FormGroup>
//             </div>

//             {/* Second Column */}
//             <div className="col-md-6">
//               <FormGroup>
//                 <FormLabel htmlFor="topic_desc">
//                   Topic Description<span style={{ color: "red" }}>*</span>
//                 </FormLabel>
//                 <FormControl
//                   as="textarea"
//                   id="topic_desc"
//                   name="topic_desc"
//                   placeholder="Topic Description"
//                   value={topic_desc || ""}
//                   onChange={handleDescChange}
//                   isInvalid={!!errors.topic_desc}
//                 />
//                 {errors.topic_desc && (
//                   <Alert variant="danger" className="mt-2">
//                     {errors.topic_desc}
//                   </Alert>
//                 )}
//                 {successDesc && (
//                   <Alert variant="success" className="mt-2">
//                     {successDesc}
//                   </Alert>
//                 )}
//               </FormGroup>

//               <FormGroup>
//                 <FormLabel htmlFor="pdf_file">
//                   PDF File<span style={{ color: "red" }}>*</span>
//                 </FormLabel>
//                 <FormControl
//                   type="file"
//                   id="pdf_file"
//                   name="pdf_file"
//                   accept=".pdf"
//                   onChange={handleFileChange}
//                 />
//               </FormGroup>

//               <FormGroup>
//                 <FormLabel htmlFor="video_file">
//                   Video File<span style={{ color: "red" }}>*</span>
//                 </FormLabel>
//                 <FormControl
//                   type="file"
//                   id="video_file"
//                   name="video_file"
//                   accept="video/*"
//                   onChange={handleFileChange}
//                 />
//               </FormGroup>
//             </div>
//           </div>

//           <div className="row">
//             {/* Third Column */}
//             <div className="col-md-6">
//               <FormGroup>
//                 <FormLabel htmlFor="low">Low</FormLabel>
//                 <FormControl
//                   type="text"
//                   id="low"
//                   name="low"
//                   placeholder="Low"
//                   value={low}
//                   onChange={handleInputChange}
//                 />
//                 {lowError && (
//                   <div className="error-message" style={{ color: "red" }}>
//                     {lowError}
//                   </div>
//                 )}
//               </FormGroup>
//             </div>

//             {/* Fourth Column */}
//             <div className="col-md-6">
//               <FormGroup>
//                 <FormLabel htmlFor="medium">Medium</FormLabel>
//                 <FormControl
//                   type="text"
//                   id="medium"
//                   name="medium"
//                   placeholder="Medium"
//                   value={medium}
//                   onChange={handleInputChange}
//                 />
//                 {mediumError && (
//                   <div className="error-message" style={{ color: "red" }}>
//                     {mediumError}
//                   </div>
//                 )}
//               </FormGroup>

//               <FormGroup>
//                 <FormLabel htmlFor="hard">Hard</FormLabel>
//                 <FormControl
//                   type="text"
//                   id="hard"
//                   name="hard"
//                   placeholder="Hard"
//                   value={hard}
//                   onChange={handleInputChange}
//                 />
//                 {hardError && (
//                   <div className="error-message" style={{ color: "red" }}>
//                     {hardError}
//                   </div>
//                 )}
//               </FormGroup>
//             </div>
//           </div>

//           <FormGroup>
//             <button
//               type="submit"
//               value={id ? "UPDATE" : "SAVE"}
//               className="btn btn-primary"
//               style={{ width: "30%",height:'40px' }}
//             >Submit</button>

//             <Link to="/admin/existingcourses">
//               <button
//                 type="button"
//                 value="BACK"
//                 className="btn btn-success"
//                 style={{ width: "30%", marginLeft: "3%",height:'40px' }}
//               >Back</button>
//             </Link>
//             <button type="button"  style={{ marginTop: "3%", width: '30%', height: '40px',backgroundColor:'#d63031',color:'white',border:'none',marginLeft:'2%',borderRadius:'3px'}} onClick={resetForm}>
//           RESET
//         </button>

//           </FormGroup>
//         </Form>

//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default TopicForm;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import {
  FormGroup,
  FormLabel,
  FormSelect,
  Alert,
  FormControl,
} from "react-bootstrap";
import { Grid, TextField, Typography } from "@mui/material";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Tab, Tabs, Button } from "@mui/material";

const initialState = {
  module_id: "",
  topic_name: "",
  topic_desc: "",
  pdf_file: null,
  ppt_file: null,
  video_file: null,
  low: "",
  medium: "",
  hard: "",
  lowDescription: "", // Description field for "Low"
  mediumDescription: "", // Description field for "Medium"
  hardDescription: "", // Description field for "Hard"
  lowTestCases: [], // Test Cases for "Low"
  mediumTestCases: [], // Test Cases for "Medium"
  hardTestCases: [], // Test Cases for "Hard"
  courseOptions: [],
  moduleOptions: [],
};

const TopicForm = () => {
  const [state, setState] = useState(initialState);
  const {
    module_id,
    topic_name,
    topic_desc,
    pdf_file,
    ppt_file,
    video_file,
    low,
    medium,
    hard,
    lowDescription, // Added description field state for "Low"
    mediumDescription, // Added description field state for "Medium"
    hardDescription, // Added description field state for "Hard"
    courseOptions,
    moduleOptions,
  } = state;
  const history = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [successMessageModule, setSuccessMessageModule] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [descValidation, setDescValidation] = useState({
    value: "",
    isValid: false,
  });
  const [LowdescValidation, setLowDescValidation] = useState({
    value: "",
    isValid: false,
  });
  const [mediumdescValidation, setMediumDescValidation] = useState({
    value: "",
    isValid: false,
  });
  const [harddescValidation, setHardDescValidation] = useState({
    value: "",
    isValid: false,
  });
  const [successDesc, setSuccessDesc] = useState("");
  const [successLowDesc, setSuccessLowDesc] = useState("");
  const [successMediumDesc, setSuccessMediumDesc] = useState("");
  const [successHardDesc, setSuccessHardDesc] = useState("");
  const [success, setSuccess] = useState("");
  const [lowTestCases, setLowTestCases] = useState([]);
  const [mediumTestCases, setMediumTestCases] = useState([]);
  const [hardTestCases, setHardTestCases] = useState([]);
  const [successMessageLow, setSuccessMessageLow] = useState("");
  const [successMessageMedium, setSuccessMessageMedium] = useState("");
  const [successMessageHard, setSuccessMessageHard] = useState("");

  useEffect(() => {
    // Fetch the list of modules here and populate the moduleOptions state.
    axios
      .get("http://localhost:5000/api/modules/get")
      .then((resp) => setState({ ...state, moduleOptions: resp.data }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setState({ ...state, [name]: files[0] });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleModuleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "module_id") {
      if (!value) {
        setErrors({ ...errors, [name]: "Module is required" });
        setSuccessMessageModule("");
      } else {
        setErrors({ ...errors, [name]: "" });
        setSuccessMessageModule("Module selected successfully");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleTopicChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "topic_name") {
      if (!value) {
        setErrors("Topic name is required");
        setSuccess("");
      } else {
        setErrors("");
        setSuccess("Topic name is valid");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleDescChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "topic_desc") {
      if (value.trim() !== "") {
        setDescValidation({ value, isValid: true });
        setSuccessDesc("Topic description is valid");
        setErrors({ ...errors, topic_desc: "" });
      } else {
        setDescValidation({ value, isValid: false });
        setSuccessDesc("");
        setErrors({
          ...errors,
          topic_desc: "Topic description cannot be empty",
        });
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleLowDescChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "lowDescription") {
      if (value.trim() !== "") {
        setLowDescValidation({ value, isValid: true });
        setSuccessLowDesc("Topic description is valid");
        setErrors({ ...errors, lowDescription: "" });
      } else {
        setLowDescValidation({ value, isValid: false });
        setSuccessLowDesc("");
        setErrors({
          ...errors,
          lowDescription: "Topic description cannot be empty",
        });
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleMediumDescChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "mediumDescription") {
      if (value.trim() !== "") {
        setMediumDescValidation({ value, isValid: true });
        setSuccessMediumDesc("Topic description is valid");
        setErrors({ ...errors, mediumDescription: "" });
      } else {
        setMediumDescValidation({ value, isValid: false });
        setSuccessMediumDesc("");
        setErrors({
          ...errors,
          mediumDescription: "Topic description cannot be empty",
        });
      }
    }

    setState({ ...state, [name]: value });
  };
  const handleHardDescChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "hardDescription") {
      if (value.trim() !== "") {
        setHardDescValidation({ value, isValid: true });
        setSuccessHardDesc("Topic description is valid");
        setErrors({ ...errors, hardDescription: "" });
      } else {
        setHardDescValidation({ value, isValid: false });
        setSuccessHardDesc("");
        setErrors({
          ...errors,
          hardDescription: "Topic description cannot be empty",
        });
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleLowChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "low") {
      if (!value) {
        setErrors({ ...errors, [name]: "Low is required" });
        setSuccessMessageLow("");
      } else {
        setErrors({ ...errors, [name]: "" });
        setSuccessMessageLow("Low selected successfully");
      }
    }

    setState({ ...state, [name]: value });
  };
  const handleMediumChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "medium") {
      if (!value) {
        setErrors({ ...errors, [name]: "Medium is required" });
        setSuccessMessageMedium("");
      } else {
        setErrors({ ...errors, [name]: "" });
        setSuccessMessageMedium("Medium selected successfully");
      }
    }

    setState({ ...state, [name]: value });
  };
  const handleHardChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    if (name === "hard") {
      if (!value) {
        setErrors({ ...errors, [name]: "Hard is required" });
        setSuccessMessageHard("");
      } else {
        setErrors({ ...errors, [name]: "" });
        setSuccessMessageHard("Hard selected successfully");
      }
    }

    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic_name || !topic_desc || !pdf_file || !ppt_file || !video_file) {
      toast.error("Please provide a value for each input field.");
    } else {
      const formData = new FormData();
      formData.append("module_id", topicData.id);
      formData.append("topic_name", topic_name);
      formData.append("topic_desc", topic_desc);
      formData.append("pdf_file", pdf_file);
      formData.append("ppt_file", ppt_file);
      formData.append("video_file", video_file);
      formData.append("low", low);
      formData.append("medium", medium);
      formData.append("hard", hard);
      formData.append("lowDescription", lowDescription);
      formData.append("mediumDescription", mediumDescription);
      formData.append("hardDescription", hardDescription);
      formData.append("lowTestCases", JSON.stringify(lowTestCases)); // Convert to JSON string
      formData.append("mediumTestCases", JSON.stringify(mediumTestCases)); // Convert to JSON string
      formData.append("hardTestCases", JSON.stringify(hardTestCases)); // Convert to JSON string
      console.log("ltc", JSON.stringify(lowTestCases));

      try {
        await axios.post("http://localhost:5000/api/topics/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Topic added successfully!!");
        setTimeout(() => history("/topicstable"), 500);
      } catch (error) {
        toast.error(
          error.response ? error.response.data : "An error occurred."
        );
      }
    }
  };

  const getTopicDataFromLocalStorage = () => {
    const storedTopicData = localStorage.getItem("moduleclick");
    if (storedTopicData) {
      return JSON.parse(storedTopicData);
    }
    return [];
  };

  const moduleselectedData = getTopicDataFromLocalStorage();

  console.log('feggrhrehh',moduleselectedData)

  const addLowTestCase = () => {
    setLowTestCases([...lowTestCases, { input: "", output: "" }]);
  };
  const addMediumTestCase = () => {
    setMediumTestCases([...mediumTestCases, { input: "", output: "" }]); // You can initialize the test case value as needed
  };
  const addHardTestCase = () => {
    setHardTestCases([...hardTestCases, { input: "", output: "" }]); // You can initialize the test case value as needed
  };

  const handleLowTestCaseChange = (e, index, field) => {
    const newLowTestCases = [...lowTestCases];
    newLowTestCases[index][field] = e.target.value;
    setLowTestCases(newLowTestCases);
  };

  const handleMediumTestCaseChange = (e, index, field) => {
    const newMediumTestCases = [...mediumTestCases];
    newMediumTestCases[index][field] = e.target.value;
    setMediumTestCases(newMediumTestCases);
  };

  const handleHardTestCaseChange = (e, index, field) => {
    const newHardTestCases = [...hardTestCases];
    newHardTestCases[index][field] = e.target.value;
    setHardTestCases(newHardTestCases);
  };

  const removeTestCase = (testCaseType, index) => {
    if (testCaseType === "low") {
      const newLowTestCases = [...lowTestCases];
      newLowTestCases.splice(index, 1);
      setLowTestCases(newLowTestCases);
    } else if (testCaseType === "medium") {
      const newMediumTestCases = [...mediumTestCases];
      newMediumTestCases.splice(index, 1);
      setMediumTestCases(newMediumTestCases);
    } else if (testCaseType === "hard") {
      const newHardTestCases = [...hardTestCases];
      newHardTestCases.splice(index, 1);
      setHardTestCases(newHardTestCases);
    }
  };

  const [topicData, setTopicData] = useState([]);

  useEffect(() => {
    const storedTopicData = localStorage.getItem("topics");
    if (storedTopicData) {
      const parsedData = JSON.parse(storedTopicData);
      setTopicData(parsedData);
    }
  }, []);
  console.log(topicData.id);

  return (
    <>
      <div className="d-flex justify-content-center mt-1 "></div>
      <Container style={{ marginTop: "20px" }}>
        <Form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            marginLeft: "2%",
          }}
        >
          <Row>
            <Col>
              <Form.Label
                htmlFor="topic_name"
                className="fw-bold d-flex justify-content-start  mt-3"
              >
                Course Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="coursename"
                name="coursename"
                placeholder="Course Name"
                value={moduleselectedData.course_name}
                disabled
              />
            </Col>
            <Col>
              <Form.Group controlId="module_id">
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Module Name <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="module_id"
                  value={moduleselectedData.module_name}
                  disabled
                  isInvalid={!!errors.module_id}
                  placeholder="Enter module name"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  htmlFor="topic_name"
                  className="fw-bold d-flex justify-content-start mt-3"
                >
                  Topic Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    type="text"
                    id="topic_name"
                    name="topic_name"
                    placeholder="Topic Name"
                    value={topic_name}
                    onChange={handleTopicChange}
                    isInvalid={!!errors.topic_name}
                  />
                  {errors.topic_name && (
                    <InputGroup.Text variant="danger">
                      <FaTimesCircle />
                    </InputGroup.Text>
                  )}
                  {success && (
                    <InputGroup.Text variant="success">
                      <FaCheckCircle />
                    </InputGroup.Text>
                  )}
                </InputGroup>
                {errors.topic_name && (
                  <div className="invalid-feedback">{errors.topic_name}</div>
                )}
                {success && <div className="text-success">{success}</div>}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="topic_desc"
                  className="desc fw-bold d-flex justify-content-start mt-3"
                >
                  Topic Description<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    as="textarea"
                    id="topic_desc"
                    name="topic_desc"
                    placeholder="Topic Description"
                    value={topic_desc || ""}
                    onChange={handleDescChange}
                    isInvalid={!!errors.topic_desc}
                    isValid={!!successDesc}
                  />
                  {errors.topic_desc && (
                    <Form.Control.Feedback type="invalid">
                      <FaTimesCircle /> {errors.topic_desc}
                    </Form.Control.Feedback>
                  )}
                  {successDesc && (
                    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                  )}
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Learning Materials Fieldset */}
          <fieldset
            className="mt-3"
            style={{
              border: "2px solid grey",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <h3
              className="mt-1  text-center text-uppercase"
              style={{ color: "#5f27cd" }}
            >
              Materials
            </h3>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="video_file"
                    className="fw-bold d-flex justify-content-start mt-3"
                  >
                    Video File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="file"
                      id="video_file"
                      name="video_file"
                      accept="video/*"
                      onChange={handleFileChange}
                      isInvalid={!!errors.video_file}
                    />
                    {errors.video_file && (
                      <InputGroup.Text variant="danger">
                        <FaTimesCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <p style={{ fontSize: "14px" }}>Maximum File size : 5MB</p>
                  <p style={{ fontSize: "14px" }}>Only accepts : video</p>
                  {errors.video_file && (
                    <div className="invalid-feedback">{errors.video_file}</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="pdf_file"
                    className="fw-bold d-flex justify-content-start mt-3"
                  >
                    PDF File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="file"
                      id="pdf_file"
                      name="pdf_file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      isInvalid={!!errors.pdf_file}
                    />
                    {errors.pdf_file && (
                      <InputGroup.Text variant="danger">
                        <FaTimesCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <p style={{ fontSize: "14px" }}>Maximum File size : 5MB</p>
                  <p style={{ fontSize: "14px" }}>Only accepts : pdf</p>
                  {errors.pdf_file && (
                    <div className="invalid-feedback">{errors.pdf_file}</div>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="ppt_file"
                    className="fw-bold d-flex justify-content-start mt-3"
                  >
                    PPT File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      type="file"
                      id="ppt_file"
                      name="ppt_file"
                      accept=".ppt"
                      onChange={handleFileChange}
                      isInvalid={!!errors.ppt_file}
                    />
                    {errors.ppt_file && (
                      <InputGroup.Text variant="danger">
                        <FaTimesCircle />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  <p style={{ fontSize: "14px" }}>Maximum File size : 5MB</p>
                  <p style={{ fontSize: "14px" }}>Only accepts : ppt</p>
                  {errors.ppt_file && (
                    <div className="invalid-feedback">{errors.ppt_file}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </fieldset>

          {/* Practice Fieldset
          <fieldset
            className="mt-3"
            style={{
              border: "2px solid grey",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <legend className="mt-1  fw-bold">Practice</legend>

          </fieldset> */}

          <h3
            style={{
              textAlign: "center",
              marginTop: "3%",
              textTransform: "uppercase",
              color: "#5f27cd",
            }}
          >
            practise Question's
          </h3>
          <div style={{ marginTop: "7px", padding: "20px" }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Low" sx={{ width: "33%" }} />
              <Tab label="Medium" sx={{ width: "33%" }} />
              <Tab label="Hard" sx={{ width: "33%" }} />
            </Tabs>
            <div role="tabpanel" hidden={tabValue !== 0}>
              <Row  className="mt-3">
                <fieldset
                  className="mt-3"
                  style={{
                    border: "2px solid grey",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <legend className="mt-1  fw-bold">Low</legend>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="low"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Low<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          id="low"
                          name="low"
                          placeholder="Low"
                          value={low}
                          onChange={handleLowChange}
                          isInvalid={!!errors.low}
                          isValid={!!successMessageLow}
                        />
                        {errors.low && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successMessageLow && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.low && (
                        <div className="invalid-feedback">{errors.low}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="lowDescription"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Low Question Description
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          id="lowDescription"
                          name="lowDescription"
                          placeholder="Question Description (Low)"
                          value={lowDescription}
                          onChange={handleLowDescChange}
                          isInvalid={!!errors.lowDescription}
                          isValid={!!successLowDesc}
                        />
                        {errors.lowDescription && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successLowDesc && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.lowDescription && (
                        <div className="invalid-feedback">
                          {errors.lowDescription}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <div>
                    {lowTestCases.map((testCase, index) => (
                      <div key={index} className="d-flex align-items-center">
                        <Col>
                          <Form.Group>
                            <Form.Label
                              htmlFor={`lowTestCases_input_${index}`}
                              className="fw-bold d-flex justify-content-start mt-3"
                            >
                              Low Test Case {index + 1} (Input)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id={`lowTestCases_input_${index}`}
                              name={`lowTestCases_input_${index}`}
                              placeholder={`Test Case (Low ${
                                index + 1
                              } - Input)`}
                              value={testCase.input}
                              onChange={(e) =>
                                handleLowTestCaseChange(e, index, "input")
                              }
                            />
                          </Form.Group>
                        </Col>

                        <Col style={{ marginLeft: "20px" }}>
                          <Form.Group>
                            <Form.Label
                              htmlFor={`lowTestCases_output_${index}`}
                              className="fw-bold d-flex justify-content-start mt-3"
                            >
                              Low Test Case {index + 1} (Output)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id={`lowTestCases_output_${index}`}
                              name={`lowTestCases_output_${index}`}
                              placeholder={`Test Case (Low ${
                                index + 1
                              } - Output)`}
                              value={testCase.output}
                              onChange={(e) =>
                                handleLowTestCaseChange(e, index, "output")
                              }
                            />
                          </Form.Group>
                        </Col>

                        <button
                          style={{ marginTop: "45px", marginLeft: "10px" }}
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeTestCase("low", index)}
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={addLowTestCase}
                    >
                      Add Test Case
                    </button>
                  </div>
                </fieldset>
              </Row>
            </div>

            <div role="tabpanel" hidden={tabValue !== 1}>
              <Row  className="mt-3">
                <fieldset
                  className="mt-3"
                  style={{
                    border: "2px solid grey",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <legend className="mt-1  fw-bold">Medium</legend>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="medium"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Medium<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <FormControl
                          type="text"
                          id="medium"
                          name="medium"
                          placeholder="Medium"
                          value={medium}
                          onChange={handleMediumChange}
                          isInvalid={!!errors.medium}
                          isValid={!!successMessageMedium}
                        />
                        {errors.medium && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successMessageMedium && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.medium && (
                        <div className="invalid-feedback">{errors.medium}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="mediumDescription"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Medium Question Description
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          id="mediumDescription"
                          name="mediumDescription"
                          placeholder="Question Description (Medium)"
                          value={mediumDescription}
                          onChange={handleMediumDescChange}
                          isInvalid={!!errors.mediumDescription}
                          isValid={!!successMediumDesc}
                        />
                        {errors.mediumDescription && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successMediumDesc && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.mediumDescription && (
                        <div className="invalid-feedback">
                          {errors.mediumDescription}
                        </div>
                      )}
                    </Form.Group>

                    <div>
                      {mediumTestCases.map((testCase, index) => (
                        <div key={index} className="d-flex align-items-center">
                          <Col>
                            <Form.Group>
                              <Form.Label
                                htmlFor={`mediumTestCases_input_${index}`}
                                className="fw-bold d-flex justify-content-start mt-3"
                              >
                                Medium Test Case {index + 1} (Input)
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id={`mediumTestCases_input_${index}`}
                                name={`mediumTestCases_input_${index}`}
                                placeholder={`Test Case (Medium ${
                                  index + 1
                                } - Input)`}
                                value={testCase.input}
                                onChange={(e) =>
                                  handleMediumTestCaseChange(e, index, "input")
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col style={{ marginLeft: "20px" }}>
                            <Form.Group>
                              <Form.Label
                                htmlFor={`mediumTestCases_output_${index}`}
                                className="fw-bold d-flex justify-content-start mt-3"
                              >
                                Medium Test Case {index + 1} (Output)
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id={`mediumTestCases_output_${index}`}
                                name={`mediumTestCases_output_${index}`}
                                placeholder={`Test Case (Medium ${
                                  index + 1
                                } - Output)`}
                                value={testCase.output}
                                onChange={(e) =>
                                  handleMediumTestCaseChange(e, index, "output")
                                }
                              />
                            </Form.Group>
                          </Col>

                          <button
                            style={{ marginTop: "45px", marginLeft: "10px" }}
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeTestCase("medium", index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={addMediumTestCase}
                      >
                        Add Test Case
                      </button>
                    </div>
                  </Col>
                </fieldset>
              </Row>
            </div>

            <div role="tabpanel" hidden={tabValue !== 2}>
              <Row  className="mt-3">
                <fieldset
                  className="mt-3"
                  style={{
                    border: "2px solid grey",
                    borderRadius: "10px",
                    padding: "15px",
                  }}
                >
                  <legend className="mt-1  fw-bold">Hard</legend>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="hard"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Hard<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          id="hard"
                          name="hard"
                          placeholder="Hard"
                          value={hard}
                          onChange={handleHardChange}
                          isInvalid={!!errors.hard}
                          isValid={!!successMessageHard}
                        />
                        {errors.hard && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successMessageHard && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.hard && (
                        <div className="invalid-feedback">{errors.hard}</div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label
                        htmlFor="hardDescription"
                        className="fw-bold d-flex justify-content-start mt-3"
                      >
                        Hard Question Description
                        <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          id="hardDescription"
                          name="hardDescription"
                          placeholder="Question Description (Hard)"
                          value={hardDescription}
                          onChange={handleHardDescChange}
                          isInvalid={!!errors.hardDescription}
                          isValid={!!successHardDesc}
                        />
                        {errors.hardDescription && (
                          <InputGroup.Text variant="danger">
                            <FaTimesCircle />
                          </InputGroup.Text>
                        )}
                        {successHardDesc && (
                          <InputGroup.Text variant="success">
                            <FaCheckCircle />
                          </InputGroup.Text>
                        )}
                      </InputGroup>
                      {errors.hardDescription && (
                        <div className="invalid-feedback">
                          {errors.hardDescription}
                        </div>
                      )}
                    </Form.Group>

                    <div>
                      {hardTestCases.map((testCase, index) => (
                        <div key={index} className="d-flex align-items-center">
                          <Col>
                            <Form.Group>
                              <Form.Label
                                htmlFor={`hardTestCases_input_${index}`}
                                className="fw-bold d-flex justify-content-start mt-3"
                              >
                                Hard Test Case {index + 1} (Input)
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id={`hardTestCases_input_${index}`}
                                name={`hardTestCases_input_${index}`}
                                placeholder={`Test Case (Hard ${
                                  index + 1
                                } - Input)`}
                                value={testCase.input}
                                onChange={(e) =>
                                  handleHardTestCaseChange(e, index, "input")
                                }
                              />
                            </Form.Group>
                          </Col>

                          <Col style={{ marginLeft: "20px" }}>
                            <Form.Group>
                              <Form.Label
                                htmlFor={`hardTestCases_output_${index}`}
                                className="fw-bold d-flex justify-content-start mt-3"
                              >
                                Hard Test Case {index + 1} (Output)
                              </Form.Label>
                              <Form.Control
                                type="text"
                                id={`hardTestCases_output_${index}`}
                                name={`hardTestCases_output_${index}`}
                                placeholder={`Test Case (Hard ${
                                  index + 1
                                } - Output)`}
                                value={testCase.output}
                                onChange={(e) =>
                                  handleHardTestCaseChange(e, index, "output")
                                }
                              />
                            </Form.Group>
                          </Col>

                          <button
                            style={{ marginTop: "45px", marginLeft: "10px" }}
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeTestCase("hard", index)}
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={addHardTestCase}
                      >
                        Add Test Case
                      </button>
                    </div>
                  </Col>
                </fieldset>
              </Row>
            </div>
          </div>

          <Form.Group>
            <button
              type="submit"
              value={id ? "UPDATE" : "SAVE"}
              className="btn btn-primary"
              style={{ marginTop: "2%", width: "30%", height: "40px" }}
            >
              Submit
            </button>
            <Link to="/topicstable">
              <button
                type="button"
                value="BACK"
                className="btn btn-success"
                style={{
                  marginTop: "2%",
                  marginLeft: "10px",
                  width: "30%",
                  height: "40px",
                }}
              >
                Back
              </button>
            </Link>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Container>
    </>
  );
};

export default TopicForm;
