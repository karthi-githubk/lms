// // import React, { useState, useEffect } from "react";
// // import { useParams, Link, useNavigate } from "react-router-dom";
// // import "./AddEdit.css";
// // import { toast, ToastContainer } from "react-toastify";
// // import axios from "axios";

// // const initialState = {
// //   module_id: "",
// //   topic_name: "",
// //   topic_desc: "",
// //   pdf_file: null,
// //   video_file: null,
// //   low: "",
// //   medium: "",
// //   hard: "",
// //   moduleOptions: [],
// // };

// // const UpdateTopicForm = () => {
// //   const [state, setState] = useState(initialState);
// //   const {
// //     module_id,
// //     topic_name,
// //     topic_desc,
// //     moduleOptions,
// //     pdf_file,
// //     video_file,
// //     low,
// //     medium,
// //     hard,
// //   } = state;
// //   const history = useNavigate();
// //   const { id } = useParams();

// //   useEffect(() => {
// //     // Fetch the list of modules here and populate the moduleOptions state.
// //     axios
// //       .get("http://localhost:5000/api/modules/get")
// //       .then((resp) => setState({ ...state, moduleOptions: resp.data }));
// //   }, []);

// //   useEffect(() => {
// //     // Fetch the topic data if an ID is provided
// //     if (id) {
// //       axios
// //         .get(`http://localhost:5000/api/topics/get/${id}`)
// //         .then((resp) => {
// //           setState((prevState) => ({ ...prevState, ...resp.data }));
// //         })
// //         .catch((error) => {
// //           console.error(error);
// //         });
// //     }
// //   }, [id]);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setState({ ...state, [name]: value });
// //   };

// //   const handleFileChange = (e) => {
// //     const { name, files } = e.target;
// //     setState({ ...state, [name]: files[0] });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!module_id || !topic_name || !topic_desc) {
// //       toast.error("Please provide a value for each input field.");
// //     } else {
// //       const formData = new FormData();
// //       formData.append("module_id", module_id);
// //       formData.append("topic_name", topic_name);
// //       formData.append("topic_desc", topic_desc);
// //       formData.append("pdf_file", pdf_file);
// //       formData.append("video_file", video_file);
// //       formData.append("low", low);
// //       formData.append("medium", medium);
// //       formData.append("hard", hard);

// //       try {
// //         await axios.put(`http://localhost:5000/api/topics/update/${id}`, formData, {
// //           headers: {
// //             "Content-Type": "multipart/form-data",
// //           },
// //         });

// //         toast.success("Topic updated successfully!!");
// //         setTimeout(() => history("/admin/existingtopics"), 500);
// //       } catch (error) {
// //         toast.error(error.response ? error.response.data : "An error occurred.");
// //       }
// //     }
// //   };

