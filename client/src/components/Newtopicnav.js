import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Newtopicnav = ({ children }) => {
  const { courseList } = useSelector((state) => state.course);

  // Replace '1' with the desired ID to fetch the corresponding course
  const courseIdToFetch = 1;
  const course = courseList.find((course) => course.id === courseIdToFetch);

  return (
    <div className="sidebarmain container-Fluid d-inline-flex fixed" style={{ marginTop: '14px', position: 'fixed', top: '8%' }}>
      <div className="sidebar">
        <div className="top_section">
          <h3 className="logo">Topics</h3>
        </div>

        {course && (
          <div>
            {course.topicChoices.map((topicChoices, index) => (
              // Append the specific module ID to the path
              <NavLink key={index} to={`${course.path}/${index + 1}`} className="link" activeClassName="active">
                <Link to="/new" style={{ textDecoration: "none", color: "white" }}>
                  <div className="link_text" style={{ width: '320px', fontSize: '23px', marginLeft: "15%" }}>
                    <Link to='/module' style={{ textDecoration: "none", color: "white" }}>
                      {topicChoices}
                    </Link>
                  </div>
                </Link>
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Newtopicnav;
