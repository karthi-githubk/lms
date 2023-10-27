import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Dialog, // Import Dialog
  AppBar,
  Toolbar,
  Slide,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import mernImage from "./images/mern.png";
import meanImage from "./images/mean.png";
import fullImage from "./images/full.jpg";
import javaFullImage from "./images/javafull.png";
import pythonFullImage from "./images/pythonfull.png";
import uiux from "./images/uiux.png";
import { Link } from "react-router-dom";
import LoginForm from "./Readmoretab";

function Courses() {
  const courseData = [
    {
      title: "Mern Stack",
      image: mernImage,
      content:
        "The MERN stack is a popular and powerful set of technologies used for building modern web applications. It stands for MongoDB, Express.js, React, and Node.js, representing a full-stack development environment that covers both the front-end and back-end aspects of web development. ",
      buttonText: "Read More",
      description:
        "The MERN stack is a popular and powerful set of technologies used for building modern web applications. It stands for MongoDB, Express.js, React, and Node.js, representing a full-stack development environment that covers both the front-end and back-end aspects of web development.At its core, MongoDB is a NoSQL database that provides a flexible and scalable solution for storing data in a document-oriented format. Express.js is a lightweight web application framework for Node.js, offering tools and utilities to build robust and efficient server-side applications. Node.js, on the other hand, is a server-side JavaScript runtime that allows developers to build scalable and event-driven applications .React, developed by Facebook, is a JavaScript library for building user interfaces. It enables developers to create dynamic and interactive front-end components, making it easier to manage complex UIs and efficiently update the user interface as data changes. React's component-based architecture promotes reusability and maintainability, making it a popular choice for building modern web applications. ",
    },
    {
      title: "Mean Stack",
      image: meanImage,
      content:
        " The MEAN stack, which stands for MongoDB, Express.js, Angular, and Node.js, is a powerful and popular set of technologies that collectively enable the development of modern and dynamic web applications. This full-stack framework covers both the front-end and back-end aspects of web development.",
      buttonText: "Read More",
      description:
        "The MEAN stack, which stands for MongoDB, Express.js, Angular, and Node.js, is a powerful and popular set of technologies that collectively enable the development of modern and dynamic web applications. This full-stack framework covers both the front-end and back-end aspects of web development, providing a seamless and efficient environment for creating robust applications.Angular, a widely-used front-end framework developed and maintained by Google, is responsible for creating dynamic and interactive user interfaces. Its component-based architecture and powerful data binding capabilities empower developers to build complex and responsive front-end applications with ease.The MEAN stacks use of a single language (JavaScript) across the entire application stack promotes code reusability and streamlines the development process. This enables developers to work more efficiently and collaborate seamlessly on both front-end and back-end components. ",
    },
    {
      title: "Full Stack",
      image: fullImage,
      content:
        "A full-stack developer is a versatile and skilled professional who possesses expertise in both front-end and back-end technologies, allowing them to design, develop, and maintain complete web applications or software systems. They also integrate various libraries, frameworks, and tools like React.",
      buttonText: "Read More",
      description:
        "A full-stack developer is a versatile and skilled professional who possesses expertise in both front-end and back-end technologies, allowing them to design, develop, and maintain complete web applications or software systems. On the front-end, they work with languages such as HTML, CSS, and JavaScript to create the user interface and ensure a seamless and visually appealing user experience. They also integrate various libraries, frameworks, and tools like React, Angular, or Vue.js to enhance interactivity and responsiveness.In addition to their technical skills, full-stack developers are often proficient in version control systems, deployment strategies, and cloud technologies to ensure the successful deployment and scalability of their applications. Their ability to work on both ends of the development spectrum makes them valuable assets to small startups, large corporations, or as independent contractors, capable of overseeing the entire development process and adapting to rapidly changing technological landscapes.",
    },
    {
      title: " Java Fullstack",
      image: javaFullImage,
      content:
        "A Java full-stack developer is a proficient professional who possesses expertise in both front-end and back-end development using the Java programming language. They ensure a seamless user experience by implementing responsive designs, interactive elements, and efficient client-server communication. ",
      buttonText: "Read More",
      description:
        "A Java full-stack developer is a proficient professional who possesses expertise in both front-end and back-end development using the Java programming language. On the front-end, they utilize technologies like HTML, CSS, and JavaScript, along with Java-based frameworks such as Spring Boot, to create dynamic and user-friendly interfaces. They ensure a seamless user experience by implementing responsive designs, interactive elements, and efficient client-server communication.Java full-stack developers often integrate various tools, libraries, and APIs to enhance their development process, automate tasks, and improve the scalability of their applications. They are also skilled in deploying applications to cloud platforms and implementing security measures to protect sensitive data. Their ability to navigate both front-end and back-end development using Java makes them valuable assets in creating comprehensive, high-performance web applications or software systems.",
    },
    {
      title: "Python Fullstack",
      image: pythonFullImage,
      content:
        "A Python full-stack developer is a versatile professional with expertise in both front-end and back-end development, utilizing the Python programming language. On the front-end, they leverage technologies such as HTML, CSS, and JavaScript along with Python-based frameworks like Django or Flask. ",
      buttonText: "Read More",
      description:
        "A Python full-stack developer is a versatile professional with expertise in both front-end and back-end development, utilizing the Python programming language. On the front-end, they leverage technologies such as HTML, CSS, and JavaScript along with Python-based frameworks like Django or Flask to create intuitive and visually appealing user interfaces. They focus on crafting responsive designs, seamless interactions, and optimal user experiences.Python full-stack developers are well-versed in integrating third-party libraries, APIs, and services to streamline development and enhance application functionality. They also possess knowledge of deployment strategies and cloud technologies, enabling them to deploy scalable applications to platforms like AWS, Heroku, or Azure. Their comprehensive skill set in both front-end and back-end development using Python makes them capable of delivering end-to-end web solutions that are efficient, maintainable, and user-friendly.",
    },
    {
      title: "UiUx",
      image: uiux,
      content:
        "UI (User Interface) and UX (User Experience) are integral components of modern design, playing a crucial role in creating user-centered and engaging digital experiences. UI focuses on the visual elements of a product, encompassing layout, typography, color schemes, and interactive elements.",
      buttonText: "Read More",
      description:
        "UI (User Interface) and UX (User Experience) are integral components of modern design, playing a crucial role in creating user-centered and engaging digital experiences. UI focuses on the visual elements of a product, encompassing layout, typography, color schemes, and interactive elements. A skilled UI designer strives to craft interfaces that are aesthetically pleasing, intuitive, and aligned with the brand's identity, ensuring that users can easily navigate and interact with the product.UI and UX designers collaborate closely throughout the design process, combining their skills to create a harmonious balance between aesthetics and functionality. The UI design enhances the visual appeal of the product, while the UX design ensures that the product is user-friendly, effective, and aligned with user expectations. Together, they contribute to the creation of digital products that not only look great but also deliver exceptional usability and meaningful interactions, driving positive user experiences and business success.",
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState({
    image: null,
    description: "",
    title:"",
  });

  const handleOpen = (course) => {
    setSelectedCourse({
      image: course.image,
      description: course.description,
      title: course.title,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section style={{ marginTop: "7%" }}>
    <h1
      style={{
        textAlign: "center",
        fontSize: "45px",
        textTransform: "uppercase",
        fontFamily: "Poppins",
      }}
    >
      Featured Courses
    </h1>
    <div className="course-container" style={{ padding: "3rem" }}>
      <Grid container spacing={2}>
        {courseData.map((course, index) => (
          <Grid item xs={4} key={index}>
            <Card className="course-card" style={{ height: "100%" }}>
              <CardMedia
                component="img"
                alt={course.title}
                height="200"
                image={course.image}
                style={{ objectFit: "cover" }}
              />
              <CardContent
                className="card-content"
                style={{ height: "220px" }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  style={{
                    fontWeight: "bold",
                    color: "#76389b",
                    marginBottom: "1rem",
                  }}
                >
                  {course.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text"
                  sx={{ fontSize: "14px" }}
                >
                  {course.content}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className="explore-button"
                  onClick={() => handleOpen(course)}
                  sx={{ marginTop: "1%" }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
    <Dialog
      open={open}
      onClose={handleClose}
      // Use fullScreen to make it full-screen dialog
      maxWidth="sm"
      TransitionComponent={Slide} // Use Slide transition
      transitionDuration={500} // Adjust the animation duration as needed
      transitionDirection="down" // Slide down animation
    >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '500px',
            bgcolor: '#f5f6fa',
            borderRadius:'14px',
            p: 4,
          }}
        >
          <LoginForm/>
          <Button onClick={handleClose} sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem',color:'#ff6b6b' }}>
            
            <CloseIcon/>
          </Button>
        </Box>
      
     
    </Dialog>
  </section>
  );
}

export default Courses;
