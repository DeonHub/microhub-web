import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from "antd";

const OfficerPasswordReset = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Password Reset | Special Ride";
    const token = window.sessionStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    setTimeout(() => {
        setIsLoading(false);
    }, 2000)

  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm-password") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    const token = window.sessionStorage.getItem("token");
    event.preventDefault();
    let body = {
      password,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/update-password`, body, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          // setMessage('Login Successfully')
          openNotification(
            "topRight",
            "success",
            "Password Reset Successful",
            "Password Reset Successful. Please Login to continue."
          );

          window.sessionStorage.clear();
          window.localStorage.clear();

          setTimeout(() => {
            navigate(`/login`);
          }, 2000);
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );

        console.log("error :>> ", error.response.data.message);
      });
  };

  const passwordsMatch = password === confirmPassword && password.length >= 8;

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
                      <h1 className="m-0">Password Reset</h1>
                    </div>
                    <div className="col-sm-6">
                      <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item">
                          <a href="/">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active">Password Reset</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content">
                <div className="container-fluid">
                  <div className="row">
                  
                    <div className="col-md-12">
                
                      <div className="card">
                        <form action="" method="post">
                          <div className="card-header">
                            <h5>Password Update</h5>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group mb-3">
                                  <label for="password" className="form-label">
                                    Password{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter Password"
                                    autocomplete="off"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group mb-3">
                                  <label for="password" className="form-label">
                                    Confirm Password{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    name="confirm-password"
                                    placeholder="Enter confirm password"
                                    autocomplete="off"
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 d-flex justify-content-start">
                                <button
                                  type="submit"
                                  className="btn btn-success btn-sm btn-block"
                                  onClick={handleSubmit}
                                  disabled={!passwordsMatch}
                                >
                                  Update
                                </button>
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
          </>
        )}
      </div>
    </div>
  );
};

export default OfficerPasswordReset;
