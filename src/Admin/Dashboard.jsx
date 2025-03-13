import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import axios from "axios";
import { Spin } from "antd";


const Dashboard = () =>{

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [totals, setTotals] = useState({});
  const [totalClients, setTotalClients] = useState(0);
  const [totalOfficers, setTotalOfficers] = useState(0);

  useEffect(() => {
    document.title = "Dashboard | MicroHub";

    setIsLoading(true);

    const officersData = localStorage.getItem("officersData");
    const clientsData = localStorage.getItem("clientsData");

    setTotalClients(clientsData ? JSON.parse(localStorage.getItem("clientsData")).length : 0);
    setTotalOfficers(officersData ? JSON.parse(localStorage.getItem("officersData")).length : 0);

    setTimeout(()  => {
        setIsLoading(false);
      }, 3000);

    // const token = window.sessionStorage.getItem("token");

    // if (!token) {
    //   navigate("/");
    //   return;
    // }

    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   "Content-Type": "application/json",
    // };

    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/totals`, { headers })
    //   .then((response) => {
    //     // console.log(response.data.data);
    //     // const sortedCategories = response.data.data
    //     setTotals(response.data.data);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     setIsLoading(false);
    //   });
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
                                        <span className="info-box-number">{totalOfficers || 0}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
            
            
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/admin/clients" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Clients</span>
                                        <span className="info-box-number">{totalClients || 0}</span>
                                    </div>
                                </div>
                                </a> 
                            </div>
            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Loans</span>
                                        <span className="info-box-number">{totals.countries ? totals.countries : '0'}</span>
                                    </div>
                                    {/* <a href="#" className="stretched-link">.</a> */}
                                </div>
                                </a>
                            </div>
            
                            
                            <div className="col-12 col-sm-6 col-md-3">
                            <a href="/" className="stretched-link">
                                <div className="info-box link_color">
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Reports</span>
                                        <span className="info-box-number">{totals.users ? totals.users : '0'}</span>
                                    </div>
                                    
                                </div>
                                </a>
                            </div>
                        
            
                        </div>
            
            
                    </div>
                </div>
            </div>

            <AdminFooter />
</>
        )} 
            </div>
        </div>
    );
}


export default Dashboard;