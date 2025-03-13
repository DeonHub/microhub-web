import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import openNotification from "../components/OpenNotification";

const AdminModal = ({
  data,
  mode,
  claxx,
  icon,
  title,
  buttonText,
  setIsLoading,
  countries,
  picture
}) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(picture ? `data:image/png;base64,${picture}`  : '/assets/images/default-user.png');
  const [formState, setFormState] = useState({
    role: "admin",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    country: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (data) {

      const { profilePicture, user, country, id, ...rest } = data;
      setFormState((prevState) => ({
        ...prevState,
        ...rest,
        country: country?.id
      }));
    }
  }, [data]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log("Form data:", formState);
    // Handle form submission logic here
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    const newValue = type === 'file' ? files[0] : value;

    if (type === 'file' && files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormState((prevState) => ({
          ...prevState,
          [name]: files[0]
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [name]: name === 'age' ? Number(newValue) : newValue
      }));
    }
  };

  const handleSubmit = () => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };


    setIsLoading(true);

    const body = new FormData();
    for (const key in formState) {
    body.append(key, formState[key]);
    }


    if(mode === 'create'){

      if (Object.values(formState).some(value => !value)) {
        
        openNotification(
          "topRight",
          "error",
          "Error",
          "All fields are required."
        );
        return;
      }

      axios.post(`${process.env.REACT_APP_API_URL}/auth/sign-up`, body, { headers })
        .then((response) => {
            openNotification(
              "topRight",
              "success",
              "Admin created successfully",
              "Admin has been created successfully."
            );
    
            setTimeout(() => {
              window.location.href = `/admin/admins`;
            }, 1000);
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            'An error occurred while creating the admin.'
          );
          console.error(error);
          setIsLoading(false);
        })
        .finally(() => {
          setOpen(false);
        });
    } 
    
    else {
      
      console.log(body)

      axios.patch(`${process.env.REACT_APP_API_URL}/admins/${data?.id}`, body, { headers })
      .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Admin updated successfully",
            "Admin details has been updated successfully."
          );
  
          setTimeout(() => {
            window.location.href = `/admin/admins`;
          }, 1000);
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          'An error occurred while updating the admin.'
        );
        console.error(error);
        setIsLoading(false);
      })
      .finally(() => {
        setOpen(false);
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
              <h3 className="card-title">{title} Admin</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <>
            <div className="card card-widget widget-user shadow">
              <div className="widget-user-header bg-secondary">
                <h3 className="widget-user-username">{data?.name}</h3>
                <h5 className="widget-user-desc">{data?.user?.email}</h5>
              </div>
              <div className="widget-user-image">
              <img
                  className="img-circle elevation-2"
                  src={`data:image/png;base64,${data?.profilePicture}`} 
                  alt="Customer"
                />
              </div>
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Status</h5>
                      <span className="description-text">
                      <span
                          className={`badge bg-${data.status === 'active' ? 'success' : 'secondary'}`}
                          style={{ minWidth: "65px" }}
                        >
                          {data.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-4 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Available balance</h5>
                      <span className="description-text">GHS 0.00</span>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="description-block">
                      <h5 className="description-header">Registered at</h5>
                      <span className="description-text">15 Oct 2023</span>
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
                      <div className="card-body">
                        <table className="table table-striped">
                          <tbody>
                            <tr>
                              <th width="20%">Mode</th>
                              <td>Admin</td>
                            </tr>

                            <tr>
                              <td>Country</td>
                              <td>{data?.country?.name}</td>
                            </tr>
                           

                            <tr>
                              <td>Phone</td>
                              <td>{data?.phoneNumber}</td>
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
              <div className="text-center mb-4">
                <img
                  width="150px"
                  height="150px"
                  id="image"
                  className="img-circle"
                  src={imagePreview}
                  alt="user_profile_picture"
                  style={{
                    border: "3px solid #adb5bd",
                    margin: "0 auto",
                    padding: "3px",
                  }}
                />
              </div>
              <form>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-12 ">
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="name">
                        Name
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter First Name"
                          name="name"
                          onChange={handleInputChange}
                          value={formState.name}
                          required
                        />
                      </div>
                    </div>
                    {/* <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="name">
                        Lastname
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <input
                         
                          type="text"
                          className="form-control"
                          placeholder="Enter Last Name"
                          name="lastName"
                          onChange={handleInputChange}
                          // value={formState.firstName}
                          required
                        />
                      </div>
                    </div> */}
                    {mode === 'create' && (
                      <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="name">
                        Email
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          
                          type="email"
                          className="form-control "
                          placeholder="Enter Email"
                          name="email"
                          onChange={handleInputChange}
                          value={formState.email}
                          required
                        />
                      </div>
                    </div>
                    )}
                    
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="image">
                        Image
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <div className="custom-file">
                          <input
                            name="profilePicture"
                            onChange={handleInputChange}
                            type="file"
                            className="custom-file-input"
                            id="customFile"
                            
                          />
                          <label className="custom-file-label" for="customFile">
                            Choose file
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="name">
                        Contact
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          
                          type="text"
                          className="form-control "
                          placeholder="Enter Phone Number"
                          name="phoneNumber"
                          onChange={handleInputChange}
                          value={formState.phoneNumber}
                          required
                        />
                        <span className="text-success">
                          Phone number with country code Ex. +880123456789
                        </span>
                      </div>
                    </div>
                    {mode === 'create' && (
                      <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="password">
                        Password
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <input
                          
                          type="password"
                          className="form-control "
                          placeholder="Enter Password"
                          name="password"
                          onChange={handleInputChange}
                          // value={formState.firstName}
                          required
                        />
                      </div>
                    </div>
                    )}
                    
                    {/* <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="roles">
                        Assign Roles
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          name="role"
                          id="role_id"
                          className="form-control select2"
                          multiple=""
                        >
                          <option value="1">Admin</option>
                          <option value="2">Superadmin</option>
                        </select>
                      </div>
                    </div> */}
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="status">
                        Status
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                        <select
                          name="status"
                          id="status"
                          className="form-control"
                        >
                          <option value="">Select status</option>
                          <option value="active" selected={formState?.status === 'active'}>Active</option>
                          <option value="inactive" selected={formState?.status === 'inactive'}>Inactive</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group row mb-3">
                      <label className="col-sm-3 col-form-label" for="name">
                        Country
                        <span className="form-label-required text-danger">
                          *
                        </span>
                      </label>
                      <div className="col-sm-9">
                      <select
                          name="country"
                          onChange={handleInputChange}
                          className="select2 form-control"
                          required
                        >
                          <option value="">Select Country</option>

                          {countries?.map((country, index) => {
                        return (
                          <option 
                            key={index} 
                            value={country.id} 
                            selected={country.id === formState?.country }
                            // selected={category.id === formState?.category?.name}
                          >
                            {country.name}
                          </option>
                        );
                      })}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-3 col-sm-9">
                        <button className="btn btn-success btn-sm btn-block" type="button" onClick={handleSubmit}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default AdminModal;
