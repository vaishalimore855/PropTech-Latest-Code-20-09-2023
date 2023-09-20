import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const AddInvestorSub = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const subscriptionValues = {
    name: "",
    price: "",
    feature: "",
    type: "",
    status: "",
  };

  const [subscription, setSubscription] = useState(subscriptionValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChangeAddsubscriptionInput = (e) => {
    const { name, value } = e.target;
    setSubscription({
      ...subscription,
      [name]: value,
    });
  };

  const validate = (subscription) => {
    let errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const onlyLetters = /^[A-Za-z]+$/;

    if (!subscription.name) {
      errors.name = " Name cannot be blank";
    } else if (!onlyLetters.test(subscription.name)) {
      errors.name = " Name should only contain letters.";
    }
    if (!subscription.price) {
      errors.price = "Price cannot be blank";
    }
    if (!subscription.feature) {
      errors.feature = "Feature cannot be blank";
    }
    if (!subscription.status) {
      errors.status = "Status cannot be blank";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addSubscription = () => {
    const token = localStorage.getItem("token");
    const data = {
      method: "POST",
      body: JSON.stringify({
        name: subscription.name,
        price: subscription.price,
        feature: subscription.feature,
        type: "Investor",
        status: subscription.status,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch("http://65.20.73.28:8090/api/subscriptions", data)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          toast.success(data.message);
          navigate("/investor-subscription");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(subscription)) {
      addSubscription();
    }
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          <ToastContainer />

          {/* begin::page-header  */}
          <div className="page-header mt-5">
            <h4>Add Subscription</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/Dashboard" style={{ fontSize: "16px" }}>
                    Home
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link to="/subscription" style={{ fontSize: "16px" }}>
                    Subscriptions
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                  style={{ fontSize: "16px" }}
                >
                  Add Subscription
                </li>
              </ol>
            </nav>
          </div>

          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              <div>
                <Tabs value={currentTab} onChange={handleChangeTab} start>
                  <Tab label="Add Subscription Details" />
                </Tabs>
              </div>
            </div>
          </div>

          <div
            className="card"
            style={{ height: "300px", height: "auto", marginTop: "30px" }}
          >
            <div>
              <TabPanel value={currentTab} index={0}>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name">Plan Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Plan Name"
                        name="name"
                        onChange={handleChangeAddsubscriptionInput}
                      />
                      {formErrors.name && (
                        <p style={{ color: "red" }}>{formErrors.name}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        name="price"
                        onChange={handleChangeAddsubscriptionInput}
                      />
                      {formErrors.price && (
                        <p style={{ color: "red" }}>{formErrors.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="feature">Feature</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Feature"
                        name="feature"
                        onChange={handleChangeAddsubscriptionInput}
                        rows={5}
                      />
                      {formErrors.feature && (
                        <p style={{ color: "red" }}>{formErrors.feature}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="status">Status</label>
                      <select
                        className="form-control"
                        name="status"
                        onChange={handleChangeAddsubscriptionInput}
                      >
                        <option value="">Select Status</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                      {formErrors.status && (
                        <p style={{ color: "red" }}>{formErrors.status}</p>
                      )}
                    </div>
                  </div>

                  <button className="btn btn-primary mt-3" type="submit">
                    Submit
                  </button>
                </form>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvestorSub;
