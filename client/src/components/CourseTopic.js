import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoursefromserver,
  deleteCourseFromServer,
} from "./slices/CourseSlice";
import { Table, Button, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCourseForm from "./UpdateCourseForm";
import ConfirmationModal from "./Confirmationmodal";
import { TextField } from "@mui/material";
import UpdateModuleForm from "./UpdateModuleForm";
import UpdateTopicForm from "./UpdateTopicForm";

const CourseTopic = () => {
  const courses = useSelector((state) => state.courses.coursesList);
  const isLoading = useSelector((state) => state.courses.isLoading);
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(getCoursefromserver());
  }, [dispatch]);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleOpenContentModal = (type, url) => {
    if (type === "pdf") {
      setPdfUrl(url);
      setShowPdfModal(true);
    } else if (type === "video") {
      setVideoUrl(url);
      setShowVideoModal(true);
    }
  };

  const handleCloseContentModal = (type) => {
    if (type === "pdf") {
      setShowPdfModal(false);
    } else if (type === "video") {
      setShowVideoModal(false);
    }
  };
  const handleViewImage = (imageURL) => {
    setImageURL(imageURL);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setImageURL("");
    setShowImageModal(false);
  };
  // Move handleConfirmDelete function outside of handleDeleteCourse
  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteCourseFromServer(courseToDelete.id));
      setSuccessMessage("Course deleted successfully!");
      setShowModal(true);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
    setShowDeleteModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredCourses = courses.filter((course) =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCourse = async (courseId) => {
    setCourseToDelete(courses.find((course) => course.id === courseId));
    setShowDeleteModal(true);
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCourse(null);
    setShowModal(false);
    setSuccessMessage("");
  };

  const handleViewPdf = (pdfUrl) => {
    setPdfUrl(pdfUrl);
    setShowPdfModal(true);
  };

  const handleClosePdfModal = () => {
    setPdfUrl("");
    setShowPdfModal(false);
  };

  const handleViewVideo = (videoUrl) => {
    setVideoUrl(videoUrl);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setVideoUrl("");
    setShowVideoModal(false);
  };

  return (
    <>
      <section
        className=""
        style={{
          marginLeft: "30px",
          boxShadow: '1px 2px 9px #F4AAB9',
          width: "80%",
          marginTop: "10px",
          padding: "20px",
        }}
      >
        <h4
          style={{
            textAlign: "center",
            fontFamily: "",
            fontWeight: "500",
            color: "#e84393",
          }}
        >
          ADD TOPICS
        </h4>
        {/* <TextField
          label="Search by Course Name"
          variant="outlined"
          // fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginBottom: "10px", marginLeft: "470px" }}
        /> */}
        {/* <h4
          style={{
            textAlign: "center",
            fontFamily: "serif",
            fontWeight: "bold",
          }}
        >
          Total Courses: {filteredCourses.length}
        </h4> */}
        <Table striped bordered hover responsive style={{ width: "100%" }}>
          <thead className="text-center">
            <tr>
              <th>Id</th>
              {/* <th>Course Name</th>
              <th>Course Image</th> */}
              {/* <th>Course Description</th> */}
              <th>Module Name</th>
              {/*  <th>Module Description</th> */}
              <th>Topic Name</th>
              {/* <th>Topic Description</th> */}
              <th>PDF</th>
              <th>Video</th>
              {/* <th>Question</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {filteredCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                {/* <td>{course.courseName}</td> */}
                {/* <td>
                  
                  <Button
                    variant="primary"
                    onClick={() => handleViewImage(course.courseImage)}
                  >
                    View Image
                  </Button>
                </td> */}
                {/* <td>{course.courseDescription}</td> */}
                {/* Render the modules, topics, and actions */}
                <td>
                  {course.modules &&
                    course.modules.map((module) => (
                      <div key={module.moduleName}>
                        <div>{module.moduleName}</div>
                      </div>
                    ))}
                </td>
                {/*  <td>
                  {course.modules &&
                    course.modules.map((module) => (
                      <div key={module.moduleName}>
                        <div>{module.moduleDescription}</div>
                      </div>
                    ))}
                </td> */}
                <td>
                  {course.modules &&
                    course.modules.map(
                      (module) =>
                        module.topics &&
                        module.topics.map((topic) => (
                          <div key={topic.topicName}>
                            <div>{topic.topicName}</div>
                          </div>
                        ))
                    )}
                </td>
                {/* <td>
                  {course.modules &&
                    course.modules.map((module) =>
                      module.topics &&
                      module.topics.map((topic) => (
                        <div key={topic.topicName}>
                          <div>{topic.topicDescription}</div>
                        </div>
                      ))
                    )}
                </td> */}
                <td>
                  {course.modules &&
                    course.modules.map(
                      (module) =>
                        module.topics &&
                        module.topics.map((topic) => (
                          <div key={topic.topicName}>
                            {topic.pdf && (
                              <a  closeButton
                                href="#"
                                onClick={() => handleViewPdf(topic.pdf)}
                                style={{textDecoration:"none"}}>
                                View PDF
                              </a>
                            )}
                          </div>
                        ))
                    )}
                </td>
                <td>
                  {course.modules &&
                    course.modules.map(
                      (module) =>
                        module.topics &&
                        module.topics.map((topic) => (
                          <div key={topic.topicName}>
                            {topic.video && (
                              <a  
                                href="#"
                                onClick={() => handleViewVideo(topic.video)}
                                style={{textDecoration:"none"}}
                              >
                                View Video
                              </a>
                            )}
                          </div>
                        ))
                    )}
                </td>
                {/* <td>
                  {course.modules &&
                    course.modules.map((module) =>
                      module.topics &&
                      module.topics.map((topic) =>
                        topic.mcqs &&
                        topic.mcqs.map((mcq, index) => (
                          <div key={index}>
                            <div>{mcq.question}</div>
                            <ul>
                              {mcq.options.map((option, optionIndex) => (
                                <li key={optionIndex}>
                                  {option.option}{" "}
                                  {option.isCorrect && "(Correct)"}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )
                    )}
                </td> */}
                <td>
                  {/* Add edit and delete icons */}
                  <div style={{ display: "flex", textAlign: "center" }}>
                    {/* <FaEdit
                      style={{
                        cursor: "pointer",
                        marginRight: "5px",
                        color: "blue",
                        fontSize: "30px",
                      }}
                      onClick={() => handleOpenModal(course)}
                    /> */}
                    <Button
                      onClick={() => handleOpenModal(course)}
                      style={{ margin: "10px", backgroundColor: "#5352ed",border:"none" }}
                    >
                      Add Topics
                    </Button>
                    {/* <FaTrash
                      style={{
                        cursor: "pointer",
                        color: "red",
                        fontSize: "30px",
                      }}
                      onClick={() => handleDeleteCourse(course.id)}
                    /> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {selectedCourse && (
          <UpdateTopicForm
            show={showModal}
            onHide={handleCloseModal}
            selectedCourse={selectedCourse}
          />
        )}
        {successMessage && (
          <Modal
            show={showModal}
            onHide={handleCloseModal}
            style={{ marginTop: "250px" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>{successMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        {courseToDelete && (
          <ConfirmationModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            message={`Are you sure you want to delete the course "${courseToDelete.courseName}"?`}
          />
        )}
        {/* {showImageModal && (
          <Modal show={showImageModal} onHide={handleCloseImageModal} style={{marginTop:'100px'}}>
            <Modal.Header closeButton>
              <Modal.Title>View Image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={imageURL}
                alt="Course"
                style={{ width: "100%", maxHeight: "400px" }}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseImageModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          
        )} */}
        <Modal
          show={showPdfModal}
          onHide={() => handleCloseContentModal("pdf")}
          style={{ marginTop: "80px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>View PDF</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              src={pdfUrl}
              title="PDF View"
              style={{ width: "100%", height: "500px", border: "none" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleCloseContentModal("pdf")}
              color="primary"
            >
              Close
            </Button>
          </Modal.Footer>
                
        </Modal>
        <Modal
          show={showVideoModal}
          onHide={() => handleCloseContentModal("video")}
          style={{ marginTop: "80px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <video
              controls
              style={{ width: "100%", height: "auto", border: "none" }}
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => handleCloseContentModal("video")}
              color="#00838f"
            >
              Close
            </Button>
          </Modal.Footer>
                
        </Modal>
      </section>
    </>
  );
};

export default CourseTopic;
