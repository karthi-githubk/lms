import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Row, Col, Button } from "react-bootstrap";
import Practise from "./Practise";

function TopicDescription({ selectedModule, selectedTopic }) {
  return (
    <div>
      <h3 style={{}}>{selectedTopic}</h3>
      <p style={{ textAlign: "justify",fontSize:"24px", fontFamily: "Poppins,", }}>
        {
          selectedModule.topics.find(
            (topic) => topic.topicName === selectedTopic
          ).topicDescription
        }
      </p>
    </div>
  );
}

function TopicVideoAndPDF({ selectedModule, selectedTopic }) {
  const topic = selectedModule.topics.find(
    (topic) => topic.topicName === selectedTopic
  );

  return (
    <div>
      {topic.pdf && (
        <iframe
          src={topic.pdf}
          title={`PDF-${topic.topicName}`}
          style={{
            width: "100%",
            height: "400px",
            border: "none",
            marginBottom: "30px",
          }}
        />
      )}
      <hr style={{ border: "3px solid #6c5ce7" }} />
      {topic.video && (
        <video controls style={{ width: "100%", marginTop: "40px", }}>
          <source src={topic.video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

function TopicMCQs({
  selectedModule,
  selectedTopic,
  answers,
  handleSelectAnswer,
}) {
  const topic = selectedModule.topics.find(
    (topic) => topic.topicName === selectedTopic
  );

  return (
    <div>
      {topic.mcqs.map((mcq, questionIndex) => (
        <div key={questionIndex} style={{textAlign: "justify",fontSize:"24px", fontFamily: "Poppins,",}}>
          <div>{mcq.question}</div>
          <ul>
            {mcq.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    checked={answers[questionIndex] === optionIndex}
                    onChange={() =>
                      handleSelectAnswer(questionIndex, optionIndex)
                    }
                    disabled={answers[questionIndex] !== undefined} // Disable after selecting an answer
                  />
                  {option.option}
                  {option.isCorrect && answers[questionIndex] !== undefined && (
                    <span
                      style={{
                        marginLeft: "10px",
                        color: answers[questionIndex] === optionIndex ? "green" : "red",
                      }}
                    >
                      {answers[questionIndex] === optionIndex ? "CORRECT" : "WRONG"}
                    </span>
                  )}
                  {option.isCorrect && answers[questionIndex] !== undefined && answers[questionIndex] !== optionIndex && (
                    <span style={{ color: "green", fontSize:"25px" }}> ({mcq.options.findIndex(opt => opt.isCorrect) + 1})</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


function HtmlSidebar() {
  const { id, module } = useParams();
  const coursesList = useSelector((state) => state.courses.coursesList);
  const course = coursesList.find((c) => c.id === parseInt(id));

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!course) {
      setSelectedTopic(null);
    } else {
      const selectedModule = course.modules.find(
        (m) => m.moduleName === module
      );
      setSelectedTopic(selectedModule?.topics[0]?.topicName || null);
    }
  }, [course, module]);

  if (!course) {
    return <div>Course not found</div>;
  }

  const selectedModule = course.modules.find((m) => m.moduleName === module);

  if (!selectedModule) {
    return <div>Module not found</div>;
  }

  // Function to handle selecting a topic
  const handleSelectTopic = (topicName) => {
    setSelectedTopic(topicName);
  };

  // Function to handle selecting an answer
  const handleSelectAnswer = (questionIndex, optionIndex) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = optionIndex;
      return updatedAnswers;
    });
  };

  // Function to handle quiz submission
  const handleSubmitQuiz = () => {
    setSubmitted(true);
  };

  return (
    <div className="d-flex" style={{ width: "99%", overflowX: "hidden" }}>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
        style={{
          minWidth: "250px",
          height: "95vh",
          background: "",
          position: "fixed",
          top: "4%",
        }}
      >
        <hr className="sidebar-divider my-0" />
        <h3 className="text- mt-5 text-center" style={{fontWeight:"bold",color:"white",}}>
          {selectedModule.moduleName}
        </h3>
        <li className="nav-item font">
          {selectedModule.topics.map((topic) => (
            <div key={topic.topicName}>
              <h3>
                <button
                  onClick={() => handleSelectTopic(topic.topicName)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    fontSize: "20px",
                    textAlign: "center",
                    marginLeft: "10px",
                    marginTop: "20px",
                  }}
                >
                  {topic.topicName}
                </button>
              </h3>
            </div>
          ))}
        </li>
      </ul>
      <div className="d-flex flex-column  justify-content-center align-items-center">
        <div
          className="content"
          style={{ marginTop: "50px", marginLeft: "20%", width: "100%" }}
        >
          <h6 style={{ marginTop: "3px" }}>{course.courseName}</h6>

          <Col
            md={4}
            style={{
              marginLeft: "15%",
              marginRight: "30px",
              marginTop: "5%",
              width: "90%",
            }}
          >

            
            <h3 style={{ textTransform: "uppercase" }}>Introduction</h3>
            <Card
              style={{
                marginBottom: "40px",
                width: "70%",
                marginLeft: "4%",
                boxShadow: "1px 2px 9px #F4AAB9",
                borderRadius: "20px",
                marginTop: "3%",
              }}
            >
              <Card.Body>
                <div className="text-center">
                  {selectedTopic && (
                    <TopicDescription
                      selectedModule={selectedModule}
                      selectedTopic={selectedTopic}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>

            <Col md={5}>
              <h3 style={{ textTransform: "uppercase", marginTop: "7%" }}>
                VIDEO & PDF
              </h3>
              <Card
                style={{
                  marginBottom: "20px",
                  marginTop: "6%",
                  width: "172%",
                  marginLeft: "7%",
                  borderRadius: "20px",
                  boxShadow: "1px 2px 9px #F4AAB9",
                }}
              >
                <Card.Body>
                  {selectedTopic && (
                    <TopicVideoAndPDF
                      selectedModule={selectedModule}
                      selectedTopic={selectedTopic}
                    />
                  )}
                </Card.Body>
              </Card>
            </Col>

            <h3 style={{ textTransform: "uppercase",marginTop:"3%" }}>MCQ</h3>
            <Card
              style={{
                marginBottom: "20px",
                width: "70%",
                height: "auto",
                marginLeft: "4%",
                marginTop: "2%",
                borderRadius: "20px",
                boxShadow: "1px 2px 9px #F4AAB9",
              }}
            >
              <Card.Body>
                {selectedTopic && (
                  <TopicMCQs
                    selectedModule={selectedModule}
                    selectedTopic={selectedTopic}
                    answers={answers}
                    handleSelectAnswer={handleSelectAnswer}
                  />
                )}
                {!submitted && selectedTopic && (
                  <Button
                    onClick={handleSubmitQuiz}
                    style={{
                      textAlign: "center",
                      marginLeft: "10px",
                      width: "30%",
                      border: "none",
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* <Card style={{marginLeft:'220px',width:'80%',marginBottom:'50px',padding:'30px',boxShadow: '5px 5px 10px 5px #353536'}}>
        <Practice1 />
        </Card> */}
<h3 style={{marginLeft:"15%",marginTop:"4%",textTransform:"uppercase"}}>Compiler</h3>
          <Card
            style={{
              marginBottom: "20px",
              width: "63%",
              height: "auto",
              marginLeft: "19%",
              marginTop: "2%",
              borderRadius: "20px",
              boxShadow: "1px 2px 9px #F4AAB9",
            }}
          >
            <Card.Body>
              <Practise />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HtmlSidebar;
