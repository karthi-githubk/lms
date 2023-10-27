// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { CircularProgress } from "@mui/material"; // Import CircularProgress for loading state

// function NewCourseDescription() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourseById = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/course/get/${id}`);
//         setCourse(response.data[0]);
//         setLoading(false); // Set loading to false when data is fetched
//       } catch (error) {
//         console.error(error);
//         setLoading(false); // Set loading to false on error
//       }
//     };

//     fetchCourseById();
//   }, [id]);

//   if (loading) {
//     // Show a loading indicator while fetching data
//     return (
//       <div className="text-center">
//         <CircularProgress />
//       </div>
//     );
//   }

//   if (!course) {
//     return <div>Course not found</div>;
//   }

//   return (
//     <div className="" style={{ marginLeft: "100px", marginTop: "7%" }}>
//       <h1
//         className="text-center"
//         style={{
//           textTransform: "uppercase",
//           fontSize: "35px",
//           color: "#e84393",
//         }}
//       >
//         {course.coursename}
//       </h1>

//       <br />
//       <br />
//       <div
//         className="row"
//         style={{ boxShadow: "1px 2px 1px #F4AAB9", borderRadius: "12px" }}
//       >
//         <div className="col-8">
//           <p
//             style={{
//               fontSize: "21px",
//               textAlign: "justify",
//               padding: "10px",
//               lineHeight: "1.5",
//               fontFamily: "Poppins",
//             }}
//           >
//             {course.course_desc}
//           </p>
//         </div>
//         <div className="col-4">
//           <img
//             src={`http://localhost:5000/${course.courseimg}`} // Update the image source URL
//             alt={course.coursename}
//             style={{
//               width: "100%",
//               height: "300px",
//               padding: "10px",
//               pointerEvents: "none",
//               transition: "none",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NewCourseDescription;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material"; // Import CircularProgress for loading state
import { useMediaQuery } from 'react-responsive';

function NewCourseDescription() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const breakpoints = {
    mobile: '(max-width: 767px)',
    desktop: '(min-width: 768px)',
  };

  const isMobileScreen = useMediaQuery({ query: breakpoints.mobile });
  const isDesktopScreen = useMediaQuery({ query: breakpoints.desktop });

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/get/${id}`);
        setCourse(response.data[0]);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchCourseById();
  }, [id]);

  if (loading) {
    // Show a loading indicator while fetching data
    return (
      <div className="text-center">
        <CircularProgress />
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="" style={{ marginLeft: "100px", marginTop: "7%" }}>
      <h1
        className="text-center"
        style={{
          textTransform: "uppercase",
          fontSize: isMobileScreen ? "24px" : "35px",
          color: "#e84393",
        }}
      >
        {course.coursename}
      </h1>

      <div
        className="row"
        style={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          flexDirection: isMobileScreen ? "column" : "row",
          height:'350px',
          overflowY:'scroll',
          marginTop:'14px'
        }}
      >
        <div className={isMobileScreen ? "col-12" : "col-4"}>
          <p
            style={{
              fontSize: "21px",
              textAlign: "justify",
              padding: "10px",
              lineHeight: "1.5",
              fontFamily: "Poppins",
            }}
          >
            {course.course_desc}
          </p>
        </div>
        <div className={isMobileScreen ? "col-12" : "col-8"}>
          <img
            src={`http://localhost:5000/${course.courseimg}`} // Update the image source URL
            alt={course.coursename}
            style={{
              width: "100%",
              height: isMobileScreen ? "auto" : "300px",
              padding: "10px",
              marginTop:'3%',
              pointerEvents: "none",
              transition: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default NewCourseDescription;
