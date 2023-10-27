import React from 'react';
import Adminsidenav from './Adminsidenav';
import Admincards from './Admincards';
import { Adminchart } from './Adminchart';
import AdminHome from './AdminHome';
import { Adminbarchart } from './Adminbarchart';

export default function Adminpanel() { 
  return (
    <div>
      <AdminHome/>
      <Adminsidenav/>
      <Admincards/>
      <div style={{marginLeft:'14%',display:'flex',marginTop:'1%'}}>
        <div className='col-6' style={{marginLeft:'5%'}}>
        <Adminbarchart/>
        </div>
      <Adminchart/>
      </div>
      
     
  
   
    </div>
  )
}
