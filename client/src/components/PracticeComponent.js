import React, { useState, useEffect } from "react";
import MonacoEditor, { monaco } from "react-monaco-editor";

const PracticeComponent = (props) => {
  const selectedtopic = props.topic;
  const [selectedQuestion, setSelectedQuestion] = useState("low");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("html");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEditorVisible, setIsEditorVisible] = useState(false); // Track editor visibility
  
  useEffect(() => {
    if (language === "css" || language === "javascript") {
      import(
        `monaco-editor/esm/vs/basic-languages/${language}/${language}.contribution.js`
      )
        .then((module) => {
          if (module) {
            monaco.languages.register({ id: language });
            monaco.languages.setMonarchTokensProvider(
              language,
              module.language
            );
            monaco.editor.defineTheme(language, {
              base: "vs-dark",
            });
          }
        })
        .catch((error) => {
          console.error(`Error loading ${language} language support:`, error);
        });
    }
  }, [language]);

  const handlePracticeClick = (type, language) => {
    setSelectedQuestion(type);
    setCode("");
    setResult("");
    setLanguage(language);
  };

  const handleExecuteCode = () => {
    try {
      let execResult = "";
      if (language === "javascript") {
        execResult = eval(code);
      } else if (language === "css" || language === "html") {
        const iframe = document.createElement("iframe");
        document.body.appendChild(iframe);
        iframe.contentDocument.write(
          language === "html"
            ? `<html><body>${code}</body></html>`
            : `<html><head><style>${code}</style></head><body></body></html>`
        );
        iframe.contentDocument.close();
        execResult = iframe.contentDocument.body.innerHTML;
        iframe.remove();
      }

      setResult(execResult);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  function extractArray(inputString) {
    try {
      const parsedData = JSON.parse(inputString);
      if (Array.isArray(parsedData)) {
        return parsedData;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return [];
    }
  }

  const selectedtopicarray = {
    low_test_case: selectedtopic.low_test_case,
    medium_test_case: selectedtopic.medium_test_case,
    hard_test_case: selectedtopic.hard_test_case,
  };

  const extractedLowTestCase = extractArray(selectedtopicarray.low_test_case);
  const extractedMediumTestCase = extractArray(
    selectedtopicarray.medium_test_case
  );
  const extractedHardTestCase = extractArray(selectedtopicarray.hard_test_case);

  console.log("Extracted Low Test Case:", extractedLowTestCase);
  console.log("Extracted Medium Test Case:", extractedMediumTestCase);
  console.log("Extracted Hard Test Case:", extractedHardTestCase);

  const handleNextClick = () => {
    if (currentIndex < extractedLowTestCase.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        marginTop: "5%",
        overflowY: "scroll",
        maxHeight: "400px",
      }}
    >
      <div
        style={{ flex: 1, marginRight: "20px", width: "50%", height: "auto" }}
      >
        <div className="">
          <div className="row justify-content-center mb-5">
            <div className="col-auto">
              <button
                onClick={() => handlePracticeClick("low", "html")}
                className={`btn btn-success`}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                Low
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={() => handlePracticeClick("medium", "javascript")}
                className={`btn btn-warning`}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                Medium
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={() => handlePracticeClick("hard", "css")}
                className={`btn btn-danger`}
                style={{ display: "inline-block", marginRight: "10px" }}
              >
                Hard
              </button>
            </div>
          </div>

          <div
            className=""
            style={{
              borderRadius: "11px",
              backgroundColor: "#ced6e0",
              height: "auto",
              padding: "33px",
            }}
          >
            {selectedQuestion === "low" && (
              <>
                <h2
                  className="text-center mb-3"
                  style={{ fontFamily: "serif", color: "white",fontWeight:'bolder' }}
                >
                  {selectedtopic.topic_name} Practice (Low):
                </h2>
                <p
                  className="text-center"
                  style={{ fontSize: "19px", fontWeight: "bold" }}
                >
                  Question:{selectedtopic.low}
                </p>
                <p
                  className="text-center"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Description: {selectedtopic.low_description}
                </p>
                <div>
                  <h5
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Test Cases:
                  </h5>
                  <p
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Input: {extractedLowTestCase[currentIndex].input}, <br/> Output:{" "}
                    {extractedLowTestCase[currentIndex].output}
                  </p>
                  <button
                    onClick={handlePreviousClick}
                    disabled={currentIndex === 0}
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#FFC312",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={currentIndex === extractedLowTestCase.length - 1}
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#009432",
                      color: "white",
                      marginLeft: "39%",
                      borderRadius: "5px",
                    }}
                  >
                    Next
                  </button>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button
                    onClick={() => handlePracticeClick("low", "html")}
                    className="btn"
                    style={{
                      width: "24%",
                      height: "34px",
                      backgroundColor: "#546de5",
                    }}
                  >
                    Practice
                  </button>
                </div>
                <MonacoEditor
                  width="100%"
                  height="270"
                  language="html"
                  theme="vs-dark"
                  value={code}
                  onChange={(newCode) => setCode(newCode)}
                />
              </>
            )}

            {selectedQuestion === "medium" && (
              <>
                <h2
                  className="text-center mb-3"
                  style={{ fontFamily: "serif", color: "white" ,fontWeight:'bolder'}}
                >
                  {selectedtopic.topic_name} Practice (Medium):
                </h2>
                <p
                  className="text-center"
                  style={{ fontSize: "19px", fontWeight: "bold" }}
                >
                  Question: {selectedtopic.medium}
                </p>
                <p
                  className="text-center"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Description: {selectedtopic.medium_description}
                </p>
                <div>
                  <h5
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Test Cases:
                  </h5>
                  <p
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Input: {extractedMediumTestCase[currentIndex].input}, <br/>
                    Output: {extractedMediumTestCase[currentIndex].output}
                  </p>
                  <button
                    onClick={handlePreviousClick}
                    disabled={currentIndex === 0}
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#FFC312",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={
                      currentIndex === extractedMediumTestCase.length - 1
                    }
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#009432",
                      color: "white",
                      marginLeft: "39%",
                      borderRadius: "5px",
                    }}
                  >
                    Next
                  </button>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button
                    onClick={() => handlePracticeClick("low", "html")}
                    className="btn btn-primary"
                    style={{
                      width: "24%",
                      height: "34px",
                      backgroundColor: "#546de5",
                    }}
                  >
                    Practice
                  </button>
                </div>
                <MonacoEditor
                  width="100%"
                  height="270"
                  language="html"
                  theme="vs-dark"
                  value={code}
                  onChange={(newCode) => setCode(newCode)}
                />
              </>
            )}

            {selectedQuestion === "hard" && (
              <>
                <h2
                  className="text-center mb-3"
                  style={{ fontFamily: "serif", color: "white" ,fontWeight:'bolder'}}
                >
                  Question: {selectedtopic.topic_name} Practice (Hard):
                </h2>
                <p
                  className="text-center"
                  style={{ fontSize: "19px", fontWeight: "bold" }}
                >
                  {selectedtopic.hard}
                </p>
                <p
                  className="text-center"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Description: {selectedtopic.hard_description}
                </p>
                <div>
                  <h5
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Test Cases:
                  </h5>
                  <p
                    className="text-center"
                    style={{ fontSize: "16px", fontWeight: "bold" }}
                  >
                    Input: {extractedHardTestCase[currentIndex].input}, <br/> Output:{" "}
                    {extractedHardTestCase[currentIndex].output}
                  </p>
                  <button
                    onClick={handlePreviousClick}
                    disabled={currentIndex === 0}
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#FFC312",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextClick}
                    disabled={currentIndex === extractedHardTestCase.length - 1}
                    style={{
                      width: "30%",
                      height: "35px",
                      border: "none",
                      backgroundColor: "#009432",
                      color: "white",
                      marginLeft: "39%",
                      borderRadius: "5px",
                    }}
                  >
                    Next
                  </button>
                </div>

                <div className="d-flex justify-content-center mb-3">
                  <button
                    onClick={() => handlePracticeClick("low", "html")}
                    className="btn btn-primary"
                    style={{
                      width: "24%",
                      height: "34px",
                      backgroundColor: "#546de5",
                    }}
                  >
                    Practice
                  </button>
                </div>
                <MonacoEditor
                  width="100%"
                  height="270"
                  language="html"
                  theme="vs-dark"
                  value={code}
                  onChange={(newCode) => setCode(newCode)}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, marginTop: "6%" }}>
        <div
          className="text-center mt-3"
          style={{
            boxShadow: "1px 2px 9px #a55eea",
            borderRadius: "11px",
            backgroundColor: "white",
            height: "auto",
            padding: "40px",
            width: "90%",
          }}
        >
          <button
            onClick={handleExecuteCode}
            className="btn btn-primary"
            style={{ backgroundColor: "#1e90ff" }}
          >
            Execute Code
          </button>

          {result !== "" && (
            <div className="mt-3">
              <h3 className="text-center">Result:</h3>
              <div className="text-center">
                {selectedQuestion === "low" ? (
                  <div dangerouslySetInnerHTML={{ __html: result }} />
                ) : (
                  result
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeComponent;
