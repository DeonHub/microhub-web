import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import openNotification from "../components/OpenNotification";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const TicketModal = ({
  data,
  mode,
  claxx,
  icon,
  title,
  buttonText,
  formatDate,
  formatTime,
  capitalizeFirstLetter,
  setIsLoading,
  disabled
}) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    reportType: "",
    subject: "",
    message: "",
    supportingDocument: "",
  });
  const [reply, setReply] = useState("")


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

    const newValue = type === "file" ? files[0] : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleReply = () => {
    const token = window.sessionStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    const body = new FormData();
    body.append("message", reply);
    body.append("role", "user");

    // console.log(body)
    setIsLoading(true)

    axios.patch(`${import.meta.env.VITE_API_URL}/tickets/x/${data?._id}`, body, { headers })
    .then((response) => {
      if(response.data.success){
        setIsLoading(false)
        openNotification(
          "topRight",
          "success",
          "Success",
          "Ticket replied successfully."
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
        'An error occurred while replying the ticket.'
      );
      console.error(error);
    })
  }

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
        .post(`${import.meta.env.VITE_API_URL}/tickets`, body, {
          headers,
        })
        .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Ticket created successfully",
            "Ticket has been created successfully."
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

  return (
    <>
      <button title={title} disabled={disabled} onClick={showModal} className={claxx}>
        <i className={icon}></i>
        <span >{buttonText}</span>
      </button>

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
              <h3 className="card-title">{title} Ticket</h3>
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
                      data?.status === "open"
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
                <td width="20%">Ticket ID</td>
                <td width="80%">{data?.ticketId}</td>
              </tr>
             
              <tr>
                <td>Submitted On</td>
                <td>
                  <div>{formatDate(data?.createdAt)}</div>
                  <div>{formatTime(data?.createdAt)}</div>
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{capitalizeFirstLetter(data.category)}</td>
              </tr>
              <tr>
                <td>Ticket Subject</td>
                <td>{data?.subject}</td>
              </tr>

              <tr>
                <td>Message</td>
                <td>{data?.message}</td>
              </tr>

              <tr>
                <td>Supporting Document</td>
                <td>
                  {data?.supportingDocument ? (
                    <a href={data?.supportingDocument} target="_blank">
                      View Document
                    </a>
                  ) : (
                    "No supporting document"
                  )}
                </td>
              </tr>

              <tr>
                <td>Replies</td>
                <td>
                  
                {data?.replies?.length > 0 ? (
              <>
              
                <div className="" id="replies-container" style={{ overflowY: "scroll", height: "150px"}}>
                {data.replies.map((reply, index) => {
                  return (
                    <div key={index} className={`col-lg-12 mb-1 ${reply.role === 'user' ? "" : "text-end"}`}>
                      <span className="sub-text" style={{ fontWeight: "bold", color: "black" }} >{reply.role === 'user' ? `Officer` : "Admin"}:</span>{" "}
                      <span className="caption-text">{reply.message}</span>

                      {reply.files.length > 0 && (
                        <div className="col-lg-12">
                          <span className="sub-text">Supporting Documents</span>
                          <div className="col-lg-6">
                            {reply.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="col-lg-6">
                                <a href={getFileUrl(file.path)} target='_blank' key={index} rel="noreferrer">View {file.description}</a>
                                <br />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </>
            ) : ('No replies')}  

                </td>
              </tr>
            </table>

          </div>
        ) : mode === "create" ? (
          <>
            <div className="row">
              <div className="col-12 mt-3">
                <label className="form-label required" for="name">
                  Category <span className="text-danger">*</span>{" "}
                </label>

                <select
                  className="form-control"
                  name="reportType"
                  onChange={handleInputChange}
                >
                  <option value="">Select a category</option>
                  <option value="Account and Security Issues">Account and Security Issues</option>
                  <option value="Payment and Transaction Issues">Payment and Transaction Issues</option>
                  <option value="Technical and Website Issues">Technical and Website Issues</option>
                  <option value="Policy and Compliance Issues">Policy and Compliance Issues</option>
                  <option value="Customer Service and General Inquiries">Customer Service and General Inquiries</option>
                </select>
              </div>

              <div className="col-12 mt-3">
                <label className="form-label" for="last_name">
                  Subject <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control "
                  name="subject"
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter ticket subject"
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-12">
                <label className="form-label" for="name">
                  Message <span className="text-danger">*</span>{" "}
                </label>

                <textarea
                  className="form-control"
                  name="message"
                  onChange={handleInputChange}
                  id=""
                  rows={5}
                  cols={5}
                ></textarea>
              </div>
            </div>

            <div className="row mt-5 w-full">
              <div className="col-lg-12">
                <label className="form-label required">
                  Upload supporting document(if any)
                </label>
                <br />
                <input
                  type="file"
                  name="supportingDocument"
                  onChange={handleInputChange}
                  accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
              </div>
            </div>

<hr />
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  mb-3">
                <button
                  className="btn btn-success btn-sm btn-block"
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
          </>
        ) : (
          <>
            <div className="card-body p-0 mb-4">
              <div className="selected_user header">
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      src="/assets/images/default-user.png"
                      width="40"
                      className="rounded-circle me-2"
                      alt="user"
                    />
                  </div>
                  <div className="flex-grow-1 pl-3">
                    <h5>MicroHub User</h5>
                  </div>
                </div>
              </div>

              <div className="position-relative">
                <div className="chat_messages">
                {data?.replies?.length > 0 ? (
              <>
              
             
                <div className="" id="replies-container" style={{ overflowY: "scroll", height: "150px" }}>
                {data.replies.map((reply, index) => {
                  return (
                    <div key={index} className={`col-lg-12 mb-1 ${reply.role === 'user' ? "" : "text-end"}`}>
                      <span className="sub-text" style={{ fontWeight: "bold", color: "black" }} >{reply.role === 'user' ? `Officer` : "Admin"}:</span>{" "}
                      <span className="caption-text">{reply.message}</span>

                      {reply.files.length > 0 && (
                        <div className="col-lg-12">
                          <span className="sub-text">Supporting Documents</span>
                          <div className="col-lg-6">
                            {reply.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="col-lg-6">
                                <a href={getFileUrl(file.path)} target='_blank' key={index} rel="noreferrer">View {file.description}</a>
                                <br />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                </div>
              </>
            ) : ('')}   
                                    </div>

                <hr />
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="answer" className="form-label">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="answer"
                      className="form-control"
                      placeholder="Enter message here ..."
                      rows={7}
                      onChange={(e) => {setReply(e.target.value)}}
                    ></textarea>
                  </div>
                </div>
                <button type="button" onClick={handleReply} disabled={!reply} className="btn btn-success btn-sm btn-block">
                  Reply
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default TicketModal;
