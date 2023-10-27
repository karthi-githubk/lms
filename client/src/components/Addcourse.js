import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Box,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const AddCourse = () => {
  const [course, setCourse] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [choices, setChoices] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    let errors = {};
    let isValid = true;

    if (course.trim() === "") {
      errors.course = "Course selection is required";
      isValid = false;
    }

    if (!pdfFile) {
      errors.pdfFile = "PDF file is required";
      isValid = false;
    }

    if (!videoFile) {
      errors.videoFile = "Video file is required";
      isValid = false;
    }

    if (questions.some((question) => question.trim() === "")) {
      errors.questions = "All questions must be filled";
      isValid = false;
    }

    if (mcqs.some((mcq) => mcq.trim() === "")) {
      errors.mcqs = "All MCQs must be filled";
      isValid = false;
    }

    if (
      choices.some((choiceGroup) =>
        choiceGroup.some((choice) => choice.trim() === "")
      )
    ) {
      errors.choices = "All choices must be filled";
      isValid = false;
    }

    if (modules.some((module) => module.trim() === "")) {
      errors.modules = "All modules must be filled";
      isValid = false;
    }

    if (topics.some((topic) => topic.trim() === "")) {
      errors.topics = "All topics must be filled";
      isValid = false;
    }

    setErrors(errors);

    if (isValid) {
      // Form submission logic goes here
      const courseEntry = {
        course,
        pdfFile,
        videoFile,
        module: selectedModule,
        topic: selectedTopic,
        questions,
        mcqs,
        choices,
      };

      if (editingIndex !== null) {
        // Editing existing entry
        const updatedCourseData = [...courseData];
        updatedCourseData[editingIndex] = courseEntry;
        setCourseData(updatedCourseData);
        setSuccessMessage("Form updated successfully");
      } else {
        // Adding new entry
        setCourseData([...courseData, courseEntry]);
        setSuccessMessage("Form submitted successfully");
      }

      // Reset form fields
      setCourse("");
      setPdfFile(null);
      setVideoFile(null);
      setSelectedModule("");
      setSelectedTopic("");
      setQuestions([]);
      setMcqs([]);
      setChoices([]);
      setEditingIndex(null);
    }
  };

  const handlePdfFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleVideoFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleMcqChange = (index, e) => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[index] = e.target.value;
    setMcqs(updatedMcqs);
  };

  const handleChoiceChange = (mcqIndex, choiceIndex, e) => {
    const updatedChoices = [...choices];
    updatedChoices[mcqIndex][choiceIndex] = e.target.value;
    setChoices(updatedChoices);
  };

  const addQuestion = () => {
    setQuestions([...questions, ""]);
    setChoices([...choices, []]);
  };

  const addMcq = () => {
    setMcqs([...mcqs, ""]);
    setChoices([...choices, []]);
  };

  const addChoice = (mcqIndex) => {
    const updatedChoices = [...choices];
    updatedChoices[mcqIndex].push("");
    setChoices(updatedChoices);
  };

  const addModule = (e) => {
    e.preventDefault();
    const updatedModules = [...modules];
    updatedModules.push("");
    setModules(updatedModules);
  };

  const addTopic = (e) => {
    e.preventDefault();
    const updatedTopics = [...topics];
    updatedTopics.push("");
    setTopics(updatedTopics);
  };

  const editCourseEntry = (index) => {
    const entry = courseData[index];
    setCourse(entry.course);
    setPdfFile(entry.pdfFile);
    setVideoFile(entry.videoFile);
    setSelectedModule(entry.module);
    setSelectedTopic(entry.topic);
    setQuestions(entry.questions);
    setMcqs(entry.mcqs);
    setChoices(entry.choices);
    setEditingIndex(index);
  };

  const deleteCourseEntry = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this entry?"
    );
    if (confirmDelete) {
      const updatedCourseData = [...courseData];
      updatedCourseData.splice(index, 1);
      setCourseData(updatedCourseData);
      setSuccessMessage("Entry deleted successfully.");
    }
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
    setSelectedTopic("");
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  return (
    <div className="courseform">
      <div>
        <h3>Add Course</h3>
        <Box
          sx={{
            width: "1000px",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <div className="d-flex"></div>
          <InputLabel>Course Selection</InputLabel>
          <FormControl fullWidth margin="normal" error={!!errors.course}>
            <TextField
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Enter Course Name"
            />
            {errors.course && <FormHelperText>{errors.course}</FormHelperText>}
          </FormControl>

          <div className="d-flex materialss">
            <div style={{ height: "50px" }}>
              <InputLabel>Add PDF Material</InputLabel>
              <FormControl fullWidth margin="normal" error={!!errors.pdfFile}>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfFileChange}
                />
                {errors.pdfFile && (
                  <FormHelperText>{errors.pdfFile}</FormHelperText>
                )}
              </FormControl>
            </div>

            <div style={{ height: "50px" }}>
              <InputLabel>Add Video Material</InputLabel>
              <FormControl fullWidth margin="normal" error={!!errors.videoFile}>
                <input
                  type="file"
                  accept=".mp4,.avi"
                  onChange={handleVideoFileChange}
                />
                {errors.videoFile && (
                  <FormHelperText>{errors.videoFile}</FormHelperText>
                )}
              </FormControl>
            </div>
          </div>

          <InputLabel>Modules</InputLabel>
          <FormControl fullWidth margin="normal">
            {modules.map((module, index) => (
              <div key={index}>
                <TextField
                  label={`Module ${index + 1}`}
                  value={module}
                  onChange={(e) => {
                    const updatedModules = [...modules];
                    updatedModules[index] = e.target.value;
                    setModules(updatedModules);
                  }}
                  error={!!errors.modules}
                />
              </div>
            ))}
            {errors.modules && (
              <FormHelperText>{errors.modules}</FormHelperText>
            )}
            <Button variant="outlined" onClick={addModule}>
              Add Module
            </Button>
          </FormControl>

          <InputLabel>Topics</InputLabel>
          <FormControl fullWidth margin="normal">
            {topics.map((topic, index) => (
              <div key={index}>
                <TextField
                  label={`Topic ${index + 1}`}
                  value={topic}
                  onChange={(e) => {
                    const updatedTopics = [...topics];
                    updatedTopics[index] = e.target.value;
                    setTopics(updatedTopics);
                  }}
                  error={!!errors.topics}
                />
              </div>
            ))}
            {errors.topics && <FormHelperText>{errors.topics}</FormHelperText>}
            <Button variant="outlined" onClick={addTopic}>
              Add Topic
            </Button>
          </FormControl>

          <InputLabel>Module Selection</InputLabel>
          <FormControl fullWidth margin="normal">
            <Select value={selectedModule} onChange={handleModuleChange}>
              <MenuItem value="">Select Module</MenuItem>
              {modules.map((module, index) => (
                <MenuItem key={index} value={module}>
                  {module}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel>Topic Selection</InputLabel>
          <FormControl fullWidth margin="normal">
            <Select value={selectedTopic} onChange={handleTopicChange}>
              <MenuItem value="">Select Topic</MenuItem>
              {topics.map((topic, index) => (
                <MenuItem key={index} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel>Questions</InputLabel>
          <FormControl fullWidth margin="normal">
            {questions.map((question, index) => (
              <TextField
                key={index}
                label={`Question ${index + 1}`}
                value={question}
                onChange={(e) => handleQuestionChange(index, e)}
                error={!!errors.questions}
              />
            ))}
            {errors.questions && (
              <FormHelperText>{errors.questions}</FormHelperText>
            )}
            <Button variant="outlined" onClick={addQuestion}>
              Add Question
            </Button>
          </FormControl>

          <InputLabel>Multiple-Choice Questions (MCQs)</InputLabel>
          <FormControl fullWidth margin="normal">
            {mcqs.map((mcq, mcqIndex) => (
              <div key={mcqIndex}>
                <TextField
                  label={`MCQ ${mcqIndex + 1}`}
                  value={mcq}
                  onChange={(e) => handleMcqChange(mcqIndex, e)}
                  error={!!errors.mcqs}
                />
                {choices[mcqIndex]?.map((choice, choiceIndex) => (
                  <TextField
                    key={choiceIndex}
                    label={`Choice ${choiceIndex + 1}`}
                    value={choice}
                    onChange={(e) =>
                      handleChoiceChange(mcqIndex, choiceIndex, e)
                    }
                  />
                ))}
                <Button variant="outlined" onClick={() => addChoice(mcqIndex)}>
                  Add Choice
                </Button>
              </div>
            ))}
            {errors.mcqs && <FormHelperText>{errors.mcqs}</FormHelperText>}
            {errors.choices && (
              <FormHelperText>{errors.choices}</FormHelperText>
            )}
            <Button variant="outlined" onClick={addMcq}>
              Add MCQ
            </Button>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={handleSubmit}
          >
            {editingIndex !== null ? "Save" : "Submit"}
          </Button>
        </Box>
      </div>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <div className="usertable">
        <h2 className="d-flex">Course Data</h2>
        <TableContainer component={Box} sx={{ border: "2px solid black" }}>
          <Table size="small" sx={{ borderCollapse: "collapse" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Course
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  PDF File
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Video File
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Module
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Topic
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Questions
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  MCQs
                </TableCell>
                <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseData.map((courseEntry, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.course}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.pdfFile?.name}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.videoFile?.name}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.module}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.topic}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.questions.join(", ")}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    {courseEntry.mcqs.join(", ")}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", padding: "8px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => editCourseEntry(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => deleteCourseEntry(index)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AddCourse;
