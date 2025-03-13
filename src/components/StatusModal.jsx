
import React, { useState } from "react";
import { Modal, Button } from "antd";
import openNotification from "./OpenNotification";
// import axios from "axios";

const StatusModal = ({ title, content, claxx, noicon, setIsLoading, id, redirectUrl, status, role }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);

    // Fetch data from localStorage based on role
    const storageKey = role === "client" ? "clientsData" : "officersData";
    const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];

    // Find the client/user by id
    const index = existingData.findIndex((item) => item.userId === id);

    if (index === -1) {
      openNotification(
        "topRight",
        "error",
        "Error",
        `${role === "client" ? "Client" : "Officer"} not found.`
      );
      setIsLoading(false);
      return;
    }

    // Toggle the status
    existingData[index].status = status === "active" ? "inactive" : "active";

    // Save updated data back to localStorage
    try {
      localStorage.setItem(storageKey, JSON.stringify(existingData));
      openNotification(
        "topRight",
        "success",
        "Success",
        `${role === "client" ? "Client" : "Officer"} status updated successfully.`
      );

      // Redirect after a delay
      setTimeout(() => {
        window.location.href = `/admin/${redirectUrl}`;
      }, 1000);
    } catch (error) {
      openNotification(
        "topRight",
        "error",
        "Error",
        `Failed to update ${role === "client" ? "client" : "user"} status.`
      );
      console.error(error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
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
