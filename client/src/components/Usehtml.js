import React, { useState } from 'react'
// import HomeNavBar from '../Topnav/Topnavbar';
// import HtmlSidebar from './HtmlSidenav';
// import Test from '../TEST/Test';
// import './HtmlComponent.css'
// import Chatbot from '../Chatbot/Chatbot';
// import Breadcrumb from ?'../Breadcrumb';
import HtmlSidebar from './Htmsidebar';
import { Breadcrumb } from 'react-bootstrap';
import Userpanelnav from './Userpanelnav';

function UserHtml1() {
  const [breadcrumbItems3, setBreadcrumbItems3] = useState([
    { text: 'Home', url: '/userhome' },
    { text: 'Course', url: '/course' },
    { text: 'Module', url: '/userpython' },
    { text: 'Topics', url: '/userhtml' },
  ]);
  return (

    <>
    <Userpanelnav/>
    <Breadcrumb items={breadcrumbItems3} />
<div className='d-flex ' style={{marginTop:'-50px'}}>

  <div><HtmlSidebar/></div>
</div>
</>
  )
}

export default UserHtml1;