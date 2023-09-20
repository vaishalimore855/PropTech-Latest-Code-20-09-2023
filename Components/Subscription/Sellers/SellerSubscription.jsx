import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSellerSubscriptionList } from "../../../Redux/Slice/SellerSubSlice";
import * as ExcelJS from "exceljs";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Paper } from "@mui/material";

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
const SellerSubscription = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const { type } = useParams();
  const [subscriptionData, setSubscriptionData] = useState("");
  // Dispatch the action to fetch the property list when the component mounts
  useEffect(() => {
    dispatch(getSellerSubscriptionList(type));
  }, [dispatch]);

  // Access the PropertyList from the Redux store
  const SubscriptionList = useSelector(
    (state) => state.SellerSubscriptionData.SellerSubscriptions
  );

  console.log("list", JSON.stringify(SubscriptionList));

  //   const { userid } = useParams();
  var navigate = useNavigate();

  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Id",
      " Name",
      "Price",
      "feature",
      "Type",
      "Status",
      "CreatedAt",
      "UpdatedAt",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    SubscriptionList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.name,
        row.price,

        row.feature,
        row.type,
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

  const navigateToEditSubscription = (id) => {
    navigate(`/edit-sellersub/${id}`);
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
      .delete(`http://65.20.73.28:8090/api/subscriptions/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getSellerSubscriptionList(type));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        dispatch(getSellerSubscriptionList(type));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemToDelete(null);
        setOpenConfirmation(false);
      });
  };

  return (
    <>
      <div>
        {/* <!-- begin::main --> */}
        <div id="main">
          {/* <!-- begin::main-content --> */}
          <main className="main-content">
            <div className="container">
              <ToastContainer />
              {/* <!-- begin::page-header --> */}
              <div className="page-header mt-5">
                <h4>Property Subscription</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/homepage" style={{ fontSize: "16px" }}>Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link to="#" style={{ fontSize: "16px" }}>Seller Subscription Management</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "16px" }}>
                      Seller Subscription List
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
                              <Link to="/add-sellersub" className="text-white">
                                + Add Subscription
                              </Link>
                            </button>

                            <Button
                              onClick={exportToExcel}
                              enabled={!SubscriptionList.length}
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
                                <th>Name</th>
                                <th>Price</th>
                                <th>Feature</th>

                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody style={{ textAlign: "center" }}>
                              {SubscriptionList.map((subscribe, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{subscribe?.name}</td>
                                  <td>{subscribe?.price}</td>
                                  <td>{subscribe?.feature}</td>

                                  <td>
                                    {subscribe?.status ? "True" : "False"}
                                  </td>

                                  <td>
                                    <button
                                      onClick={() => {
                                        navigateToEditSubscription(
                                          subscribe.id
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
                                        confirmDelete(subscribe?.id)
                                      }
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
                            <Modal
                              open={openConfirmation}
                              onClose={cancelDelete}
                            >
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
    </>
  );
};

export default SellerSubscription;
