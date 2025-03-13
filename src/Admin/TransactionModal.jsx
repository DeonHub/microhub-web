import React, { useState, useEffect } from "react";
import { Modal } from "antd";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const TransactionModal = ({ data, mode, claxx, icon, title, buttonText }) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    subcategoryName: "",
    category: "",
    status: "",
    order: "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        subcategoryName: data.subcategoryName,
        category: data.category,
        status: data.status,
        order: data.order,
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
      [name]: value,
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
              <h3 className="card-title">{title} Transaction</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <div className="card-body table-responsive p-4">
          <table className="table table-bordered">
              <tr>
                  <td width="20%">Transaction ID</td>
                  <td width="80%">{data?.transactionId}</td>
              </tr>
              <tr>
                  <td>Payment By</td>
                  <td>{data?.paymentBy}</td>
              </tr>
              <tr>
                  <td>Payment For</td>
                  <td>Ride</td>
              </tr>
              <tr>
                  <td>Receive By</td>
                  <td>{data?.receiveBy}</td>
              </tr>
              <tr>
                  <td>Payment Method</td>
                  <td>{data?.paymentMethod}</td>
              </tr>
              <tr>
                  <td>Amount</td>
                  <td>{data?.amount}</td>
              </tr>

              <tr>
                                        <td>Proof Image:</td>
                                        <td>
                                            <a href="/" target="_blank">
                                                <img src="/assets/images/default.jpg" width="120" className="border rounded"
                                                alt="default"/>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                  <td>Description</td>
                  <td>This is the description</td>
              </tr>

              <tr>
              
                  <td>Status</td>
                  <td>
                      <span className="badge bg-success">Paid</span>
                  </td>
              </tr>
              <tr>
                  <td>Date</td>
                  <td>
                      25/06/2023
                  </td>
              </tr>
          </table>
      </div>
        ) : (
          <>
            <div className="card-body">
                                <form action="" method="post">
                                    
                                    <div className="mb-4">
                                        <label for="status" className="form-label">Status</label>
                                        <select name="status" id="status" className="form-control form-select" required value={formState.status}
                              onChange={handleInputChange}>
                                          
                                             <option value="" className="d-none">Pending</option>
                                            <option value="1">Approved</option>
                                            <option value="2">Denied</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-success">Update</button>
                                </form>
                            </div>

          </>
        )}
      </Modal>
    </>
  );
};

export default TransactionModal;
