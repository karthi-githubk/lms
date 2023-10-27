import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/html",
      name: "HTML",
   
    },
    {
      path: "/css",
      name: "CSS",
     
    },
    {
      path: "/javascript",
      name: "JAVASCRIPT",
     
    },
    {
      path: "/boot",
      name: "BOOTSTRAP",
     
    },
    {
      path: "/jquery",
      name: "JQUERY",
    
    },
    {
      path: "/react",
      name: "REACT JS",
     
    },
    {
      path: "/node",
      name: "NODE JS",
  
    },
    {
      path: "/mongo",
      name: "MONGO DB",
    
    },
    {
      path: "/express",
      name: "EXPRESS JS",
    },
  ];

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed" style={{marginTop:'14px', position:'fixed',top:'8%'}}>
      <div className="sidebar">
        <div className="top_section">
          <h3 className="logo">Modules</h3>
        </div>

        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink to={item.path} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div className="link_text" style={{width:'320px'}}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
