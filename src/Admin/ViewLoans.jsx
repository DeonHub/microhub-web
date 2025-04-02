import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import LoanModal from "./LoanModal";
import axios from "axios";

import { Spin } from "antd";


const ViewLoans = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [clients, setClients] = useState([]);
    const [count, setCount] = useState(0)


  useEffect(() => {
    document.title = "View Loans | MicroHub";

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
      .get(`${import.meta.env.VITE_API_URL}/clients`, { headers })
      .then((response) => {
        // console.log(response.data);
        const sortedOfficers = response.data.clients.sort(
          (a, b) => new Date(b.userId.createdAt) - new Date(a.userId.createdAt)
        );
        setClients(sortedOfficers);
      })
      .catch((error) => {
        console.error(error);
      });


  
      axios
        .get(`${import.meta.env.VITE_API_URL}/loans`, { headers })
        .then((response) => {
          // console.log(response.data);
          const sortedOfficers = response.data.loans.sort(
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
  }, [navigate]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = results.filter((result) =>
    result?.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
  result?.clientId?.userId?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  result?.clientId?.userId?.surname.toLowerCase().includes(searchTerm.toLowerCase())
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

  const capitalizeFirstLetter = (word) => {
    if (typeof word !== "string" || word.length === 0) {
      return ""; // Handle invalid input
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };


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

  const formatCurrency = (value) => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "Invalid number";
    }

    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }


  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"loan"} />
{isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : (
          <>
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-4">
                  <h1 className="m-0">Loans</h1>
                </div>
                <div className="col-sm-4">
                  <h5 className="p-0 m-auto">Total Requests: {count} </h5>
                </div>
                <div className="col-sm-4">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="admin.dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Loans</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <div className="row align-items-center">
                        <div className="col-6">
                          <h3 className="card-title">Loan Requests</h3>
                        </div>
                      
                        <div className="col-6">
                          <div className="float-right">
                             <LoanModal title={"Create"} claxx={"btn btn-success btn-sm"} icon={"nav-icon fa fa-plus mr-2"} mode={"create"} buttonText={"Add New"} setIsLoading={setIsLoading} clients={clients} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-3 py-2">
                          <div className="row align-items-center">
                            <div className="col-6">
                              <span className="text-sm mr-1">Show</span>
                              <select
                                class="form-select form-select-sm"
                                aria-label="Default select example"
                                onChange={(e) => {
                                  setItemsPerPage(e.target.value);
                                }}
                              >
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>
                              <span className="text-sm ml-1">entries</span>
                            </div>
                            <div className="col-6">
                              <div className="float-right">
                                <input
                                  type="text"
                                  className="form-control-sm rounded"
                                  placeholder="Enter search term ..."
                                  value={searchTerm}
                                  onChange={handleSearchChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                    <div className="card-body table-responsive p-0">
                      <table
                        id="dataTables"
                        className="table table-hover text-nowrap jsgrid-table"
                      >
                        <thead>
                          <tr>
                            <th>Loan ID</th>
                            <th>Client Info</th>
                            <th>Officer Info</th>
                            <th>Total Amount</th>
                            <th>Issued Date</th>
                            <th>Loan Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        {currentPageData.length === 0 ? (
                                   <tr>
                                   <td className="w-full px-3 py-4 text-center text-black" colSpan="7">No data</td>
                                 </tr>
                                 ) : (
                                   currentPageData.map((result, key) => {
                                     return(
                                        <tr key={key}>
                                          <td><div className="float-left p-2">
                                            {result?.loanId}
                                            
                                        </div>
                                    </td>
                                            
                                    <td>
                                                <div>
                                                {result?.clientId?.userId?.firstname} {result?.clientId?.userId?.surname}
                                                </div>
                                                <div>
                                                {result?.clientId?.clientId}
                                                </div>

                                            </td>
                                            
                                            <td>
                                                <div>
                                                {result?.assignedOfficer?.userId?.firstname} {result?.assignedOfficer?.userId?.surname}
                                                </div>
                                                <div>
                                                {result?.assignedOfficer?.officerId}
                                                </div>

                                            </td>
                                          

                                              <td>
                                              GHS {formatCurrency(result?.totalAmount || 0) || 0.00}
                                            </td>
                                            

                                            <td>
                                            <div>
                                            {formatDate(result?.createdAt)}
                                                </div>
                                                <div>
                                            {formatTime(result?.createdAt)}
                                                </div>
                                               
                                              
                                              </td>

                                              <td className="text-muted">
                                            
                                            <span className={`badge ${result?.status === "approved" ? "badge-success" : result?.status === "pending" ? "badge-warning" : "badge-danger"}`}>
                                                {capitalizeFirstLetter(result?.status)}
                                            </span>
                                           
                                        </td>

                                            <td>

                                                {/* <ClientModal title={"Add Credit"} claxx={"btn btn-sm btn-secondary mr-3"} icon={"nav-icon fa fa-money-bill mr-2"} mode={"credit"} buttonText={"Add Credit"} /> */}

                                           
                                                <LoanModal title={"View"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-eye mr-2"} data={result} mode={"view"} setIsLoading={setIsLoading} formatCurrency={formatCurrency} buttonText={"View"} formatDate={formatDate} capitalizeFirstLetter={capitalizeFirstLetter} />
                                               
                                            </td>
                                        </tr>
                                    )})
                           )}


                        </tbody>
                      </table>
                    </div>

                    <div className="px-3 mt-2 row">
                          <div className="col-6">
                            <p>
                              {`Showing ${
                                startIndex + 1
                              } to ${endIndex} of ${totalItems} entries`}
                            </p>
                          </div>
                          <div className="col-6">
                            <nav
                              aria-label="Page navigation example"
                              className="mt-0"
                            >
                              <ul className="pagination pagination-sm justify-content-end justify-content-md-end">
                                <li
                                  className={`page-item ${
                                    currentPage === 1 ? "disabled" : ""
                                  }`}
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
                                    className={`page-item ${
                                      index + 1 === currentPage ? "active" : ""
                                    }`}
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
                                  className={`page-item ${
                                    currentPage === totalPages ? "disabled" : ""
                                  }`}
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

        <AdminFooter />
        </>
        )}
      </div>
    </div>
  );
};

export default ViewLoans;
