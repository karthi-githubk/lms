import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Router, Link } from "react-router-dom";
import Userpanel from "./components/Userpanel";
import Adminpanel from "./components/Adminpanel";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Footer from "./components/Footer";
import Userpanelnav from "./components/Userpanelnav";
import Userhome from "./components/Userhome";
import Usercourse from "./components/Usercourse";
import Userhtml from "./components/Userhtml";
import Sidebar from "./components/Usersidenav";
import Coursetab from "./components/Coursetab";
import Htmlsidebar from "./components/Htmlsidebar";
import Htmltopics from "./components/Htmltopics";
import Htmlhead from "./components/Htmlhead";
import Htmlstyle from "./components/Htmlstyle";
import Htmlclass from "./components/Htmlclass";
import Htmlid from "./components/Htmlid";
import Htmllist from "./components/Htmllist";
import Htmllink from "./components/Htmllink";
import Htmlcolor from "./components/Htmlcolor";
import Htmlsvg from "./components/Htmlsvg";
import Csssidebar from "./components/Csssidebar";
import CSStopics from "./components/Csstopics";
import Usercss from "./components/Usercss";
import Userjs from "./components/Userjs";
import Jstopics from "./components/Jstopics";
import Jssidebar from "./components/Jssidebar";
import LoginForm from "./components/Loginform";
import Startlearn from "./components/Startlearn";
import Adminpanelnav from "./components/Adminpanelnav";
import Adminsidenav from "./components/Adminsidenav";
import Coursemanage from "./components/Coursemanage";
import Usermanage from "./components/Usermanage";
import Admincards from "./components/Admincards";
import Courseform from "./components/Courseform";
import Userform from "./components/Userform";
import Newcourse from "./components/Newcourse";
import Newsidenav from "./components/Newsidenav";
import Newtopicnav from "./components/Newtopicnav";
import { useState } from "react";
import Breadcrumb from "./components/Breadcrumb";
import CardsCourse from "./components/Cardcourse";
import Course from "./components/course";
import TopicPanel from "./components/Topicpanel";
import AddCourseForm from "./components/Courseform";
import NewCourseTable from "./components/Coursemanage";
import Courses11 from "./components/course";
import Addcoursecomponents from "./components/Addcoursecomponents";
import AddPythonFullStackComponent from "./components/AddPythonFullStackComponent";
import UserHtml1 from "./components/Usehtml";
import Tabletab from "./components/Tabletab";
import TopicsForm from "./components/TopicsForm";
import CourseTable from "./components/Coursemanage";
import Existingtab from "./components/Existingtab";
import AddNewModuleComponent from "./components/AddNewModuleComponent";
import AddTopicComponent from "./components/AddTopicComponent";
import Adduser from "./components/Adduser";
import Addupdate from "./components/Addupdate";
import View from "./components/View";
import UpdateCourseForm from "./components/UpdateCourseForm";
import UpdateModuleForm from "./components/UpdateModuleForm";
import ViewCourse from "./components/ViewCourse";
import ViewModule from "./components/ViewModule";
import UpdateTopicForm from "./components/UpdateTopicForm";
import UpdateMcqForm from "./components/UpdateMcqForm";
import Cardcourse from "./components/Cardcourse";
import NewCourseDescription from "./components/NewCourseDescription";
import TopicSideNav from "./components/TopicSideNav";
import UserLoginpage from "./components/UserLoginPage";
import AdminHome from "./components/AdminHome";
import BreadcrumbUser from "./components/BreadcrumbUser";
import { useParams } from "react-router-dom";
import LabTabs from "./components/tabs";
import Readmoretab from "./components/Readmoretab";
import { Navbar } from "react-bootstrap";
import CourseDash from "./components/CourseDash";
import ViewallModules from "./components/ViewAllModules";
import ViewAllTopics from "./components/ViewAllTopics";
import ViewAllMcq from "./components/ViewAllMcq";
import TableBoth from "./components/TableBoth";
import Dynamic from "./components/Dynamic";
import ViewAllModuleMcq from "./components/ViewAllModuleMcq";