// //   return (
// //     <div className="form-container">
// //       <form
// //         className="form"
// //         onSubmit={handleSubmit}
// //         encType="multipart/form-data"
// //         style={{
// //           width: "70%",
// //           marginLeft: "22%",
// //           marginTop:"7%",
// //           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
// //           borderRadius: "8px",
// //           padding: "10px",
// //         }}
// //       >
// //         <div className="form-group">
// //           <label htmlFor="module_id">
// //             Module Name<span style={{ color: "red" }}>*</span>
// //           </label>
// //           <select
// //             id="module_id"
// //             name="module_id"
// //             value={module_id}
// //             onChange={handleInputChange}
// //           >
// //             <option value="" disabled>
// //               Select a module
// //             </option>
// //             {moduleOptions.map((module) => (
// //               <option key={module.id} value={module.id} disabled>
// //                 {module.module_name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="topic_name">
// //             Topic Name<span style={{ color: "red" }}>*</span>
// //           </label>
// //           <input
// //             type="text"
// //             id="topic_name"
// //             name="topic_name"
// //             placeholder="Topic Name"
// //             value={topic_name}
// //             onChange={handleInputChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="topic_desc">
// //             Topic Description<span style={{ color: "red" }}>*</span>
// //           </label>
// //           <textarea
// //             id="topic_desc"
// //             name="topic_desc"
// //             placeholder="Topic Description"
// //             value={topic_desc || ""}
// //             onChange={handleInputChange}
// //             className="form-control"
// //           ></textarea>
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="pdf_file">
// //             PDF File<span style={{ color: "red" }}>*</span>
// //           </label>
// //           <input
// //             type="file"
// //             id="pdf_file"
// //             name="pdf_file"
// //             accept=".pdf"
// //             onChange={handleFileChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="video_file">
// //             Video File<span style={{ color: "red" }}>*</span>
// //           </label>
// //           <input
// //             type="file"
// //             id="video_file"
// //             name="video_file"
// //             accept="video/*"
// //             onChange={handleFileChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="low">Low</label>
// //           <input
// //             type="text"
// //             id="low"
// //             name="low"
// //             placeholder="Low"
// //             value={state.low}
// //             onChange={handleInputChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="medium">Medium</label>
// //           <input
// //             type="text"
// //             id="medium"
// //             name="medium"
// //             placeholder="Medium"
// //             value={state.medium}
// //             onChange={handleInputChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <label htmlFor="hard">Hard</label>
// //           <input
// //             type="text"
// //             id="hard"
// //             name="hard"
// //             placeholder="Hard"
// //             value={state.hard}
// //             onChange={handleInputChange}
// //             className="form-control"
// //           />
// //         </div>

// //         <div className="form-group">
// //           <input
// //             type="submit"
// //             value={id ? "UPDATE" : "SAVE"}
// //             className="btn btn-primary"
// //           />

// //           <Link to="/admin/existingtopics">
// //             <input type="button" value="BACK" className="btn btn-secondary" />
// //           </Link>
// //         </div>
// //       </form>
// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default UpdateTopicForm;

// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";

// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";
// import Breadcrumbs from "./Breadcrumb";
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

// const UpdateTopicForm = (props) => {
//   const id = props.edittopic;
//   const [state, setState] = useState(initialState);
//   const {
//     module_id,
//     topic_name,
//     topic_desc,
//     moduleOptions,
//     pdf_file,
//     video_file,
//     low,
//     medium,
//     hard,
//   } = state;
//   const history = useNavigate();
//   // const { id } = useParams();

//   useEffect(() => {
//     // Fetch the list of modules here and populate the moduleOptions state.
//     axios
//       .get("http://localhost:5000/api/modules/get")
//       .then((resp) => setState({ ...state, moduleOptions: resp.data }));
//   }, []);

