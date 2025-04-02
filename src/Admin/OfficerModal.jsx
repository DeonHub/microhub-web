import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import FileUpload from "./components/FileUpload";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { countries, maritalStatus } from "./components/data";
import { Form } from "react-router-dom";

const OfficerModal = ({
  data,
  mode,
  claxx,
  icon,
  title,
  buttonText,
  setIsLoading,
  formatDate,
  capitalizeFirstLetter
}) => {
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState({
    firstname: "",
    surname: "",
    email: "",
    contact: "",
    dateOfBirth: "",
    gender: "",
    residentialAddress: "",
    postalAddress: "",
    town: "",
    nationality: "",
    maritalStatus: "",
    emergencyContact: "",
    idType: "",
    idNumber: "",
    profilePicture: "",
    idFront: "",
    idBack: ""
  });

  

  const showModal = () => {
    if (data) {                 
      // console.log(data)
 
      const { firstname, surname, nationality, contact, profilePicture, ...rext } = data?.userId
      const {userId, ...rest } = data;
      
      setFormState(prev => ({
        ...prev,
        ...rest,
        ...rext,
        firstname,
        surname,
        nationality,
        contact: contact || prev.contact,
        profilePicture: profilePicture || prev.profilePicture
      }));
    }
    setOpen(true);

    // console.log(formState)
  };

  const handleOk = () => {
    console.log("Form data:", formState);
    // Handle form submission logic here
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = async (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === "file" ? files[0] : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
 

  const handleSubmit = async () => {

    const token = window.sessionStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
  
    setIsLoading(true);

    if (mode === "create") {
      const nonRequiredFields = ["emergencyContact"];

      if (
        Object.entries(formState).some(
          ([key, value]) => 
            !nonRequiredFields.includes(key) &&
            !value?.toString().trim()
        )
      ) {
        openNotification(
          "topRight",
          "error",
          "Error",
           "Please fill in all required fields"
        );
        setIsLoading(false); 
        return;
      }


      const body = new FormData();
      for (const key in formState) {
        body.append(key, formState[key]);
      }


      // console.log(body);


      axios.post(`${import.meta.env.VITE_API_URL}/officers`, body, { headers })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);

          openNotification(
            "topRight",
            "success",
            "Success",
            "Officer has been saved successfully."
          );

          setTimeout(() => {
              window.location.reload();
          }, 1000)
      
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message
        );
        setIsLoading(false);
      });

  
    } else {
      // Update officer logic

      // if (Object.values(formState).some((value) => !value)) {
      //   openNotification(
      //     "topRight",
      //     "error",
      //     "Error",
      //     "All fields are required."
      //   );
      //   setIsLoading(false); 
      //   return;
      // }


      const body = new FormData();
      for (const key in formState) {
        body.append(key, formState[key]);
      }

      axios.patch(`${import.meta.env.VITE_API_URL}/officers/${data?._id}`, body, { headers })
      .then((response) => {
        // console.log(response);

        if (response.data.success) {
          setIsLoading(false);
          openNotification(
            "topRight",
            "success",
            "Officer updated successfully",
            "Officer details have been updated successfully."
          );
          window.location.reload();

        }})
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            "Error updating officer"
          );

          console.log("error >>", error)
          setIsLoading(false);
        });
        
      } 
    }

  

  return (
    <>
      <span title={title} onClick={showModal} className={claxx}>
        <i className={icon}></i>
        <span>{buttonText}</span>
      </span>

      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        style={{ zIndex: "1", left: "10%" }}
        footer={[]}
      >
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-6">
              <h3 className="card-title">{title} Officer</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <>
          <div className="card card-widget widget-user shadow">
            <div className="widget-user-header bg-secondary">
              <h3 className="widget-user-username">
                {data?.userId?.firstname} {data?.userId?.surname}
              </h3>
              <h5 className="widget-user-desc">{data?.userId?.email}</h5>
            </div>
            <div className="-mt-10 text-center">
                  <img
                    className="rounded-circle elevation-3"
                    src={
                      data?.userId?.profilePicture
                          ? data?.userId?.profilePicture
                          : `https://ui-avatars.com/api/?name=${data?.userId?.firstname}+${data?.userId?.surname}&background=random&color=fff`
                        } 
                    alt="Officer"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      marginTop: "-50px", 
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>

            <div className="card-footer">
              <div className="row">
                <div className="col-sm-6 border-right">
                  <div className="description-block">
                    <h5 className="description-header">Status</h5>
                    <span className="description-text">
                      <span
                        className={`badge bg-${
                          data.userId?.status === "active" ? "success" : "secondary"
                        }`}
                        style={{ minWidth: "65px" }}
                      >
                        {data.userId?.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </span>
                  </div>
                </div>
                {/* <div className="col-sm-4 border-right">
                  <div className="description-block">
                    <h5 className="description-header">Assigned Officer</h5>
                    <span className="description-text">{data?.assignedOfficer || "No assigned officer"}</span>
                  </div>
                </div> */}
                <div className="col-sm-6">
                  <div className="description-block">
                    <h5 className="description-header">Registered At</h5>
                    <span className="description-text">{formatDate(data?.userId?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <h6>Basic Information</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-striped">
                        <tbody>
                        <tr><th>Phone number</th><td>{data?.userId?.contact ? data?.userId?.contact : "Not set"}</td></tr>
                        <tr><th>Date of Birth</th><td>{data?.userId?.dateOfBirth || "Not set"}</td></tr>
                        <tr><th>Gender</th><td>{capitalizeFirstLetter(data?.userId?.gender) || "Not set"}</td></tr>
                        <tr><th>Residential Address</th><td>{data?.residentialAddress || "Not set"}</td></tr>
                        <tr><th>Postal Address</th><td>{data?.postalAddress || "Not set"}</td></tr>
                        <tr><th>Town</th><td>{data?.town || "Not set"}</td></tr>
                        <tr><th>Nationality</th><td>{data?.userId?.nationality || "Not set"}</td></tr>
                        <tr><th>Marital Status</th><td>{capitalizeFirstLetter(data?.maritalStatus) || "Not set"}</td></tr>
                        <tr><th>Emergency Contact</th><td>{data?.emergencyContact || "Not set"}</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
        
                  <div className="card mt-3">
                    <div className="card-header bg-danger text-white">
                      <h6>Identity Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-striped">
                        <tbody>
                        <tr><th>ID Type</th><td>{ data?.idType === "nationalId" ? "National ID" : data?.idType === "passport" ? "Passport" : "Drivers License" }</td></tr>
                  <tr><th>ID Number</th><td>{data?.idNumber}</td></tr>
                  <tr>
                    <th>ID Front</th>
                    <td>
                      <a href={data?.idFront} target="_blank">View ID Front</a>
                        
                    </td>
                  </tr>
                  <tr>
                    <th>ID Back</th>
                    <td>
                    <a href={data?.idBack} target="_blank">View ID Back</a>
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
        </>
        
        ) : (
          <>
            <div className="card-body">
              <form enctype="multipart/form-data">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                  <fieldset>
                    <p className="bold text-dark text-lg">Basic Information</p>

                    <div className="row">
                      <div className="col-md-6">
                        <label className="form-label required" for="name">
                          First Name <span className="text-danger">*</span>{" "}
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter First Name"
                          name="firstname"
                          onChange={handleInputChange}
                          value={formState.firstname}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control "
                          name="surname"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter Last Name"
                          value={formState.surname}
                          required
                        />
                      </div>
                    </div>

                    {mode === 'create' && (<>
                      <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="form-label required" for="password">
                          Email Address<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="email"
                          onChange={handleInputChange}
                          type="email"
                          value={formState.email}
                          placeholder="Enter Email"
                          disabled={mode === "edit"}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label required" for="password">
                          Phone number<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="contact"
                          onChange={handleInputChange}
                          type="tel"
                          value={formState.contact}
                          disabled={mode === "edit"}
                          placeholder="Enter Phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="">
                          <label className="form-label">Gender</label>
                          <select
                            className="form-control"
                            name="gender"
                            onChange={handleInputChange}
                            disabled={mode === "edit"}
                          >
                            <option value="">Select Gender</option>

                            <option
                              value="male"
                              selected={formState.gender === "male"}
                            >
                              Male
                            </option>
                            <option
                              value="female"
                              selected={formState.gender === "female"}
                            >
                              Female
                            </option>
                            <option value="others">Others</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="">
                          <label className="form-label">Date of Birth</label>
                          <input
                            className="form-control "
                            name="dateOfBirth"
                            onChange={handleInputChange}
                            type="date"
                            placeholder="Enter address"
                            disabled={mode === "edit"}
                            value={formState.dateOfBirth}
                          />
                        </div>
                      </div>
                    </div>
                    </>)}
                   

                    <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="">
                          <label className="form-label">
                            Nationality <span className="text-danger">*</span>
                          </label>
                          <select
                            name="nationality"
                            onChange={handleInputChange}
                            className="select2 form-control"
                            required
                          >
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                              <option value={country} key={country} selected={formState.nationality === country}>{country}</option>
                            ))}
                            
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          Residential Address{" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control "
                          name="residentialAddress"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter Residential Address"
                          value={formState.residentialAddress}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          Postal Address <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control "
                          name="postalAddress"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter Postal Address"
                          value={formState.postalAddress}
                          required
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          Town/City {" "}
                          <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control "
                          name="town"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter Town or City"
                          value={formState.town}
                          required
                        />
                      </div>

                      
                    </div>

                    <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="">
                          <label className="form-label">
                            Marital Status <span className="text-danger">*</span>
                          </label>
                          <select
                            name="maritalStatus"
                            onChange={handleInputChange}
                            className="select2 form-control"
                            required
                          >
                            <option value="">Select marital status</option>
                            {Object.entries(maritalStatus).map(([key, value]) => (
                              <option
                                key={key}
                                value={key}
                                selected={key === formState.maritalStatus}
                              >
                                {value}
                              </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          Emergency Contact{" "}
                        </label>
                        <input
                          className="form-control "
                          name="emergencyContact"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter emergency contact"
                          value={formState.emergencyContact}
                        />
                      </div>
                    

                      
                    </div>
                    </fieldset>

{mode === 'create' && (<>
  <fieldset className="mt-5">
                    <p className="bold text-dark text-lg">ID Card Upload</p>

                    <div className="row mt-2">
                      <div className="col-md-6">
                        <div className="">
                          <label className="form-label">
                            Identification ID <span className="text-danger">*</span>
                          </label>
                          <select
                            name="idType"
                            onChange={handleInputChange}
                            className="select2 form-control"
                            required
                          >
                            <option value="">Select ID</option>
                            <option value="nationalId" selected={formState.idType === "nationalId"} >National ID</option>
                            <option value="driversLicense" selected={formState.idType === "driversLicense"} >Drivers License</option>
                            <option value="passport" selected={formState.idType === "passport"}>Passport</option>

                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label required" for="last_name">
                          ID Number <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control "
                          name="idNumber"
                          onChange={handleInputChange}
                          type="text"
                          placeholder="Enter ID Number"
                          value={formState.idNumber}
                          required
                        />
                      </div>
                    </div>


                    <div className="row mt-5">
                      <FileUpload
                        id={"profilePicture"}
                        picture={data?.profilePicture}
                        name={"profilePicture"}
                        label={"Profile Picture"}
                        setFormState={setFormState}
                      />


                      <FileUpload
                        id={"idFront"}
                        picture={data?.idFront}
                        name={"idFront"}
                        label={"Front of ID Card"}
                        setFormState={setFormState}
                      />
                      <FileUpload
                        id={"idBack"}
                        picture={data?.idBack}
                        name={"idBack"}
                        label={"Back of ID Card"}
                        setFormState={setFormState}
                      />

                    </div>
                  </fieldset>
</>)}
                

                  <hr />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  mb-3">
                  <button
                    className="btn btn-success btn-sm btn-block"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default OfficerModal;
