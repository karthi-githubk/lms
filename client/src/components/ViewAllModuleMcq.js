import React from 'react'
import AdminHome from './AdminHome'
import Adminsidenav from './Adminsidenav'
import ModuleMcqtable from './ModuleMcqtable'

export default function ViewAllModuleMcq() {
  return (
    <div>
        <div>
            <AdminHome/>
        </div>
        <div>
            <Adminsidenav/>
        </div>
        <div>
            <ModuleMcqtable/>
        </div>
        
      
    </div>
  )
}