//   useEffect(() => {
//     // Fetch the topic data if an ID is provided
//     if (id) {
//       axios
//         .get(`http://localhost:5000/api/topics/get/${id}`)
//         .then((resp) => {
//           setState((prevState) => ({ ...prevState, ...resp.data }));
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setState({ ...state, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setState({ ...state, [name]: files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!module_id || !topic_name || !topic_desc) {
//       toast.error("Please provide a value for each input field.");
//     } else {
//       const formData = new FormData();
//       formData.append("module_id", module_id);
//       formData.append("topic_name", topic_name);
//       formData.append("topic_desc", topic_desc);

//       // Append PDF file
//       formData.append("pdf_file", pdf_file);

//       // Append video file
//       formData.append("video_file", video_file);

//       formData.append("low", low);
//       formData.append("medium", medium);
//       formData.append("hard", hard);

//       try {
//         await axios.put(
//           `http://localhost:5000/api/topics/update/${id}`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         toast.success("Topic updated successfully!!");
//         setTimeout(() => history("/admin/existingcourses"), 3000);
//       } catch (error) {
//         toast.error(
//           error.response ? error.response.data : "An error occurred."
//         );
//       }
//     }
//   };

//   // const [breadcrumbItems, setBreadcrumbItems] = useState([
//   //   { text: "Dashboard", url: "/adminpanel" },
//   //   { text: "Topics", url: "/admin/Coursemanage" },
//   //   { text: "TopicUpdate", url: "/admin/courseform" },
//   // ]);

//   return (
//     <>
//       <div className="form-container">
//         {/* <Breadcrumbs items={breadcrumbItems} />, */}
//         <div className="mt-5 d-flex justify-content-center"></div>
//         <form
//           className="form"
//           onSubmit={handleSubmit}
//           encType="multipart/form-data"
//           style={{
//             width: "80%",
//             marginLeft: "11%",
//             borderRadius: "8px",
//             padding: "10px",
//             fontWeight:'bold'
//           }}
//         >
//           <div className="form-group">
//             <label htmlFor="module_id">
//               Module Name<span style={{ color: "red" }}>*</span>
//             </label>
//             <select
//               id="module_id"
//               name="module_id"
//               value={module_id}
//               onChange={handleInputChange}
//               disabled
//             >
//               <option value="" disabled>
//                 Select a module
//               </option>
//               {moduleOptions.map((module) => (
//                 <option key={module.id} value={module.id} disabled>
//                   {module.module_name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="topic_name">
//               Topic Name<span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               type="text"
//               id="topic_name"
//               name="topic_name"
//               placeholder="Topic Name"
//               value={topic_name}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="topic_desc">
//               Topic Description<span style={{ color: "red" }}>*</span>
//             </label>
//             <textarea
//               id="topic_desc"
//               name="topic_desc"
//               placeholder="Topic Description"
//               value={topic_desc || ""}
//               onChange={handleInputChange}
//               className="form-control"
//             ></textarea>
//           </div>

//           <div className="form-group">
//             <label htmlFor="pdf_file">
//               PDF File<span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               type="file"
//               id="pdf_file"
//               name="pdf_file" // Make sure the name matches the state key
//               accept=".pdf"
//               onChange={handleFileChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="video_file">
//               Video File<span style={{ color: "red" }}>*</span>
//             </label>
//             <input
//               type="file"
//               id="video_file"
//               name="video_file" // Make sure the name matches the state key
//               accept="video/*"
//               onChange={handleFileChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="low">Low</label>
//             <input
//               type="text"
//               id="low"
//               name="low"
//               placeholder="Low"
//               value={state.low}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="medium">Medium</label>
//             <input
//               type="text"
//               id="medium"
//               name="medium"
//               placeholder="Medium"
//               value={state.medium}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="hard">Hard</label>
//             <input
//               type="text"
//               id="hard"
//               name="hard"
//               placeholder="Hard"
//               value={state.hard}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>

//           <div className="form-group">
//             <button
//               type="submit"
//               value={id ? "UPDATE" : "SAVE"}
//               className="btn btn-primary"
//               style={{width:'30%',marginLeft:'5%',height:'40px',backgroundColor:'#5352ed',color:'white',border:'none',borderRadius:'5px' }}>Update</button>

//             <Link to="/admin/existingcourses">
//               <button type="button" value="BACK" className="btn btn-success"  style={{width:'30%',marginLeft:'5%',height:'40px',backgroundColor:'#009432',color:'white',border:'none',borderRadius:'5px' }}>Back</button>
//             </Link>
//           </div>
//         </form>
//         <ToastContainer />
//       </div>
//     </> 
//   );
// };

// export default UpdateTopicForm;

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import {
  FormGroup,
  FormLabel,
  FormSelect,
  Alert,
  FormControl,
} from "react-bootstrap";
import { Grid, TextField, Typography } from "@mui/material";

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
  low_description: "", // Description field for "Low"
  medium_description: "", // Description field for "Medium"
  hard_description: "", // Description field for "Hard"
  low_test_case: "",
  medium_test_case: "",
  hard_test_case: "",
  courseOptions: [],
  moduleOptions: [],
};

const UpdateTopicForm = (props) => {
  const id = props.edittopic;
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
    low_description,
    medium_description, // Added description field state for "Medium"
    hard_description, // Added description field state for "Hard"
    courseOptions,
    low_test_case,
    medium_test_case,
    hard_test_case,
    moduleOptions,
  } = state;
  const history = useNavigate();
  // const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [successMessageModule, setSuccessMessageModule] = useState("");
  const [descValidation, setDescValidation] = useState({
    value: "",
    isValid: false,
  });
  const [successDesc, setSuccessDesc] = useState("");
  const [success, setSuccess] = useState("");
  const [lowDescription, setLowDescription] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courseName = searchParams.get("courseName");
  const moduleName = searchParams.get("moduleName");
  const topicName = searchParams.get("topicName");

  useEffect(() => {
    // Fetch the list of modules here and populate the moduleOptions state.
    axios
      .get("http://localhost:5000/api/modules/get")
      .then((resp) => setState({ ...state, moduleOptions: resp.data }));
  }, []);

  useEffect(() => {
    // Fetch the topic data if an ID is provided
    if (id) {
      axios
        .get(`http://localhost:5000/api/topics/get/${id}`)
        .then((resp) => {
          console.log(resp.data); // Check the response data
          const { low_description } = resp.data;
          setState((prevState) => ({ ...prevState, ...resp.data }));
          setLowDescription(lowDescription);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setState({ ...state, [name]: files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!module_id || !topic_name || !topic_desc || !pdf_file || !video_file) {
      toast.error("Please provide a value for each input field.");
    } else {
      const formData = new FormData();
      formData.append("module_id", module_id);
      formData.append("topic_name", topic_name);
      formData.append("topic_desc", topic_desc);
      formData.append("pdf_file", pdf_file);
      formData.append("ppt_file", ppt_file);
      formData.append("video_file", video_file);
      formData.append("low", low);
      formData.append("medium", medium);
      formData.append("hard", hard);
      formData.append("lowDescription", low_description);
      formData.append("mediumDescription", medium_description);
      formData.append("hardDescription", hard_description);
      formData.append("lowTestCases", JSON.stringify(low_test_case)); // Convert to JSON string
      formData.append("lowTestCases", JSON.stringify(medium_test_case)); // Convert to JSON string
      formData.append("lowTestCases", JSON.stringify(hard_test_case)); // Convert to JSON string

      try {
        await axios.put(
          `http://localhost:5000/api/topics/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.success("Topic updated successfully!!");
        setTimeout(() => history("/topics"), 500);
      } catch (error) {
        toast.error(
          error.response ? error.response.data : "An error occurred."
        );
      }
    }
  };

  const getTopicDataFromLocalStorage = () => {
    const storedTopicData = localStorage.getItem("topics");
    if (storedTopicData) {
      return JSON.parse(storedTopicData);
    }
    return [];
  };

  const moduleselectedData = getTopicDataFromLocalStorage();
  return (
    <>
      <div className="d-flex justify-content-center mt-5 "></div>
      <Container style={{ marginTop: "20px" }}>
        <Form
          className="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Row>
            <Col>
              <Form.Label
                htmlFor="coursename"
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
              />
            </Col>
            <Col>
              <Form.Group controlId="module_id">
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Module Name
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
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
                  Topic Name<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="topic_name"
                  name="topic_name"
                  placeholder="Topic Name"
                  value={topic_name}
                  onChange={handleInputChange}
                  isInvalid={!!errors.topic_name}
                />
                {errors.topic_name && (
                  <Alert variant="danger" className="mt-2">
                    {errors.topic_name}
                  </Alert>
                )}
                {success && (
                  <Alert variant="success" className="mt-2">
                    {success}
                  </Alert>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  htmlFor="topic_desc"
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
                  Topic Description<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  id="topic_desc"
                  name="topic_desc"
                  placeholder="Topic Description"
                  value={topic_desc || ""}
                  onChange={handleInputChange}
                  isInvalid={!!errors.topic_desc}
                />
                {errors.topic_desc && (
                  <Alert variant="danger" className="mt-2">
                    {errors.topic_desc}
                  </Alert>
                )}
                {successDesc && (
                  <Alert variant="success" className="mt-2">
                    {successDesc}
                  </Alert>
                )}
              </Form.Group>
            </Col>
          </Row>

          {/* Learning Materials Fieldset */}
          <fieldset
            className="mt-3"
            style={{
              border: "2px solid grey",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <legend className="mt-1  fw-bold">Materials</legend>

            <Row>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="video_file"
                    className="fw-bold d-flex justify-content-start  mt-3"
                  >
                    Video File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="video_file"
                    name="video_file"
                    accept="video/*"
                    onChange={handleInputChange}
                  />

                  <p style={{ fontSize: "14px" }}>
                    Max File size : 5MB & Only accepts video
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="pdf_file"
                    className="fw-bold d-flex justify-content-start  mt-3"
                  >
                    PDF File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="pdf_file"
                    name="pdf_file"
                    accept=".pdf"
                    onChange={handleInputChange}
                  />
                  <p style={{ fontSize: "14px" }}>
                    Max File size : 5MB & Only accepts pdf
                  </p>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label
                    htmlFor="ppt_file"
                    className="fw-bold d-flex justify-content-start  mt-3"
                  >
                    PPT File<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="ppt_file"
                    name="ppt_file"
                    accept=".ppt"
                    onChange={handleInputChange}
                  />
                  <p style={{ fontSize: "14px" }}>
                    Max File size : 5MB & Only accepts pptx
                  </p>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col></Col>
            </Row>
          </fieldset>

          {/* Practice Fieldset */}
          <fieldset
            className="mt-3"
            style={{
              border: "2px solid grey",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <legend className="mt-1  fw-bold">Practice</legend>
            <Row>
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
                  <Form.Group>
                    <Form.Label
                      htmlFor="low"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Low
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="low"
                      name="low"
                      placeholder="Low"
                      value={low}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="lowDescription"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Low Question Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id="low_description"
                      name="low_description"
                      placeholder="Question Description (Low)"
                      value={low_description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="low_test_case"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Low Test Cases
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="low_test_case"
                      name="low_test_case"
                      placeholder="Low Test Cases"
                      value={state.low_test_case}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </fieldset>
            </Row>
            <Row>
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
                  <Form.Group>
                    <Form.Label
                      htmlFor="medium"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Medium
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="medium"
                      name="medium"
                      placeholder="Medium"
                      value={medium}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="medium_description"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Medium Question Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id="medium_description"
                      name="medium_description"
                      placeholder="Question Description (Medium)"
                      value={medium_description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="medium_test_case"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Low Test Cases
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="medium_test_case"
                      name="medium_test_case"
                      placeholder="Medium Test Cases"
                      value={state.medium_test_case}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </fieldset>
            </Row>
            <Row>
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
                  <Form.Group>
                    <Form.Label
                      htmlFor="hard"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Hard
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="hard"
                      name="hard"
                      placeholder="Hard"
                      value={hard}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor=" hard_description"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Hard Question Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      id=" hard_description"
                      name=" hard_description"
                      placeholder="Question Description (Hard)"
                      value={hard_description}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label
                      htmlFor="hard_test_case"
                      className="fw-bold d-flex justify-content-start  mt-3"
                    >
                      Low Test Cases
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="hard_test_case"
                      name="hard_test_case"
                      placeholder="Hard Test Cases"
                      value={state.hard_test_case}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Col>
              </fieldset>
            </Row>
          </fieldset>

          <Form.Group>
            <button
              type="submit"
              value={id ? "UPDATE" : "SAVE"}
              className="btn btn-primary"
              style={{ marginTop: "2%",width:'30%',height:'40px' }}
            >
              Submit
            </button>
            <Link to="/topics">
              <button
                type="button"
                value="BACK"
                className="btn btn-success"
                style={{ marginTop: "2%", marginLeft: "10px",width:'30%',height:'40px'}}
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

export default UpdateTopicForm;
