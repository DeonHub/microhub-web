import React, { useState, useEffect } from "react";
import { Modal } from "antd";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const TicketModal = ({ data, mode, claxx, icon, title, buttonText }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    question: "",
    answer: "",
    status: "",
    order: ""
  });

  useEffect(() => {
    if (data) {
      setFormState({
        question: data.question,
        answer: data.answer,
        status: data.status,
        order: data.order
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

  const handleCancel = () => {
    setOpen(false);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormState((prevState) => ({
  //     ...prevState,
  //     [name]: value
  //   }));
  // };

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
                      <h3 className="card-title">{title} Ticket</h3>
                    </div>
                  </div>
       </div>
        { mode === 'view' ? (

                          <div className="">
                              <table className="table">
                                  <tr>
                                      <td>Username</td>
                                      <td>Shikaafi Taulor</td>
                                  </tr>
                                  <tr>
                                      <td>Subject</td>
                                      <td>I have an issue</td>
                                  </tr>
                                  <tr>
                                      <td>Message</td>
                                      <td>Lorem ipsum que dolor</td>
                                  </tr>

                                  <tr>
                                      <td>Status</td>
                                      <td>
                                              <span className={`badge badge-warning`}>Pending</span>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>Priority</td>
                                      <td>
                                        <span className={`badge badge-info`}>Low</span>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>Added On</td>
                                      <td>
                                        <span>01/06/2024</span>
                                      </td>
                                  </tr>
                              </table>
                          </div>

        ) : (
          <>

<div className="card-body p-0 mb-4">
                                <div className="selected_user header">
                                    <div className="d-flex align-items-center py-1">
                                        <div className="position-relative">
                                            <img src="/assets/images/default-user.png" width="40"
                                                 className="rounded-circle me-2" alt="user" />
                                        </div>
                                        <div className="flex-grow-1 pl-3">
                                            <h5>Abel Mawuko</h5>
                                        </div>

                                    </div>
                                </div>


                                <div className="position-relative">
                                    <div className="chat_messages">
                                        <div className="chat_msg pb-4">
                                            <div className="media position-relative">
                                                <img src="/assets/images/default-user.png" width="40"
                                                     className="rounded-circle mr-3" alt="user" />
                                                <div className="media-body">
                                                    <h5>Abel Mawuko</h5>
                                                    <span>01/16/2024</span>
                                                </div>
                                            </div>
                                            <div className="content">
                                                <p>
                                                    This is the message of the ticket
                                                </p>
                                            </div>
                                        </div>

                                        
                                            <div className="chat_msg pb-4">
                                                <div className="media position-relative">
                                                    <img src="/assets/images/default-user.png" width="40"
                                                         className="rounded-circle mr-3" alt="user" />
                                                    <div className="media-body">
                                                        <h5>Abel Mawuko</h5>
                                                        <span>01/06/2024</span>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    This is the body of the message
                                                </div>
                                            </div>
                                            <div className="chat_msg pb-4">
                                                <div className="media position-relative">
                                                    <img src="/assets/images/default-user.png" width="40"
                                                         className="rounded-circle mr-3" alt="user" />
                                                    <div className="media-body">
                                                        <h5>Abel Mawuko</h5>
                                                        <span>01/06/2024</span>
                                                    </div>
                                                </div>
                                                <div className="content">
                                                    This is the body of the message
                                                </div>
                                            </div>
                                        

                                    </div>
                                    
<hr />
                                    <div className="col-12 mt-5">
                          <div className="form-group">
                            <label htmlFor="answer" className="form-label">
                              Message <span className="text-danger">*</span>
                            </label>
                            <textarea
                              required
                              name="answer"
                              className="form-control"
                              placeholder="Enter message here ..."
                              rows={7}

                            ></textarea>
                          </div>
                        </div>
                        <button type="submit" className="btn btn-success float-end">Reply</button>
                                </div>
                            </div>

                </>
        )}

      </Modal>
    </>
  );
};

export default TicketModal;
