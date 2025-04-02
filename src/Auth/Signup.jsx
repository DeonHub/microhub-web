import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { Spin } from "antd";
import axios from "axios";
import openNotification from "../components/OpenNotification";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    password: "",
    contact: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Signup | MicroHub";
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const isEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      openNotification(
        "topRight",
        "error",
        "Signup Error",
        "All fields are required"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    window.sessionStorage.clear();
    window.localStorage.clear();

    if (!validateForm()) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(formData.email);

    if (!isEmailValid) {
      openNotification(
        "topRight",
        "error",
        "Signup Error",
        "Please enter a valid email address"
      );

      return;
    }

    setIsLoading(true);

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData)
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          openNotification(
            "topRight",
            "success",
            "Success",
            "Registration successful. Login to continue"
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );

        console.log("error :>> ", error.response.data.message);
      });
  };

  return (
    <>
    {isLoading && ( <Spin fullscreen={true} size={"large"} /> )} 

    <div className="signin_sec bg-black">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-lg-5 col-xl-5">
            <form method="POST" action="/login">
              <div className="signin_form p-4 bg-white">
                <div className="mb-5 text-center">
                  <a href="/">
                    <img
                      src="/assets/logo.png"
                      width="150"
                      alt="logo"
                      style={{ borderRadius: "100px" }}
                    />
                  </a>
                </div>
                <div className="mb-3">
                  <label for="firstname" className="form-label">
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleInputChange}
                    placeholder="Enter your firstname"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="surname" className="form-label">
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleInputChange}
                    placeholder="Enter your lastname"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="contact" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    id="contact"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    autoComplete="off"
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="create_account text-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary w-100"
                  >
                    Sign Up
                  </button>
                </div>
                {/* <Button className="btn btn-primary w-100" loading iconPosition={'end'} onClick={handleSubmit} >
                                    Sign In
                                </Button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Signup;
