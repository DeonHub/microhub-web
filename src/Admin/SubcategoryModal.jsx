import React, { useState, useEffect } from "react";
import { Modal, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import openNotification from "../components/OpenNotification";
import { Spin } from 'antd';


const SubcategoryModal = ({ data, mode, claxx, icon, title, buttonText }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formState, setFormState] = useState({
    name: "",
    category: "",
    status: "",
    order: "",
  });

  useEffect(() => {
    if (data) {
      setFormState({
        name: data.name,
        category: data.category,
        status: data.status,
        order: data.order,
      });
    }

  }, [data]);

  const showModal = () => {

    const token = window.sessionStorage.getItem("token");
    
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

        axios
        .get(`${process.env.REACT_APP_API_URL}/categories`, { headers })
        .then((response) => {
            // console.log(response.data.data);
            const sortedCategories = response.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setCategories(sortedCategories);
        })
        .catch((error) => {
            console.error(error);
        });


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
      'Content-Type': 'application/json',
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



    if(mode === 'create'){
      axios.post(`${process.env.REACT_APP_API_URL}/subcategories`, formState, { headers })
        .then((response) => {
            openNotification(
              "topRight",
              "success",
              "Subcategory created successfully",
              "Subcategory has been created successfully."
            );
    
            setTimeout(() => {
              window.location.href = `/admin/subcategories`;
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
      axios.patch(`${process.env.REACT_APP_API_URL}/subcategories/${data?.id}`, formState, { headers })
      .then((response) => {
          openNotification(
            "topRight",
            "success",
            "Category created successfully",
            "Category has been updated successfully."
          );
  
          setTimeout(() => {
            window.location.href = `/admin/subcategories`;
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
              <h3 className="card-title">{title} Subcategory</h3>
            </div>
          </div>
        </div>
        {mode === "view" ? (
          // <div className="">
          //   <table className="table">
          //     <tr>
          //       <td>Category</td>
          //       <td>{data?.name}</td>
          //     </tr>
          //     <tr>
          //       <td>Answer</td>
          //       <td>{data?.answer}</td>
          //     </tr>

          //     <tr>
          //       <td>Status</td>
          //       <td>
          //         <span
          //           className={`badge badge-${
          //             data?.status === "active" ? "success" : "danger"
          //           }`}
          //         >
          //           {data?.status === "active" ? "Active" : "Inactive"}
          //         </span>
          //       </td>
          //     </tr>
          //     <tr>
          //       <td>Order</td>
          //       <td>{data?.order}</td>
          //     </tr>
          //   </table>
          // </div>
          ''
        ) : (
          <>
          {isLoading && (<Spin  fullscreen={true} size={'large'} />)}
            <div className="card-body">
              <form enctype="multipart/form-data">
                <div className="row d-flex justify-content-center">
                  <div className="row">
                    <div className="col-12 mb-3">
                      <label className="form-label required" for="name">
                        Subcategory Name <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control "
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleInputChange}
                        placeholder="Enter category name "
                        autocomplete="off"
                        required
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label required" for="category_id">
                        Category <span className="text-danger">*</span>
                      </label>
                      <select
                        name="category"
                        id="category_id"
                        className="form-control"
                        required
                        value={formState?.category?.id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select One</option>
                        {categories?.map((category, index) => {
                        return (
                          <option 
                            key={index} 
                            value={category.id} 
                            selected={category.id === formState?.category?.name}
                          >
                            {category.name}
                          </option>
                        );
                      })}

                        
                      </select>
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
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  mb-3">
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

export default SubcategoryModal;
