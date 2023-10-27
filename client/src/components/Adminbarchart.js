import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios"; // Import Axios

export function Adminbarchart() {
  const [chartData, setChartData] = useState([]);

  // Function to fetch data and update chartData
  const fetchDataAndUpdateChart = async () => {
    try {
      // Fetch data for modules, topics, and MCQs from your API using Axios
      const modulesResponse = await axios.get("http://localhost:5000/api/modules/get");
      const topicsResponse = await axios.get("http://localhost:5000/api/topics/get");
      const mcqsResponse = await axios.get("http://localhost:5000/api/mcq_questions/get");

      // Extract data from Axios responses
      const modulesData = modulesResponse.data;
      const topicsData = topicsResponse.data;
      const mcqsData = mcqsResponse.data;

      // Calculate the counts
      const modulesCount = modulesData.length;
      const topicsCount = topicsData.length;
      const mcqsCount = mcqsData.length;

      // Update chartData with the new data
      setChartData([
        ["Category", "Count", { role: "style" }],
        ["Modules", modulesCount, "#8854d0"],
        ["Topics", topicsCount, "#e84393"],
        ["MCQs", mcqsCount, "#fed330"],
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

  const options = {
    title: "Counts of Modules, Topics, and MCQs",
    vAxis: { title: "Count" },
    hAxis: { title: "Category" },
    seriesType: "bars",
    series: {
      2: { type: "line" }, // Use the "line" series type for the third series (MCQs)
    },
  };

  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
}
