import React from 'react'
import AdminHome from './AdminHome'
import Adminsidenav from './Adminsidenav'
import ModuleTable from './ModuleTable'

export default function ViewallModules() {

  



  return (
    <div>
        <div>
            <AdminHome/>
        </div>
        <div>
            <Adminsidenav/>
        </div>
        <div>
            <ModuleTable/>
        </div>
      
    </div>
  )
}
