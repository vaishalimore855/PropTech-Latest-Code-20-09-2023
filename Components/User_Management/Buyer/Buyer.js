import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  getBuyerList,
  getKycBuyerUserid,
} from "../../../Redux/Slice/BuyerSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ExcelJS from "exceljs";
import { Button, Modal, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
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

const Buyer = () => {
  const classes = useStyles();
  const { userid } = useParams();
  const dispatch = useDispatch();
  // const [showConfirmation, setShowConfirmation] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [buyerData, setBuyerData] = useState("");
  const BuyerList = useSelector((state) => state.buyer.Buyers);
  console.log("BuyerList", BuyerList);

  var navigate = useNavigate();

  useEffect(() => {
    dispatch(getBuyerList());
  }, [userid]);

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
      "First Name",
      "Last Name",
      "Email Id",
      "Password",
      "Role",
      "User Role",
      "Contact",
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
      "CreatedAt",
      "UpdatedAt",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    BuyerList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.firstname,
        row.lastname,
        row.email,
        row.password,
        row.role,
        row.userrole,
        row.phoneNumber,
        row.city,
        row.address,
        row.image,
        row.menu,
        row.isAdmin,
        row.isVerifiedByAdmin,
        row.rejectReason,
        row.isBlockedByAdmin,
        row.freeAdvertLimit,
        row.paidAdvertLimit,
        row.Mobileverified,
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
  const navigateToEditBuyer = (id) => {
    navigate(`/edit-buyer/${id}`);
  };

  const navigateToViewBuyer = (id) => {
    navigate(`/view-buyer/${id}`);
  };

  const navigateToKycEditBuyer = (userid) => {
    navigate(`/edit-buyer/${userid}`);
  };

  const navigateToKycViewBuyer = (userid) => {
    navigate(`/view-buyer/${userid}`);
  };

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
      .delete(`http://65.20.73.28:8090/api/users/${id}`)
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getBuyerList());
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
              <h4>Buyers</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#"style={{ fontSize: "16px" }}>User Management Screen</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "16px" }}>
                    Buyers
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
                            <Link to="/add-buyer" className="text-white">
                              + Add Buyer
                            </Link>
                          </button>

                          <Button
                            onClick={exportToExcel}
                            enabled={!BuyerList.length}
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
                              <th>Customer ID</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Contact</th>
                              <th>Email</th>
                              <th>User Role</th>
                              <th>KYC Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody style={{ textAlign: "center" }}>
                            {BuyerList.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            ).map((buyer, index) => {
                              return (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{buyer.firstname}</td>
                                  <td>{buyer.lastname}</td>
                                  <td>{buyer.phoneNumber}</td>
                                  <td>{buyer.email}</td>
                                  <td>{buyer.userrole}</td>
                                  <td style={{fontSize:"18px"}}>
                                    {buyer?.isVerifiedByAdmin == "Verified" ? (
                                      <span className="badge badge-success" >
                                        Verified
                                      </span>
                                    ) : buyer?.isVerifiedByAdmin == "Reject" ? (
                                      <span className="badge badge-danger" >
                                        Reject
                                      </span>
                                    ) : (
                                      <span className="badge badge-info">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="d-flex ">
                                    <button
                                      onClick={() =>
                                        navigateToViewBuyer(buyer.id)
                                      }
                                      className="btn btn-sm btn-icon  me-2  float-left btn-info"
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
                                        navigateToEditBuyer(buyer.id);
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
                                      onClick={() => confirmDelete(buyer?.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={{ color: "white" }}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
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
                            count={BuyerList.length}
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

export default Buyer;
