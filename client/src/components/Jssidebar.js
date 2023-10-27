import { Padding } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Jssidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/javascript/var",
      name: "Js Var",   
    },
    {
      path: "/javascript/let",
      name: "Js Let",  
    },
    {
      path: "/javascript/const",
      name: "Js Const",   
    },
    {
      path: "/javascript/function",
      name: "Js functions",   
    },
    {
      path: "/javascript/event",
      name: "Js Events",  
    },
    {
      path: "/javascript/array",
      name: "Js Arrays",  
    },
    {
      path: "/javascript/object",
      name: "Js Objects",  
    },
    {
      path: "/javascript/loop",
      name: "Js Loops",  
    },
    {
      path: "/javascript/map",
      name: "Js map",  
    },
    
  ];

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed" style={{position:'fixed',top:'10%'}}>
      <div className="sidebar">
        <div className="top_section">
          <h3 className="logo">Topics</h3>
        </div>

        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink to={item.path} className="link" activeClassName="active">
              <div className="link_text" style={{fontSize:'18px',width:'170px',marginTop:'3px'}}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Jssidebar;
