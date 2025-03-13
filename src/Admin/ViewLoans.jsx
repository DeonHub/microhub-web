import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import LoanModal from "./LoanModal";

import { Spin } from "antd";


const ViewLoans = () => {
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    const data = [{}]

  useEffect(() => {
    document.title = "View Loans | MicroHub";

    // setIsLoading(true);

    // const token = window.sessionStorage.getItem("token");

    // if (!token) {
    //   navigate("/");
    //   return;
    // }

    // setIsLoading(false);

  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data

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
                <div className="col-sm-6">
                  <h1 className="m-0">Loans</h1>
                </div>
                <div className="col-sm-6">
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
                          <h3 className="card-title">Loans List</h3>
                        </div>
                        <div className="col-6">
                          <div className="float-right">
                             <LoanModal title={"Create"} claxx={"btn btn-success btn-sm"} icon={"nav-icon fa fa-plus mr-2"} mode={"create"} buttonText={"Add New"} setIsLoading={setIsLoading} />
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
                          <tr>
                            <th>Loan ID</th>
                            <th>Client Info</th>
                            <th>Officer Info</th>
                            <th>Total Amount</th>
                            <th>Issued Date</th>
                            <th className="text-center">Payment Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                        <input type="hidden" value={currentPageData} />
                          <tr>
                            <td>64d4d5afe8b2f</td>
                            <td>
                              <div>John Doe</div>
                              <div>@JohnDoe</div>
                        
                            </td>

                            <td>
                              <div>Dennis Lloyd</div>
                              <div>@dennislloy</div>
                            </td>

                            <td>
                              <div>GHS 2000</div>
                            </td>

                            <td>25th March, 2024</td>

                            <td className="text-center">
                              <span className="badge badge-warning">Pending</span>
                            </td>

                            <td className="text-center">
                            <LoanModal title={"View"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-eye mr-2"} mode={"view"} data={data} buttonText={"View"} />
                            </td>
                          </tr>
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
