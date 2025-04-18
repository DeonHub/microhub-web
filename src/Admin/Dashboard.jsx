import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import axios from "axios";
import { Spin } from "antd";
import Charts from "./components/Charts";


const Dashboard = () =>{

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
const [results, setResults] = useState([]);

  useEffect(() => {
    document.title = "Dashboard | MicroHub";

    setIsLoading(true);

    const token = window.sessionStorage.getItem("token");

    if (!token) {
        navigate("/");
        return;
      }

  const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

  
      axios
        .get(`${import.meta.env.VITE_API_URL}/dashboard/admin`, { headers })
        .then((response) => {
        //   console.log(response.data);
 
          setResults(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });


  }, [navigate]);

    return(
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">

            <AdminHeader />

            <AdminSidebar active={"dashboard"} />
 {isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : ( 
          <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/officers" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Officers</span>
                                        <span className="info-box-number">{results?.totalOfficers || 0}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/clients" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Clients</span>
                                        <span className="info-box-number">{results?.totalClients || 0}</span>
                                    </div>
                                </div>
                                </a> 
                            </div>
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/loans" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Loans</span>
                                        <span className="info-box-number">{results?.totalLoans || 0}</span>
                                    </div>
                                    {/* <a href="#" className="stretched-link">.</a> */}
                                </div>
                                </a>
                            </div>
            
                            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/transactions" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Transactions</span>
                                        <span className="info-box-number">{results?.totalTransactions || 0}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
                        

                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/reports" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Reports</span>
                                        <span className="info-box-number">{results?.totalReports || 0}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/tickets" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Tickets</span>
                                        <span className="info-box-number">{results?.totalTickets || 0}</span>
                                    </div>
                                </div>
                                </a> 
                            </div>
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/loans" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Pending Loans</span>
                                        <span className="info-box-number">{results?.pendingLoans || 0}</span>
                                    </div>
                                    {/* <a href="#" className="stretched-link">.</a> */}
                                </div>
                                </a>
                            </div>
            
                            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/transactions" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Pending Transactions</span>
                                        <span className="info-box-number">{results?.pendingTransactions || 0}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
            
                        </div>
            
            
                    </div>
                </div>

                <Charts />

            </div>

            <AdminFooter />
</>
        )} 
            </div>
        </div>
    );
}


export default Dashboard;