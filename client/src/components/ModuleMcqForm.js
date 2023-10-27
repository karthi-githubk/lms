import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import Col from "react-bootstrap/Col";
import { Container, Form, Button, Row } from "react-bootstrap";


const initialState = {
  module_id: "",
  questions: [
    {
      question: "",
      option_1: "",
      option_2: "",
      option_3: "",
      option_4: "",
      correct_option: "1",
    },
  ],
  modules: [],
};

const AddModuleMcq = () => {
  const [formData, setFormData] = useState(initialState);
  const { module_id, questions, modules } = formData;
  const history = useNavigate();
  const { id } = useParams();
  const [LocaltopicData, setLocaltopicData] = useState([]);

  useEffect(() => {
    // Fetch the list of topics here and populate the topics state.
    const localMCQData = localStorage.getItem("topics");
    if(localMCQData) {
      const parsedMCQData = JSON.parse(localMCQData);
      setLocaltopicData(parsedMCQData);
    }

    axios
      .get("http://localhost:5000/api/modules/get")
      .then((resp) => setFormData({ ...formData, modules: resp.data }))
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...questions,
        {
          question: "",
          option_1: "",
          option_2: "",
          option_3: "",
          option_4: "",
          correct_option: "1",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the questions array in the required format
    const questionsData = questions.map((q) => ({
      module_id,
      question: q.question,
      option_1: q.option_1,
      option_2: q.option_2,
      option_3: q.option_3,
      option_4: q.option_4,
      correct_option: q.correct_option,
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/modulemcq/add",
        questionsData // Send an array of questions
      );

      console.log("Response Data:", response.data); // Check the API response
      toast.success("MCQ questions added successfully!!");
    } catch (error) {
      console.error("API Error:", error); // Log API errors
      toast.error(error.response.data);
    }

    setTimeout(() => history("/modulemcq"), 500);
  };

  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Dashboard", url: "/dashboard" },
    { text: "Courses", url: "/courses" },
    { text: "Modules", url: "/modules" },
    { text: "Topics", url: "/topics" },
    { text: "MCQ", url: "/mcq" },
    { text: "Add MCQ", url: "/addmcq" },
  ]);
console.log("lcd",LocaltopicData);
  return (
    <div className="formbg">
      <div className="d-flex justify-content-center mt-2">
      </div>

      <Container style={{ marginTop: "20px" }}>
        <Form
          onSubmit={handleSubmit}
          style={{
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            marginLeft: "",
            width: "",
          }}
        >
          <Form.Group controlId="module_id">
            <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
              Select Module<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Select
              name="module_id"
              value={module_id}
              onChange={(e) =>
                setFormData({ ...formData, module_id: e.target.value })
              }
              className="form-select"
              style={{ width: "500px" }}
            >
              <option value="" disabled>
                Select a module
              </option>
              {modules.filter((module) => LocaltopicData.module_name === module.module_name)
              .map((module) => (
                <option key={module.id} value={module.id}>
                  {module.module_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {questions.map((question, index) => (
            <div key={index} className="col-md-6">
              <Form.Group controlId={`question_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Question<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`question`}
                  placeholder="MCQ Question"
                  value={question.question}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                />
              </Form.Group>

              <Form.Group controlId={`option_1_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Option 1<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`option_1`}
                  placeholder="Option 1"
                  value={question.option_1}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                />
              </Form.Group>

              <Form.Group controlId={`option_2_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Option 2<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`option_2`}
                  placeholder="Option 2"
                  value={question.option_2}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                />
              </Form.Group>

              <Form.Group controlId={`option_3_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Option 3<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`option_3`}
                  placeholder="Option 3"
                  value={question.option_3}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                />
              </Form.Group>

              <Form.Group controlId={`option_4_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Option 4<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name={`option_4`}
                  placeholder="Option 4"
                  value={question.option_4}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                />
              </Form.Group>

              <Form.Group controlId={`correct_option_${index}`}>
                <Form.Label className="fw-bold d-flex justify-content-start  mt-3">
                  Correct Option<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  name={`correct_option`}
                  value={question.correct_option}
                  onChange={(e) => handleInputChange(e, index)}
                  style={{ width: "500px" }}
                >
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>
                </Form.Select>
              </Form.Group>

              <Button
                type="button"
                className="btn btn-danger mt-2"
                onClick={() => removeQuestion(index)}
                 style={{width:'43%'}}>
                Remove
              </Button>
            </div>
          ))}

          <div className="col-12">
            <Button
              type="button"
              className="btn btn-primary"
              onClick={addQuestion}
            >
              Add Question
            </Button>
          </div>

          <Button
            type="submit"
            className="btn btn-primary custom-button"
            value={id ? "UPDATE" : "SAVE"}
            style={{ marginTop: "2%",width:'35%',height:'40px' }}
          >
            {id ? "UPDATE" : "SAVE"}
          </Button>
          <Link to="/mcq">
            <Button
              type="button"
              value="BACK"
              className="btn btn-success ms-2 custom-button"
              style={{ marginTop: "2%", marginLeft: "10px", width:'35%',height:'40px'}}
            >Back</Button>
          </Link>
        </Form>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AddModuleMcq;