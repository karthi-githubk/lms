import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const CourseDashnav = ({ children }) => {
  const menuItem = [
    {
      id: '1',
      path: "#",
      name: "Course Dashboard",
      icon: <SchoolIcon />
    },
  ];

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed" style={{ marginTop: '16px', position: 'fixed', top: '7%' }}>
      <div className="sidebar" style={{ width: "230px" }}>
        <div className="top_section">
          <h3 className="logo"></h3>
        </div>

        {menuItem.map((item, index) => (
          <div key={index}>
            <NavLink to={item.path} className="link" activeClassName="active" style={{ marginTop: "7%" }}>
              <div className="icon" style={{ marginRight: "-11%" }}>{item.icon}</div>
              <div className="link_text" style={{ width: '300px', fontSize: '18px', marginRight: "8%" }}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default CourseDashnav;
