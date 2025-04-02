import React from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  // Bar Chart Data (Loan Approvals)
  const barChartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    colors: ["#4f46e5"],
    title: {
      text: "Loan Approvals by Month",
      align: "center",
      style: { fontSize: "16px" },
    },
  };

  const barChartSeries = [
    {
      name: "Approved Loans",
      data: [45, 75, 60, 90, 100, 80, 70, 85, 95, 110, 120, 130],
    },
  ];

  // Pie Chart Data (Transaction Types)
  const pieChartOptions = {
    labels: ["Deposit", "Withdrawal", "Transfer"],
    colors: ["#22c55e", "#f97316", "#3b82f6"],
    legend: { position: "bottom" },
    title: {
      text: "Transaction Breakdown",
      align: "center",
      style: { fontSize: "16px" },
    },
  };

  const pieChartSeries = [55, 30, 15];

  return (
    <div className="container">
      <div className="row g-4">
        {/* Bar Chart Card */}
        <div className="col-12 col-lg-6">
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <Chart options={barChartOptions} series={barChartSeries} type="bar" height={300} />
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="col-12 col-lg-6">
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <Chart options={pieChartOptions} series={pieChartSeries} type="pie" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
