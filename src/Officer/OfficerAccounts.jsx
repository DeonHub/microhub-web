import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import ClientModal from "./ClientModal";
// import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import { Spin } from "antd";
import StatusModal from "../components/StatusModal";
import AccountModal from "./AccountModal";


const OfficerAccounts = () => {

    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [count, setCount] = useState(0);
    const [userId, setUserId] = useState(window.sessionStorage.getItem("userId"))


  useEffect(() => {
    document.title = "View Clients Accounts | MicroHub";

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
        .get(`${import.meta.env.VITE_API_URL}/accounts/officer/${userId}`, { headers })
        .then((response) => {
          // console.log(response.data);
          const sortedOfficers = response.data.accounts.sort(
            (a, b) => new Date(b.clientId?.userId?.createdAt) - new Date(a.clientId?.userId?.createdAt)
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

  const capitalizeFirstLetter = (word) => {
    if (typeof word !== "string" || word.length === 0) {
      return ""; // Handle invalid input
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = results.filter((result) =>
    result?.clientId?.userId?.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  result?.clientId?.userId?.surname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  result?.clientId?.clientId.toLowerCase().includes(searchTerm.toLowerCase())
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

        <AdminSidebar active={"account"} />

        
    {isLoading ? (
                <Spin fullscreen={true} size={"large"} />
                ) : ( 
                <>
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-4">

                        <h1 className="m-0">Accounts</h1>
                    </div>
                    <div className="col-sm-4">
                  <h5 className="p-0 m-auto">Total Accounts: {count} </h5>
                </div>
                    <div className="col-sm-4">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item active">Accounts</li>
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
                                    <div className="col-12">
                                        <h3 className="card-title">Accounts List</h3>
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
                                <option value="10" selected>
                                  10
                                </option>
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
                                <table id="dataTables" className="table table-hover text-nowrap jsgrid-table">
                                    <thead>
                                    <tr>
                                        
                                        <th>Profile</th>
                                        <th>User</th>
                                        <th>Account Type</th>
                                        <th>Balance</th>
                                        <th>Status</th>
                                        <th>Added On</th>
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
                                            <img src={
                                              result?.clientId?.userId?.profilePicture
                                                  ? result?.clientId?.userId?.profilePicture
                                                  : `https://ui-avatars.com/api/?name=${result?.clientId?.userId?.firstname}+${result?.clientId?.userId?.surname}&background=random&color=fff`} className="border rounded-circle" alt="default" width="50" height="50" />
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
                                            {capitalizeFirstLetter(result?.accountType)}
                                                </div>
                                              
                                              </td>
                                          

                                            <td>
                                              GHS {formatCurrency(result?.balance)}
                                            </td>
                                            

                                            <td className="text-muted">
                                            
                                                <span className={`badge ${result?.status === "active" ? "badge-success" : "badge-danger"}`}>
                                                    {capitalizeFirstLetter(result?.status)}
                                                </span>
                                               
                                            </td>

                                            <td>
                                            <div>
                                            {formatDate(result?.createdAt)}
                                                </div>
                                                <div>
                                            {formatTime(result?.createdAt)}
                                                </div>
                                               
                                              
                                              </td>

                                            <td>

                                                <AccountModal title={"View"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-eye mr-2"} data={result} mode={"view"}  buttonText={"View"} formatDate={formatDate} formatCurrency={formatCurrency} capitalizeFirstLetter={capitalizeFirstLetter} />
                                               
                                                {/* <StatusModal
                                                  title={`${result?.status === "active" ? "Disable" : "Enable"} Client`}
                                                  content={
                                                    `Are you sure you want to ${result?.status === "active" ? "disable" : "enable"} this client?`
                                                  }
                                                  claxx={`btn btn-sm ${result?.status === "active" ? "btn-secondary" : "btn-success"} mr-3`}
                                                  setIsLoading={setIsLoading} 
                                                  id={result.userId} 
                                                  redirectUrl={'clients'} 
                                                  updateUrl={'clients'}
                                                  status={result?.status}
                                                  role={"client"}
                                                /> */}
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

export default OfficerAccounts;
