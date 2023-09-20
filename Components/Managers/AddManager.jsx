// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // import { postsubscriptionData } from "../../../Redux/Slice/subscriptionSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";
// import axios from "axios";
// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";
// import { getAdminMenuList } from "../../Redux/Slice/MenuSlice";
// import { getAdminRoleList } from "../../Redux/Slice/MenuSlice";
// import { useParams } from "react-router-dom";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";

// const TabPanel = ({ children, value, index }) => {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box p={3}>{children}</Box>}
//     </div>
//   );
// };

// const AddManager = () => {
//   const { id } = useParams();
//   var navigate = useNavigate();
//   const [currentTab, setCurrentTab] = useState(0);
//   const handleChangeTab = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const dispatch = useDispatch();
//   const adminRoleList = useSelector((state) => state.adminMenu.AdminRole);
//   console.log("AdminRoleList----->", adminRoleList);
//   const AdminMenuList = useSelector((state) => state.adminMenu.AdminMenuList);
//   console.log("AdminMenuList", AdminMenuList);

//   useEffect(() => {
//     dispatch(getAdminMenuList());
//     dispatch(getAdminRoleList());
//   }, []);

//   const managerValues = {
//     firstname: "",
//     lastname: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     role: adminRoleList?.role,
//     menu: [AdminMenuList?.title],
//     status: "",
//   };
//   console.log("managerValues", managerValues);
//   const token = localStorage.getItem("token");
//   const [manager, setManager] = useState(managerValues);
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChangeAddManagerInput = (e) => {
//     const { name, value } = e.target;
//     setManager({
//       ...manager,
//       [name]: value,
//     });
//   };

//   const validate = (manager) => {
//     let errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//     if (!manager.firstname) {
//       errors.firstname = "First name cannot be blank";
//     }
//     if (!manager.lastname) {
//       errors.lastname = "Last name cannot be blank";
//     }
//     if (!manager.phoneNumber) {
//       errors.phoneNumber = "Phone number cannot be blank";
//     }
//     if (!manager.email) {
//       errors.email = "Email cannot be blank";
//     } else if (!regex.test(manager.email)) {
//       errors.email = "Invalid email format";
//     }
//     if (!manager.password) {
//       errors.password = "Password cannot be blank";
//     }
//     if (!manager.role) {
//       errors.role = "Manager role cannot be blank";
//     }
//     if (manager.menu.length === 0) {
//       errors.menu = "Access level cannot be blank";
//     }
//     if (!manager.status) {
//       errors.status = "Status cannot be blank";
//     }

//     return errors;
    
//   };

//   const addmanager = () => {
//     const data = {
//       method: "POST",
//       body: JSON.stringify({
//         firstname: manager?.firstname,
//         lastname: manager?.lastname,
//         phoneNumber: manager?.phoneNumber,
//         email: manager?.email,
//         password: manager?.password,
//         role: manager?.role,
//         menu: [manager?.menu],
//         status: manager?.status,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         authorization: token,
//       },
//     };
//     console.log("managerData=====================>", data);
//     fetch("http://65.20.73.28:8090/api/managers", data)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data message", JSON.string);
//         if (data?.status == true) {
//           toast.success(data.message);
//           navigate("/managers");
//         } else {
//           toast.error(data.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(manager));

//     if (Object.keys(formErrors).length == 0) {
//       navigate("/managers");
//     }
//   };
//   // console.log("manager data------------------->", manager);
//   return (
//     <div id="main">
//       <div className="main-content">
//         <div className="container">
//           <ToastContainer />

//           {/* begin::page-header  */}
//           <div className="page-header mt-5">
//             <h4>Add manager</h4>
//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="/Dashboard" style={{fontSize:"16px"}}>Home</Link>
//                 </li>

//                 <li className="breadcrumb-item">
//                   <Link to="/manager"style={{fontSize:"16px"}}>Managers</Link>
//                 </li>
//                 <li className="breadcrumb-item active" aria-current="page"style={{fontSize:"16px"}}>
//                   Add Managers
//                 </li>
//               </ol>
//             </nav>
//           </div>

//           {/* end::page-header */}

//           <div className="row">
//             <div className="col-md-12">
//               {/* <div className="card"> */}
//               <div>
//                 <Tabs value={currentTab} onChange={handleChangeTab} start>
//                   <Tab label="Add Managers Details" />
//                 </Tabs>
//               </div>
//               {/* </div> */}
//             </div>
//           </div>

//           <div
//             className="card"
//             style={{ height: "300px", height: "auto", marginTop: "30px" }}
//           >
//             <div>
//               <TabPanel value={currentTab} index={0}>
//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-4 mb-3">
//                       <label for="validationCustom01">First Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter First Name"
//                         name="firstname"
//                         onChange={(e) => handleChangeAddManagerInput(e)}
//                       />
//                       <p style={{ color: "red" }}>{formErrors.firstname}</p>
//                     </div>
//                     <div className="col-md-4 mb-3">
//                       <label for="validationCustom04">Last Name</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Last Name"
//                         name="lastname"
//                         onChange={(e) => handleChangeAddManagerInput(e)}
//                       />
//                       <p style={{ color: "red" }}>{formErrors.lastname}</p>
//                     </div>
//                     <div className="col-md-4 mb-3">
//                       <label for="validationCustom04">Phone Number</label>
//                       <input
//                         type="number"
//                         className="form-control"
//                         placeholder="Enter Phone Number"
//                         name="phoneNumber"
//                         onChange={(e) => handleChangeAddManagerInput(e)}
//                       />
//                       <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
//                     </div>
//                   </div>
//                   <div className="row mt-3">
//                     <div className="col-md-6 mb-3">
//                       <label for="validationCustom04">Email</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter Phone Number"
//                         name="email"
//                         onChange={(e) => handleChangeAddManagerInput(e)}
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label for="validationCustom04">Password</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Enter Password"
//                         name="password"
//                         onChange={(e) => handleChangeAddManagerInput(e)}
//                       />
//                     </div>
//                     <div className="row mt-3">
//                       <div className="col-md-4 mb-3">
//                         <label for="validationCustom04">Manager Role</label>
//                         <select
//                           className="form-control"
//                           name="role"
//                           value={manager.role}
//                           onChange={(e) => handleChangeAddManagerInput(e)}
//                         >
//                           <option value="">Select Role</option>

//                           {adminRoleList &&
//                             adminRoleList.map((value, i) => {
//                               return (
//                                 <>
//                                   <option key={i} value={value.id}>
//                                     {value.role}
//                                   </option>
//                                 </>
//                               );
//                             })}
//                         </select>
//                         <p style={{ color: "red" }}>{formErrors.role}</p>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label htmlFor="accessLevel">Access Level</label>
//                         <FormControl fullWidth>
//                           <Select
//                             size="sm"
//                             id="accessLevel"
//                             name="menu"
//                             multiple
//                             value={manager.menu}
//                             onChange={(e) => handleChangeAddManagerInput(e)}
//                             renderValue={(selected) => selected.join(", ")} // Display selected items
//                             inputProps={{
//                               size: "extra-small", // Adjust the size of the input
//                               placeholder: "Select Menu", // Set a placeholder
//                             }}
//                           >
//                             {AdminMenuList &&
//                               AdminMenuList.map((item, i) => (
//                                 <MenuItem key={item.id} value={item.title}>
//                                   {item.title}
//                                 </MenuItem>
//                               ))}
//                           </Select>
//                         </FormControl>
//                         <p style={{ color: "red" }}>{formErrors.menu}</p>
//                       </div>

//                       <div className="col-md-4 mb-3">
//                         <label for="validationCustom04">Status</label>
//                         <select
//                           className="form-control"
//                           name="status"
//                           value={manager.status}
//                           onChange={(e) => handleChangeAddManagerInput(e)}
//                         >
//                           <option value="">Select status</option>
//                           <option value="true">Active</option>

//                           <option value="false">Inactive</option>
//                         </select>
//                         <p style={{ color: "red" }}>{formErrors.status}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="btn btn-primary mt-3"
//                     type="submit"
//                     onClick={() => addmanager()}
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </TabPanel>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddManager;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getAdminMenuList } from "../../Redux/Slice/MenuSlice";
import { getAdminRoleList } from "../../Redux/Slice/MenuSlice";
import { useParams } from "react-router-dom";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const AddManager = () => {
  const { id } = useParams();
  var navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const dispatch = useDispatch();
  const adminRoleList = useSelector((state) => state.adminMenu.AdminRole);
  const AdminMenuList = useSelector((state) => state.adminMenu.AdminMenuList);

  useEffect(() => {
    dispatch(getAdminMenuList());
    dispatch(getAdminRoleList());
  }, []);

  const managerValues = {
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    menu: [],
    status: "",
  };

  const token = localStorage.getItem("token");
  const [manager, setManager] = useState(managerValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChangeAddManagerInput = (e) => {
    const { name, value } = e.target;
    setManager({
      ...manager,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyLetters = /^[A-Za-z]+$/;
    if (!manager.firstname) {
      errors.firstname = "firstname cannot be blank";
    } else if (!onlyLetters.test(manager.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

   
    if (!manager.lastname) {
      errors.lastname = "lastname cannot be blank";
    } else if (!onlyLetters.test(manager.lastname)) {
      errors.lastname = "last name should only contain letters.";
    }
    
    if (!manager.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (manager.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!manager.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(manager.email)) {
      errors.email = "Invalid email format";
    }
    if (!manager.password) {
      errors.password = "Password cannot be blank";
    }
    if (!manager.role) {
      errors.role = "Manager role cannot be blank";
    }
    if (manager.menu.length === 0) {
      errors.menu = "Access level cannot be blank";
    }
    if (!manager.status) {
      errors.status = "Status cannot be blank";
    }

    return errors;
  };

  const addmanager = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        firstname: manager.firstname,
        lastname: manager.lastname,
        phoneNumber: manager.phoneNumber,
        email: manager.email,
        password: manager.password,
        role: manager.role,
        menu: manager.menu,
        status: manager.status,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch("http://65.20.73.28:8090/api/managers", data)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          toast.success(data.message);
          navigate("/managers");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      addmanager();
    }
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          <ToastContainer />

          <div className="page-header mt-5">
            <h4>Add manager</h4>
            <nav aria-label="breadcrumb">{/* Breadcrumb links */}</nav>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div>
                <Tabs value={currentTab} onChange={handleChangeTab} start>
                  <Tab label="Add Managers Details" />
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
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom01">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter First Name"
                        name="firstname"
                        onChange={(e) => handleChangeAddManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.firstname}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom04">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Last Name"
                        name="lastname"
                        onChange={(e) => handleChangeAddManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.lastname}</p>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label for="validationCustom04">Phone Number</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        name="phoneNumber"
                        onChange={(e) => handleChangeAddManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 mb-3">
                      <label for="validationCustom04">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Phone Number"
                        name="email"
                        onChange={(e) => handleChangeAddManagerInput(e)}
                      /><p style={{ color: "red" }}>{formErrors.email}</p>

                    </div>

                    <div className="col-md-6 mb-3">
                      <label for="validationCustom04">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        onChange={(e) => handleChangeAddManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.password}</p>

                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4 mb-3">
                        <label for="validationCustom04">Manager Role</label>
                        <select
                          className="form-control"
                          name="role"
                          value={manager.role}
                          onChange={(e) => handleChangeAddManagerInput(e)}
                        >
                          <option value="">Select Role</option>

                          {adminRoleList &&
                            adminRoleList.map((value, i) => {
                              return (
                                <>
                                  <option key={i} value={value.id}>
                                    {value.role}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        <p style={{ color: "red" }}>{formErrors.role}</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <label htmlFor="accessLevel">Access Level</label>
                        <FormControl fullWidth>
                          <Select
                            size="sm"
                            id="accessLevel"
                            name="menu"
                            multiple
                            value={manager.menu}
                            onChange={(e) => handleChangeAddManagerInput(e)}
                            renderValue={(selected) => selected.join(", ")} // Display selected items
                            inputProps={{
                              size: "extra-small", // Adjust the size of the input
                              placeholder: "Select Menu", // Set a placeholder
                            }}
                          >
                            {AdminMenuList &&
                              AdminMenuList.map((item, i) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.title}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                        <p style={{ color: "red" }}>{formErrors.menu}</p>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label for="validationCustom04">Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={manager.status}
                          onChange={(e) => handleChangeAddManagerInput(e)}
                        >
                          <option value="">Select status</option>
                          <option value="true">Active</option>

                          <option value="false">Inactive</option>
                        </select>
                        <p style={{ color: "red" }}>{formErrors.status}</p>
                      </div>
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

export default AddManager;



