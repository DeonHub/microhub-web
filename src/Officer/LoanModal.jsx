import React, { useState } from "react";
import { Modal } from "antd";
import openNotification from "../components/OpenNotification";
import axios from "axios";

const LoanModal = ({ data, mode, claxx, icon, title, buttonText, setIsLoading, formatCurrency, formatDate, capitalizeFirstLetter, clients }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    clientId: "",
    loanPurpose: "",
    totalAmount: "",
    interestRate: "",
    // repaymentTerm: "",
    preferredPaymentSchedule: "",
    collateralDocument: "",
    dueDate: ""
  });


  const showModal = () => {
    // console.log(data)
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
      [name]: newValue
    }));
  };


  const handleSubmit = () => {

    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    if(mode === 'create'){
      const nonRequiredFields = ["collateralDocument"];
      // console.log(formState)

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
          "Missing Information",
          "Please fill in all required fields"
        );
        return;
      }


      setIsLoading(true);

      const body = new FormData();
      for (const key in formState) {
      body.append(key, formState[key]);
      }

      // console.log(formState);
      axios.post(`${import.meta.env.VITE_API_URL}/loans`, body, { headers })
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);

          openNotification(
            "topRight",
            "success",
            "Success",
            "Loan has been saved successfully. Waiting for admin approval."
          );

          setTimeout(() => {
              window.location.reload();
          }, 2000)
        }
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          error.response.data.message || "An error occurred while creating the loan."
        );
        setIsLoading(false);
      });
    } 
  }


  const handleUpdate = (status) => {
  const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`
    };

    const body = {
      "status": status, 
    }

    // console.log(body)
    setIsLoading(true)

    axios.patch(`${import.meta.env.VITE_API_URL}/loans/${data?._id}`, body, { headers })
    .then((response) => {
      if(response.data.success){
        setIsLoading(false)
        openNotification(
          "topRight",
          "success",
          "Loan updated successfully",
          "Loan status has been updated successfully."
        );

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
      
    })
    .catch((error) => {
      setIsLoading(false);

      openNotification(
        "topRight",
        "error",
        "Error",
        'An error occurred while updating the loan.'
      );
      console.error(error);
    })

  }

  const formatPaymentStatus = (status) => {
    if (!status) return 'Unknown'; 
    
    const statusMap = {
      'not_paid': 'Not Paid',
      'partially_paid': 'Partially Paid',
      'fully_paid': 'Fully Paid',
    };
    
    // Return mapped value or format generically if not in map
    return statusMap[status.toLowerCase()] || 
      status.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
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
              <h3 className="card-title">{title} Loan Request</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <>
            <div className="card card-widget widget-user shadow">
             
              <div className="card-footer">
                <div className="row">
                  <div className="col-sm-3 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Status</h5>
                      <span className="description-text">
                        <span
                          className={`badge ${data?.status === "approved" ? "badge-success" : data?.status === "pending" ? "badge-warning" : "badge-danger"}`}
                          style={{ minWidth: "65px" }}
                        >
                          {capitalizeFirstLetter(data?.status)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-3 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Total Amount</h5>
                      <span className="description-text">GHS {formatCurrency(data?.totalAmount || 0) || 0.00}</span>
                    </div>
                  </div>
                  <div className="col-sm-3 border-right">
                    <div className="description-block">
                      <h5 className="description-header">Issued Date</h5>
                      <span className="description-text">{formatDate(data?.createdAt)}</span>
                    </div>
                  </div>
                  <div className="col-sm-3">
                    <div className="description-block">
                      <h5 className="description-header">Due Date</h5>
                      <span className="description-text">{formatDate(data?.dueDate)}</span>
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
                              <td>Client ID</td>
                              <td>{data?.clientId?.clientId}</td>
                            </tr>

                            <tr>
                              <td>Client name</td>
                              <td>{data?.clientId?.userId?.firstname} {data?.clientId?.userId?.surname}</td>
                            </tr>

                            <tr>
                              <td>Email Address</td>
                              <td>{data?.clientId?.userId?.email}</td>
                            </tr>
                           
                            <tr>
                              <td>Phone Number</td>
                              <td>{data?.clientId?.userId?.contact}</td>
                            </tr>

                            <tr>
                              <td>Existing Loans</td>
                              <td>{capitalizeFirstLetter(data?.existingLoan) || "False"}</td>
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
                              <td>{data?.loanId}</td>
                            </tr>

                            <tr>
                              <td>Total Amount</td>
                              <td>GHS {formatCurrency(data?.totalAmount || 0) || 0.00}</td>
                            </tr>

                            <tr>
                              <td>Loan Purpose</td>
                              <td>{capitalizeFirstLetter(data?.loanPurpose)}</td>
                            </tr>

                            <tr>
                              <td>Interest Rate</td>
                              <td>{data?.interestRate}%</td>
                            </tr>

{data?.status === 'approved' && (
  <tr>
  <td>Payment status</td>
  <td>{formatPaymentStatus(data?.paymentStatus)}</td>
</tr>
)}
                            

                            <tr>
                              <td>Preferred Payment Schedule</td>
                              <td>{capitalizeFirstLetter(data?.preferredPaymentSchedule)}</td>
                            </tr>

                            <tr>
                              <td>Next Payment Date</td>
                              <td>{formatDate(data?.nextPaymentDate)}</td>
                            </tr>
                        

                            <tr>
                              <td>Total Amount Paid</td>
                              <td>GHS {formatCurrency(data?.amountPaid || 0) || 0.00}</td>
                            </tr>

                            <tr>
                              <td>Total Amount Remaining</td>
                              <td>GHS {formatCurrency(data?.amountRemaining || 0) || 0.00}</td>
                            </tr>

                            {data?.collateralDocument && (
                              <tr>
                              <td>Collateral Document</td>
                              <td>
                                <a target="_blank" href={data?.collateralDocument}>
                                  View Collateral Document
                                </a>
                              </td>
                            </tr>
                            )}
                           

                            
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

                      <select 
                            className="form-control"
                            name="clientId"
                            // value={formState.assignedOfficer || ""}
                            onChange={handleInputChange}
                        >
                            <option value="">Select client</option>
                            {clients?.map((client) => (
                                <option key={client?._id} value={client?._id}>
                                    {client?.userId?.firstname} {client?.userId?.surname}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="col-md-6">
                      <label className="form-label required" for="last_name">
                        Requested Loan Amount <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control "
                        name="totalAmount"
                        onChange={handleInputChange}
                        type="number"
                        placeholder="Enter requested amount"
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
                        name="loanPurpose"
                        onChange={handleInputChange}>
                          <option value="">Select loan purpose</option>
                          <option value="Personal">Personal</option>
                          <option value="Business">Business</option>
                          <option value="School">School</option>
                          <option value="Vehicle">Vehicle</option>
                          <option value="Others">Others</option>
                        </select>

                    </div>

                    <div className="col-md-6">
                      <label className="form-label required" for="name">
                        Preferred Payment Schedule <span className="text-danger">*</span>{" "}
                      </label>
                      
                      <select className="form-control" 
                        name="preferredPaymentSchedule"
                        onChange={handleInputChange}>
                          <option value="">Select payment schedule</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="annually">Annually</option>
                        </select>

                    </div>
                   
                    
                  </div>

                  <div className="row">
                  
                  <div className="col-md-6">
                      <div className="mt-4 mb-4">
                        <label className="form-label required">Interest Rate</label>
                        <input
                          className="form-control"
                          name="interestRate"
                          onChange={handleInputChange}
                          type="number"
                          placeholder="Enter interest rate"
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
                          name="dueDate"
                          onChange={handleInputChange}
                          type="date"
                          // value={formState.phoneNumber}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-2">
                  <div className="col-md-12">
                        <label className="form-label required">Upload collateral document (if any) </label><br/>
                        <input type="file" name="collateralDocument" onChange={handleInputChange} accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
                        {/* <FileUpload id={'profilePicture'} picture={data?.profilePicture || ""} name={'collateralDocument'} label={"Collateral Document"} setFormState={setFormState} /> */}
                      </div>
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
