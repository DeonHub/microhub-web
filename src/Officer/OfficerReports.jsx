import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import ReportModal from "./ReportModal";
import axios from "axios";
import { Spin } from "antd";

const OfficerReports = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(window.sessionStorage.getItem("userId"))

  useEffect(() => {
    document.title = "View Reports | MicroHub";
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
      .get(`${import.meta.env.VITE_API_URL}/reports/officer/${userId}`, { headers })
      .then((response) => {
        // console.log(response.data);
        const sortedOfficers = response.data.reports.sort(
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

  const filteredData = results.filter(
    (result) =>
      result.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result?.submittedBy?.userId?.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      result?.submittedBy?.userId?.surname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      result?.submittedBy?.officerId
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

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"report"} />
        {isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : (
          <>
            <div className="content-wrapper">
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-4">
                      <h1 className="m-0">Reports</h1>
                    </div>
                    <div className="col-sm-4">
                      <h5 className="p-0 m-auto">Total Reports: {count} </h5>
                    </div>
                    <div className="col-sm-4">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <a href="/">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Reports</li>
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
                            <div className="col-6 d-flex justify-content-between">
                              <h3 className="card-title">Manage Reports </h3>
                            </div>
                            <div className="col-6">
                              <div className="float-right">
                                <ReportModal
                                  title={"Add New"}
                                  claxx={"btn btn-success btn-sm"}
                                  icon={"nav-icon fa fa-plus mr-2"}
                                  mode={"create"}
                                  buttonText={"Add New"}
                                  setIsLoading={setIsLoading}
                                />
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
                          <table
                            id="dataTables"
                            className="table table-hover text-nowrap jsgrid-table"
                          >
                            <thead>
                              <tr className="text-center">
                                <th>Report ID</th>
                                <th>Report Type</th>
                                <th>Submitted On</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* <input type="hidden" value={currentPageData} /> */}
                              {currentPageData.length === 0 ? (
                                <tr colspan="10" className="text-center">
                                  <td colspan="10">
                                    No data found
                                  </td>
                                </tr>
                              ) : (
                                currentPageData.map((result, index) => (
                                  <tr className="text-center" key={index}>
                                    <td>{result.reportId}</td>
                                   
                                    <td>
                                      {capitalizeFirstLetter(result.reportType)}{" "}
                                      Report
                                    </td>
                                    <td>
                                      <div>{formatDate(result?.createdAt)}</div>
                                      <div>{formatTime(result?.createdAt)}</div>
                                    </td>
                                    <td>
                                      <span
                                        className={`badge ${
                                          result?.status === "approved"
                                            ? "badge-success"
                                            : result?.status === "pending"
                                            ? "badge-warning"
                                            : "badge-danger"
                                        }`}
                                      >
                                        {capitalizeFirstLetter(result?.status)}
                                      </span>
                                    </td>
                                   
                                    <td>
                                      <ReportModal
                                        title={"View"}
                                        claxx={"btn btn-sm btn-info mr-3"}
                                        icon={"nav-icon fa fa-eye mr-2"}
                                        mode={"view"}
                                        data={result}
                                        buttonText={"View"}
                                        formatDate={formatDate}
                                        formatTime={formatTime}
                                        capitalizeFirstLetter={capitalizeFirstLetter}
                                        setIsLoading={setIsLoading}
                                      />
                                    </td>
                                    {/* <td>
                                      <ReportModal
                                        title={"Update"}
                                        claxx={"btn btn-sm btn-warning mr-3"}
                                        icon={"nav-icon fa fa-edit mr-2"}
                                        mode={"update"}
                                        data={result}
                                        buttonText={"Update"}
                                      />
                                    </td> */}
                                  </tr>
                                ))
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

export default OfficerReports;
