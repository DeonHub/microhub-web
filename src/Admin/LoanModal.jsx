import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import FileUpload from "./components/FileUpload";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const LoanModal = ({ data={}, mode, claxx, icon, title, buttonText, setIsLoading }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    client: '',
    issuedDate: '',
    repaymentDate: '',
    interestRate: '',
    totalAmount: ''
  });

  // useEffect(() => {
    // console.log("Hello")
    // if (data) {

    //   const { profilePicture, idFront, idBack, user, bookings, id, ...rest } = data;
    //   setFormState((prevState) => ({
    //     ...prevState,
    //     ...rest
    //   }));
    // }
  // }, []);



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
    const newValue =
    type === "file"
      ? files[0]
      : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'age' ? Number(newValue) : newValue
    }));
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
              "Loan created successfully",
              "Loan has been created successfully."
            );
    
            setTimeout(() => {
              window.location.href = `/admin/loans`;
            }, 1000);
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            'An error occurred while creating the loan.'
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

      axios.patch(`${process.env.REACT_APP_API_URL}/loans/${data?.id}`, body, { headers })
      .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Loan updated successfully",
            "Loan details has been updated successfully."
          );
  
          setTimeout(() => {
            window.location.href = `/admin/loans`;
          }, 1000);
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          'An error occurred while updating the loan.'
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
              <h3 className="card-title">{title} Loan Details</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <>
            <div className="card card-widget widget-user shadow">
             
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
                      <h5 className="description-header">Total Amount</h5>
                      <span className="description-text">GHS 1000.00</span>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="description-block">
                      <h5 className="description-header">Issued Date</h5>
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
                      <p className="bold text-dark text-lg">Client Information</p>

                        <table className="table table-striped">
                          <tbody>
                            
                            <tr>
                              <td>Client name</td>
                              <td>John Doe</td>
                            </tr>

                            <tr>
                              <td>Email Address</td>
                              <td>johndoe@gmail.com</td>
                            </tr>
                           
                            <tr>
                              <td>Phone Number</td>
                              <td>1234567890</td>
                            </tr>

                            <tr>
                              <td>Address</td>
                              <td>Adenta</td>
                            </tr>

                            <tr>
                              <td>Loan Officer</td>
                              <td>Dennis Lloyd</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-body">
                      <p className="bold text-dark text-lg">Loan Details</p>
                        <table className="table table-striped">
                          <tbody>
                           <tr>
                              <td>Loan ID</td>
                              <td>qwertyuiop1234567890</td>
                            </tr>

                            <tr>
                              <td>Total Amount</td>
                              <td>GHS 10,000</td>
                            </tr>

                            <tr>
                              <td>Loan Purpose</td>
                              <td>Personal</td>
                            </tr>

                            <tr>
                              <td>Issued Date</td>
                              <td>25 Oct, 2024</td>
                            </tr>

                            <tr>
                              <td>Due Date</td>
                              <td>25 Oct, 2025</td>
                            </tr>

                            <tr>
                              <td>Preferred Payment Schedule</td>
                              <td>25 Oct, 2024</td>
                            </tr>

                            <tr>
                              <td>Interest Rate</td>
                              <td>10%</td>
                            </tr>
                           
                            <tr>
                              <td>Amount Paid</td>
                              <td>25th Oct, 2023</td>
                            </tr>

                            <tr>
                              <td>Total Amount Paid</td>
                              <td>GHS 500</td>
                            </tr>

                            <tr>
                              <td>Total Amount Left</td>
                              <td>GHS 500</td>
                            </tr>

                            <tr>
                              <td>Collateral Document</td>
                              <td>
                                <a target="_blank" href="/">
                                  <img
                                    className="img-fluid elevation-2"
                                    width="150"
                                    src={`data:image/png;base64,${data?.idBack || ""}`}
                                    alt="Customer"
                                  />
                                </a>
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
                  
                <div className="row">
                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                        Client <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="gender"
                        onChange={handleInputChange}>
                          <option value="">Select client</option>
                          <option value="male">John Doe</option>
                          <option value="female" >Jane Doe</option>
                        </select>

                    </div>

                    <div className="col-md-6">
                      <label className="form-label required" for="last_name">
                        Requested Loan Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control "
                        name="lastName"
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Enter Last Name"
                        // value={formState.lastName}
                        required
                      />
                    </div>
                   
                    
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                        Loan Purpose <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="gender"
                        onChange={handleInputChange}>
                          <option value="">Select loan purpose</option>
                          <option value="male">Personal</option>
                          <option value="female">Home Improvement</option>
                          <option value="female">Vehicle</option>
                        </select>

                    </div>

                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                        Preferred Payment Schedule <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="gender"
                        onChange={handleInputChange}>
                          <option value="">Select payment schedule</option>
                          <option value="male">Monthly</option>
                          <option value="female">Quarterly</option>
                          <option value="female">Annually</option>
                        </select>

                    </div>
                   
                    
                  </div>

                  <div className="row">
                  
                  <div className="col-md-6">
                      <div className="mt-4 mb-4">
                        <label className="form-label required">Interest Rate</label>
                        <input
                          className="form-control"
                          name="age"
                          onChange={handleInputChange}
                          type="number"
                          placeholder="Enter age"
                          // value={formState.age}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mt-4 mb-4">
                        <label className="form-label required">
                          Due Date<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          name="phoneNumber"
                          onChange={handleInputChange}
                          type="date"
                          placeholder="Enter phone number"
                          // value={formState.phoneNumber}
                          required
                        />
                      </div>
                    </div>
                    
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                      Do you have any existing loans? <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="gender"
                        onChange={handleInputChange}>
                          <option value="">------------------------------------------------------------------------------------------</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>

                    </div>

                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                      Do you have any collateral to offer? <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="gender"
                        onChange={handleInputChange}>
                          <option value="">------------------------------------------------------------------------------------------</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>

                    </div>
                   
                    
                  </div>

                  <div className="row mt-5">
                  <div className="col-md-12">
                        <label className="form-label required">Upload collateral document</label>
                        <FileUpload id={'profilePicture'} picture={data?.profilePicture || ""} name={'profilePicture'} label={"Profile Photo"} setFormState={setFormState} />

                      </div>
                    {/* <FileUpload id={'idFront'} picture={data?.idFront} name={'idFront'} label={"Front of ID Card"} setFormState={setFormState} /> */}
                    {/* <FileUpload id={'idBack'} picture={data?.idBack} name={'idBack'} label={"Back of ID Card"} setFormState={setFormState} /> */}

                  </div>

                  <hr />

                 
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  mb-3">
                  <button className="btn btn-success btn-sm btn-block" type="button" onClick={handleSubmit}>
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
export default LoanModal;
