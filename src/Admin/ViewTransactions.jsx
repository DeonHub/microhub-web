import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import TransactionModal from "./TransactionModal";
// import axios from "axios";
import { Spin } from "antd";

const ViewTransactions = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);


    const data = [{
        transactionId: "66682afd028ee",
        paymentBy: "Shyamoli Dean",
        receiveBy: "Abdul Karim",
        paymentMethod: "Cash Payment",
        amount: "1.00 INR",
        status: "paid",
        date: "11 Jun 24",
    }]

  useEffect(() => {
    document.title = "View Transactions | Special Ride";
    setIsLoading(true);

    const token = window.sessionStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }
    setIsLoading(false);
  }, [navigate]);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((dati) =>
    dati.paymentBy.toLowerCase().includes(searchTerm.toLowerCase())
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



  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"transaction"} />
{isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : (
          <>
        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Transactions</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item active">Transactions</li>
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
                                    <div className="col-12 d-flex justify-content-between">
                                        <h3 className="card-title">Manage Transactions </h3>
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
                                        <tr className="text-center">
                                            <th >#</th>
                                            <th >Date</th>
                                            <th >Transaction ID</th>
                                            <th >Order ID</th>
                                            <th >Payment By</th>
                                            <th >Type</th>
                                            <th >Payment Method</th>
                                            <th >Amount</th>
                                            <th >Country</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <input type="hidden" value={currentPageData} />  
                                    {currentPageData.length === 0 ? (
                                <tr colspan="10" className="text-center">
                                  <td colspan="10">
                                    No matching records found
                                  </td>
                                </tr>
                              ) : (
                                currentPageData.map((data, index) => (
                                        <tr className="text-center">
                                            <td>1</td>
                                            <td>11 Jun 24</td>
                                            <td>66682afd028ee</td>
                                            <td>1</td>
                                            <td>Shyamoli Dean</td>

                                            <td>In</td>
                                            <td className="">Bonus</td>
                                            <td className="">1.00 INR</td>
                                            <td>India</td>
                                            <td>
                                            <TransactionModal title={"View"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-eye mr-2"} mode={"view"} data={data} buttonText={"View"} />
                                            </td>
                                            <td>
                                            <TransactionModal title={"Update"} claxx={"btn btn-sm btn-warning mr-3"} icon={"nav-icon fa fa-edit mr-2"} mode={"edit"} data={data} buttonText={"Update"} />
                                            </td>
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

export default ViewTransactions;
