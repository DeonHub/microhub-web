import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from "antd";

const OfficerProfile = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [officer, setOfficer] = useState({});

  useEffect(() => {
    document.title = "View Officer Profile | MicroHub";

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
        .get(`${import.meta.env.VITE_API_URL}/officers/x/profile`, { headers })
        .then((response) => {

          setOfficer(response.data.officer);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
  }, [navigate]);


  const capitalizeFirstLetter = (word) => {
    if (typeof word !== "string" || word.length === 0) {
      return ""; // Handle invalid input
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };


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
                              src={
                                officer?.userId?.profilePicture
                                    ? officer?.userId?.profilePicture
                                    : `https://ui-avatars.com/api/?name=${officer?.userId?.firstname}+${officer?.userId?.surname}&background=random&color=fff`}
                              style={{
                                width: "120px",
                                height: "120px",
                                display: "block",
                              }}
                              alt="user"
                            />
                          </div>
                          <h3 className="profile-username text-center">
                            Officer
                          </h3>
                          <p className="text-black text-center">
                            Officer ID: {officer?.officerId}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-9">
                      <div className="card">
                        <div className="card-header">
                          <h5>Profile Info</h5>
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
                                    Firstname
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    
                                    className="form-control"
                                    value={officer?.userId?.firstname}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="name" className="form-label">
                                    Surname
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    
                                    className="form-control"
                                    value={officer?.userId?.surname}
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
                                    value={officer?.userId?.email}
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
                                    value={officer?.userId?.contact}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="name" className="form-label">
                                    Nationality
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    
                                    className="form-control"
                                    value={officer?.userId?.nationality}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="name" className="form-label">
                                    Date of Birth
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    
                                    className="form-control"
                                    value={officer?.userId?.dateOfBirth || "N/A"}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Gender
                                  </label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    
                                    className="form-control"
                                    value={capitalizeFirstLetter(officer?.userId?.gender)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Marital Status
                                  </label>
                                  <input
                                    type="text"
                                    
                                    className="form-control"
                                    value={capitalizeFirstLetter(officer?.maritalStatus)}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Postal Address
                                  </label>
                                  <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    
                                    className="form-control"
                                    value={officer?.postalAddress}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <label for="email" className="form-label">
                                    Emergency contact
                                  </label>
                                  <input
                                    type="text"
                                    
                                    className="form-control"
                                    value={officer?.emergencyContact || "N/A"}
                                  />
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  {/* <button
                                    type="submit"
                                    className="btn btn-success btn-sm"
                                  >
                                    Update
                                  </button> */}
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

export default OfficerProfile;
