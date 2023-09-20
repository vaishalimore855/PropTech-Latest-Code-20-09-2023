import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Document, Page } from "react-pdf";

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
import { getPropertyList } from "../../Redux/Slice/PropertyVerificationSlice";
import * as ExcelJS from "exceljs";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "@mui/material/TablePagination";

const PropertyVerification = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Dispatch the action to fetch the property list when the component mounts
  useEffect(() => {
    // dispatch(getPropertyList());

    dispatch(getPropertyList())
      .then(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });
  }, [dispatch]);

  // Access the PropertyList from the Redux store
  const propertyVerifyList = useSelector(
    (state) => state.propertyverification.PropertyList
  );

  console.log("verifylist", propertyVerifyList);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //   const { userid } = useParams();
  var navigate = useNavigate();

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
      " Property Name",
      "User FirstName",
      "User LastName",
      "Ownership Proof	",
      "Index II Document	",
      "Verification Status	",
      "Price",
      "feature",
      "propertyStatus",
      "description",
      "category",
      "subcategory",
      "listedIn",
      "status",
      "userid",
      "propertymanagerid",
      "agentid",
      "bookingAmount",
      "markasFavorite",
      "CreatedAt",
      "UpdatedAt",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    propertyVerifyList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.propertyData?.title,
        row?.userData?.firstname,
        row?.userData?.lastname,
        row?.OwnershipProofname,
        row?.IndexIIDocname,
        row?.propertyData?.propertyStatus,
        row.propertyData?.price,
        row.feature,
        row.propertyData?.propertyStatus,
        row.propertyData?.description,
        row.propertyData?.category,
        row.propertyData?.subcategory,
        row.propertyData?.listedIn,
        row.propertyData?.status,
        row.propertyData?.rejectReason,
        row.propertyData?.userid,
        row.propertyData?.propertymanagerid,
        row.propertyData?.agentid,
        row.propertyData?.bookingAmount,
        row.propertyData?.createdAt,
        row.propertyData?.updatedAt,
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
    navigate(`/edit-proprty/${id}`);
  };

  const navigateToViewPropertyVerification = (id) => {
    navigate(`/view-propertyverification/${id}`);
  };
  const token = localStorage.getItem("token");

  const handleDownload = (e) => {
    const { name, value } = e.target;
    const link = document.createElement("a");
    link.href = value;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <h4>Property Verification</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      User Management Screen
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Property Verification
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    {/* <div className="row">
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={exportToExcel}
                          enabled={!propertyVerifyList.length}
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
                    </div> */}
                    <div className="pt-4 pb-4 text-left">
                      <div className="row">
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-primary btn-rounded  "
                          >
                            <Link
                              to="/add-propertyverification"
                              className="text-white"
                            >
                              + Add Property
                            </Link>
                          </button>

                          <Button
                            onClick={exportToExcel}
                            enabled={!propertyVerifyList.length}
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
                              <th>Id</th>
                              <th>Property Name</th>
                              <th>User Name</th>
                              <th>Ownership Proof</th>
                              <th>Index II Document</th>
                              <th>Verification Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          {isLoading ? (
                            <p>loading...</p>
                          ) : (
                            <tbody style={{ textAlign: "center" }}>
                              {propertyVerifyList.map((property, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{property?.propertyData?.title}</td>
                                  <td>
                                    {property?.userData?.firstname}&nbsp;
                                    {property?.userData?.lastname}
                                  </td>
                                  <td>
                                    <div
                                      onClick={(e) => handleDownload(e)}
                                      className="d-flex justify-content-center align-items-center"
                                    >
                                      <a
                                        style={{ color: "blue" }}
                                        value={property?.OwnershipProof}
                                        href={property?.OwnershipProof}
                                        name={property?.OwnershipProofname}
                                      >
                                        {property?.OwnershipProofname}
                                      </a>
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      onClick={(e) => handleDownload(e)}
                                      className="d-flex justify-content-center align-items-center"
                                    >
                                      <a
                                        style={{ color: "blue" }}
                                        value={property?.IndexIIDoc}
                                        // href={property?.IndexIIDoc}
                                        name={property?.IndexIIDocname}
                                      >
                                        {property?.IndexIIDocname}
                                      </a>
                                    </div>
                                  </td>
                                  <td>
                                    {property?.propertyData?.propertyStatus ==
                                    "Verified" ? (
                                      <span class="badge badge-success">
                                        Verified
                                      </span>
                                    ) : property?.propertyData
                                        ?.propertyStatus == "In Progress" ? (
                                      <span class="badge badge-warning">
                                        In Progress
                                      </span>
                                    ) : property?.propertyData
                                        ?.propertyStatus == "Reject" ? (
                                      <span class="badge badge-danger">
                                        Reject
                                      </span>
                                    ) : (
                                      <span class="badge badge-info">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    <button
                                      onClick={() =>
                                        navigateToViewPropertyVerification(
                                          property.id
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
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          )}{" "}
                        </table>
                        <TablePagination
                          rowsPerPageOptions={[5, 10]}
                          component="div"
                          count={propertyVerifyList.length}
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

export default PropertyVerification;
