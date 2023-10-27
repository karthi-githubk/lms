import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const initialState = {
  module_id: "",
  question: "",
  option_1: "",
  option_2: "",
  option_3: "",
  option_4: "",
  correct_option: "",
  moduleOptions: [],
};

const UpdateModuleMcq = (props) => {
  const id = props.editeddata.id;
  const [state, setState] = useState(initialState);
  const {
    module_id,
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_option,
    moduleOptions,
  } = state;
  const history = useNavigate();
  // const { id } = useParams();

  useEffect(() => {
    // Fetch the list of topics here and populate the topicOptions state.
    axios
      .get("http://localhost:5000/api/modules/get")
      .then((resp) => setState({ ...state, moduleOptions: resp.data }));
  }, []);

  useEffect(() => {
    // Fetch the MCQ data if an ID is provided
    if (id) {
      axios
        .get(`http://localhost:5000/api/modulemcq/getById/${id}`)
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
      !module_id ||
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
        module_id,
        question,
        option_1,
        option_2,
        option_3,
        option_4,
        correct_option,
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/api/modulemcq/update/${id}`,
          mcqData
        );

        toast.success("MCQ question updated successfully!!");
      } catch (error) {
        toast.error(error.response.data);
      }
    }
    setTimeout(() => history("/updatemodulemcq"), 500);
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Dashboard", url: "/dashboard" },
    { text: "Courses", url: "/courses" },
    { text: "Modules", url: "/modules" },
    { text: "Topics", url: "/topics" },
    { text: "MCQ", url: "/mcq" },
    { text: "Update MCQ", url: "/mcq" },
  ]);
  return (
    <div className="formbg">
      
      <div className="d-flex justify-content-center mt-2 ">
      </div>
      <Container style={{ marginTop: "10px" }}>
        <form
          className="form"
          onSubmit={handleSubmit}
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
          }}
        >

          
          <Row>
            <Col>
              <div className="form-group">
                <label
                  htmlFor="module_id"
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
                  Module Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="module_id"
                  name="module_id"
                  placeholder="Module Name"
                  value={
                    moduleOptions.find((module) => module.id === module_id)
                      ?.module_name || ""
                  }
                  readOnly
                  disabled
                  className="form-control"
                />
              </div>
            </Col>

            <Col>
              <div className="form-group">
                <label
                  htmlFor="question"
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
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
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="form-group">
                <label
                  htmlFor="option_1"
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
                  Option 1
                </label>
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
            </Col>
            <Col>
              <div className="form-group">
                <label
                  htmlFor="option_2"
                  className="fw-bold d-flex justify-content-start  mt-3"
                >
                  Option 2
                </label>
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
            </Col>
          </Row>

          <Row>
          <Col>

          <div className="form-group">
            <label
              htmlFor="option_3"
              className="fw-bold d-flex justify-content-start  mt-3"
            >
              Option 3
            </label>
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
          </Col>
          <Col>

          <div className="form-group">
            <label
              htmlFor="option_4"
              className="fw-bold d-flex justify-content-start  mt-3"
            >
              Option 4
            </label>
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
          </Col>
          </Row>

          <div className="form-group">
            <label
              htmlFor="correct_option"
              className="fw-bold d-flex justify-content-start  mt-3"
            >
              Correct Option<span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="correct_option"
              name="correct_option"
              value={correct_option}
              onChange={handleInputChange}
              className="form-control"
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
              style={{ marginTop: "2%" ,width:'35%',height:'40px'}}
            >Submit</button>

            <Link to="/modulemcqtable">
              <button
                type="button"
                value="BACK"
                style={{ marginTop: "2%", marginLeft: "10px",width:'35%',height:'40px' }}
                className="btn btn-secondary"
              >Back </button>
            </Link>
          </div>
        </form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default UpdateModuleMcq;