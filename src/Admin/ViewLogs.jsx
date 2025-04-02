import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import FaqModal from "./FaqModal";
import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import { Spin } from 'antd';


const ViewLogs = () =>{
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [faqs, setFaqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const [logs, setLogs] = useState([
        {
          logId: "LOG098712345",
          officerId: {
            userId: {
              firstname: "Naler",
              surname: "Evasud",
            },
            officerId: "OFS99109060",
          },
          action: "Submitted a daily report",
          createdAt: "2025-02-01T10:00:00.000Z",
        },
        {
          logId: "LOG098712002",
          officerId: {
            userId: {
              firstname: "Seth",
              surname: "Otoo",
            },
            officerId: "OFS26009260",
          },
          action: "Added a new client",
          createdAt: "2025-01-02T10:00:00.000Z",
        },
        {
          logId: "LOG0987123147",
          officerId: {
            userId: {
              firstname: "Renee",
              surname: "Otchere",
            },
            officerId: "OFS44729672",
          },
          action: "Requested a new loan",
          createdAt: "2025-01-03T10:00:00.000Z",
        },
        {
          logId: "LOG0987125678",
          officerId: {
            userId: {
              firstname: "Jake",
              surname: "Mensah",
            },
            officerId: "OFS33011234",
          },
          action: "Approved a loan application",
          createdAt: "2025-02-05T09:30:00.000Z",
        },
        {
          logId: "LOG0987126789",
          officerId: {
            userId: {
              firstname: "Linda",
              surname: "Boateng",
            },
            officerId: "OFS55887766",
          },
          action: "Requested a loan repayment",
          createdAt: "2025-02-06T14:45:00.000Z",
        },
        {
          logId: "LOG0987127890",
          officerId: {
            userId: {
              firstname: "Kojo",
              surname: "Amponsah",
            },
            officerId: "OFS99221133",
          },
          action: "Deposited an amount into client wallet",
          createdAt: "2025-02-07T12:20:00.000Z",
        },
        {
          logId: "LOG0987128901",
          officerId: {
            userId: {
              firstname: "Emilia",
              surname: "Asante",
            },
            officerId: "OFS66554433",
          },
          action: "Scheduled a loan repayment",
          createdAt: "2025-02-08T16:00:00.000Z",
        },
        {
          logId: "LOG0987129012",
          officerId: {
            userId: {
              firstname: "Richard",
              surname: "Dapaah",
            },
            officerId: "OFS77889900",
          },
          action: "Updated a clients contact information",
          createdAt: "2025-02-09T08:15:00.000Z",
        },
      ]);
      


    useEffect(() => {
        document.title = "View Activity Log | MicroHub";
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
      .get(`${import.meta.env.VITE_API_URL}/logs`, { headers })
      .then((response) => {
        // console.log(response.data);
        const sortedOfficers = response.data.logs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setResults(sortedOfficers);
        setCount(response.data.count);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });

    },[navigate])

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      };
    
      const formatTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const amPM = hours >= 12 ? "PM" : "AM";
    
        hours = hours % 12 || 12;
        hours = hours.toString().padStart(2, "0");
    
        return `${hours}:${minutes} ${amPM}`;
      };

      const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
      };
    
    
      const filteredData = logs.filter(
        (log) =>
            log.logId
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    
      // Calculate pagination
      const totalItems = filteredData.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      // const totalPages = 10;
    
      // Calculate the index range of items for the current page
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    
      // Get the data for the current page
      const currentPageData = filteredData.slice(startIndex, endIndex);
    
      // Pagination handlers
      const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
      };  

    return(
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">

            <AdminHeader />

            <AdminSidebar active={"logs"} />

            {isLoading ? (<Spin  fullscreen={true} size={'large'} />) : (
                <>
                            <div className="content-wrapper">
                            <div className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6">
                                            <h1 className="m-0">Activity Log</h1>
                                        </div>
                                        <div className="col-sm-6">
                                            <ol className="breadcrumb float-sm-right">
                                                <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                                                <li className="breadcrumb-item active">Activity Log</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <h3 className="card-title">Manage Activity Logs </h3>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="float-right">
                                                                {/* <FaqModal title={"Create"} claxx={"btn btn-success btn-sm"} icon={"nav-icon fa fa-plus mr-2"} mode={"create"} buttonText={"Add New"}/> */}
                                                            </div>
                    
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="px-3 py-2">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <span className="text-sm mr-1">Show</span>
                                                        <select class="form-select form-select-sm" aria-label="Default select example" onChange={((e) => {setItemsPerPage(e.target.value)})}>
                                                            <option value="10" selected>10</option>
                                                            <option value="25">25</option>
                                                            <option value="50">50</option>
                                                            <option value="100">100</option>
                                                            </select>
                                                            <span className="text-sm ml-1">entries</span>
                                                        </div>
                                                        <div className="col-6">
                                                            <div className="float-right">
                                                                <input type="text" className="form-control-sm rounded" placeholder="Enter search term ..." value={searchTerm}
                                      onChange={handleSearchChange}/>
                                                            </div>
                    
                                                        </div>
                                                    </div>
                                                </div>
                    
                                                <div className="card-body table-responsive p-0">
                                                    <table id="myTable" className="table table-hover text-nowrap jsgrid-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Log ID</th>
                                                                <th>User</th>
                                                                <th>Action</th>
                                                                <th>Performed On</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>

                                                            {currentPageData.length === 0 ? (
                                                                <tr colspan="10" className="text-center">
                                                                    <td colspan="10">No data found</td>
                                                                </tr>
                                                            ) : (
                                                                currentPageData.map((result, index) => (
                                                                    <tr key={index}>
                                                                    <td>{result.logId}</td>
                                                                    <td>
                                                                    <div>
                                                                        {result?.officerId?.userId?.firstname}{" "}
                                                                        {result?.officerId?.userId?.surname}
                                                                    </div>
                                                                    <div>
                                                                        {result?.officerId?.officerId}
                                                                    </div>
                                                                    </td>
                                                                    <td>{result.action}</td>
                                                                    <td>
                                                                    <div>{formatDate(result?.createdAt)}</div>
                                                                    <div>{formatTime(result?.createdAt)}</div>
                                                                    </td>

                                                                   
                                                                    </tr>
                                                            ))
                                                            )}
                                                             
                                                               
                                                        
                                                        </tbody>
                                                    </table>

                                                    
                                                </div>

                                                <div>
            <div className="px-3 mt-2 row">
                <div className="col-6">
                    <p>
                        {`Showing ${startIndex + 1} to ${endIndex} of ${totalItems} entries`}
                    </p>
                </div>
                <div className="col-6">
                    <nav aria-label="Page navigation example" className="mt-0">
                        <ul className="pagination pagination-sm justify-content-end justify-content-md-end">
                            <li
                                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                                onClick={() => goToPage(currentPage - 1)}
                            >
                                <button
                                    className="page-link"
                                    disabled={currentPage === 1}
                                >
                                    &laquo;
                                </button>
                            </li>

                            {[...Array(totalPages)].map((_, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => goToPage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li
                                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                                onClick={() => goToPage(currentPage + 1)}
                            >
                                <button
                                    className="page-link"
                                    disabled={currentPage === totalPages}
                                >
                                    &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
                                                
                    
                                            </div>
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


export default ViewLogs;