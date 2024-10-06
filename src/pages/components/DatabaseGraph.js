import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DatabaseGraph = ({ dataObject }) => {
  // Convert the dataObject into labels and data arrays
  const labels = Object.keys(dataObject);
  const dataValues = Object.values(dataObject);

  // Prepare data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Total Data",
        data: dataValues,
        backgroundColor: '#334155',
        borderColor: '#334155',
        borderWidth: 1,
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Database Collections Length",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Adjust this based on your data range
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DatabaseGraph;
