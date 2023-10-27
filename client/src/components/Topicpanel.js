// // import React, { useEffect, useState } from "react";
// // import { NavLink } from "react-router-dom";
// // import { useHistory } from "react-router-use-history";

// // const Topicpanel = ({ children }) => {
// //   const history = useHistory();

// //   const [name, setname] = useState("");
// //   const [user, setuser] = useState([]);
// //   const [topics, settopics] = useState([]);

// //   const fetchtask = async () => {
// //     const response = await fetch("http://localhost:8000/users", {
// //       method: "GET",
// //     });
// //     const users = await response.json();
// //     setuser(users);
// //     console.log("oh", users);
// //   };

// //   useEffect(() => {
// //     fetchtask();
// //     const localname = new URLSearchParams(window.location.search).get("name");
// //     setname(localname);
// //   }, []);

 

// //   useEffect(() => {
// //     // Filter the topics based on the selected module (name)
// //     if (user.length > 0 && name) {
// //       const selectedModule = user.find((user) => user.modules === name);
// //       if (selectedModule) {
// //         settopics(selectedModule.topics || []);
// //       }
// //     }
// //   }, [user, name]);

// //   return (
// //     <div
// //       className="sidebarmain container-Fluid d-inline-flex fixed"
// //       style={{ marginTop: "14px", position: "fixed", top: "8%" }}
// //     >
// //       <div className="sidebar">
// //         <div className="top_section">
// //           <h3 className="logo">Topics</h3>
// //         </div>

// //         <div>
// //           {topics.length > 0 && ( 
// //             <div>
// //               <h3>{name}</h3>
// //               {user.map((topics, index) => (
// //                 <NavLink
// //                   key={index}
// //                   to={`/TopicPanel?name=${topics}`}
// //                   className="link"
// //                   activeClassName="active"
// //                 >
// //                   <div
// //                     className="link_text"
// //                     style={{
// //                       width: "320px",
// //                       fontSize: "23px",
// //                       marginLeft: "15%",
// //                     }}
// //                   >
// //                     {topics}
// //                   </div>
// //                 </NavLink>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <main>{children}</main>
// //     </div>
// //   );
// // };

// // export default Topicpanel;

// import React from 'react'
// import { useEffect } from 'react';
// import { useState } from 'react';

// function TopicPanel() {

// const [name,setname]=useState('')
// const [user,setuser]=useState([])
// const [topics,settopics]=useState('')


// const fetchtask = async () => {
//     const response = await fetch("http://localhost:8000/users", { method: "GET" })
//     const user = await response.json();
//     setuser(user)
//     console.log("ohm", user);
//   }
//   useEffect(() => {
//     fetchtask();
//   },[])

//     useEffect(() => {
//         const localname = new URLSearchParams(window.location.search).get("name");
//         setname(localname);
//       })
//       console.log(name);
      
//   return (
//     <div>
       
//         <div style={{display:'flex'}}>
//         <div style={{width:'200px',height:'630px',marginTop:"200px",background:' rgba(214, 0, 232, 1)'}}>
//       {user.map((tas, ind) => (
//          <div style={{fontSize:'25px',fontWeight:'bold',paddingTop:'30px'}} onClick={() => settopics(tas.topics)} value={tas.topics}>{tas.topics}</div>
//       ))}
//       </div>



// {user.map((tas, ind) => (
//     topics == tas.topics ?
//       <center>
//         <div style={{ border: "0px solid #a300e8",boxShadow:'2px 2px 10px #a300e8', width: "70%", marginLeft: "200px", marginTop: "20px", padding: "50px", textAlign: "justify" }}>
//           <h1>{tas.topics}</h1>{tas.def}
//           <div style={{display:'flex'}}>
//             <object data=
//               {tas.videoFile}
//               width="500"
//               height="300">
//             </object> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <object data=
//               {tas.Pdf}
//               width="250"
//               height="300">
//             </object>
            
//           </div>
//         </div>
//       </center> : ""
      
//   ))}
//     </div>
//     </div>






//   )
// }

// export default TopicPanel;
