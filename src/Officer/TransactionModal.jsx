import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import FileUpload from "./components/FileUpload";
import axios from "axios";
import openNotification from "../components/OpenNotification";

// import { QuestionCircleOutlined } from "@ant-design/icons";

const TransactionModal = ({
  data,
  mode,
  claxx,
  icon,
  title,
  buttonText,
  setIsLoading,
  clients,
  formatDate,
  formatTime,
  formatCurrency,
  capitalizeFirstLetter,
}) => {
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    clientId: "",
    transactionType: "",
    amount: "",
    paymentMethod: "",
    notes: "",
    paymentProof: "",
  });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log("Form data:", formState);
    // Handle form submission logic here
    setOpen(false);
  };

  const handleSubmit = () => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    if (mode === "create") {
      const nonRequiredFields = ["paymentProof", "notes"];
      // console.log(formState)

      if (
        Object.entries(formState).some(
          ([key, value]) =>
            !nonRequiredFields.includes(key) && !value?.toString().trim()
        )
      ) {
        openNotification(
          "topRight",
          "error",
          "Missing Information",
          "Please fill in all required fields"
        );
        return;
      }

      setIsLoading(true);

      const body = new FormData();
      for (const key in formState) {
        body.append(key, formState[key]);
      }

      // console.log(formState);
      axios
        .post(`${import.meta.env.VITE_API_URL}/transactions`, body, { headers })
        .then((response) => {
          if (response.data.success) {
            setIsLoading(false);

            openNotification(
              "topRight",
              "success",
              "Success",
              "Transaction saved successfully. Waiting for admin approval."
            );

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((error) => {
          openNotification(
            "topRight",
            "error",
            "Error",
            error.response.data.message ||
              "An error occurred while creating the loan."
          );
          setIsLoading(false);
        });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    const newValue = type === "file" ? files[0] : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleUpdate = (status) => {
    const token = window.sessionStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = new FormData();
    body.append("status", status);

    console.log(body);
    setIsLoading(true);

    axios
      .patch(
        `${import.meta.env.VITE_API_URL}/transactions/${data?._id}`,
        body,
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          openNotification(
            "topRight",
            "success",
            "Transaction updated successfully",
            "Transaction status has been updated successfully."
          );

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((error) => {
        setIsLoading(false);

        openNotification(
          "topRight",
          "error",
          "Error",
          "An error occurred while updating the transaction."
        );
        console.error(error);
      });
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
                <td>Status</td>
                <td>
                  <span
                    className={`badge ${
                      data?.status === "approved"
                        ? "badge-success"
                        : data?.status === "pending"
                        ? "badge-warning"
                        : "badge-danger"
                    }`}
                  >
                    {capitalizeFirstLetter(data?.status)}
                  </span>
                </td>
              </tr>
              <tr>
                <td width="20%">Transaction ID</td>
                <td width="80%">{data?.transactionId}</td>
              </tr>
              <tr>
                <td>Payment By</td>
                <td>
                  {data?.clientId?.userId?.firstname}{" "}
                  {data?.clientId?.userId?.surname}
                </td>
              </tr>
              <tr>
                <td>Payment For</td>
                <td>{capitalizeFirstLetter(data?.transactionType)}</td>
              </tr>

              <tr>
                <td>Payment Method</td>
                <td>{data?.paymentMethod}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>GHS {formatCurrency(data?.amount)}</td>
              </tr>

              <tr>
                <td>Notes</td>
                <td>{data?.notes || "No notes"}</td>
              </tr>

              
                <tr>
                  <td>Payment Proof</td>
                  <td>
                    {data?.paymentProof ? (
                    <a target="_blank" href={data?.paymentProof}>
                      View Payment Proof
                    </a>
                      ) : (
                      "No payment proof"
                      )}
                  </td>
                </tr>
            
             
              <tr>
                <td>Paid On</td>
                <td>
                  <div>{formatDate(data?.createdAt)}</div>
                  <div>{formatTime(data?.createdAt)}</div>
                </td>
              </tr>
            </table>

            {/* {data?.status === "pending" && (
                <div className="card-footer">
                <div className="row">
                  <div className="col-sm-6">
                    <button className="btn btn-success btn-sm btn-block" type="button" onClick={(() => {handleUpdate('approved')})}>
                      Approve
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button className="btn btn-danger btn-sm btn-block" type="button" onClick={(() => {handleUpdate('denied')})}>
                      Reject
                    </button>
                  </div>
                </div>
                </div>
              )} */}
          </div>
        ) : (
          <>
            <div className="card-body">
              <form enctype="multipart/form-data">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  {mode === "create" && (
                    <>
                      <div className="row">
                        <div className="col-md-6">
                          <label className="form-label required" for="name">
                            Client <span className="text-danger">*</span>{" "}
                          </label>

                          <select
                            className="form-control"
                            name="clientId"
                            onChange={handleInputChange}
                          >
                            <option value="">Select client</option>
                            {clients?.map((client) => (
                              <option key={client?._id} value={client?._id}>
                                {client?.userId?.firstname}{" "}
                                {client?.userId?.surname}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label
                            className="form-label required"
                            for="last_name"
                          >
                            Total Amount <span className="text-danger">*</span>
                          </label>
                          <input
                            className="form-control "
                            name="amount"
                            onChange={handleInputChange}
                            type="number"
                            placeholder="Enter amount"
                          />
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label className="form-label required" for="name">
                            Transaction Type{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>

                          <select
                            className="form-control"
                            name="transactionType"
                            onChange={handleInputChange}
                          >
                            <option value="">Select transaction type</option>
                            <option value="deposit">Deposit</option>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="payment">Loan Repayment</option>
                          </select>
                        </div>

                        <div className="col-md-6">
                          <label className="form-label required" for="name">
                            Payment Method{" "}
                            <span className="text-danger">*</span>{" "}
                          </label>

                          <select
                            className="form-control"
                            name="paymentMethod"
                            onChange={handleInputChange}
                          >
                            <option value="">Select payment method</option>
                            <option value="Cash">Cash</option>
                            <option value="Mobile Money">Mobile Money</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                          </select>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-12">
                          <label className="form-label required" for="name">
                            Notes{" "}
                          </label>

                          <textarea
                            className="form-control"
                            name="notes"
                            onChange={handleInputChange}
                            id=""
                            rows={5}
                            cols={5}
                          ></textarea>
                        </div>
                      </div>

                      <div className="row mt-5 w-full">
                        <div className="col-lg-12">
                          <label className="form-label required">
                            Upload payment proof (if any)
                          </label>
                          <br />
                          <input
                            type="file"
                            name="paymentProof"
                            onChange={handleInputChange}
                            accept=".pdf,.doc,.docx,.txt,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <hr />
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center  mb-3">
                  <button
                    className="btn btn-success btn-sm btn-block"
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

export default TransactionModal;
