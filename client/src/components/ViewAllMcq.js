import React, { useState } from 'react'
import AdminHome from './AdminHome'
import Adminsidenav from './Adminsidenav'
import TopicMcqTable from './TopicMcqTable'

export default function ViewAllMcq() {


    

  return (
    <div>
        <div>
            <AdminHome/>
        </div>
        <div>
            <Adminsidenav/>
        </div>
        <div>
            <TopicMcqTable/>
        </div>
      
    </div>
  )
}
