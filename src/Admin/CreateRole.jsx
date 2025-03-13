import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";


const CreateRole = () => {
  useEffect(() => {
    document.title = "Create Role | Special Ride";
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
                        <h1 className="m-0">Admin role create</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a>
                            </li>
                            <li className="breadcrumb-item active">Admin role create</li>
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
                                <h5 className="m-0">Admin role create
                                    <span className="float-right">
                                    <a href="/" className="btn btn-sm btn-info">Back</a>
                                    </span>
                                </h5>
                            </div>
                            <div className="card-body">

                                <form method="POST" action="">
                                   
                                    <div className="mb-3">
                                        <label for="name" className="form-label">Role Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            placeholder="Name" required />

                                       
                                    </div>

                                    <div className="mb-3">

                                       <div className="row">
                                           <div className="col-3">
                                            <div className="custom-control custom-checkbox">
                                            <input value="1" type="checkbox" className="custom-control-input" name="permission_all" id="permission_all" />
                                            <label for="permission_all" className="custom-control-label text-capitalize">All Permission</label>
                                           </div>
                                           </div>
                                       </div>

                                    </div>

                                    <div className="mb-3">
                                       
                                            <div className="row">
                                                <div className="col-3">
                                                    <div className="custom-control custom-checkbox">
                                                        <input className="custom-control-input" type="checkbox"
                                                            id="management"
                                                            
                                                            value="2" />
                                                        <label for="management" className="custom-control-label text-capitalize">Admin</label>
                                                    </div>
                                                </div>

                                                <div className="col-9 role-management-checkbox">
                                                    
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.index</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.create</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.edit</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.store</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.delete</label>
                                                        </div>
                                                        <div className="custom-control custom-checkbox">
                                                            <input name="permissions[]" className="custom-control-input" type="checkbox" id="" value="" />
                                                            <label for="" className="custom-control-label">admin.admin.update</label>
                                                        </div>
                                                       
                                                </div>

                                            </div>
                                            <hr />
                                           


                                    </div>
                                    

                                    <button type="submit" className="btn btn-success btn-sm">Save</button>

                                </form>


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

export default CreateRole;
