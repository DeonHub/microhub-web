import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import openNotification from "../components/OpenNotification";


const ReportModal = ({ data, mode, claxx, icon, title, buttonText, setIsLoading, formatDate, formatTime, capitalizeFirstLetter }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    reportType: "",
    title: "",
    content: "",
    supportingDocument: "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        reportType: data.reportType,
        title: data.title,
        content: data.content
      });
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

  const handleSubmit = () => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

 

    if (mode === "create") {
      const nonRequiredFields = ["supportingDocument"];
      // console.log(formState)

      if (
        Object.entries(formState).some(
          ([key, value]) =>
            !nonRequiredFields.includes(key) && !value?.toString().trim()
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

      axios
        .post(`${import.meta.env.VITE_API_URL}/reports`, body, {
          headers,
        })
        .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Report created successfully",
            "Report has been created successfully."
          );

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            "An error occurred while creating the report."
          );
          console.error(error);
          setIsLoading(false);
        })
    } 
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
              <h3 className="card-title">{title} Report</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <div className="card-body table-responsive p-4">
          <table className="table table-bordered">
          <tr>
              
              <td>Status</td>
              <td>
              <span
                                    className={`badge ${
                                      data?.status === "approved"
                                        ? "badge-success"
                                        : data?.status === "pending"
                                        ? "badge-warning"
                                        : "badge-danger"
                                    }`}
                                  >
                                    {capitalizeFirstLetter(data?.status)}
                                  </span>
              </td>
          </tr>
              <tr>
                  <td width="20%">Report ID</td>
                  <td width="80%">{data?.reportId}</td>
              </tr>
              
              <tr>
                  <td>Submitted On</td>
                  <td>
                  <div>{formatDate(data?.createdAt)}</div>
                  <div>{formatTime(data?.createdAt)}</div>
                  </td>
              </tr>
              <tr>
                  <td>Report Type</td>
                  <td>{capitalizeFirstLetter(data.reportType)}{" "}Report</td>
              </tr>
              <tr>
                  <td>Report Title</td>
                  <td>{data?.title}</td>
              </tr>
             
              <tr>
                  <td>Report Content</td>
                  <td>{data?.content}</td>
              </tr>


              <tr>
                                        <td>Supporting Document</td>
                                        <td>
                                          {data?.supportingDocument ? (<a href={data?.supportingDocument} target="_blank">
                                                View Document
                                               
                                            </a>) : (
                                              "No supporting document"
                                            )}
                                            
                                        </td>
                                    </tr>
          </table>

            
      </div>
        ) : (
          <>
          <div className="card-body">
            <form enctype="multipart/form-data">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                {mode === "create" && (<>
                  <div className="row">
                  <div className="col-12">
                    <label className="form-label required" for="name">
                      Report Type <span className="text-danger">*</span>{" "}
                    </label>

                    <select
                      className="form-control"
                      name="reportType"
                      onChange={handleInputChange}
                    >
                      <option value="">Select report type</option>
                      <option value="daily">Daily</option>
                      <option value="monthly">Monthly</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="col-12 mt-3">
                    <label className="form-label" for="last_name">
                      Report Title <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control "
                      name="title"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Enter report title"
                      
                    />
                  </div>
                </div>

                <div className="row mt-3">
                  <div className="col-12">
                    <label className="form-label" for="name">
                      Report Content <span className="text-danger">*</span>{" "}
                    </label>

                    <textarea className="form-control" name="content" onChange={handleInputChange} id="" rows={5} cols={5}>

                    </textarea>
                  </div>
                </div>

  

                <div className="row mt-5 w-full">
                  <div className="col-lg-12">
                    <label className="form-label required">Upload supporting document(if any)</label><br/>
                    <input type="file" name="supportingDocument" onChange={handleInputChange} accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />

                  </div>
                </div>


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

export default ReportModal;
