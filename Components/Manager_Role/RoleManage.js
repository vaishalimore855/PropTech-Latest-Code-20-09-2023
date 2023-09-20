import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMenuItemList } from "../../Redux/Slice/MenuSlice";
import { getAdminRoleList, getAdminRoleId } from "../../Redux/Slice/MenuSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

import { makeStyles } from "@mui/styles";
import { Button, Modal, Paper } from "@mui/material";
import * as ExcelJS from "exceljs";
import TablePagination from "@mui/material/TablePagination";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    width: 350,
    height: 100,
    paddingLeft: "30px",
    // padding: theme.spacing(2, 4, 3),
  },
}));

function RoleManage() {
  const classes = useStyles();
  var navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const token = localStorage.getItem("token");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const defaultChecked = true;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminRoleList());
    dispatch(getAdminRoleId(id));
  }, [id]);

  const adminRoleList = useSelector((state) => state.adminMenu.AdminRole);
  console.log("AdminRoleList----->", adminRoleList);
  const adminRoleId = useSelector((state) => state.adminMenu.Role);

  console.log("adminRoleId----->", adminRoleId);

  const managerValues = {
    fullname: "",
    email: "",
    role: "",
    phoneNumber: "",
    password: "",
    menu: [],
  };
  //pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //admin role
  const adminRoleValue = {
    role: "",
  };
  const [role, setRole] = useState(adminRoleValue);
  const [menu, setMenu] = useState(managerValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log("formErrors", formErrors);
  console.log("menu", menu);
  console.log("role", role);

  const handleChangeAddMenuInput = (e) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });
  };

  const CreateAdminRole = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        role: role,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch("http://65.20.73.28:8090/api/adminroles", data)
      .then((response) => response.json())
      .then((data) => {
        setShowModal(false);
        console.log("AdminRole response", JSON.stringify(data));
        setMenu(JSON.stringify(data));
        dispatch(getAdminRoleList());
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks
    let errors = {};
    if (!role) {
      errors.role = "Role name is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
  };
  console.log(" create admin role ", role);

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setOpenConfirmation(true);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setOpenConfirmation(false);
  };

  const executeDelete = (id) => {
    axios
      .delete(`http://65.20.73.28:8090/api/adminroles/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getAdminRoleList());
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemToDelete(null);
        setOpenConfirmation(false);
      });
  };

  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = ["Id", " Role", "Status", "CreatedAt", "UpdatedAt"]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    adminRoleList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.role,
        row.status,
        row.createdAt,
        row.updatedAt,
      ]); // Fixed field names
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const navigateTtoEditRoleManage = (id) => {
    navigate(`/edit-roleManage/${id}`);
  };

  const handleRoleChange = (e) => {
    // Use a regular expression to check if the input contains only letters
    const inputRole = e.target.value;
    const onlyLettersRegex = /^[A-Za-z]+$/;

    if (onlyLettersRegex.test(inputRole)) {
      // If it contains only letters, update the state
      setRole(inputRole);
    }
  };
  return (
    <div className="rtl">
      <div id="main">
        <div className="main-content" style={{ height: "700px" }}>
          <div className="container">
            {/* <ToastContainer/> */}

            <div className="page-header mt-5">
              <h4> Role Management</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Dashboard" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Role Management
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div
                  className={`modal ${showModal ? "show" : ""}`}
                  id="exampleModalToggle"
                  aria-hidden={!showModal}
                  aria-labelledby="exampleModalToggleLabel"
                  tabindex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id="exampleModalToggleLabel"
                        >
                          Add Role
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="row">
                          <div className="col-md-10 mb-3">
                            <input
                          type="text"
                          className="form-control"
                          name="role"
                          // value={role}
                          onChange={(e) => setRole(e.target.value)}
                        ></input>
                            {/* <input
                              type="text"
                              // id="role"
                              className="form-control"
    
                              name="role"
                              // value={role}
                              onChange={handleRoleChange}
                              pattern="[A-Za-z]+" // Optional: Use pattern attribute to restrict input on mobile devices
                              title="Please enter only letters" // Optional: Error message for pattern attribute
                            /> */}
                          </div>
                          <div className="col-md-2 mb-3">
                            <button
                              className="btn btn-primary"
                              onClick={() => CreateAdminRole()}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body" style={{ height: "200%" }}>
                    <div className="pt-4 pb-4 text-left">
                      <div className="row">
                        <div className="d-flex justify-content-between">
                          <button
                            data-bs-toggle="modal"
                            href="#exampleModalToggle"
                            role="button"
                            className="btn btn-primary btn-rounded  "
                          >
                            <Link to="" className="text-white">
                              + Add Role
                            </Link>
                          </button>

                          <Button
                            onClick={exportToExcel}
                            enabled={!adminRoleList.length}
                            variant="contained"
                            style={{
                              backgroundColor: "#3A833A",
                              marginRight: "10px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ color: "white" }}
                            />{" "}
                            &nbsp;&nbsp; Export to Excel
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <table
                          style={{ textAlign: "center" }}
                          id="example2"
                          className="table table-striped table-bordered "
                        >
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {adminRoleList.map((value, index) => (
                              <tr key={value.id}>
                                <td>{index + 1}</td>
                                <td>{value.role}</td>
                                <td>
                                  <Switch
                                    onChange={handleSwitchChange}
                                    checked={
                                      value.status === true
                                        ? isChecked
                                        : !isChecked
                                    }
                                    color="primary"
                                    inputProps={{ "aria-label": "controlled" }}
                                  />
                                </td>

                                <td className="d-flex justify-content-center align-items-center ">
                                  <button
                                    onClick={() => {
                                      navigateTtoEditRoleManage(value.id);
                                    }}
                                    className="btn btn-sm btn-icon  me-2   float-left btn-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Edit"
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilSquare}
                                      style={{ color: "white" }}
                                    />
                                  </button>

                                  <button
                                    className="btn btn-sm btn-icon   me-2  btn-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                    onClick={() => confirmDelete(value.id)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faTrashAlt}
                                      style={{ color: "white" }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <Modal open={openConfirmation} onClose={cancelDelete}>
                            <Paper className={classes.modalPaper}>
                              <div className="confirmation-modal">
                                <div className="confirmation-content">
                                  <p style={{ marginTop: "10px" }}>
                                    Are you sure you want to delete this item?
                                  </p>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <Button
                                        className="btn btn-primary text-white "
                                        style={{ marginLeft: "30px" }}
                                        onClick={() =>
                                          executeDelete(itemToDelete)
                                        }
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                    <div className="col-md-5">
                                      <Button
                                        className="btn btn-primary text-white"
                                        onClick={cancelDelete}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </Modal>
                        </table>
                        <TablePagination
                          rowsPerPageOptions={[5, 10]}
                          component="div"
                          count={adminRoleList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                        />
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end::main-content --> */}
        </div>
        {/* <!-- end::main --> */}
      </div>
    </div>
  );
}

export default RoleManage;
