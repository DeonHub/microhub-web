import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";
import axios from "axios";

const Charts = () => {
  const [loanStats, setLoanStats] = useState([]);
  const [transactionStats, setTransactionStats] = useState([]);

  useEffect(() => {

    const token = window.sessionStorage.getItem("token");

    if (!token) {
        navigate("/");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

    const fetchStats = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard/admin`, { headers })
        const data = response.data.data;

        // Extract and structure loan data for stacked column chart
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        setLoanStats([
          {
            name: "Approved",
            data: data.loanStats.map(item => item.approved)
          },
          {
            name: "Pending",
            data: data.loanStats.map(item => item.pending)
          },
          {
            name: "Denied",
            data: data.loanStats.map(item => item.denied)
          }
        ]);

        // Extract transaction data for pie chart
        setTransactionStats([
          data.transactionStats.deposit,
          data.transactionStats.withdrawal,
          data.transactionStats.payment
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };

    fetchStats();
  }, []);

  // Stacked Column Chart for Loan Approvals
  const barChartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    colors: ["#4f46e5", "#f97316", "#ef4444"],
    title: {
      text: "Loan Approvals by Month",
      align: "center",
      style: { fontSize: "16px" },
    },
  };

  // Pie Chart for Transaction Breakdown
  const pieChartOptions = {
    labels: ["Deposit", "Withdrawal", "Payment"],
    colors: ["#22c55e", "#f97316", "#3b82f6"],
    legend: { position: "bottom" },
    title: {
      text: "Transaction Breakdown",
      align: "center",
      style: { fontSize: "16px" },
    },
  };

  return (
    <div className="container">
      <div className="row g-4">
        {/* Bar Chart Card */}
        <div className="col-12 col-lg-6">
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <Chart options={barChartOptions} series={loanStats} type="bar" height={300} />
          </div>
        </div>

        {/* Pie Chart Card */}
        <div className="col-12 col-lg-6">
          <div className="bg-white shadow-lg rounded-2xl p-4">
            <Chart options={pieChartOptions} series={transactionStats} type="pie" height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
