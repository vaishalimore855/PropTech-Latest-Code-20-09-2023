import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getManagersList,
  getManagerbyId,
} from "../../Redux/Slice/ManagerSlice";
import { Button, Modal, Paper } from "@mui/material";
import * as ExcelJS from "exceljs";
import TablePagination from "@mui/material/TablePagination";

import { makeStyles } from "@mui/styles";

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

const Managers = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getManagersList());
    getManagerbyId(id);
  }, [dispatch, id]);

  const ManagerList = useSelector((state) => state.ManagerData.Managers);
  console.log("ManagerList", ManagerList);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log("list", JSON.stringify(ManagerList));
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [managerData, setManagerData] = useState("");
  const ManagerId = useSelector((state) => state.ManagerData.Manager);

  console.log("ManagerId", JSON.stringify(ManagerId));

  //pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Id",
      " Firstname",
      "Lastname",
      "Email",
      "Role",
      "Userrole",
      "PhoneNumber",
      "City",
      "Address",
      "Image",
      "Menu",
      "IsAdmin",
      "IsVerifiedByAdmin",
      "RejectReason",
      "IsBlockedByAdmin",
      "FreeAdvertLimit",
      "PaidAdvertLimit",
      "Mobileverified",
      "Status",
      "createdAt",
      "UpdatedAt",
      "Roles",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    ManagerList.forEach((row) => {
      worksheet.addRow([
        row.userData?.id,
        row.userData?.firstname,
        row.userData?.lastname,
        row.userData?.email,
        row.userData?.role,
        row.userData?.userrole,
        row.userData?.phoneNumber,
        row.userData?.city,
        row.userData?.address,
        row.userData?.image,
        row.userData?.menu,
        row.userData?.isAdmin,
        row.iuserData?.sVerifiedByAdmin,
        row.userData?.rejectReason,
        row.userData?.isBlockedByAdmin,
        row.userData?.freeAdvertLimit,
        row.paidAdvertLimit,
        row.userData?.Mobileverified,
        row.userData?.status,
        row.userData?.createdAt,
        row.userData?.updatedAt,
        row.roles,
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

  var navigate = useNavigate();

  const navigateToEditManager = (id) => {
    navigate(`/edit-manager/${id}`);
  };

  const navigateToViewManager = (id) => {
    navigate(`/view-manager/${id}`);
  };
  const token = localStorage.getItem("token");

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
      .delete(`http://65.20.73.28:8090/api/managers/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getManagersList());

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

  return (
    <div>
      {/* <!-- begin::main --> */}
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <main className="main-content">
          <div className="container">
            <ToastContainer />
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4>Manager List</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      Manager Management
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Manager List
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="pt-4 pb-4 text-left">
                      <div className="row">
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-primary btn-rounded  "
                          >
                            <Link to="/add-manager" className="text-white">
                              + Add Manager
                            </Link>
                          </button>

                          <Button
                            onClick={exportToExcel}
                            enabled={!ManagerList.length}
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
                          id="example2"
                          className="table table-striped table-bordered"
                        >
                          <thead>
                            <tr>
                              <th>Sr No</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Role</th>
                              <th>Access Level</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody style={{ textAlign: "center" }}>
                            {ManagerList &&
                              ManagerList.map((manager, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>  
                                <td>{manager?.userData?.firstname}</td>
                                <td>{manager?.userData?.lastname}</td>
                                <td>{manager?.userData?.email}</td>
                                <td>{manager?.userData?.phoneNumber}</td>
                                <td>{manager?.roles}</td>
                                <td>{manager?.userData?.menu}</td>

                                <td>
                                  <button
                                    onClick={() =>
                                      navigateToViewManager(
                                        manager.userData?.id
                                      )
                                    }
                                    className="btn btn-sm btn-icon me-2 float-left btn-info"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="View"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      style={{ color: "white" }}
                                    />
                                  </button>

                                  <button
                                    onClick={() => {
                                      navigateToEditManager(
                                        manager.userData?.id
                                      );
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
                                    onClick={() =>
                                      confirmDelete(manager?.userData?.id)
                                    } // Call confirmDelete function
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
                          count={ManagerList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- end::main-content --> */}
      </div>
      {/* <!-- end::main --> */}
    </div>
  );
};

export default Managers;
