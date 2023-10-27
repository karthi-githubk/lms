// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { useHistory } from "react-router-use-history";

// const Newsidenav = ({ children }) => {
//   const history = useHistory();

//   const [name, setname] = useState("");
//   const [user, setuser] = useState([]);

//   const fetchtask = async () => {
//     const response = await fetch("http://localhost:8000/users", {
//       method: "GET",
//     });
//     const users = await response.json();
//     setuser(users);
//     console.log("oh", user);
//   };
//   useEffect(() => {
//     fetchtask();
//   }, []);

//   useEffect(() => {
//     const localname = new URLSearchParams(window.location.search).get("name");
//     setname(localname);
//   });
//   console.log("cN", name);

//   const uniqueCourses = [...new Set(user.map((tas) => tas.coursename))];

//   const uniqueTasks = user.filter(
//     (tas, index, self) =>
//       index === self.findIndex((t) => t.modules === tas.modules)
//   );
//   const filteredTasks = uniqueTasks.filter((tas) =>
//     uniqueCourses.includes(tas.modules)
//   );
//   function filterTasksByTopic(user, coursename) {
//     return user.filter((tas) => tas.coursename === name);
//   }
//   const filteredTasksByModule = filterTasksByTopic(uniqueTasks, name);

//   console.log("FTM", filteredTasksByModule);

//   const handleViewDetails = (module) => {
//     history.push(`/TopicPanel?name=${module}`);
//   };

//   return (
//     <div
//       className="sidebarmain container-Fluid d-inline-flex fixed"
//       style={{ marginTop: "14px", position: "fixed", top: "8%" }}
//     >
//       <div className="sidebar">
//         <div className="top_section">
//           <h3 className="logo">Modules</h3>
//         </div>

//         <div>
//           {filteredTasksByModule.length > 0 && (
//             <div>
//               <h3>{filteredTasksByModule[0].name}</h3>
//               {filteredTasksByModule[0].modules.map((module, index) => (
//                 <NavLink
//                   key={index}
//                   to={`/TopicPanel?name=${module}`}
//                   className="link"
//                   activeClassName="active"
//                 >
//                   <div
//                     className="link_text"
//                     style={{
//                       width: "320px",
//                       fontSize: "23px",
//                       marginLeft: "15%",
//                     }}
//                   >
//                     {module}
//                   </div>
//                 </NavLink>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <main>{children}</main>
//     </div>
//   );
// };

// export default Newsidenav;
