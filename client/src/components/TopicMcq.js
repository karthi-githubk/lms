import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const initialState = {
  topic_id: "",
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
  topics: [],
};

const TopicMcq = () => {
  const [formData, setFormData] = useState(initialState);
  const { topic_id, questions, topics } = formData;
  const history = useNavigate();
  const { id } = useParams();
  const [topicclick, settopicclick] = useState(null);

  const getSelectedTopicFromLocalStorage = () => {
    const selectedTopicId = localStorage.getItem("topicclick");
    if (selectedTopicId) {
      const parsedData = JSON.parse(selectedTopicId);

      settopicclick(parsedData);
    }
  };

  console.log("topic", topicclick);
  console.log("Topics:", topics);

  useEffect(() => {
    // Fetch the list of topics here and populate the topics state.
    axios
      .get("http://localhost:5000/api/topics/get")
      .then((resp) => setFormData({ ...formData, topics: resp.data }))
      .catch((error) => {
        console.error("Error fetching topics:", error);
      });

    getSelectedTopicFromLocalStorage();
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
      topic_id,
      question: q.question,
      option_1: q.option_1,
      option_2: q.option_2,
      option_3: q.option_3,
      option_4: q.option_4,
      correct_option: q.correct_option,
    }));

    try {
      const response = await axios.post(
        "http://localhost:5000/api/mcq_questions/add",
        questionsData // Send an array of questions
      );

      console.log("Response Data:", response.data); // Check the API response
      toast.success("MCQ questions added successfully!!");
    } catch (error) {
      console.error("API Error:", error); // Log API errors
      toast.error(error.response.data);
    }

    setTimeout(() => history("/mcqtable"), 500);
  };

  return (
    <div className="container">
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          marginLeft: "3%",
          borderRadius: "8px",
          padding: "10px",
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
          Add Mcq
        </h3>
        <div className="form-group">
          <label htmlFor="topic_id">
            Select Topic<span style={{ color: "red" }}>*</span>
          </label>
          <select
            id="topic_id"
            name="topic_id"
            value={topic_id}
            onChange={(e) =>
              setFormData({ ...formData, topic_id: e.target.value })
            }
            className="form-select" // Use form-select class for Bootstrap styling
          >
            <option value="" disabled>
              Select a topic
            </option>
            {topics.length > 0 &&
              topics.map((topic) =>
                topicclick?.topic_name === topic.topic_name ? (
                  <option key={topic.id} value={topic.id}>
                    {topic.topic_name}
                  </option>
                ) : null
              )}
          </select>
        </div>

        {questions.map((question, index) => (
          <div key={index} className="border p-3 mb-3">
            <div className="form-group">
              <label htmlFor={`question_${index}`}>
                Question<span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id={`question_${index}`}
                name={`question`}
                placeholder="MCQ Question"
                value={question.question}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor={`option_1_${index}`}>
                Option 1<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id={`option_1_${index}`}
                name={`option_1`}
                placeholder="Option 1"
                value={question.option_1}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`option_2_${index}`}>
                Option 2<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id={`option_2_${index}`}
                name={`option_2`}
                placeholder="Option 2"
                value={question.option_2}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`option_3_${index}`}>
                Option 3<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id={`option_3_${index}`}
                name={`option_3`}
                placeholder="Option 3"
                value={question.option_3}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`option_4_${index}`}>
                Option 4<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id={`option_4_${index}`}
                name={`option_4`}
                placeholder="Option 4"
                value={question.option_4}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor={`correct_option_${index}`}>
                Correct Option<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id={`correct_option_${index}`}
                name={`correct_option`}
                value={question.correct_option}
                onChange={(e) => handleInputChange(e, index)}
                className="form-control"
              >
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeQuestion(index)}
              style={{ width: "30%", height: "40px" }}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-primary"
          onClick={addQuestion}
          style={{ width: "30%", height: "40px", marginLeft: "4%" }}
        >
          Add Mcq's
        </button>

        <div className="form-group mt-5">
          <button
            type="submit"
            value={id ? "UPDATE" : "SAVE"}
            className="btn btn-primary"
            style={{ width: "30%", height: "40px", marginLeft: "2%" }}
          >
            submit
          </button>

          <Link to="/admin/existingcourses">
            <button
              type="button"
              value="BACK"
              className="btn btn-success"
              style={{ width: "30%", marginLeft: "3%", height: "40px" }}
            >
              Back
            </button>
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default TopicMcq;
