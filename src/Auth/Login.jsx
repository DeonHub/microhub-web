import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './Auth.css'
import { Spin } from 'antd';
import axios from "axios";
import openNotification from "../components/OpenNotification";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Login | MicroHub"
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        window.sessionStorage.clear();
        
        if(email.length === 0 || password.length === 0) {
            openNotification("topRight", "error", "Login Error", "All fields are required");
            return;
        }

        setIsLoading(true);

     const body = { email, password };

     if(email === "admin@microhub.com" && password === "qwertyuiop") {
        setIsLoading(false);
        openNotification("topRight", "success", "Success", "Login successful");
        navigate("/admin/dashboard");
        } else{
            openNotification("topRight", "error", "Login Error", "Invalid email address or password");

            setIsLoading(false);
        }


    //   axios
    //     .post(`${process.env.REACT_APP_API_URL}/auth/sign-in`, body, { headers: {
    //       'Content-Type': 'application/json'
    //     },})
    //     .then((response) => {
    //     //   if (response.data.success) {

    //         window.sessionStorage.setItem("token", response.data.accessToken);
    //         window.sessionStorage.setItem("refreshToken", response.data.refreshToken);

    //         openNotification("topRight", "success", "Success", "Login Successful");
    //         setEmail("");
    //         setPassword("");
    //         setIsLoading(false);

    //         setTimeout(() => {
    //           navigate(`/admin/dashboard`);
    //         }, 1000);
    //     //   }
    //     })
    //     .catch((error) => {
    //       openNotification("topRight", "error", "Login Error", "Invalid email address or password");
    //       setEmail("");
    //       setPassword("");

    //       console.log("error :>> ", error);
    //       setIsLoading(false);
    //     });

    }


    return(

        isLoading ? (<Spin fullscreen={true} size={'large'} />) : (
            <div className="signin_sec bg-black">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-5">
                        <form method="POST" action="/login">
                            <div className="signin_form p-5 bg-white">
                                <div className="mb-5 text-center">
                                    <a href="/">
                                        <img src="/assets/logo.png" width="150" alt="logo" style={{ borderRadius: "100px"}} />
                                    </a>
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email Address</label>
                                    <input type="email" name="email" id="email" className="form-control" autoComplete="off" onChange={((e) => {setEmail(e.target.value)})} placeholder="Enter your email" required />
                                   
                                </div>
                                <div className="mb-3">
                                    <label for="password" className="form-label">Password</label>
                                    <input type="password"name="password" id="password" className="form-control" autoComplete="off" onChange={((e) => {setPassword(e.target.value)})} placeholder="Enter your password" required />
                                </div>
                                <div className="create_account text-center">
                                    <button type="button" onClick={handleSubmit} className="btn btn-primary w-100">Sign In</button>
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
        )
        

    );
}


export default Login;