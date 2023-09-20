// import React, { useState,useEffect } from "react";
// import { Link, useNavigate,useParams } from "react-router-dom";
// import { getInvestorSubscriptionbyId } from "../../../../Redux/Slice/InvestorSubSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";
// import axios from "axios";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// const TabPanel = ({ children, value, index }) => {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box p={3}>{children}</Box>}
//     </div>
//   );
// };

// const EditInvestorSub = () => {
//   var navigate = useNavigate();
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const Subscription = useSelector((state) => state.InvestorSubscriptionData.InvestorSubscription);
//   console.log("investor subscription id:",JSON.stringify(Subscription))
//   const [currentTab, setCurrentTab] = useState(0);
//   const handleChangeTab = (event, newValue) => {
//     setCurrentTab(newValue);
//   };
//  useEffect(() => {
//   dispatch(getInvestorSubscriptionbyId(id));
// }, [id]);

//   const token = localStorage.getItem("token");
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//  const subscriptionValues = {
//     name: "",
//     price: "",
//     feature: "",
//     type:"",
//     status: "",
//   };

//   const [subscription, setsubscription] = useState(subscriptionValues);

//   useEffect(() => {
//     setsubscription({
//       name: Subscription?.name,
//       price: Subscription?.price,
//       feature: Subscription?.feature,
//       type: Subscription?.type,
//       status: Subscription?.status
//     });
//   }, [Subscription]);

//   const handleChangeAddsubscriptionInput = (e) => {
//     const { name, value } = e.target;
//     setsubscription({
//       ...subscription,
//       [name]: value,
//     });
//   };

//   const validate = (subscription) => {
//     let errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//     if (!subscription.name) {
//       errors.name = "Plan name cannot be blank";
//     } else if (!subscription.price) {
//       errors.price = "Price cannot be blank";
//     } else if (!subscription.feature) {
//       errors.feature = "Feature cannot be blank";
//     } else if (!subscription.type) {
//       errors.type = "type cannot be blank";
//     }
//     else if (!subscription.status) {
//       errors.status = "Status cannot be blank";
//     }

//     return errors;
//   };

//   const editsubscription = () => {
//     const data = {
//       method: "PUT",
//       body: JSON.stringify({
//         name: subscription.name,
//         price: subscription.price,
//         feature: subscription.feature,
//         type: subscription.type,
//         status: subscription.status,
//       }),
//       headers: {
//          "Content-Type": "application/json",
//          "authorization":token
//       },
//     };
//     console.log("subscriptionsData",data);
//     fetch(`http://65.20.73.28:8090/api/subscriptions/${id}`, data)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data message", data);
//         if (data?.status == true) {
//           toast.success(data.message);
//           navigate("/seller-subscription");
//         } else {
//           toast.error(data.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(subscription));

//     if (Object.keys(formErrors).length == 0) {
//       // addsubscription();
//       navigate("/seller-subscription")
//     }
//   };

//   return (
//         <div id="main">
//           <div className="main-content">
//             <div className="container">
//               <ToastContainer />

// {/* begin::page-header  */}
// <div className="page-header mt-5">
//   <h4>Edit Subscription</h4>
//   <nav aria-label="breadcrumb">
//     <ol className="breadcrumb">
//       <li className="breadcrumb-item">
//         <Link to="/Dashboard">Home</Link>
//       </li>

//       <li className="breadcrumb-item">
//         <Link to="/subscription">Subscriptions</Link>
//       </li>
//       <li className="breadcrumb-item active" aria-current="page">
//          Edit Subscription
//       </li>
//     </ol>
//   </nav>
// </div>

// {/* end::page-header */}

//               <div className="row">
//                 <div className="col-md-12">
//                   {/* <div className="card"> */}
//                   <div>
//                     <Tabs value={currentTab} onChange={handleChangeTab} start>
//                       <Tab label="Edit Subscription Details" />
//                     </Tabs>
//                   </div>
//                   {/* </div> */}
//                 </div>
//               </div>

//               <div className="card" style={{ height: "300px",height:"auto", marginTop: "30px" }}>
//                 <div>
//                   <TabPanel value={currentTab} index={0}>
//                   <form onSubmit={handleSubmit}>
// <div className="row">
//   <div className="col-md-6 mb-3">
//     <label for="validationCustom01">Plan Name</label>
//     <input
//       type="text"
//       className="form-control"
//       placeholder="Enter Your Plan Name"
//       name="name"
//       value={subscription.name}
//       onChange={(e) => handleChangeAddsubscriptionInput(e)}
//     />
//     <p style={{ color: "red" }}>{formErrors.fullname}</p>
//   </div>
//   <div className="col-md-6 mb-3">
//     <label for="validationCustom04">Price</label>
//     <input
//       type="number"
//       className="form-control"
//       placeholder="Enter Price"
//       name="price"
//       value={subscription.price}
//       onChange={(e) => handleChangeAddsubscriptionInput(e)}
//     />
//     <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
//   </div>
// </div>
// <div className="row mt-3">
//   <div className="col-md-4 mb-3">
//     <label for="validationCustom04">Feature</label>
//     <textarea
//       className="form-control"
//       placeholder="Enter Feature"
//       name="feature"
//       value={subscription.feature}
//       onChange={(e) => handleChangeAddsubscriptionInput(e)}
//       rows={5}
//     />
//   </div>
//   <div className="col-md-4 mb-3">
//     <label for="validationCustom04">Type</label>
//     <input
//       type="text"
//       className="form-control"
//       placeholder="Enter type"
//       name="type"
//       value={subscription.type}
//       onChange={(e) => handleChangeAddsubscriptionInput(e)}
//     />
//     <p style={{ color: "red" }}>{formErrors.type}</p>
//   </div>

