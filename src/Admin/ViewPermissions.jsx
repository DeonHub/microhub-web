import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import PermissionModal from "./PermissionModal";
import DeleteModal from "../components/DeleteModal";

const ViewPermissions = () => {

    const data = {}

  useEffect(() => {
    document.title = "View Permissions | Special Ride";
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"permission"} />

        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Admin permissions</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Admin permissions</li>
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
                                <h5 className="m-0">Admin permissions list
                                    <span className="float-right">
                                    <PermissionModal title={"Create"} claxx={"btn btn-success btn-sm"} icon={"nav-icon fa fa-plus mr-2"} mode={"create"} buttonText={"Add New"}/>
                                    </span>
                                </h5>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Guard</th>
                                        <th scope="col" colspan="3"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        
                                            <tr>
                                                <td>admin.signal.index</td>
                                                <td>admin</td>
                                                <td>
                                                <PermissionModal title={"Edit"} claxx={"btn btn-sm btn-warning mr-3"} icon={"nav-icon fa fa-edit mr-2"} mode={"edit"} data={data} buttonText={"Edit"} />
                                                </td>
                                                <td>
                                                <DeleteModal title={"Delete Permission"} content={"Are you sure you want to delete this item? This action cannot be undone."} claxx={"btn btn-sm btn-danger mr-3"}/>
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

export default ViewPermissions;