function App() {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { text: "Dashboard", url: "/adminpanel" },
    { text: "Coursemanage", url: "/admin/Coursemanage" },
    { text: "Forms", url: "/admin/courseform" },

  ]);

  const [breadcrumbItems1, setBreadcrumbItems1] = useState([
    { text: "COURSEMANAGEMENT", url: "/admin/Coursemanage" },
    { text: "COURSEFORM", url: "/admin/courseform" },
  ]);

  const [breadcrumbItems2, setBreadcrumbItems2] = useState([
    { text: "USERDATA", url: "/admin/Coursemanage" },
    { text: "USERFORM", url: "/admin/courseform" },
  ]);

  const [breadcrumbItems3, setBreadcrumbItems3] = useState([
    { text: "Usermanage", url: "/admin/usermanage" },
    { text: "Existing users", url: "/admin/Coursemanage" },
    { text: "Userform", url: "/admin/courseform" },
  ]);

  const [breadcrumbItems4, setBreadcrumbItems4] = useState([
    { text: "Home", url: "/userhome" },
    { text: "Course", url: "/course" },
    { text: "Modules", url: "/userpython" },
    { text: "Topics", url: "/usehtml11" },
  ]);

  const [breadcrumbItems5, setBreadcrumbItems5] = useState([
    { text: "Usermanage", url: "/admin/usermanage" },
    { text: "Existing users", url: "/course" },
  ]);

  const [breadcrumbItems6, setBreadcrumbItems6] = useState([
    { text: "Dashboard", url: "/adminpanel" },
    { text: "Coursermanage", url: "/admin/Coursemanage" },
    { text: "Existing Course", url: "/course" },
  ]);

  const [breadcrumbItems7, setBreadcrumbItems7] = useState([
    { text: "Dashboard", url: "/adminpanel" },
    { text: "Coursermanage", url: "/admin/Coursemanage" },
    { text: "Courses", url: "/course" },
    { text: "Update Course", url: "/courseUpdate" },
  ]);



  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route exact path='/' element={<NavBar/>}/> */}
          <Route
            exact
            path="/"
            element={[<NavBar />, <Home />, <Courses />, <Footer />]}
          />

          <Route path="/featured" element={[<NavBar />, <Courses />]} />

          <Route path="/contact" element={[<NavBar />, <Footer/>]} />


          <Route exact path="/Userpanel" element={<Userpanel />} />
          <Route exact path="/Adminpanel" element={<Adminpanel />} />

          {/*userhome---routing------*/}
          {/* Routing for User pages */}
          {/* <Route path='/explorecourse' element={<Courses/>}/> */}
          {/* <Route path='/startlearn' element={<Startlearn/>}/> */}

          <Route path="/userhome" element={[<Userpanelnav />, <Userhome />]} />
          {/* <Route path='/courses' element={[<Userpanelnav/>,<Usercourse/>]}/> */}
          <Route
            path="/mern"
            element={[<Userpanelnav />, <Sidebar />, <Usercourse />]}
          />

          <Route
            path="/html"
            element={[<Userpanelnav />, <Sidebar />, <Userhtml />]}
          />

          <Route
            path="/html/topic"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmltopics />]}
          />
          <Route
            path="/html/head"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlhead />]}
          />
          <Route
            path="/html/style"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlstyle />]}
          />
          <Route
            path="/html/class"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlclass />]}
          />
          <Route
            path="/html/id"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlid />]}
          />
          <Route
            path="/html/list"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmllist />]}
          />
          <Route
            path="/html/link"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmllink />]}
          />
          <Route
            path="/html/color"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlcolor />]}
          />
          <Route
            path="/html/svg"
            element={[<Userpanelnav />, <Htmlsidebar />, <Htmlsvg />]}
          />

          {/*-----------CSS-----------route----------*/}

          <Route
            path="/css"
            element={[<Userpanelnav />, <Sidebar />, <Usercss />]}
          />
          <Route
            path="/css/topic"
            element={[<Userpanelnav />, <Csssidebar />, <CSStopics />]}
          />

          {/*---------------------js route---------------------*/}

          <Route
            path="/javascript"
            element={[<Userpanelnav />, <Sidebar />, <Userjs />]}
          />
          <Route
            path="/javascript/topic"
            element={[<Userpanelnav />, <Jssidebar />, <Jstopics />]}
          />

          {/*-------------Admin----------Routing------*/}
          <Route
            path="/admin/Coursemanage"
            element={[
              <AdminHome/>,
              <Adminsidenav />,
              <Tabletab />,
            ]}
          />
           
          <Route
            path="/admin/courseform"
            element={[
              <AdminHome />,
              <Breadcrumb items={breadcrumbItems1} />,
              <Adminsidenav />,
            ]}
          />

