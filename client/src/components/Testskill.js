import React, { useState } from "react";
import "./Testskill.css";

const Testskill = () => {
  const questions = [
    {
      question: "Which tag is used to define a hyperlink in HTML?",
      options: ["<a>", "<h1>", "<p>"],
      correctAnswer: "<a>",
      userAnswer: "",
    },
    {
      question: "What is the correct HTML tag for inserting a line break?",
      options: ["<break>", "<br>", "<lb>"],
      correctAnswer: "<br>",
      userAnswer: "",
    },
    {
      question: "Which HTML tag is used to define an unordered list?",
      options: ["<ol>", "<list>", "<ul>"],
      correctAnswer: "<ul>",
      userAnswer: "",
    },
    {
      question: "What is the correct HTML tag for adding a table?",
      options: ["<table>", "<tab>", "<tb>"],
      correctAnswer: "<table>",
      userAnswer: "",
    },
    {
      question: "Which tag is used to display an image in HTML?",
      options: ["<img>", "<image>", "<picture>"],
      correctAnswer: "<img>",
      userAnswer: "",
    },
    {
      question: "What is the purpose of the HTML 'meta' tag?",
      options: ["Define a paragraph", "Define metadata about an HTML document", "Define a header"],
      correctAnswer: "Define metadata about an HTML document",
      userAnswer: "",
    },
    {
      question: "What is the correct HTML tag for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>"],
      correctAnswer: "<h1>",
      userAnswer: "",
    },
    {
      question: "What is the correct HTML for creating a hyperlink to an email address?",
      options: ["<mail>", "<a href='mailto:email@example.com'>Email me</a>", "<a href='email@example.com'>Email me</a>"],
      correctAnswer: "<a href='mailto:email@example.com'>Email me</a>",
      userAnswer: "",
    },
    {
      question: "Which tag is used to define a list item in an ordered list?",
      options: ["<ol>", "<li>", "<ul>"],
      correctAnswer: "<li>",
      userAnswer: "",
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
      correctAnswer: "Hyper Text Markup Language",
      userAnswer: "",
    },
    // Add more questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);

  const handleAnswerSelect = (answer) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = answer;
    setCurrentQuestion(currentQuestion + 1);
    if (answer === updatedQuestions[currentQuestion].correctAnswer) {
      setTotalMarks(totalMarks + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const renderOptions = () => {
    const currentOptions = questions[currentQuestion].options;

    return currentOptions.map((option, index) => {
      const isSelected = option === questions[currentQuestion].userAnswer;
      const isCorrect = option === questions[currentQuestion].correctAnswer;
      const optionClassName = isSelected
        ? isCorrect
          ? "correct"
          : "incorrect"
        : "";

      return (
        <button
          key={index}
          className={`option ${optionClassName}`}
          onClick={() => handleAnswerSelect(option)}
          disabled={
            currentQuestion === questions.length ||
            questions[currentQuestion].userAnswer
          }
        >
          {option}
        </button>
      );
    });
  };

  const renderQuiz = () => {
    if (currentQuestion === questions.length) {
      return (
        <div>
          <h2>Quiz Completed</h2>
          <p>
            Total Marks: {totalMarks} / {questions.length}
          </p>
          <button className="next-button" onClick={() => setCurrentQuestion(0)}>
            Restart Quiz
          </button>
        </div>
      );
    }

    const currentQuestionObj = questions[currentQuestion];

    return (
      <div>
        <h2>Question {currentQuestion + 1}</h2>
        <p>{currentQuestionObj.question}</p>
        <div className="options">{renderOptions()}</div>
        <div className="button-container">
          {currentQuestion > 0 && (
            <button className="next-button" onClick={handlePreviousQuestion}>
              Previous Question
            </button>
          )}
          <button
            className="next-button"
            onClick={() => {
              if (questions[currentQuestion].userAnswer) {
                setCurrentQuestion(currentQuestion + 1);
              }
            }}
          >
            Next Question
          </button>
        </div>
      </div>
    );
  };

  return <div className="quiz-container">{renderQuiz()}</div>;
};

export default Testskill;
