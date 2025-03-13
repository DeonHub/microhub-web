import React, { useEffect, useState } from "react";
import './Admin.css'
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminFooter from "./components/AdminFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from 'antd';
import { DefaultEditor } from "react-simple-wysiwyg";

const Settings = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [settings, setSettings] = useState(false);
    const [formState, setFormState] = useState({
        siteLogo: "",
        adminLogo: "Special Ride",
        seoImage: "",
        favicon: "",
        appName: "",
        appVersion: "",
        siteName: "",
        siteTitle: "",
        seoMetaDescription: "",
        seoKeywords: "",
        mainMotto: "",
        termsAndConditions: "",
        privacyPolicy: "",
        licenses: ""
      });



    useEffect(() => {
        document.title = "Settings | MicroHub";


        // setIsLoading(true);
        const token = window.sessionStorage.getItem("token");

        // if (!token) {
        //     navigate("/");
        //     return;
        //   }

        const headers = {
          Authorization: `Bearer ${token}`
        };

        // axios.get(`${process.env.REACT_APP_API_URL}/settings`, { headers })
        //     .then((response) => {
        //         if (response.data.data && response.data.data.length > 0) {
        //         const settingsData = response.data.data[0];

        //         // Set the form state with the response data
        //         setFormState((prevState) => ({
        //             ...prevState,
        //             ...settingsData
        //         }));
        //         setSettings(true)
        //         }
        //         setIsLoading(false);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //         setIsLoading(false);
        //     });

    },[navigate])

   

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue =
        type === "file"
          ? files[0]
          : value;
    
        setFormState((prevState) => ({
          ...prevState,
          [name]: name === 'order' ? Number(newValue) : newValue
        }));
      };
      

      const handleSubmit = () => {
        const token = window.sessionStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
        };
    
        if (Object.values(formState).some(value => !value)) {
            
            openNotification(
              "topRight",
              "error",
              "Error",
              "All fields are required."
            );
            return;
          }
    
        setIsLoading(true);

        const body = new FormData();
        for (const key in formState) {
        body.append(key, formState[key]);
        }
    

        console.log(body)

          axios.post(`${process.env.REACT_APP_API_URL}/settings`, body, { headers })
            .then((response) => {
                openNotification(
                  "topRight",
                  "success",
                  "Settings updated successfully",
                  "Settings has been updated successfully."
                );
        
                setTimeout(() => {
                  window.location.href = `/admin/settings`;
                }, 1000);
            })
            .catch((error) => {
              openNotification(
                "topRight",
                "error",
                "Error",
                'An error occurred while updating the setting.'
              );
              console.error(error);
              setIsLoading(false);
            })


      }

    return(
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">

            <AdminHeader />

            <AdminSidebar active={"setting"} />

            {isLoading ? (<Spin  fullscreen={true} size={'large'} />) : (
                <>
            <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">General Settings</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/">Dashboard</a>

                                </li>
                                <li className="breadcrumb-item active">Settings</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                       
                        <div className="col-lg-12">
                            <form action="/" method="post"
                                enctype="multipart/form-data" id="settingUpdate">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="m-0">Settings</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Site Settings</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-lg-6 col-xl-4">
                                                                {formState?.siteLogo && (
                                                                    <img src={`data:image/png;base64,${formState?.siteLogo}`} height="50px" alt="default" />
                                                                )}
                                                                <div className="mb-3">
                                                                    <label className="form-label">Site Logo
                                                                        <span className="text-danger"> (Recommended size : 180x60)</span>
                                                                    </label>
                                                                    <input
                                                                        type="file"
                                                                        className="form-control"
                                                                        placeholder="Site Logo..."
                                                                        accept=".png,.jpg,.jpeg,.gif,.svg"
                                                                        name="siteLogo"
                                                                        onChange={handleInputChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="col-lg-6 col-xl-4">
    
                                                            {/* { formState?.seoImage && (<img src={`data:image/png;base64,${formState?.seoImage}`} height="50px" alt="default" />) } */}
                                                            {formState?.seoImage && (
                                                                                                                            <img src={`data:image/png;base64,${formState?.seoImage}`} height="50px" alt="default" />
                                                                                                                        )}
                                                                <div className="mb-3">
                                                                    <label className="form-label">SEO image<span
                                                                            className="text-danger"> {" "}
                                                                            (Recommended size : 728x680)</span>
                                                                    </label>
                                                                    <input type="file" className="form-control"
                                                                        placeholder="SEO image..."
                                                                        accept=".png,.jpg,.jpeg,.gif,.svg" 
                                                                        name="seoImage"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
    
                                                            <div className="col-lg-6 col-xl-4">
                                                            {/* { formState?.favicon && (<img src={`data:image/png;base64,${formState?.favicon}`} height="50px" alt="default" />) } */}
                                                                {/* {formState?.favicon && /^data:image\/[a-z]+;base64,/.test(formState?.favicon) && ( */}
                                                                {formState?.favicon && (
                                                                                                                            <img src={`data:image/png;base64,${formState?.favicon}`} height="50px" alt="default" />
                                                                                                                        )}
                                                                <div className="mb-3">
                                                                    <label className="form-label">Favicon<span
                                                                            className="text-danger">{" "}
                                                                            (Recommended size : 200x200)</span>
                                                                    </label>
                                                                    <input type="file" className="form-control" 
                                                                        placeholder="Favicon..."
                                                                        accept=".png,.jpg,.jpeg,.gif,.svg" 
                                                                        name="favicon"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
    
                                                            <div className="col-lg-6 col-xl-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">App Name</label>
                                                                    <input type="text" className="form-control"
                                                                        value={formState.appName}
                                                                        placeholder="App Name..." readonly 
                                                                        name="appName"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-xl-4">
                                                                <div className="mb-3">
                                                                    <label className="form-label">App Version</label>
                                                                    <input type="text" className="form-control"
                                                                        value={formState.appVersion}
                                                                        placeholder="App Version" 
                                                                        name="appVersion"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-xl-4">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label required">Site Name</label>
                                                                    <input type="text" className="form-control"
                                                                        value={formState.siteName}
                                                                        placeholder="Site Name..." required 
                                                                        name="siteName"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-6 col-xl-4">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label required">Site Title</label>
                                                                    <input type="text" className="form-control"
                                                                        value={formState.siteTitle}
                                                                        placeholder="Site Title..." required 
                                                                        name="siteTitle"
                                                                        onChange={handleInputChange}
                                                                        />
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label required">SEO Meta Description</label>
                                                                    <textarea className="form-control"  rows="3" placeholder="SEO Meta Description"
                                                                        style={{height: "120px !important;"}} required
                                                                        name="seoMetaDescription"
                                                                        onChange={handleInputChange}
                                                                        
                                                                        >{formState.seoMetaDescription}</textarea>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">SEO Keywords</label>
                                                                    <textarea className="form-control required" 
                                                                     rows="3"
                                                                        placeholder="SEO Keywords (Keyword 1, Keyword 2)" style={{height: "150px !important;"}}
                                                                        name="seoKeywords"
                                                                        onChange={handleInputChange}
                                                                        required>{formState.seoKeywords}</textarea>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Main Motto</label>
                                                                    <textarea className="form-control required" rows="3" placeholder="Main moto"
                                                                        style={{height: "150px !important;"}} 
                                                                        name="mainMotto"
                                                                        onChange={handleInputChange}
                                                                        required>{formState.mainMotto}</textarea>
                                                                </div>
                                                            </div>
                                                           
                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label">Terms And condition</label>
                                                                        <DefaultEditor value={formState.termsAndConditions} name="termsAndConditions" onChange={handleInputChange} />

                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label">Privacy And Policy</label>
                                                                        <DefaultEditor value={formState.privacyPolicy} name="privacyPolicy" onChange={handleInputChange} />

                                                                </div>
                                                            </div>

                                                            <div className="col-12">
                                                                <div className="mb-3">
                                                                    <label
                                                                        className="form-label">Licenses</label>
                                                                        <DefaultEditor value={formState.licenses} name="licenses" onChange={handleInputChange} />

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <button type="button" onClick={handleSubmit} className="btn btn-success" id="updateButton">{settings ? 'Update' : 'Create'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
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
}


export default Settings;