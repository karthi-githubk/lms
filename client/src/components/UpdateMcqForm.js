import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import Breadcrumbs from "./Breadcrumb";

const initialState = {
  topic_id: "",
  question: "",
  option_1: "",
  option_2: "",
  option_3: "",
  option_4: "",
  correct_option: "", // Updated to include correct_option
  topicOptions: [],
};

const UpdateMCQForm = (props) => {
  const id = props.selectedMcq;
  const [state, setState] = useState(initialState);
  const {
    topic_id,
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_option,
    topicOptions,
  } = state;
  const history = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    // Fetch the list of topics here and populate the topicOptions state.
    axios
      .get("http://localhost:5000/api/topics/get")
      .then((resp) => setState({ ...state, topicOptions: resp.data }));
  }, []);

  useEffect(() => {
    // Fetch the MCQ data if an ID is provided
    if (id) {
      axios
        .get(`http://localhost:5000/api/mcq_questions/getById/${id}`)
        .then((resp) => {
          setState((prevState) => ({ ...prevState, ...resp.data }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !topic_id ||
      !question ||
      !option_1 ||
      !option_2 ||
      !option_3 ||
      !option_4 ||
      !correct_option
    ) {
      toast.error("Please provide a value for each input field.");
    } else {
      const mcqData = {
        topic_id,
        question,
        option_1,
        option_2,
        option_3,
        option_4,
        correct_option,
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/api/mcq_questions/update/${id}`,
          mcqData
        );

        toast.success("MCQ question updated successfully!!");
      } catch (error) {
        toast.error(error.response.data);
      }
    }
    setTimeout(() => history("#"), 500);
  };

  // const [breadcrumbItems, setBreadcrumbItems] = useState([
  //   { text: "Dashboard", url: "/adminpanel" },
  //   { text: "Mcq", url: "/admin/Coursemanage" },
  //   { text: "McqUpdate", url: "/admin/courseform" },
  // ]);

  return (
    <div>
      {/* <Breadcrumbs items={breadcrumbItems} />, */}
    <div className="form-container" style={{marginTop:''}}>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{
          width: "90%",
          marginLeft: "6%",
          marginTop: "3%",
          borderRadius: "8px",
          padding: "10px",
          fontWeight:'bold'
        }}
      >
        <div className="form-group">
          <label htmlFor="topic_id">
            Topic Name<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="topic_id"
            name="topic_id"
            placeholder="Topic Name"
            value={topicOptions.find((topic) => topic.id === topic_id)?.topic_name || ''}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="question">
            Question<span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            id="question"
            name="question"
            placeholder="Question"
            value={question}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="option_1">Option 1</label>
          <input
            type="text"
            id="option_1"
            name="option_1"
            placeholder="Option 1"
            value={option_1}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="option_2">Option 2</label>
          <input
            type="text"
            id="option_2"
            name="option_2"
            placeholder="Option 2"
            value={option_2}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="option_3">Option 3</label>
          <input
            type="text"
            id="option_3"
            name="option_3"
            placeholder="Option 3"
            value={option_3}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="option_4">Option 4</label>
          <input
            type="text"
            id="option_4"
            name="option_4"
            placeholder="Option 4"
            value={option_4}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="correct_option">
            Correct Option<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="correct_option"
            name="correct_option"
            value={correct_option}
            onChange={handleInputChange}
          >
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </select>
        </div>

        <div className="form-group">
          <button
            type="submit"
            value={id ? "UPDATE" : "SAVE"}
            className="btn btn-primary"
            style={{width:'30%',marginLeft:'5%',height:'40px',backgroundColor:'#0984e3',color:'white',border:'none',borderRadius:'5px' }}>Update</button>

          <Link to="/admin/existingcourses">
            <button type="button" value="BACK" className="btn btn-success" style={{width:'30%',marginLeft:'5%',height:'40px',backgroundColor:'#009432',color:'white',border:'none',borderRadius:'5px' }}>Back</button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
    </div>
  );
};

export default UpdateMCQForm;
