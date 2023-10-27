import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import { Tabs, Tab, Slide } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  Select,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const initialState = {
  module_id: "",
  topic_name: "",
  topic_desc: "",
  pdf_file: null,
  video_file: null,
  low: "",
  medium: "",
  hard: "",
  courseOptions: [],
  moduleOptions: [],
  isDialogOpen: false,
  errors: {}, // Store validation errors
};

const AddTask = () => {
  const [state, setState] = useState(initialState);
  const {
    module_id,
    topic_name,
    topic_desc,
    courseOptions,
    moduleOptions,
    pdf_file,
    video_file,
    low,
    medium,
    hard,
    isDialogOpen,
    errors, // Added validation errors state
  } = state;
  const history = useNavigate();
  const { id } = useParams();

  const [modulename, setmodulename] = useState([]);
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0); // Initialize with the first tab
  const [lowPracticeDescription, setLowPracticeDescription] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [mediumPracticeDescription, setMediumPracticeDescription] = useState("");
  const [mediumTestCases, setMediumTestCases] = useState([]);
  const [hardPracticeDescription, setHardPracticeDescription] = useState("");
  const [hardTestCases, setHardTestCases] = useState([]);

  const addTestCase = () => {
    setTestCases([...testCases, ""]); // Add an empty test case
  };

  const updateTestCase = (index, value) => {
    const updatedTestCases = [...testCases];
    updatedTestCases[index] = value;
    setTestCases(updatedTestCases);
  };
  const addMediumTestCase = () => {
    setMediumTestCases([...mediumTestCases, ""]); // Add an empty medium test case
  };

  const updateMediumTestCase = (index, value) => {
    const updatedMediumTestCases = [...mediumTestCases];
    updatedMediumTestCases[index] = value;
    setMediumTestCases(updatedMediumTestCases);
  };
  const addHardTestCase = () => {
    setHardTestCases([...hardTestCases, ""]); // Add an empty hard test case
  };

  const updateHardTestCase = (index, value) => {
    const updatedHardTestCases = [...hardTestCases];
    updatedHardTestCases[index] = value;
    setHardTestCases(updatedHardTestCases);
  };

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const itemName = queryParams.get("name");
    const item = JSON.parse(decodeURIComponent(itemName));
    setmodulename(item);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validation for Topic Name (at least one character)
    if (name === "topic_name" && !/[a-zA-Z]/.test(value)) {
      setState({
        ...state,
        [name]: value,
        errors: { ...errors, topic_name: "Topic Name should contain at least one character." },
      });
      return;
    }

    // Validation for Topic Description (more than 5 words)
    if (name === "topic_desc" && value.split(/\s+/).length <= 5) {
      setState({
        ...state,
        [name]: value,
        errors: { ...errors, topic_desc: "Topic Description should contain more than 5 words." },
      });
      return;
    }

    setState({ ...state, [name]: value, errors: { ...errors, [name]: "" } });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    // Validation for PDF File (file extension)
    if (name === "pdf_file" && files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();
      if (fileExtension !== "pdf") {
        setState({
          ...state,
          [name]: files[0],
          errors: { ...errors, pdf_file: "PDF File should have a .pdf extension." },
        });
        return;
      }
    }

    // Validation for Video File (file extension)
    if (name === "video_file" && files.length > 0) {
      const fileExtension = files[0].name.split(".").pop().toLowerCase();
      if (!["mp4", "avi", "mov"].includes(fileExtension)) {
        setState({
          ...state,
          [name]: files[0],
          errors: {
            ...errors,
            video_file: "Video File should have a supported video file extension (e.g., .mp4, .avi, .mov).",
          },
        });
        return;
      }
    }

    setState({ ...state, [name]: files[0], errors: { ...errors, [name]: "" } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for any validation errors
    for (const key in errors) {
      if (errors[key]) {
        toast.error(errors[key]);
        return;
      }
    }

    const formData = new FormData();
    formData.append("module_id", module_id);
    formData.append("topic_name", topic_name);
    formData.append("topic_desc", topic_desc);
    formData.append("pdf_file", pdf_file);
    formData.append("video_file", video_file);
    formData.append("low", low);
    formData.append("medium", medium);
    formData.append("hard", hard);

    try {
      const response = await axios.post("http://localhost:5000/api/topics/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Topic added successfully!!");

      // Clear form fields after successful submission
      setState({ ...initialState, isDialogOpen: false });
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/modules/get").then((resp) => setState({ ...state, moduleOptions: resp.data }));
  }, []);

  const getTopicDataFromLocalStorage = () => {
    const storedTopicData = localStorage.getItem("topics");
    if (storedTopicData) {
      return JSON.parse(storedTopicData);
    }
    return [];
  };

  const moduleselectedData = getTopicDataFromLocalStorage();

  const handleReset = () => {
    setState(initialState);
  };

  const openDialog = () => {
    setState({ ...state, isDialogOpen: true });
  };

  const closeDialog = () => {
    setState({ ...state, isDialogOpen: false });
  };

  const handleNextTab = () => {
    setSelectedTab((prevTab) => Math.min(prevTab + 1, 2)); // 2 is the total number of tabs
  };
  
  const handlePreviousTab = () => {
    setSelectedTab((prevTab) => Math.max(prevTab - 1, 0));
  };
  

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "-45px", marginRight: "150px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={openDialog}
          startIcon={<AddIcon>add</AddIcon>}
        >
          Add Topic
        </Button>
      </div>

      <Container
        maxWidth="md"
        style={{
          marginLeft: "450px",
        }}
      >
        {/* Add Topic Dialog */}
       




          <Dialog open={isDialogOpen} onClose={closeDialog} aria-labelledby="add-topic-dialog-title"  fullWidth
          maxWidth="lg" 
          TransitionComponent={Slide}
          PaperProps={{
            style: {
              maxHeight: '60%', // Adjust the percentage as needed
            }}}>
          <h3 style={{textAlign:'center', textTransform:'uppercase',color:'#e84393',}}>Add  Topic</h3>
  <DialogContent>
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="Topic Information" />
        <Tab label="Materials" />
        <Tab label="Practice Test" />
      </Tabs>

      {selectedTab === 0 && (
        <div>
        <Grid item xs={12}>
  <FormControl fullWidth style={{ padding: '8px' }}>
    <InputLabel htmlFor="module_id">
      Module Name<span style={{ color: "red" }}>*</span>
    </InputLabel> 
    <Select
      native
      id="module_id"
      name="module_id"
      value={module_id}
      onChange={handleInputChange}
      required
    >
      
      {moduleOptions
        .filter(
          (module) =>
            moduleselectedData.module_name === module.module_name &&
            module.course_id === moduleselectedData.course_id
        )
        .map((module) => (
          <option key={module.id} value={module.id}>
            {module.module_name}
          </option>
        ))}
    </Select>
  </FormControl>
</Grid>
<Grid item xs={12}>
  <TextField
    fullWidth
    id="topic_name"
    name="topic_name"
    label="Topic Name"
    value={topic_name}
    onChange={handleInputChange}
    required
    style={{ padding: '8px' }}
  />
  <Typography variant="body2" color="error">
    {errors.topic_name}
  </Typography>
</Grid>

<Grid item xs={12}>
  <TextField
    fullWidth
    multiline
    id="topic_desc"
    name="topic_desc"
    label="Topic Description"
    value={topic_desc}
    onChange={handleInputChange}
    required
    style={{ padding: '8px' }}
  />
  <Typography variant="body2" color="error">
    {errors.topic_desc}
  </Typography>
</Grid>

          {/* ... */}
          <div style={{ marginTop: "16px" }}>
            <Button
              disabled={selectedTab === 0}
              onClick={handlePreviousTab}
              variant="outlined"
              color="primary"
            >
              Previous
            </Button>
            <Button
              disabled={selectedTab === 2}
              onClick={handleNextTab}
              variant="contained"
              color="primary"
              style={{ marginLeft: "16px" }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {selectedTab === 1 && (
        <div>
        <Grid item xs={12} style={{ padding: '8px' }}>
  <input
    type="file"
    id="pdf_file"
    name="pdf_file"
    accept=".pdf"
    onChange={handleFileChange}
    required
  />
  <label htmlFor="pdf_file" style={{ marginLeft: '8px' }}>
    PDF File<span style={{ color: "red" }}>*</span>
  </label>
  <Typography variant="body2" color="error" style={{ marginLeft: '8px' }}>
    {errors.pdf_file}
  </Typography>
</Grid>

<Grid item xs={12} style={{ padding: '8px' }}>
  <input
    type="file"
    id="video_file"
    name="video_file"
    accept="video/*"
    onChange={handleFileChange}
    required
  />
  <label htmlFor="video_file" style={{ marginLeft: '8px' }}>
    Video File<span style={{ color: "red" }}>*</span>
  </label>
  <Typography variant="body2" color="error" style={{ marginLeft: '8px' }}>
    {errors.video_file}
  </Typography>
</Grid>

          {/* ... */}
          <div style={{ marginTop: "16px" }}>
            <Button
              disabled={selectedTab === 0}
              onClick={handlePreviousTab}
              variant="outlined"
              color="primary"
            >
              Previous
            </Button>
            <Button
              disabled={selectedTab === 2}
              onClick={handleNextTab}
              variant="contained"
              color="primary"
              style={{ marginLeft: "16px" }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      
      {selectedTab === 2 && (
        <div>
        

      <Accordion style={{ margin: "10px" }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="low-content" id="low-header">
    <Typography>Low</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* Content for the "Low" section */}
    <Grid container spacing={3}>
    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id="low"
        name="low"
        label="Low"
        value={low}
        onChange={handleInputChange}
      />
    </Grid>

    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id="lowPracticeDescription"
        name="lowPracticeDescription"
        label="Low Practice Description"
        onChange={handleInputChange}
      />
    </Grid>

    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <Button variant="contained" color="primary" onClick={addTestCase}>
        Add Test Case
      </Button>
    </Grid>
  </Grid>

  {testCases.map((testCase, index) => (
    <Grid item xs={12} sm={4} key={index} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id={`testCase${index}`}
        name={`testCase${index}`}
        label={`Test Case ${index + 1}`}
        value={testCase}
        onChange={(e) => updateTestCase(index, e.target.value)}
      />
    </Grid>
  ))}
  </AccordionDetails>
</Accordion>

<Accordion style={{ margin: "10px" }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="medium-content" id="medium-header">
    <Typography>Medium</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* Content for the "Medium" section */}
    <Grid container spacing={3}>
        <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
          <TextField
            fullWidth
            id="medium"
            name="medium"
            label="Medium"
            value={medium}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
          <TextField
            fullWidth
            id="mediumPracticeDescription"
            name="mediumPracticeDescription"
            label="Medium Practice Description"
            value={mediumPracticeDescription}
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
          <Button variant="contained" color="primary" onClick={addMediumTestCase}>
            Add Medium Test Case
          </Button>
        </Grid>
      </Grid>

      {mediumTestCases.map((testCase, index) => (
        <Grid item xs={12} sm={4} key={index} style={{ padding: "10px" }}>
          <TextField
            fullWidth
            id={`mediumTestCase${index}`}
            name={`mediumTestCase${index}`}
            label={`Medium Test Case ${index + 1}`}
            value={testCase}
            onChange={(e) => updateMediumTestCase(index, e.target.value)}
          />
        </Grid>
      ))}
    </AccordionDetails>
</Accordion>

<Accordion style={{ margin: "10px" }}>
  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="hard-content" id="hard-header">
    <Typography>Hard</Typography>
  </AccordionSummary>
  <AccordionDetails>
    {/* Content for the "Hard" section */}
    <Grid container spacing={3}>
    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id="hard"
        name="hard"
        label="Hard"
        value={hard}
        onChange={handleInputChange}
      />
    </Grid>

    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id="hardPracticeDescription"
        name="hardPracticeDescription"
        label="Hard Practice Description"
        value={hardPracticeDescription}
        onChange={handleInputChange}
      />
    </Grid>

    <Grid item xs={12} sm={4} style={{ padding: "10px" }}>
      <Button variant="contained" color="primary" onClick={addHardTestCase}>
        Add Hard Test Case
      </Button>
    </Grid>
  </Grid>

  {hardTestCases.map((testCase, index) => (
    <Grid item xs={12} sm={4} key={index} style={{ padding: "10px" }}>
      <TextField
        fullWidth
        id={`hardTestCase${index}`}
        name={`hardTestCase${index}`}
        label={`Hard Test Case ${index + 1}`}
        value={testCase}
        onChange={(e) => updateHardTestCase(index, e.target.value)}
      />
    </Grid>
  ))}
    </AccordionDetails>
</Accordion>

      

      
          {/* ... */}
          <div style={{ marginTop: "16px",padding:"10px" }}>
            <Button
              disabled={selectedTab === 0}
              onClick={handlePreviousTab}
              variant="outlined"
              color="primary"
            >
              Previous
            </Button>
            <Button
              disabled={selectedTab === 2}
              onClick={handleNextTab}
              variant="contained"
              color="primary"
              style={{ marginLeft: "16px" }}
            >
              Next
            </Button>
            <div style={{ marginTop: "16px" }}>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
          </div>
        </div>
      )}
      

      {/* Rest of your form fields */}
      {/* ... */}
    </form>
  </DialogContent>
</Dialog>







            
         

        <ToastContainer />
      </Container>
    </div>
  );
};

export default AddTask;