import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import DeleteModal from "../components/DeleteModal";

const ViewRoles = () => {
  useEffect(() => {
    document.title = "View Roles | Special Ride";
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"role"} />

        <div className="content-wrapper">
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Admin roles</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a
                                    href="/">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Admin roles</li>
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
                                <h5 className="m-0">Admin roles list
                                    <span className="float-right">
                                            <a href="/admin/admins" className="btn btn-sm btn-info mr-3">All Admin Users</a>
                                            <a href="/admin/role/create" className="btn btn-sm btn-success">Create Role</a>
                                    </span>
                                </h5>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <tr>
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Permission</th>
                                        <th colspan="2">Action</th>
                                    </tr>
                                        <tr>
                                            <td>1</td>
                                            <td>superadmin</td>
                                            <td>
                                                <div>
                                                   
                                                    <span className="badge badge-primary">admin.admin.index</span>
                                                    <span className="badge badge-primary">admin.bookings.index</span>
                                                    <span className="badge badge-primary">admin.category.index</span>
                                                    <span className="badge badge-primary">admin.contact.index</span>
                                                    <span className="badge badge-primary">admin.faq.index</span>
                                                    <span className="badge badge-primary">admin.language.index</span>
                                                    <span className="badge badge-primary">admin.investments.index</span>
                                                    <span className="badge badge-primary">admin.signal.index</span>
                                                    <span className="badge badge-primary">admin.package.index</span>
                                                    <span className="badge badge-primary">admin.order.index</span>
                                                    <span className="badge badge-primary">admin.banner.index</span>
                                                    <span className="badge badge-primary">admin.admin.index</span>
                                                    <span className="badge badge-primary">admin.bookings.index</span>
                                                    <span className="badge badge-primary">admin.category.index</span>
                                                    <span className="badge badge-primary">admin.contact.index</span>
                                                    <span className="badge badge-primary">admin.faq.index</span>
                                                    <span className="badge badge-primary">admin.language.index</span>
                                                    <span className="badge badge-primary">admin.investments.index</span>
                                                    <span className="badge badge-primary">admin.signal.index</span>
                                                    <span className="badge badge-primary">admin.package.index</span>
                                                    <span className="badge badge-primary">admin.order.index</span>
                                                    <span className="badge badge-primary">admin.banner.index</span>
                                                    
                                                </div>
                                            </td>

                                            <td>
                                                <a className="btn btn-info btn-sm"
                                                   href="/admin/role/edit/1">Edit</a>
                                            </td>
                                            <td>


                                            <DeleteModal title={"Delete Role"} content={"Are you sure you want to delete this item? This action cannot be undone."} claxx={"btn btn-sm btn-danger"} noicon={'true'}/>
                                                

                                            </td>
                                        </tr>
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

export default ViewRoles;
