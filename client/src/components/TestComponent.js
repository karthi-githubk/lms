// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";

// // // const TestComponent = ({ topicId }) => {
// // //   const [mcqQuestions, setMcqQuestions] = useState([]);
// // //   const [selectedAnswers, setSelectedAnswers] = useState({});
// // //   const [showResult, setShowResult] = useState(false);
// // //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

// // //   useEffect(() => {
// // //     // Fetch MCQ questions based on the topic ID
// // //     axios
// // //       .get(`http://localhost:5000/api/mcq_questions/get?topic_id=${topicId}`)
// // //       .then((response) => {
// // //         const data = response.data;
// // //         // Initialize selectedAnswers state with default values
// // //         const initialSelectedAnswers = {};
// // //         data.forEach((question) => {
// // //           initialSelectedAnswers[question.id] = null; // Initially, no option is selected
// // //         });
// // //         setSelectedAnswers(initialSelectedAnswers);
// // //         setMcqQuestions(data);
// // //       })
// // //       .catch((error) => {
// // //         console.error("Error fetching MCQ questions:", error);
// // //       });
// // //   }, [topicId]);

// // //   const handleAnswerSelect = (questionId, selectedOption) => {
// // //     setSelectedAnswers({
// // //       ...selectedAnswers,
// // //       [questionId]: selectedOption,
// // //     });
// // //   };

// // //   const handleNextQuestion = () => {
// // //     if (currentQuestionIndex < mcqQuestions.length - 1) {
// // //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// // //     }
// // //   };

// // //   const handleSubmit = () => {
// // //     setShowResult(true);
// // //   };

// // //   const calculateScore = () => {
// // //     let score = 0;
// // //     mcqQuestions.forEach((question) => {
// // //       if (selectedAnswers[question.id] === question.correct_option) {
// // //         score += 1;
// // //       }
// // //     });
// // //     return score;
// // //   };

// // //   const currentQuestion = mcqQuestions[currentQuestionIndex];

// // //   return (
// // //     <div>
// // //       <h2>MCQ Test for Topic ID: {topicId}</h2>
// // //       {mcqQuestions.length === 0 ? (
// // //         <p>No MCQ questions available for this topic.</p>
// // //       ) : (
// // //         <div>
// // //           {showResult ? (
// // //             <div>
// // //               <h3>Your Score:</h3>
// // //               <p>
// // //                 {calculateScore()} out of {mcqQuestions.length}
// // //               </p>
// // //             </div>
// // //           ) : (
// // //             <div>
// // //               <p>{currentQuestion.question}</p>
// // //               <ul>
// // //                 {currentQuestion.options &&
// // //                   currentQuestion.options
// // //                     .filter((option) => option !== null) // Filter out null options if any
// // //                     .map((option, index) => (
// // //                       <li key={index}>
// // //                         <label>
// // //                           <input
// // //                             type="radio"
// // //                             name={`question_${currentQuestion.id}`}
// // //                             value={option}
// // //                             onChange={() =>
// // //                               handleAnswerSelect(currentQuestion.id, option)
// // //                             }
// // //                             checked={
// // //                               selectedAnswers[currentQuestion.id] === option
// // //                             }
// // //                           />
// // //                           {option}
// // //                         </label>
// // //                       </li>
// // //                     ))}
// // //               </ul>
// // //               <button onClick={handleNextQuestion}>Next</button>
// // //               {currentQuestionIndex === mcqQuestions.length - 1 && (
// // //                 <button onClick={handleSubmit}>Submit</button>
// // //               )}
// // //             </div>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default TestComponent;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Card } from "react-bootstrap";
// // import {toast} from 'react-toastify'

// // const CardMcq = ({ item }) => (
// //   <Card style={{ marginBottom: "20px", width: "200px" }}>
// //     <Card.Body>
// //       <Card.Title>MCQ Questions</Card.Title>
// //       {/* <Card.Subtitle className="mb-2 text-muted">
// //           Question {item.id}
// //         </Card.Subtitle> */}
// //       <Card.Text>Question: {item.question}</Card.Text>
// //       <Card.Text>Option 1: {item.option_1}</Card.Text>
// //       <Card.Text>Option 2: {item.option_2}</Card.Text>
// //       <Card.Text>Option 3: {item.option_3}</Card.Text>
// //       <Card.Text>Option 4: {item.option_4}</Card.Text>
// //       {/* <Card.Text>Correct Option: {item.correct_option}</Card.Text> */}
// //     </Card.Body>
// //   </Card>
// // )

// // const TestComponent = ({ topicId }) => {
// //   const [mcqQuestions, setMcqQuestions] = useState([]);
// //   const [selectedAnswers, setSelectedAnswers] = useState({});
// //   const [showResult, setShowResult] = useState(false);
// //   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