<Route path="/addContact" element ={[<AdminHome/>,<Adminsidenav/>,<Adduser/>]}/>
           <Route path ="/update/:id" element={[<AdminHome/>,<Adminsidenav/>,<Addupdate/>]}/>
           <Route path ="/view/:id" element={[<AdminHome/>,<Adminsidenav/>,<View/>]}/>

           <Route path ="/courseupdate/:id" element={[<AdminHome/>,<Adminsidenav/>,<UpdateCourseForm/>]}/>

           <Route path ="/moduleupdate/:id" element={[<AdminHome/>,<Adminsidenav/>,<UpdateModuleForm/>]}/>

           <Route path ="/topicupdate/:id" element={[<AdminHome/>,<Adminsidenav/>,<UpdateTopicForm/>]}/>

           <Route path ="/mcqupdate/:id" element={[<AdminHome/>,<Adminsidenav/>,<UpdateMcqForm/>]}/>


           <Route path ="/viewcourse/:id" element={[<AdminHome/>,<Adminsidenav/>,<ViewCourse/>]}/>
           <Route path ="/viewmodule/:id" element={[<AdminHome/>,<Adminsidenav/>,<ViewModule/>]}/>


           <Route  path="/userloginpage" element={[<UserLoginpage/>,<Courses11/>]} />
           

           <Route  path="/Admin" element={[<Adminpanel/>, ]} />

           <Route  path="/enterlogin" element={[<NavBar/>,<Readmoretab/>,]} />

           <Route  path="/coursedashboard" element={<CourseDash/>} />

           <Route  path="/moduletable" element={<ViewallModules/>} />

           <Route  path="/topicstable" element={<ViewAllTopics/>} />

           <Route  path="/mcqtable" element={<ViewAllMcq/>} />

           <Route  path="/modulemcq" element={<ViewAllModuleMcq/>} />








          
           
           

          <Route
            path="/admin/Usermanage"
            element={[
              <AdminHome />,
              <Adminsidenav />,
              <Usermanage/>,
            ]}
          />
          <Route
            path="/admin/Userform"
            element={[
              <AdminHome />,
              <Breadcrumb items={breadcrumbItems3} />,
              <Adminsidenav />,
              <Userform />,
            ]}
          />

          {/* <Route
            path="/admin/existingcourses"
            element={[<AdminHome/>, <Adminsidenav />,<Existingtab />]}
          /> */}

         
          {/* <Route path='/new' element={[<Userpanelnav/>,]}/>  */}

          {/* <Route path='/course' element={[<Addcoursecomponents/>]}/>
        <Route path="/courses/:id" element={<AddPythonFullStackComponent/>}/>
        <Route path="/courses/:id/modules/:module" element={[<Breadcrumb items={breadcrumbItems4}/>,<UserHtml1/>]}/>

 */}

          <Route path="/course/:id" element={[<AddNewModuleComponent />]} />
          
          <Route path="/course" element={[<AdminHome/>,<Course/>]} />
          <Route
            path="course/:id/modules/:id/topics"
            element={<Dynamic/>}
          />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
