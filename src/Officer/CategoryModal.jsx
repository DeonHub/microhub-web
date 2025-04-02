import React, { useState, useEffect } from "react";
import { Modal, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from 'antd';


const CategoryModal = ({ data, mode, claxx, icon, title, buttonText }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    status: "active",
    order: "",
    image: null,
  });

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name,
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
    const { name, value, type, checked, files } = e.target;
    const newValue =
    type === "checkbox"
      ? checked
      : type === "file"
      ? files[0]
      : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: name === 'order' ? Number(newValue) : newValue
    }));
  };


  const handleSubmit = () => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    if (Object.values(formState).some(value => !value)) {
      openNotification(
        "topRight",
        "error",
        "Error",
        "All fields are required."
      );
      return;
    }

    setIsLoading(true);

    const body = new FormData();
    for (const key in formState) {
      body.append(key, formState[key]);
    }
    // data.append('image', fs.createReadStream('/home/deon/Desktop/Projects/Demo/assets/logo.png'));
    // body.append("image", fileInput.files[0], "logo.png");
    console.log(body);



    if(mode === 'create'){
      axios.post(`${process.env.REACT_APP_API_URL}/categories`, formState, { headers })
        .then((response) => {
            openNotification(
              "topRight",
              "success",
              "Category created successfully",
              "Category has been created successfully."
            );
    
            setTimeout(() => {
              window.location.href = `/admin/categories`;
            }, 1000);
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            `${error.response.data.message.toLowerCase().includes('duplicate') ? 'Order number already exists. Use a different order number' : 'An error occurred while creating the category.'}`
          );
          console.error(error);
          setIsLoading(false);
        })
        .finally(() => {
          setOpen(false);
        });
    } else {
      axios.patch(`${process.env.REACT_APP_API_URL}/categories/${data?.id}`, formState, { headers })
      
      .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Category created successfully",
            "Category has been updated successfully."
          );
  
          setTimeout(() => {
            window.location.href = `/admin/categories`;
          }, 1000);
      })
      .catch((error) => {
        openNotification(
          "topRight",
          "error",
          "Error",
          `${error.response.data.message.toLowerCase().includes('duplicate') ? 'Order number already exists. Use a different order number' : 'An error occurred while creating the category.'}`
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
              <h3 className="card-title">{title} Category</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          <div className="">
            <table className="table">
              <tr>
                <td>Category</td>
                <td>{data?.categoryName}</td>
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
          {isLoading && (<Spin  fullscreen={true} size={'large'} />)}
                        <div className="card-body">
                        <form enctype="multipart/form-data">
                          <div className="row d-flex justify-content-center">
                            <div className="row">
                              <div className="col-12 mb-3">
                                <label className="form-label required" for="name">
                                  Category Name <span className="text-danger">*</span>{" "}
                                </label>
                                <input
                                  className="form-control"
                                  name="name"
                                  type="text"
                                  placeholder="Enter category name "
                                  autocomplete="off"
                                  required
                                  value={formState.name}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-12">
                                <div className="form-group">
                                  <label htmlFor="order" className="form-label">
                                    Order Number <span className="text-danger">*</span>{" "}
                                    <Tooltip
                                      placement="right"
                                      title={"If you don't want ordering set 0"}
                                    >
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
                              <div className="col-12 mb-3">
                                <label className="form-label required" for="password">
                                  Status <span className="text-danger">*</span>
                                </label>
                                <select
                                  name="status"
                                  id="status"
                                  className="form-control"
                                  required
                                  value={formState.status}
                                  onChange={handleInputChange}
                                >
                                  <option value="">Select status</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>
                              <div className="col-12 mb-3">
                                <label className="form-label required" for="image">
                                  Image
                                  <span className="text-danger">*</span>
                                  <span className="text-warning">
                                    (Prefer size 150 x 100)
                                  </span>
                                </label>
                                <input
                                  className="form-control"
                                  name="image"
                                  type="file"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  my-3">
                            <button
                              className="btn btn-success btn-block btn-sm"
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

export default CategoryModal;
