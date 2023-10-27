import React, { useState } from 'react'
import Modules from './Modules';
import Breadcrumb from './Breadcrumb';
import Userpanelnav from './Userpanelnav';

function AddPythonFullStackComponent() {
  const [breadcrumbItems2, setBreadcrumbItems2] = useState([
    { text: 'Home', url: '/userhome' },
    { text: 'Course', url: '/course' },
    { text: 'Module', url: '/userpython' },
  ]);
  return (
    <div>
      <Userpanelnav/>
      <Breadcrumb items={breadcrumbItems2} />
      <div>
      <div>
      <Modules />
      </div>
      </div>
     
    </div>
  )
}

export default AddPythonFullStackComponent