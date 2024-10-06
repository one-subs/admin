import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyChart = ({ dataList, month }) => {
  // Get the total number of days in the specified month
  const daysInMonth = new Date(2024, month, 0).getDate(); // Adjust the year dynamically if needed
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Initialize an array to hold the count of subscriptions per day
  const dailyCounts = new Array(daysInMonth).fill(0);

  // Filter the data for the specified month
  dataList.forEach((item) => {
    const fromDate = new Date(item.fromUTC);
    const toDate = new Date(item.toUTC);

    // Only consider entries within the given month
    if (fromDate.getUTCMonth() + 1 === month || toDate.getUTCMonth() + 1 === month) {
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(Date.UTC(2024, month - 1, day)); // Adjust the year dynamically if needed
        if (currentDate >= fromDate && currentDate <= toDate) {
          dailyCounts[day - 1] += 1;
        }
      }
    }
  });

  // Determine the maximum value in the data
  const maxValue = Math.max(...dailyCounts);

  // Calculate the y-axis maximum value based on the data
  const yAxisMax = maxValue >= 10 ? Math.ceil((maxValue + 5) / 5) * 5 : 10; // Ends with 10 or the next multiple of 5 above the max value

  // Prepare data for the chart
  const chartData = {
    labels: daysArray.map((day) => `Day ${day}`),
    datasets: [
      {
        label: `Subscriptions for Month ${month}`,
        data: dailyCounts,
        backgroundColor: 'rgba(51,65,85)',
        borderColor: 'rgba(51,65,85)',
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
        text: `Daily Subscription Counts for Month ${month}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: yAxisMax, // Dynamically calculated maximum value for the y-axis
        ticks: {
          stepSize: 5, // Step size of 5
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

export default MonthlyChart;
