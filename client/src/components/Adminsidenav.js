import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
const Adminsidenav = ({ children }) => {
  const menuItem = [
    {
      id: '1',
      path: "/Adminpanel",
      name: "Dashboard",
      icon: <HomeIcon />
    },
    {
      path: "/coursedashboard",
      name: "Course Dashboard",
      icon: <ContentPasteIcon />
    },
    {
      path: "/admin/usermanage",
      name: "User management",
      icon: <ManageAccountsIcon />
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
              <div className="link_text" style={{ width: '300px', fontSize: '19px', marginRight: "8%" }}>{item.name}</div>
            </NavLink>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Adminsidenav;
