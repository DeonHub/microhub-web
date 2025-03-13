import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import TicketModal from "./TicketModal";

const ViewTickets = () => {
  const data = {}
  useEffect(() => {
    document.title = "View Tickets | MicroHub";
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"ticket"} />

        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0">Support Tickets</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="/">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Support Tickets</li>
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
                          <h3 className="card-title">Manage Support Tickets </h3>
                          
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
                            <th>#</th>
                            <th>Image</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>
                              <img
                                src="/assets/images/default-user.png"
                                width="50"
                                className="border rounded"
                                alt="user"
                              />
                            </td>
                            <td>Shikaafi Taylor</td>
                            <td>
                              

                              <span className="badge badge-warning">Pending</span>
                            </td>
                            <td>
                              <span className="badge badge-info">Low</span>
                            </td>
                            <td>
                            <TicketModal title={"View"} claxx={"btn btn-sm btn-success mr-3"} icon={"nav-icon fa fa-eye mr-2"} mode={"view"} data={data} buttonText={"View"} />

                            <TicketModal title={"Reply"} claxx={"btn btn-sm btn-info mr-3"} icon={"nav-icon fa fa-edit mr-2"} mode={"reply"} data={data} buttonText={"Reply"} />

                            </td>
                          </tr>
                        </tbody>
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

export default ViewTickets;
