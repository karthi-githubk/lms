import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Practise = () => {
  const [level, setLevel] = useState(0);
  const [showCompiler, setShowCompiler] = useState(false);
  const [htmlCode, setHtmlCode] = useState('');

  const questions = [
    {
      level: '',
      data: [
        {
          question: 'Write a basic HTML structure for a webpage.',
          answer: `<!DOCTYPE html>
<html>
<head>
  <title>My Webpage</title>
</head>
<body>
  <h1>Welcome to My Webpage</h1>
  <p>This is a paragraph.</p>
</body>
</html>`
        },
      ]
    },
    {
      level: 'MEDIUM',
      data: [
        {
          question: 'Create an HTML form with input fields for name and email.',
          answer: `<!DOCTYPE html>
<html>
<head>
  <title>Form</title>
</head>
<body>
  <form>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name"><br><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br><br>
    <input type="submit" value="Submit">
  </form>
</body>
</html>`
        },
        {
          question: 'Add an image with the source "image.jpg" and alt text "My Image".',
          answer: `<!DOCTYPE html>
<html>
<head>
  <title>My Webpage</title>
</head>
<body>
  <h1>Welcome to My Webpage</h1>
  <p>This is a paragraph.</p>
  <img src="image.jpg" alt="My Image">
</body>
</html>`
        }
      ]
    },
    // Add more levels and their questions and answers here...
  ];

  const handlePracticeClick = (level, index) => {
    setLevel(index);
    setShowCompiler(true);
    setHtmlCode(questions[level].data[index].answer);
  };

  const handleCodeChange = (event) => {
    setHtmlCode(event.target.value);
  };

  const handleRunClick = () => {
    const iframe = document.getElementById('resultFrame');
    iframe.src = 'about:blank';
    iframe.contentDocument.write(htmlCode);
    iframe.contentDocument.close();
  };

  return (
    <div style={{ marginTop:"1%" }}>
      <div style={{ flex: 1 }}>
        <h4 className='d-flex justify-content-center'>{questions[level].level}</h4>
        {questions[level].data.map((q, index) => (
          <div key={index}>
            <h4 style={{ textAlign: 'center' }}>Question {index + 1}</h4>
            <pre style={{ textAlign: 'center', background: 'white', padding: '10px' }}>
              {q.question}
            </pre>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={() => handlePracticeClick(level, index)} variant="contained" color="primary">
                Practice
              </Button>
            </div>
          </div>
        ))}
      </div>
      {showCompiler && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column',marginTop:"40px" }}>
          <h2 style={{ textAlign: 'center' }}>Compiler:</h2>
          <textarea
            value={htmlCode}
            onChange={handleCodeChange}
            style={{ width: '90%', height: '200px',marginLeft:"5%",boxShadow: '2px 5px 9px #F4AAB9' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <Button onClick={handleRunClick} variant="contained" color="primary" style={{width:"20%",marginTop:"12px"}}>
              Run
            </Button>
          </div>
        </div>
      )}
      {showCompiler && (
        <div style={{ flex: 1, marginLeft: '10px',marginTop:"40px"}}>
          <h2 style={{ textAlign: 'center' }}>Result:</h2>
          <iframe
            id="resultFrame"
            style={{ width: '90%', height: '200px',marginLeft:"5%",  boxShadow: '1px 2px 9px #F4AAB9', }}
          />
        </div>
      )}
    </div>
  );
};

export default Practise;