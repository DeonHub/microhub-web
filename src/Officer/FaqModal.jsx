import React, { useState, useEffect } from "react";
import { Modal, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from 'antd';


const FaqModal = ({ data, mode, claxx, icon, title, buttonText }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    question: "",
    answer: "",
    status: "active",
    order: ""
  });


  useEffect(() => {
    if (data) {
      setFormState({
        question: data.question,
        answer: data.answer,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'order' ? Number(value) : value
    }));
  };
  


  const handleSubmit = () => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    if (!formState.question || !formState.answer || !formState.order) {
      openNotification(
        "topRight",
        "error",
        "Error",
        "All fields are required."
      );
      return;
    }

    setIsLoading(true);

    if(mode === 'create'){
      axios.post(`${process.env.REACT_APP_API_URL}/faqs`, formState, { headers })
        .then((response) => {
            openNotification(
              "topRight",
              "success",
              "FAQ created successfully",
              "FAQ has been created successfully."
            );
    
            setTimeout(() => {
              window.location.href = `/admin/faqs`;
            }, 1000);
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            `${error.response.data.message.toLowerCase().includes('duplicate') ? 'Order number already exists. Use a different order number' : 'An error occurred while creating the faq.'}`
          );
          console.error(error);
          setIsLoading(false);
        })
        .finally(() => {
          setOpen(false);
        });
    } else {
      axios.patch(`${process.env.REACT_APP_API_URL}/faqs/${data?.id}`, formState, { headers })
      .then((response) => {
          openNotification(
            "topRight",
            "success",
            "FAQ created successfully",
            "FAQ has been updated successfully."
          );
  
          setTimeout(() => {
            window.location.href = `/admin/faqs`;
          }, 1000);
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          `${error.response.data.message.toLowerCase().includes('duplicate') ? 'Order number already exists. Use a different order number' : 'An error occurred while creating the faq.'}`
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
                      <h3 className="card-title">{title} Faq</h3>
                    </div>
                  </div>
       </div>
        { mode === 'view' ? (

                          <div className="">
                              <table className="table">
                                  <tr>
                                      <td>Question</td>
                                      <td>{data?.question}</td>
                                  </tr>
                                  <tr>
                                      <td>Answer</td>
                                      <td>{data?.answer}</td>
                                  </tr>

                                  <tr>
                                      <td>Status</td>
                                      <td>
                                        <span
                                          className={`badge badge-${
                                            data?.status === "active" ? "success" : "danger"
                                          }`}
                                        >
                                          {data?.status === "active" ? "Active" : "Inactive"}
                                        </span>
                                      </td>
                                  </tr>
                                  <tr>
                                      <td>Order</td>
                                      <td>{data?.order}</td>
                                  </tr>
                              </table>
                          </div>

        ) : (
          <>
            {isLoading ? (<Spin  fullscreen={true} size={'large'} />) : (
               <div className="card-body">
               <form encType="multipart/form-data">
                 <div className="row d-flex justify-content-center">
                   <div className="col-lg-12">
                     <div className="col-12">
                       <div className="form-group">
                         <label htmlFor="question" className="form-label">
                           Question <span className="text-danger">*</span>
                         </label>
                         <input
                           type="text"
                           name="question"
                           id="question"
                           required
                           placeholder="Enter question here..."
                           className="form-control"
                           value={formState.question}
                           onChange={handleInputChange}
                         />
                       </div>
                     </div>
                     <div className="col-12">
                       <div className="form-group">
                         <label htmlFor="answer" className="form-label">
                           Answer <span className="text-danger">*</span>
                         </label>
                         <textarea
                           required
                           name="answer"
                           className="form-control"
                           placeholder="Enter answer here ..."
                           rows={7}
                           value={formState.answer}
                           onChange={handleInputChange}
                         ></textarea>
                       </div>
                     </div>
                     <div className="col-12">
                       <div className="form-group">
                         <label htmlFor="status" className="form-label">
                           Status <span className="text-danger">*</span>
                         </label>
                         <select
                           name="status"
                           id="status"
                           className="form-control"
                           required
                           value={formState.status}
                          //  onChange={handleInputChange}
                         >
                           <option value="">Select status</option>
                           <option value="active">Active</option>
                           <option value="inactive">Inactive</option>
                         </select>
                       </div>
                     </div>
                     <div className="col-12">
                       <div className="form-group">
                         <label htmlFor="order" className="form-label">
                           Order Number <span className="text-danger">*</span>{" "}
                           <Tooltip placement="right" title={"If you don't want ordering set 0"}>
                             <QuestionCircleOutlined />
                           </Tooltip>
                         </label>
                         <input
                           type="number"
                           name="order"
                           id="order"
                           placeholder="Enter order number"
                           required
                           className="form-control"
                           value={formState.order}
                           onChange={handleInputChange}
                         />
                       </div>
                     </div>
                     <div className="col-lg-4">
                       <div className="form-group">
                         <button type="button" className="btn btn-success" onClick={handleSubmit}>
                           {mode === "create" ? "Create" : "Update"} FAQ
                         </button>
                       </div>
                     </div>
                   </div>
                 </div>
               </form>
             </div>
            )}
               
                </>
        )}

      </Modal>
    </>
  );
};

export default FaqModal;
