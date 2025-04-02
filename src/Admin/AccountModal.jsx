import React, { useState, useEffect } from "react";
import { Modal } from "antd";
// import FileUpload from "./components/FileUpload";
// import axios from "axios";
// import { QuestionCircleOutlined } from "@ant-design/icons";

const AccountModal = ({ data, claxx, icon, title, buttonText, capitalizeFirstLetter, formatCurrency, formatDate  }) => {
  const [open, setOpen] = useState(false);


  const showModal = () => {
    // console.log("data :>> ", data);
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
              <h3 className="card-title">Account Details</h3>
            </div>
          </div>
        </div>
        
          <div className="card-body table-responsive p-4">
            <table className="table table-bordered">
              <tr>
                <td width="20%">Account ID</td>
                <td width="80%">{data?.accountId}</td>
              </tr>
              <tr>
                <td width="20%">Account Number</td>
                <td width="80%">{data?.accountNumber || "1441000000000000"}</td>
              </tr>
              <tr>
                <td>Account Type</td>
                <td>{capitalizeFirstLetter(data?.accountType)}</td>
              </tr>
              <tr>
                <td>Client ID</td>
                <td>{data?.clientId?.clientId}</td>
              </tr>
              <tr>
                <td>Client name</td>
                <td>{data?.clientId?.userId?.firstname} {data?.clientId?.userId?.surname}</td>
              </tr>
              <tr>
                <td>Account Balance</td>
                <td>GHS {formatCurrency(data?.balance)}</td>
              </tr>
              
              <tr>
                <td>Status</td>
                <td>
                  <span className={`badge ${data?.status === "active" ? "badge-success" : "badge-danger"}`}>{capitalizeFirstLetter(data?.status)}</span>
                </td>
              </tr>
              <tr>
                <td>Added on</td>
                <td>{formatDate(data?.createdAt)}</td>
              </tr>
            </table>
          </div>
       
      </Modal>
    </>
  );
};

export default AccountModal;
