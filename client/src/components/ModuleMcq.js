import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Radio,
  FormControlLabel,
  Button,
  Container,
  Divider,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from '@mui/material';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import RefreshIcon from '@mui/icons-material/Refresh';


const ModuleMcq = (props) => {
  const selectedModule = props.selectedModule;
  const [data, setData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(true);

  // State for the result dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  // State to track correct and incorrect answers
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  // Timer and modal related states
  const [timeLeft, setTimeLeft] = useState(50); // 10 minutes (adjust as needed)
  const [timerInterval, setTimerInterval] = useState(null);

  // State to track whether the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);

  // State to display the time-up dialog
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/modulemcq/get");
        setData(response.data.filter(mcq => mcq.module_id === selectedModule.id));
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [selectedModule]);

  useEffect(() => {
    // Start the timer when the component mounts and the quiz has started
    if (quizStarted) {
      startTimer();
    }

    return () => {
      // Cleanup: Stop the timer when the component unmounts
      stopTimer();
    };
  }, [quizStarted]);

  const startTimer = () => {
    if (timeLeft <= 0) {
      // If time has already run out, do nothing
      return;
    }
  
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // If the time is about to reach zero, stop the timer and set timeLeft to 0
          clearInterval(interval);
          setShowTimeUpDialog(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    setTimerInterval(interval);
  };
  

  const stopTimer = () => {
    clearInterval(timerInterval);
  };

  const handleAnswerClick = (selectedOptionIndex) => {
    const updatedUserAnswers = [...userAnswers];
    updatedUserAnswers[currentQuestion] = selectedOptionIndex;
    setUserAnswers(updatedUserAnswers);

    const correctOptionIndex = data[currentQuestion].correct_option - 1;
    if (selectedOptionIndex === correctOptionIndex) {
      setScore(score + 1);
      setCorrectAnswers([...correctAnswers, currentQuestion]);
    } else {
      setIncorrectAnswers([...incorrectAnswers, currentQuestion]);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
    if (userAnswers.length < data.length) {
      setValidationError(true);
      return; // Don't proceed with submission
    }
  
    // Stop the timer
    stopTimer();
  
    // Calculate the result
    const correctOptions = correctAnswers.map((questionIndex) => {
      return data[questionIndex].correct_option - 1;
    });
  
    const incorrectOptions = incorrectAnswers.map((questionIndex) => {
      return userAnswers[questionIndex];
    });
  
    const result = {
      score,
      totalQuestions: data.length,
      correctAnswers,
      incorrectAnswers,
      correctOptions,
      incorrectOptions,
    };
  
    // Set the result and open the dialog
    setQuizResult(result);
    setOpenDialog(true);
  };
  
  const handleRestartQuiz = () => {
    // Reset all quiz-related states to their initial values
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setQuizFinished(false);
    setSubmitted(false);
    setValidationError(false);
    setQuizStarted(false);

    // Clear correct and incorrect answers
    setCorrectAnswers([]);
    setIncorrectAnswers([]);

    // Close the result dialog
    setOpenDialog(false);

    // Restart the timer
    setTimeLeft(50); // Reset the timer to 10 minutes
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
      <div key={index}>
        <FormControlLabel
          control={
            <Radio
              checked={userAnswers[currentQuestion] === index}
              onChange={() => handleAnswerClick(index)}
              value={`${index}`}
              disabled={quizFinished || submitted}
            />
          }
          label={option}
        />
      </div>
    ));
  };

  const renderQuiz = () => {
    if (!quizStarted) {
      return (
        <Container>
          <Typography variant="h4">Quiz has not started yet.</Typography>
          <Button
            variant="contained"
            onClick={() => setQuizStarted(true)}
            style={{ marginTop: '16px' }}
          >
            Start Quiz
          </Button>
        </Container>
      );
    }

    if (showTimeUpDialog) {
      return (
        <Container>
          <Typography variant="h4">Quiz Time Up</Typography>
          <Typography variant="body1">Your time has run out.</Typography>
          {/* <Button
            variant="contained"
            onClick={handleRestartQuiz}
            style={{ marginTop: '16px' }}
          >
            Restart Quiz
          </Button> */}
        </Container>
      );
    }

    if (submitted) {
      return (
        <Container>
          <Typography variant="h4">Quiz Finished</Typography>
          <Typography variant="body1">Your Score: {score} / {data.length}</Typography>
          <Button
            variant="contained"
            onClick={handleRestartQuiz}
            style={{ marginTop: '16px' }}
          >
           <RefreshIcon sx={{marginRight:'2px'}} /> Restart Quiz
          </Button>
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
      return <Typography variant="body1">No questions available for this Module.</Typography>;
    }
  
    const currentMCQ = data[currentQuestion];
  
    return (
      <div style={{ width: '' }}>
        <div className='d-flex'>
          <div style={{ width: '75%' }}>
            <Typography variant="body1" style={{ textAlign: 'left',fontWeight:'bolder',fontSize:'19px' }}>Question {currentQuestion + 1}: {currentMCQ.question}</Typography>
            <Divider style={{ margin: '16px 0' }} />
            <div className="options" style={{ textAlign: 'left' }}>{renderOptions()}</div>
            <div style={{ marginTop: '16px' }}>
              <Button
                variant="contained"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0 || submitted}
                sx={{width:'23%',backgroundColor:'#FFC312',color:'white'}}  >
              <KeyboardDoubleArrowLeftIcon/>Previous
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
                style={{ marginTop: '16px',width:'23%',backgroundColor:'#0fbcf9',float:'right', right:'-30%' }}
              >
                Submit
              </Button>
            )}
          </div>
  
          {/* Pagination */}
          {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginLeft: '50px', height: '30px', float: 'right' }}>
            {Array.from({ length: data.length }, (_, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => setCurrentQuestion(index)}
                disabled={submitted}
              >
                {index + 1}
              </Button>
            ))}
          </div> */}
        </div>

        {/* Timer Display */}
        <Typography variant="h6" style={{ marginTop: '16px' }}>
          Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
        </Typography>
  
        {/* Quiz Result Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="quiz-result-dialog-title"
          fullWidth
          TransitionComponent={Slide}
          transitionDuration={1000}
        >
          <DialogTitle id="quiz-result-dialog-title" sx={{fontWeight:'bolder',color:'#e84393'}}>Quiz Result</DialogTitle>
          <DialogContent>
            {quizResult && (
              <>
                <Typography variant="h6">
                  Your Score: {quizResult.score} / {quizResult.totalQuestions}
                </Typography>
                <Typography variant="h6" sx={{color:'#009432'}}>Correct Options:</Typography>
                <ul style={{color:'#009432'}}>
                  {quizResult.correctOptions.map((optionIndex, questionIndex) => (
                    <li key={questionIndex}>
                      Question {questionIndex + 1}: Option {optionIndex + 1}
                    </li>
                  ))}
                </ul>
                <Typography variant="h6" sx={{color:'#EA2027'}}>Incorrect Options:</Typography>
                <ul style={{color:'#EA2027'}}>
                  {quizResult.incorrectOptions.map((optionIndex, questionIndex) => (
                    <li key={questionIndex}>
                      Question {questionIndex + 1}: Option {optionIndex + 1}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="contained"
                  onClick={handleRestartQuiz}
                  style={{ marginTop: '16px',backgroundColor:'#0984e3' }}
                >
                 <RefreshIcon sx={{marginRight:'2px'}} /> Restart Quiz
                </Button>
              </>
            )}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  };
  

  return (
    <Container style={{ height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div elevation={3} style={{ padding: '10px', width: '100%' }}>
        {renderQuiz()}
      </div>
    </Container>
  );
}

export default ModuleMcq;