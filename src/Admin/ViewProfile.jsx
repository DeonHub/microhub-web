import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { Spin } from "antd";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "View Profile | Special Ride";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    setTimeout(() => {
        setIsLoading(false);
    }, 2000)

  }, [navigate]);


  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <AdminHeader />

        <AdminSidebar active={"dashboard"} />
        {isLoading ? (
          <Spin fullscreen={true} size={"large"} />
        ) : (
          <>
            <div className="content-wrapper">
              <div className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1 className="m-0">Profile</h1>
                    </div>
                    <div className="col-sm-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <a href="/">Dashboard</a>
                        </li>
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
                            <img
                              className="profile-user-img img-fluid img-circle"
                              src="/assets/images/default-user.png"
                              style={{
                                width: "120px",
                                height: "120px",
                                display: "block",
                              }}
                              alt="user"
                            />
                          </div>
                          <h3 className="profile-username text-center">
                            Admin
                          </h3>
                          <p className="text-muted text-center">
                            admin@microhub.com
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-9">
                      <div className="card">
                        <div className="card-header">
                          <h5>Profile Update</h5>
                        </div>
                        <div className="card-body">
                          <form
                            action=""
                            method="post"
                            enctype="multipart/form-data"
                          >
                            <div className="row">
                              
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="name" className="form-label">
                                    Fullname
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    disabled
                                    className="form-control"
                                    value="John Doe"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    disabled
                                    className="form-control"
                                    value="admin@microhub.com"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Phone Number
                                  </label>
                                  <input
                                    type="text"
                                    disabled
                                    className="form-control"
                                    value="+233 1234567890"
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="name" className="form-label">
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    disabled
                                    className="form-control"
                                    value="Accra, Adenta"
                                  />
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
            </div>

            <AdminFooter />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;