// //   const [mcqData, setMcqData] = useState([]);
// //   const [localmcqData, setLocalmcqData] = useState([]);

// //   const loadMcqData = async () => {
// //     try {
// //       const response = await axios.get(
// //         "http://localhost:5000/api/mcq_questions/get"
// //       );
// //       setMcqData(response.data);
// //     } catch (error) {
// //       console.error(error);
// //       toast.error("An error occurred while fetching MCQ questions.");
// //     }
// //   };

// //   useEffect(() => {
// //     // Fetch MCQ questions based on the topic ID
// //     axios
// //       .get(`http://localhost:5000/api/mcq_questions/get?topic_id=${topicId}`)
// //       .then((response) => {
// //         const data = response.data;
// //         // Initialize selectedAnswers state with default values
// //         const initialSelectedAnswers = {};
// //         data.forEach((question) => {
// //           initialSelectedAnswers[question.id] = null; // Initially, no option is selected
// //         });
// //         setSelectedAnswers(initialSelectedAnswers);
// //         setMcqQuestions(data);
// //       })
// //       .catch((error) => {
// //         console.error("Error fetching MCQ questions:", error);
// //       });
// //   }, [topicId]);

// //   const handleAnswerSelect = (questionId, selectedOption) => {
// //     setSelectedAnswers({
// //       ...selectedAnswers,
// //       [questionId]: selectedOption,
// //     });
// //   };

// //   const handleNextQuestion = () => {
// //     if (currentQuestionIndex < mcqQuestions.length - 1) {
// //       setCurrentQuestionIndex(currentQuestionIndex + 1);
// //     }
// //   };

// //   const handleSubmit = () => {
// //     setShowResult(true);
// //   };

// //   const calculateScore = () => {
// //     let score = 0;
// //     mcqQuestions.forEach((question) => {
// //       if (selectedAnswers[question.id] === question.correct_option) {
// //         score += 1;
// //       }
// //     });
// //     return score;
// //   };

// //   const currentQuestion = mcqQuestions[currentQuestionIndex];

// //   return (
// //     <div>
// //       <h2>MCQ Test for Topic ID: {topicId}</h2>
// //       {mcqQuestions.length === 0 ? (
// //         <p>No MCQ questions available for this topic.</p>
// //       ) : (
// //         <div>
// //           {showResult ? (
// //             <div>
// //               <h3>Your Score:</h3>
// //               <p>
// //                 {calculateScore()} out of {mcqQuestions.length}
// //               </p>
// //             </div>
// //           ) : (
// //             <div>
// //               <p>{currentQuestion.question}</p>
// //               <ul>
// //                 {currentQuestion.options &&
// //                   currentQuestion.options
// //                     .filter((option) => option !== null) // Filter out null options if any
// //                     .map((option, index) => (
// //                       <li key={index}>
// //                         <label>
// //                           <input
// //                             type="radio"
// //                             name={`question_${currentQuestion.id}`}
// //                             value={option}
// //                             onChange={() =>
// //                               handleAnswerSelect(currentQuestion.id, option)
// //                             }
// //                             checked={
// //                               selectedAnswers[currentQuestion.id] === option
// //                             }
// //                           />
// //                           {option}
// //                         </label>
// //                       </li>
// //                     ))}
// //               </ul>
// //               <button onClick={handleNextQuestion}>Next</button>
// //               {currentQuestionIndex === mcqQuestions.length - 1 && (
// //                 <button onClick={handleSubmit}>Submit</button>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default TestComponent;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Usermanage.css";
// import { toast } from "react-toastify";
// import axios from "axios";

