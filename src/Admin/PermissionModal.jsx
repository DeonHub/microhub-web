import React, { useState, useEffect } from "react";
import { Modal } from "antd";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const PermissionModal = ({ data, mode, claxx, icon, title, buttonText }) => {
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
                      <h3 className="card-title">{title} Permission</h3>
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
                                              <span className={`badge badge-${data?.status === 'active' ? 'success' : 'danger'}`}>{data?.status === 'active' ? 'Active' : 'Inactive'}</span>
                                        
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

<div className="card-body">

<form action="">
    
    <div className="mb-3">
        <label for="name" className="form-label">Name</label>
        <input 
            type="text"
            className="form-control"
            name="name"
            placeholder="Name" required />

    </div>

    <button type="submit" className="btn btn-success btn-sm">Save</button>

</form>


</div>
                </>
        )}

      </Modal>
    </>
  );
};

export default PermissionModal;
