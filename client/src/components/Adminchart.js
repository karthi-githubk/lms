import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios"; // Import Axios

export function Adminchart() {
  const [chartData, setChartData] = useState([]);

  // Function to fetch data and update chartData
  const fetchDataAndUpdateChart = async () => {
    try {
      // Fetch data for courses, users, and enquiries from your API using Axios
      const courseResponse = await axios.get("http://localhost:5000/api/course/get");
      const userResponse = await axios.get("http://localhost:5000/api/user/get");
      const enquiryResponse = await axios.get("http://localhost:5000/api/notification");

      // Extract data from Axios responses
      const courseData = courseResponse.data;
      const userData = userResponse.data;
      const enquiryData = enquiryResponse.data;

      // Calculate the counts
      const courseCount = courseData.length;
      const userCount = userData.length;
      const enquiryCount = enquiryData.length;

      // Update chartData with all three categories
      setChartData([
        ["Category", "Count"],
        ["Courses", courseCount],
        ["Users", userCount],
        ["Enquiries", enquiryCount],
        // Add more data categories as needed
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch and update data initially
    fetchDataAndUpdateChart();

    // Schedule data update every X milliseconds (e.g., every 5 minutes)
    const interval = setInterval(fetchDataAndUpdateChart, 5 * 60 * 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="440px"
      data={chartData}
      options={{
        pieHole: 0.4,
        is3D: false,
        colors: ['#f53b57', '#3c40c6', '#ffdd59'],
      }}
    />
  );
}
