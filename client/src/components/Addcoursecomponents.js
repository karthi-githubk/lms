import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Userpanelnav from './Userpanelnav';

function Addcoursecomponents() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [courseName, setCourseName] = useState('');

  // Fetch the course name based on 'id' (You will need to implement this logic)
  useEffect(() => {
    // Simulated API call to fetch course name based on 'id'
    // Replace this with your actual API call
    const fetchCourseName = async () => {
      try {
        // Example: Fetch the course name based on 'id' from your API
        const response = await fetch(`/api/courses/${id}`);
        const data = await response.json();
        setCourseName(data.courseName); // Set the course name
      } catch (error) {
        console.error('Error fetching course name:', error);
      }
    };

    fetchCourseName();
  }, [id]);

  const breadcrumbItems1 = [
    { text: 'Home', url: '/userhome' },
    { text: courseName, url: `/course/${id}` }, // Use courseName in the breadcrumb
  ];

  return (
    <div>
      <Userpanelnav />
      <div className='pt-1' style={{ backgroundColor: 'gray', position: 'static' }}>
        {/* Your other content */}
      </div>
      <div className=''>
        {/* Your other content */}
      </div>
    </div>
  );
}

export default Addcoursecomponents;