// const TopicMcqCard = ({ mcqItem, onNext, onPrevious, onSubmit }) => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div
//       className="mcq-card"
//       style={{
//         width: "80%",
//         boxShadow: "1px 1px 2px 1px pink",
//         backgroundColor: "#f8a5c2",
//         marginTop: "4%",
//         marginLeft: "6%",
//         overflowY: "scroll", // Add this to make the content scrollable
//         maxHeight: "360px",
//       }}
//     >
//       <div className="mcq-card-content" style={{ marginLeft: "4%" }}>
//         <h3
//           style={{
//             fontSize: "21px",
//             color: "black",
//             textTransform: "uppercase",
//             fontWeight: "bolder",
//             fontFamily: "serif",
//           }}
//         >
//           Topic: {mcqItem.topic_name}
//         </h3>
//         <p style={{ fontSize: "25px", color: "white" }}>
//           Question: {mcqItem.question}
//         </p>
//         <p style={{ fontSize: "21px", color: "white",fontWeight:'bolder' }}>Options:</p>
//         <form>
//           <label>
//             <input
//               type="radio"
//               name="option"
//               value={mcqItem.option_1}
//               checked={selectedOption === mcqItem.option_1}
//               onChange={handleOptionChange}
//               style={{
//                 marginRight: "10px",
//                 appearance: "none",
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 backgroundColor:
//                   selectedOption === mcqItem.option_1 ? "#007bff" : "white",
//                 cursor: "pointer", // Add pointer cursor to indicate interactivity
//               }}
//             />
//             {mcqItem.option_1}
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="option"
//               value={mcqItem.option_2}
//               checked={selectedOption === mcqItem.option_2}
//               onChange={handleOptionChange}
//               style={{
//                 marginRight: "10px",
//                 appearance: "none",
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 marginTop:'11px',
//                 backgroundColor:
//                   selectedOption === mcqItem.option_2 ? "#007bff" : "white",
//                 cursor: "pointer",
//               }}
//             />
//             {mcqItem.option_2}
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="option"
//               value={mcqItem.option_3}
//               checked={selectedOption === mcqItem.option_3}
//               onChange={handleOptionChange}
//               style={{
//                 marginRight: "10px",
//                 appearance: "none",
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 marginTop:'11px',
//                 backgroundColor:
//                   selectedOption === mcqItem.option_3 ? "#007bff" : "white",
//                 cursor: "pointer",
//               }}
//             />
//             {mcqItem.option_3}
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="option"
//               value={mcqItem.option_4}
//               checked={selectedOption === mcqItem.option_4}
//               onChange={handleOptionChange}
//               style={{
//                 marginRight: "10px",
//                 appearance: "none",
//                 width: "20px",
//                 height: "20px",
//                 borderRadius: "50%",
//                 marginTop:'11px',
//                 backgroundColor:
//                   selectedOption === mcqItem.option_4 ? "#007bff" : "white",
//                 cursor: "pointer",
//               }}
//             />
//             {mcqItem.option_4}
//           </label>
//         </form>

//         <div className="mt-3">
//           <button
//             onClick={onPrevious}
//             className="btn btn-danger"
//             style={{ width: "11%", height: "40px" }}
//           >
//             Previous
//           </button>
//           <button
//             onClick={onNext}
//             className="btn btn-success"
//             style={{ width: "11%", height: "40px", marginLeft: "2%" }}
//           >
//             Next
//           </button>
//         </div>
//         <button
//           onClick={() => onSubmit(selectedOption)}
//           className="btn btn-primary"
//           style={{ width: "11%", height: "40px", marginTop: "10px" }}
//         >
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };
// const TestComponent = () => {
//   const [mcqData, setMcqData] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [showResults, setShowResults] = useState(false);

//   const loadMcqData = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/mcq_questions/get"
//       );
//       setMcqData(response.data);
//     } catch (error) {
//       console.error(error);
//       toast.error("An error occurred while fetching MCQ questions.");
//     }
//   };

//   useEffect(() => {
//     loadMcqData();
//   }, []);

//   const deleteMcqQuestion = async (id) => {
//     if (window.confirm("Are you sure you want to delete this MCQ question?")) {
//       try {
//         await axios.delete(
//           `http://localhost:5000/api/mcq_questions/remove/${id}`
//         );
//         toast.success("MCQ question deleted successfully.");
//         loadMcqData();
//       } catch (error) {
//         console.error(error);
//         toast.error("An error occurred while deleting the MCQ question.");
//       }
//     }
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < mcqData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     }
//   };

//   const handleSubmit = (selectedOption) => {
//     setUserAnswers({
//       ...userAnswers,
//       [mcqData[currentQuestionIndex].id]: selectedOption,
//     });

//     if (currentQuestionIndex < mcqData.length - 1) {
//       handleNext();
//     } else {
//       // All questions are answered, show results
//       setShowResults(true);
//     }
//   };

//   const calculateScore = () => {
//     let score = 0;
//     mcqData.forEach((question) => {
//       const correctOption = question.correct_option;
//       const userAnswer = userAnswers[question.id];
//       if (correctOption === userAnswer) {
//         score += 1;
//       }
//     });
//     return score;
//   };

//   return (
//     <div className="mcq-card-container">
//       {!showResults && mcqData.length > 0 && (
//         <TopicMcqCard
//           mcqItem={mcqData[currentQuestionIndex]}
//           onNext={handleNext}
//           onPrevious={handlePrevious}
//           onSubmit={handleSubmit}
//         />
//       )}

