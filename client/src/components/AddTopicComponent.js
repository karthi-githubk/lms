import React, { useState } from 'react'
import TopicSideNav from './TopicSideNav';
import NewModuleDescription from './NewModuleDescription';
import Userpanelnav from './Userpanelnav';
import { Breadcrumb } from 'react-bootstrap';

function AddTopicComponent() {
  return (
 

<div>
        <Userpanelnav/>
        <div className='d-flex flex-row'>
          <div className='col' style={{marginTop:'50px'}} ><TopicSideNav/></div>
          <div className='sidebar-content '>
          {/* <Members/> */}
         <div className='ms-5'>
        
         </div>
          </div>
        </div>
        </div>


  )
}

export default AddTopicComponent;