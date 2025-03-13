import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

const ViewCountries = () => {
  useEffect(() => {
    document.title = "View Countries | Special Ride";
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"country"} />

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Country</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Country</li>
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
                      <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title" style={{lineHeight: "36px;"}}>
                          Country List
                        </h3>
                        <div>
                          <a
                            href="/"
                            className="btn bg-primary btn-sm float-right d-flex align-items-center justify-content-center mr-1"
                          >
                            <i className="fas fa-plus"></i>
                            Add New
                          </a>
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
                            <th>SL</th>
                            <th style={{width: "15%"}}>Country Name</th>
                            <th>Country Iso</th>
                            <th>Status</th>
                            <th>
                              Commission From Driver <br />{" "}
                              <span className="text-warning">(In Percentage)</span>
                            </th>
                            <th>Earning</th>
                            <th>Commission</th>
                            <th>Paystack</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <a href="/">Ghana</a>
                            </td>
                            <td>GH</td>
                            <td>
                              <span className="badge badge-success">Active</span>
                            </td>
                            <td>15%</td>
                            <td>
                              <p className="m-0">
                                <strong> Local Earning : </strong>
                                0.00 GHS
                              </p>
                              <p className="m-0">
                                <strong> USD Earning : </strong>
                                0.00 USD
                              </p>
                            </td>
                            <td>0.00 GHS</td>
                            <td>
                              <span className="badge badge-success">Active</span>
                            </td>
                            <td className="text-center">
                              

                            

                              <a
                                title="Edit Country"
                                href="/"
                                className="btn bg-info mr-1 btn-sm"
                              >
                                <i className="fas fa-edit"></i>
                              </a>


                              <a
                                title="Delete Country"
                                onclick="return confirm('Are you sure want to delete this item?')"
                                href="/"
                                className="btn bg-danger btn-sm"
                              >
                                <i className="fas fa-trash"></i>
                              </a>

                              <a href="/" className="btn btn-secondary btn-sm">
                                Add Price
                              </a>
                            </td>
                          </tr>
                         
                        </tbody>
                        <tfoot>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-right">
                              <strong>
                                <h3>Total:</h3>
                              </strong>
                            </td>
                            <td className="text-center">
                              <strong> USD Earning :</strong>0.00 USD
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AdminFooter />
      </div>
    </div>
  );
};

export default ViewCountries;
