
import React, { useState } from "react";
import { Modal, Button } from "antd";
import openNotification from "./OpenNotification";
import axios from "axios";

const StatusModal = ({ title, content, claxx, noicon, setIsLoading, id, redirectUrl, status, role }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    
    const token = window.sessionStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
  
    setIsLoading(true);

    const body = new FormData();
    body.append("status", status === "active" ? "inactive" : "active");

    axios.patch(`${import.meta.env.VITE_API_URL}/${role === 'client' ? 'clients' : 'officers'}/${id}`, body, { headers })
    .then((response) => {
      // console.log(response);

      if (response.data.success) {
        setIsLoading(false);
        openNotification(
          "topRight",
          "success",
          `${role === "client" ? "Client" : "Officer"} updated successfully`,
          `${role === "client" ? "Client" : "Officer"} status updated successfully.`
        );
        window.location.reload();

      }})
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          `Failed to update ${role === "client" ? "client" : "officer"} status.`
        );

        console.log("error >>", error)
        setIsLoading(false);
      });

  };

  const handleCancel = () => {
    setOpen(false);
  };

  const titleStyle = {
    textAlign: "center",
    marginBottom: "20px", // Adjust as needed
  };

  const contentStyle = {
    textAlign: "center",
  };

  return (
    <>
      <span title={title} onClick={showModal} className={claxx}>
        {!noicon && (
          <i className={`nav-icon fa fa-${status === "active" ? "eye-slash" : "eye"} mr-2`}></i>
        )}
        <span>{status === "active" ? "Disable" : "Enable"}</span>
      </span>

      <Modal
        open={open}
        title={<div style={titleStyle}>{title}<hr /></div>}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ zIndex: "1", left: "10%" }}
        footer={[
          <Button onClick={handleCancel} style={{ float: "left" }}>
            Cancel
          </Button>,
          <Button onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <div style={contentStyle}>{content}<hr /></div>
      </Modal>
    </>
  );
};


export default StatusModal;