//       {showResults && (
//         <div
//           style={{
//             marginTop: "3%",
//             alignItems: "center",
//             justifyContent: "center",
//             backgroundColor: "#74b9ff",
//             boxShadow: "1px 2px 2px 3px pink",
//             width: "50%",
//             marginLeft: "20%",
//             height: "200px",
//           }}
//         >
//           <h2
//             style={{
//               fontSize: "32px",
//               fontFamily: "serif",
//               textTransform: "uppercase",
//               textAlign: "center",
//               color: "white",
//             }}
//           >
//             Results
//           </h2>
//           <p
//             style={{
//               fontSize: "32px",
//               fontFamily: "serif",
//               textTransform: "uppercase",
//               textAlign: "center",
//               color: "white",
//             }}
//           >
//             Score: {calculateScore()} / {mcqData.length}
//           </p>
//           <button
//             onClick={() => setShowResults(false)}
//             className="btn"
//             style={{
//               width: "20%",
//               marginLeft: "40%",
//               backgroundColor: "#f53b57",
//             }}
//           >
//             Retake
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestComponent;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Radio,
  FormControlLabel,
  Button,
  Container,
  Paper,
  Grid,
  Divider,
  LinearProgress,
} from '@mui/material';
import Swal from 'sweetalert2';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
const TestComponent = (props) => {
  const selectedTopic = props.selectedTopic;
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(Array(data.length).fill(null)); // Initialize with null values
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/mcq_questions/get");
        setData(response.data.filter(mcq => mcq.topic_id === selectedTopic.id));
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [selectedTopic]);

  const handleAnswerClick = (selectedOption) => {
    // Create a copy of userAnswers to update the selected answer for the current question
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedUserAnswers);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < data.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = () => {
    // Check if the user has answered all questions
    if (userAnswers.some(answer => answer === null)) {
      setValidationError(true);
      return; // Don't proceed with submission
    }

    // Use SweetAlert2 for the confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to change your answers after submission.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Calculate the score based on correct answers
        const newScore = userAnswers.reduce((totalScore, selectedOption, index) => {
          if (selectedOption === data[index].correct_option) {
            return totalScore + 1;
          }
          return totalScore;
        }, 0);

        // Handle the submission logic here
        setQuizFinished(true);
        setSubmitted(true);
        setScore(newScore);

        // Display a success message with SweetAlert2
        Swal.fire({
          title: 'Quiz Submitted!',
          text: `Your Score: ${newScore} / ${data.length}`,
          icon: 'success',
        });
      }
    });
  };

  const renderOptions = () => {
    const currentMCQ = data[currentQuestion];
    const options = [
      currentMCQ.option_1,
      currentMCQ.option_2,
      currentMCQ.option_3,
      currentMCQ.option_4,
    ];

    return options.map((option, index) => (
      <FormControlLabel
        key={index}
        control={
          <Radio
            checked={userAnswers[currentQuestion] === index + 1}
            onChange={() => handleAnswerClick(index + 1)}
            value={`${index + 1}`}
            disabled={quizFinished || submitted}
          />
        }
        label={option}
      />
    ));
  };

  const renderQuiz = () => {
    if (submitted) {
      return (
        <Container>
          <Typography variant="h4">Quiz Finished</Typography>
          <Typography variant="h4">Your Score: {score} / {data.length}</Typography>
        </Container>
      );
    }

    if (quizFinished) {
      return (
        <Container>
          <Typography variant="h4">Quiz Finished</Typography>
        </Container>
      );
    }

    if (loading) {
      return (
        <Container>
          <LinearProgress />
          <Typography variant="body1">Loading...</Typography>
        </Container>
      );
    }

    if (data.length === 0) {
      return <Typography variant="body1">No questions available for this topic.</Typography>;
    }

    const currentMCQ = data[currentQuestion];

    return (
      <Container>
        <Typography variant="h5">{selectedTopic.topic_name}</Typography>
        <br />
        <Typography variant="body1" sx={{fontWeight:'bolder',fontSize:'19px'}}>Question {currentQuestion + 1}: {currentMCQ.question}</Typography>
        <Divider style={{ margin: '16px 0' }} />
        <div className="options">{renderOptions()}</div>
        <div style={{ marginTop: '16px' }}>
          <Button
            variant="contained"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0 || submitted}
            sx={{width:'23%',backgroundColor:'#FFC312',color:'white'}}
          >
           <KeyboardDoubleArrowLeftIcon/> Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNextQuestion}
            disabled={currentQuestion === data.length - 1 || submitted}
            sx={{width:'23%',backgroundColor:'#4cd137',marginLeft:'3%'}}
          >
          Next <KeyboardDoubleArrowRightIcon/> 
          </Button>
        </div>
        {validationError && (
          <Typography variant="body1" style={{ color: 'red', marginTop: '16px' }}>
            Please answer all questions before submitting.
          </Typography>
        )}
        {currentQuestion === data.length - 1 && (
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitted}
            style={{ marginTop: '16px',width:'23%',backgroundColor:'#0fbcf9',float:'right', }}
          >
            Submit
          </Button>
        )}
      </Container>
    );
  };

  return (
    <Container style={{ height: '', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',marginTop:"3%" ,borderRadius:'14px'}}>
      <Paper elevation={6} style={{ padding: '16px', width: '70%',marginTop:'' }}>
        {renderQuiz()}
      </Paper>
    </Container>
  );
}

export default TestComponent;

