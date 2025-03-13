import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import AdminModal from "./AdminModal";
// import DeleteModal from "../components/DeleteModal";
import axios from "axios";
import { Spin } from "antd";
import StatusModal from "../components/StatusModal";


const ViewAdmins = () => {
    // const data = {}
    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);

    useEffect(() => {
        document.title = "View Admins | Special Ride";
    
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
          .get(`${process.env.REACT_APP_API_URL}/admins`, { headers })
          .then((response) => {
            //   console.log(response.data.data);
            const sortedData = response.data.data.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setAdmins(sortedData);
            //   setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
            //   setIsLoading(false);
          });
    
        axios
          .get(`${process.env.REACT_APP_API_URL}/countries`, { headers })
          .then((response) => {
            // console.log(response.data.data);
            setCountries(response.data.data);
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
    
      const filteredData = admins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchTerm.toLowerCase())
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

        <AdminSidebar active={"admin"} />
{isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : (
          <>
        <div className="content-wrapper">
    <div className="container-xl">
        <div className="page-header d-print-none mt-2 mb-3">
            <div className="row align-items-center">
                <div className="col">
                    <div className="page-pretitle">
                        Overview
                    </div>
                    <h2 className="page-title">
                        Admins
                    </h2>
                </div>
            </div>
        </div>
    </div>

    <div className="page-body">
        <div className="container-xl">
            <div className="row row-deck row-cards">
                <div className="col-sm-12 col-lg-12">
                    <div className="card">
                    <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h3 className="card-title">Manage Admins </h3>
                                    </div>
                                    <div className="col-6">
                                        <div className="float-right">
                                            <AdminModal title={"Create"} claxx={"btn btn-success btn-sm"} icon={"nav-icon fa fa-plus mr-2"} mode={"create"} buttonText={"Add New"} countries={countries}
                                  setIsLoading={setIsLoading}/>
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
                            <div className="px-2 py-2 table-responsive">
                                <table className="table table-hover text-nowrap jsgrid-table" id="table-plan">
                                    <thead>
                                        <tr>
                                            <th>SL.No</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Contact</th>
                                            <th>Joined</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentPageData.length === 0 ? (
                                <tr colspan="10" className="text-center">
                                  <td colspan="10">
                                    No matching records found
                                  </td>
                                </tr>
                              ) : (
                                currentPageData.map((admin, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><a
                                                    href="/">{admin.name}</a>
                                            </td>
                                            <td className="text-muted">
                                                {admin?.user?.email}
                                            </td>
                                            <td className="text-muted text-capitalize">
                                                {admin.phoneNumber}
                                            </td>
                                            <td className="text-muted">
                                                June 10, 2024 12:00 AM
                                            </td>
                                            <td className="text-muted">
                                            {admin.status === 'active' ? (
                                                <span className="badge badge-success">
                                                    Active
                                                </span>
                                                ) : (
                                                <span className="badge badge-secondary">
                                                    Inactive
                                                </span>
                                                )}
                                            </td>
                                         

                                            <td>

                                            <AdminModal title={"View"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-eye mr-2"} mode={"view"} data={admin} buttonText={"View"}  />

                                            <AdminModal title={"Edit"} claxx={"btn btn-sm btn-warning mr-3"} icon={"nav-icon fa fa-edit mr-2"} mode={"edit"} data={admin} buttonText={"Edit"} countries={countries} picture={admin.profilePicture} setIsLoading={setIsLoading}/>
                                            {/* <DeleteModal title={"Delete Admin"} content={"Are you sure you want to delete this item? This action cannot be undone."} claxx={"btn btn-sm btn-danger mr-3"}/> */}
                                            <StatusModal
                                        title={admin?.status === 'active' ? "Disable Admin" :"Enable Admin"}
                                        content={
                                          `Are you sure you want to ${admin?.status === 'active' ? 'disable' : 'enable'} this admin?`
                                        }
                                        claxx={`btn btn-sm btn-${admin?.status === 'active' ? 'secondary' : 'success'} mr-3`}
                                        setIsLoading={setIsLoading} id={admin.id} redirectUrl={'admins'} updateUrl={'admins'}
                                        status={admin?.status}
                                      />

                                            </td>



                                        </tr>
                                     ))
                              )}
                                       
                                       
                                    </tbody>
                                </table>
                            </div>
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

export default ViewAdmins;
