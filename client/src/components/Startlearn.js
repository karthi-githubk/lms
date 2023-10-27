import React from 'react';
import demo from './videos/demo.mp4';

export default function Startlearn() {
  return (
    <div>
        <video muted controls style={{marginLeft:'10%', width:"80%", height:'80%'}}>
            <source src={demo}></source>
        </video>
      
    </div>
  )
}
