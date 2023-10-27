import { Padding } from '@mui/icons-material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Csssidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/css/selector",
      name: "Css Selectors",   
    },
    {
      path: "/css/border",
      name: "Css Borders",  
    },
    {
      path: "/css/margin",
      name: "Css Margins",   
    },
    {
      path: "/css/padding",
      name: "Css Paddings",   
    },
    {
      path: "/css/text",
      name: "Css Text",  
    },
    {
      path: "/css/font",
      name: "Css Fonts",  
    },
    {
      path: "/css/position",
      name: "Css Position",  
    },
    {
      path: "/css/float",
      name: "Css Float",  
    },
    {
      path: "/css/zindex",
      name: "Css Z-index",  
    },
    
    
  ];

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed"  style={{position:'fixed',top:'10%'}}>
      <div className="sidebar">
        <div className="top_section">
          <h3 className="logo">Topics</h3>
        </div>

        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink to={item.path} className="link" activeClassName="active">
              <div className="link_text" style={{fontSize:'18px',width:'170px',marginTop:'2px'}}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Csssidebar;
