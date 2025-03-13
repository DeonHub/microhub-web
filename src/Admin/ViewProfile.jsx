import React, { useEffect } from "react";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";

const ViewProfile = () => {
  useEffect(() => {
    document.title = "View Profile | Special Ride";
  }, []);

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"dashboard"} />

        <div className="content-wrapper">
    <div className="content-header">
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <h1 className="m-0">Profile</h1>
                </div>
                <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                        <li className="breadcrumb-item active">Profile</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div className="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img className="profile-user-img img-fluid img-circle"
                                    src="/assets/images/default-user.png"
                                    style={{width: "120px", height:"120px", display:"block"}} alt="user" />
                            </div>
                            <h3 className="profile-username text-center">Admin</h3>
                            <p className="text-muted text-center">shikaafitaylor1@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header">
                            <h5>Profile Update</h5>
                        </div>
                        <div className="card-body">
                            <form action="" method="post" enctype="multipart/form-data">
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="image" className="form-label">Profile Photo</label>
                                            <input type="file" name="image" id="image" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="name" className="form-label">Name</label>
                                            <input type="text" name="name" id="name" className="form-control" value="Admin" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="email" className="form-label">Email</label>
                                            <input type="text" name="email" id="email" className="form-control" value="shikaafitaylor1@gmail.com" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success btn-sm">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card">
                        <form action="" method="post">
                           
                            <div className="card-header">
                                <h5>Password Update</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">

                                    <div className="col-lg-6">
                                        <div className="form-group mb-3">
                                            <label for="password" className="form-label">Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="password"
                                                   placeholder="Enter Password" autocomplete="off" required />
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group mb-3">
                                            <label for="password" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="password_confirmation"
                                                   placeholder="Enter Confirm Password" autocomplete="off" required />
                                           
                                        </div>
                                    </div>
                                    <div className="col-lg-12 d-flex justify-content-start">
                                        <button type="submit" className="btn btn-success btn-sm">Update</button>
                                    </div>
                                </div>

                            </div>
                        </form>
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

export default ViewProfile;
