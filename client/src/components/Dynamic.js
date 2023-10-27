import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom'; // Import necessary hooks
import UserLoginpage from './UserLoginPage';
import TopicSideNav from './TopicSideNav';
import BreadcrumbUser from './BreadcrumbUser';
import axios from 'axios';

export default function Dynamic() {
  const location = useLocation(); // Get the location object
  const { id } = useParams(); // Get the id from route params
  const [courseName, setCourseName] = useState('');
  const [moduleName, setModuleName] = useState('');
  const [topicName, setTopicName] = useState('');
  const [selectedTopicName, setSelectedTopicName] = useState('');


  const handleTopicSelect = (topicName) => {
    setSelectedTopicName(topicName);
  };


  useEffect(() => {
    console.log("Fetching course name for id:", id);
    async function fetchCourseName() {
      try {
        const response = await axios.get(`http://localhost:5000/api/course/get/${id}`);
        const data = response.data;
        console.log("Fetched course data:", data);
        const fetchedCourseName = data[0].coursename;
        if (fetchedCourseName) {
          setCourseName(fetchedCourseName);
        } else {
          console.error('Course name not found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    }

    async function fetchModuleName() {
        console.log("Fetching module name for id:", id);
      try {
        const response = await axios.get(`http://localhost:5000/api/modules/get/${id}`);
        const data = response.data;
        console.log("Fetched module data:", data);
        const fetchedModuleName = data[0].module_name;
        if (fetchedModuleName) {
          setModuleName(fetchedModuleName);
        } else {
          console.error('Module name not found in the response:', data);
        }
      } catch (error) {
        console.error('Error fetching module data:', error);
      }
    }

    async function fetchTopicName() {
        console.log("Fetching topic name for id:", id);
        try {
          const response = await axios.get(`http://localhost:5000/api/topics/get/${id}`);
          const data = response.data;
          console.log("Fetched topic data:", data);
          
          if (Array.isArray(data) && data.length > 0 && data[0].topic_name) {
            const fetchedTopicName = data[0].topic_name;
            setTopicName(fetchedTopicName);
          } else {
            console.error('Topic name not found in the response or response data is not as expected:', data);
          }
        } catch (error) {
          console.error('Error fetching topic data:', error);
        } 
      }             
    // Call the fetch functions for course, module, and topic names
    fetchCourseName();
    fetchModuleName();
    fetchTopicName();
  }, [id]);

  const breadcrumbItems = [
    { text: "Home", url: "/userloginpage" },
    { text: courseName, url: `/course/${id}` },
    { text: moduleName, url: `/course/${id}/modules/${id}/topics` }, // Updated URL
    { text: selectedTopicName, url: `/course/${id}/modules/${id}/topics` }
  ];
  
  return (
    <div>
      <BreadcrumbUser items={breadcrumbItems} />
      <div>
        <UserLoginpage />
      </div>
      <div>
        <TopicSideNav onTopicSelect={handleTopicSelect}  />
      </div>
    </div>
  );
}
