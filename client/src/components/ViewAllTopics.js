import React, { useState } from 'react'
import AdminHome from './AdminHome'
import Adminsidenav from './Adminsidenav'
import TopicTable from './TopicTable'


export default function ViewAllTopics() {


  return (
    <div>
        <div>
            <AdminHome/>
        </div>
        <div>
            <Adminsidenav/>
        </div>
        <div>
            <TopicTable/>
        </div>
      
    </div>
  )
}
