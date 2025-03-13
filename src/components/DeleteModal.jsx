
import React, { useState } from "react";
import { Modal, Button } from "antd";
import openNotification from "./OpenNotification";
import axios from "axios";

const DeleteModal = ({ title, content, claxx, noicon, setIsLoading, id, redirectUrl, deleteUrl }) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {

    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

  setIsLoading(true);

    axios.delete(`${process.env.REACT_APP_API_URL}/${deleteUrl}/${id}`, { headers })
    .then((response) => {
        openNotification(
          "topRight",
          "success",
          "Item deleted successfully",
          "Item has been deleted successfully."
        );

        setTimeout(() => {
          window.location.href = `/admin/${redirectUrl}`;
        }, 1000);
    })
    .catch((error) => {
      openNotification(
        "topRight",
        "error",
        "Error",
        "An error occurred while creating the faq."
      );
      console.error(error);
      setIsLoading(false);
    })
    .finally(() => {
      setOpen(false);
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const titleStyle = {
    textAlign: 'center',
    marginBottom: '20px', // Adjust as needed
  };

  const contentStyle = {
    textAlign: 'center',
  };

  return (
    <>
      <span title={title} onClick={showModal} className={claxx}>
        {!noicon && (<i className={"nav-icon fa fa-trash mr-2"}></i>)}
        <span>Delete</span>
      </span>

      <Modal
        open={open}
        // mask={open}
        title={<div style={titleStyle}>{title}<hr/></div>}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ zIndex: "1", left: "10%" }}
        footer={[
          <Button onClick={handleCancel} style={{ float: "left"}}>
            Cancel
          </Button>,
          <Button onClick={handleOk}>
            OK
          </Button>,
        ]}
        // style={modalStyle}
      >
        <div style={contentStyle}>{content}<hr/></div>
      </Modal>
    </>
  );
};

export default DeleteModal;