//   <div className="col-md-4 mb-3">
//     <label for="validationCustom04">Status</label>
//     <select
//     className="form-control"
//     name="status"
//     onChange={(e) => handleChangeAddsubscriptionInput(e)}
//   >
//     <option value="">Select Status</option>
//     <option value="true">Active</option>
//     <option value="false">Inactive</option>
//   </select>
//     <p style={{ color: "red" }}>{formErrors.password}</p>
//   </div>
// </div>

// <button
//   className="btn btn-primary mt-3"
//   type="submit"
//   onClick={() => editsubscription()}
// >
//   Submit
// </button>
//           </form>
//               </TabPanel>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

// };

// export default EditInvestorSub;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getInvestorSubscriptionbyId } from "../../../../Redux/Slice/InvestorSubSlice";
import { useSelector, useDispatch } from "react-redux";
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

const EditInvestorSub = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const Subscription = useSelector(
    (state) => state.InvestorSubscriptionData.InvestorSubscription
  );

  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    dispatch(getInvestorSubscriptionbyId(id));
  }, [id]);

  const token = localStorage.getItem("token");
  const [formErrors, setFormErrors] = useState({});
  const [subscription, setSubscription] = useState({
    name: "",
    price: "",
    feature: "",
    type: "",
    status: "",
  });

  useEffect(() => {
    setSubscription({
      name: Subscription?.name,
      price: Subscription?.price,
      feature: Subscription?.feature,
      type: Subscription?.type,
      status: Subscription?.status,
    });
  }, [Subscription]);

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
    }    if (!subscription.price) {
      errors.price = "Price cannot be blank";
    }
    if (!subscription.feature) {
      errors.feature = "Feature cannot be blank";
    }
    if (!subscription.type) {
      errors.type = "Type cannot be blank";
    }
    if (!subscription.status) {
      errors.status = "Status cannot be blank";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const editsubscription = () => {
    const data = {
      method: "PUT",
      body: JSON.stringify({
        name: subscription.name,
        price: subscription.price,
        feature: subscription.feature,
        type: subscription.type,
        status: subscription.status,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(`http://65.20.73.28:8090/api/subscriptions/${id}`, data)
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
      editsubscription();
    }
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          <ToastContainer />

          {/* begin::page-header  */}
          <div className="page-header mt-5">
            <h4>Edit Subscription</h4>
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
                  Edit Subscription
                </li>
              </ol>
            </nav>
          </div>

          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              <div>
                <Tabs
                  value={currentTab}
                  onChange={(_, newValue) => setCurrentTab(newValue)}
                  start
                >
                  <Tab label="Edit Subscription Details" />
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
                      <label for="validationCustom01">Plan Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Your Plan Name"
                        name="name"
                        value={subscription.name}
                        onChange={(e) => handleChangeAddsubscriptionInput(e)}
                      />
                      {formErrors.name && (
                        <p style={{ color: "red" }}>{formErrors.name}</p>
                      )}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label for="validationCustom04">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Price"
                        name="price"
                        value={subscription.price}
                        onChange={(e) => handleChangeAddsubscriptionInput(e)}
                      />
                      {formErrors.price && (
                        <p style={{ color: "red" }}>{formErrors.price}</p>
                      )}
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom04">Feature</label>
                      <textarea
                        className="form-control"
                        placeholder="Enter Feature"
                        name="feature"
                        value={subscription.feature}
                        onChange={(e) => handleChangeAddsubscriptionInput(e)}
                        rows={5}
                      />
                      {formErrors.feature && (
                        <p style={{ color: "red" }}>{formErrors.feature}</p>
                      )}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom04">Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter type"
                        name="type"
                        value={subscription.type}
                        onChange={(e) => handleChangeAddsubscriptionInput(e)}
                      />
                      {formErrors.type && (
                        <p style={{ color: "red" }}>{formErrors.type}</p>
                      )}
                    </div>

                    <div className="col-md-4 mb-3">
                      <label for="validationCustom04">Status</label>
                      <select
                        className="form-control"
                        name="status"
                        onChange={(e) => handleChangeAddsubscriptionInput(e)}
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

                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    // onClick={() => editsubscription()}
                  >
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

export default EditInvestorSub;
