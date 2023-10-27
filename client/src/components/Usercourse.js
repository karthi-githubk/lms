import React from 'react'
import '../components/Sidenav.css';
import mern from './images/mern1.jpg';

export default function Usercourse() {
  return (
    

     <div className='mern'>

      <h2>Welcome to <span>Mern Stack Development</span></h2>
      <p style={{fontSize:'20px',marginTop:'20px', fontWeight:'bold'}}>The MERN Stack is a collection of technologies used to develop web applications. It was developed by Facebook back in 2013. MERN is an acronym for the four technologies used: MongoDB, ExpressJS, React, and NodeJS.</p>

      <img src={mern} alt=''/>


      </div> 

  )
}
