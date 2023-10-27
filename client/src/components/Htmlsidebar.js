import { Padding } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Htmlsidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/html/head",
      name: "HTML Head",   
    },
    {
      path: "/html/style",
      name: "HTML Styles",  
    },
    {
      path: "/html/class",
      name: "HTML Class",   
    },
    {
      path: "/html/id",
      name: "HTML Id",   
    },
    {
      path: "/html/list",
      name: "HTML Lists",  
    },
    {
      path: "/html/link",
      name: "HTML Links",  
    },
    {
      path: "/html/color",
      name: "HTML Color",  
    },
    {
      path: "/html/svg",
      name: "HTML Svg ",  
    },
    {
      path: "/html/iframe",
      name: "HTML Iframe ",  
    },
    {
      path: "/html/svg",
      name: "HTML Layout ",  
    },
    
  ];

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed" style={{position:'fixed',top:'10%'}}>
      <div className="sidebar">
        <div className="top_section">
          <h3 className="logo" style={{marginLeft:'40px'}}>Topics</h3>
        </div>

        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink to={item.path} className="link" activeClassName="active">
              <div className="link_text" style={{fontSize:'18px',width:'180px',marginLeft:'35px'}}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Htmlsidebar;
