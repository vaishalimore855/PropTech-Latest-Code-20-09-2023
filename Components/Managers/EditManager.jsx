import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { getManagerbyId } from "../../Redux/Slice/ManagerSlice";
import { getAdminMenuList } from "../../Redux/Slice/MenuSlice";
import { getAdminRoleList } from "../../Redux/Slice/MenuSlice";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const EditManager = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const adminRoleList = useSelector((state) => state.adminMenu.AdminRole);
  console.log("AdminRoleList----->", adminRoleList);
  const AdminMenuList = useSelector((state) => state.adminMenu.AdminMenuList);
  console.log("AdminMenuList", AdminMenuList);

  useEffect(() => {
    dispatch(getAdminMenuList());
    dispatch(getAdminRoleList());
  }, []);

  const ManagerId = useSelector((state) => state.ManagerData.Manager);

  console.log("ManagerId", JSON.stringify(ManagerId));
  const [formErrors, setFormErrors] = useState({});

  const [editedManager, setEditedManager] = useState({
    firstname: "",
    lastname: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    menu: "",
    status: "",
  });
  console.log("editedManager", editedManager);
  useEffect(() => {
    dispatch(getManagerbyId(id));
  }, [dispatch, id]);
  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyLetters = /^[A-Za-z]+$/;

    if (!editedManager.firstname) {
      errors.firstname = "First name cannot be blank";
    } else if (!onlyLetters.test(editedManager.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

    if (!editedManager.lastname) {
      errors.lastname = "Last name cannot be blank";
    } else if (!onlyLetters.test(editedManager.lastname)) {
      errors.lastname = "Last name should only contain letters.";
    }

    if (!editedManager.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (editedManager.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }

    if (!editedManager.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(editedManager.email)) {
      errors.email = "Invalid email format";
    }
    if (!editedManager.password) {
      errors.password = "Password cannot be blank";
    }
    if (!editedManager.role) {
      errors.role = "Manager role cannot be blank";
    }
    if (editedManager.menu.length === 0) {
      errors.menu = "Access level cannot be blank";
    }
    if (!editedManager.status) {
      errors.status = "Status cannot be blank";
    }

    return errors;
  };

  useEffect(() => {
    if (ManagerId) {
      setEditedManager({
        firstname: ManagerId?.firstname,
        lastname: ManagerId?.lastname,
        phoneNumber: ManagerId?.phoneNumber,
        email: ManagerId?.email,
        password: ManagerId?.password,
        role: ManagerId?.role,
        menu: ManagerId?.menu,
        status: ManagerId?.status,
      });
    }
  }, [ManagerId]);

  const handleChangeEditManagerInput = (e) => {
    const { name, value } = e.target;
    setEditedManager((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditManager = async (e) => {
    e.preventDefault();
    const data = {
      method: "PUT",
      body: JSON.stringify(editedManager),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    console.log("Editdata", data);
    try {
      await fetch(`http://65.20.73.28:8090/api/managers/${id}`, data)
        .then((response) => response.json())
        .then((data) => {
          console.log("Update Manager", data);
          if (data.status == true) {
            toast.success(data.message);
            navigate("/managers");
          } else {
            toast.error(data.message);
          }
        });
    } catch (error) {
      console.error("Error updating manager:", error);
      toast.error("An error occurred while updating the manager.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleEditManager();
    }
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          <ToastContainer />

          {/* begin::page-header  */}
          <div className="page-header mt-5">
            <h4>Edit Manager</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/Dashboard" style={{ fontSize: "16px" }}>
                    Home
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link to="/Managers" style={{ fontSize: "16px" }}>
                    Managers
                  </Link>
                </li>
                <li
                  className="breadcrumb-item active"
                  aria-current="page"
                  style={{ fontSize: "16px" }}
                >
                  Edit Manager
                </li>
              </ol>
            </nav>
          </div>

          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              {/* <div className="card"> */}
              <div>
                <Tabs value={currentTab} onChange={handleChangeTab} start>
                  <Tab label="Edit Manager Details" />
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
                        value={editedManager.firstname}
                        onChange={(e) => handleChangeEditManagerInput(e)}
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
                        value={editedManager.lastname}
                        onChange={(e) => handleChangeEditManagerInput(e)}
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
                        value={editedManager.phoneNumber}
                        onChange={(e) => handleChangeEditManagerInput(e)}
                      />{" "}
                      <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6 mb-3">
                      <label for="validationCustom04">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email Id"
                        name="email"
                        value={editedManager.email}
                        onChange={(e) => handleChangeEditManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.email}</p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label for="validationCustom04">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        name="password"
                        // value={editedManager.password}
                        onChange={(e) => handleChangeEditManagerInput(e)}
                      />
                      <p style={{ color: "red" }}>{formErrors.password}</p>
                    </div>

                    <div className="row mt-3">
                      <div className="col-md-4 mb-3">
                        <label for="validationCustom04">Manager Role</label>
                        <select
                          className="form-control"
                          name="role"
                          value={editedManager.role}
                          onChange={(e) => handleChangeEditManagerInput(e)}
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
                        <label for="validationCustom04">Access Level</label>
                        <select
                          className="form-control"
                          name="menu"
                          value={editedManager.menu}
                          onChange={(e) => handleChangeEditManagerInput(e)}
                        >
                          {/* <option value="">Select Menu</option> */}

                          {AdminMenuList &&
                            AdminMenuList.map((item, i) => {
                              return (
                                <>
                                  <option key={i} value={item.id}>
                                    {item?.title}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                        <p style={{ color: "red" }}>{formErrors.menu}</p>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label for="validationCustom04">Status</label>
                        <select
                          className="form-control"
                          name="status"
                          value={editedManager.status}
                          onChange={(e) => handleChangeEditManagerInput(e)}
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

export default EditManager;

