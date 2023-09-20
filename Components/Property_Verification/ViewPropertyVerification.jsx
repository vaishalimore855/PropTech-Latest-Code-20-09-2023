import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getPropertybyId } from "../../Redux/Slice/PropertyVerificationSlice";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Button, Modal, Box, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ViewPropertyVerification = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the getPropertybyId action when the component mounts
    dispatch(getPropertybyId(id));
  }, [dispatch, id]);

  const propertyId = useSelector(
    (state) => state.propertyverification.PropertyId
  );

  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const ApproveVerify = () => {
    const data = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(
      `http://65.20.73.28:8090/api/propertyverification/markasverify/${propertyId.propertyData.id}`,
      data
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          navigate("/property-verification");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = () => {
    const rejectData = {
      reason: inputValue,
    };
    console.log("Submitted value:", rejectData);

    const data = {
      method: "POST",
      body: JSON.stringify(rejectData),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(
      `http://65.20.73.28:8090/api/propertyverification/markasunverify/${propertyId.propertyData.id}`,
      data
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          toggleModal();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
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
              <h4> View Property Verification</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      Property Management Screen
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    View Property Verification
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="pt-4 pb-4 text-left"></div>
                    <div className="card">
                      <div className="card-body">
                        <div className="view-document-main col-lg-12">
                          <dl className="row ">
                            <dt className="col-2">OwnershipProof:</dt>
                            <dd className="col-3">
                              {propertyId?.PropertyVerificationdata
                                ?.OwnershipProof ? (
                                <a
                                  style={{ color: "blue" }}
                                  href={
                                    propertyId?.PropertyVerificationdata
                                      .OwnershipProof
                                  }
                                  download
                                >
                                  {
                                    propertyId?.PropertyVerificationdata
                                      .OwnershipProofName
                                  }
                                </a>
                              ) : (
                                <div>No OwnershipProof Image</div>
                              )}
                            </dd>
                            <dt className="col-7">
                              <h6>
                                <b>User Name: &nbsp;&nbsp;</b>{" "}
                                {propertyId?.userData?.firstname}&nbsp;
                                {propertyId?.userData?.lastname}
                              </h6>
                              <h6>
                                <b>Email: &nbsp;&nbsp;</b>{" "}
                                {propertyId?.userData?.email}
                              </h6>
                              <h6>
                                <b>Phone Number: &nbsp;&nbsp;</b>{" "}
                                {propertyId?.userData?.phoneNumber}
                              </h6>
                              <h6>
                                <b>Address: &nbsp;&nbsp;</b>{" "}
                                {propertyId?.userData?.address},
                                {propertyId?.userData?.city}
                              </h6>
                            </dt>
                          </dl>
                          <dl className="row">
                            <dt className="col-2">IndexIIDoc:</dt>
                            <dd className="col-3">
                              {propertyId?.PropertyVerificationdata
                                ?.IndexIIDoc ? (
                                <a
                                  style={{ color: "blue" }}
                                  href={
                                    propertyId?.PropertyVerificationdata
                                      .IndexIIDoc
                                  }
                                  download
                                >
                                  {
                                    propertyId?.PropertyVerificationdata
                                      .IndexIIDocName
                                  }
                                </a>
                              ) : (
                                <div>No IndexIIDoc Image</div>
                              )}
                            </dd>
                            <dt className="col-7">
                              <h6>
                                <b>Property Name:&nbsp;&nbsp;</b>{" "}
                                {propertyId?.propertyData?.title}
                              </h6>
                              <h6>
                                <b>Property category:&nbsp;&nbsp;</b>{" "}
                                {propertyId?.propertyData?.category}
                              </h6>
                              <h6>
                                <b>Property Type:&nbsp;&nbsp;</b>{" "}
                                {propertyId?.propertyData?.subcategory}
                              </h6>
                              <h6>
                                <b>Price:&nbsp;&nbsp;</b>{" "}
                                {propertyId?.propertyData?.price}
                              </h6>
                              <h6>
                                <b>Description:&nbsp;&nbsp;</b>{" "}
                                {propertyId?.propertyData?.description}
                              </h6>
                              <h6>
                                <b>Verification Status:&nbsp;&nbsp;</b>
                                {propertyId?.propertyData?.propertyStatus ==
                                "false" ? (
                                  <span
                                    class="badge badge-info"
                                    style={{ padding: "10px" }}
                                  >
                                    Pending
                                  </span>
                                ) : propertyId?.propertyData?.propertyStatus ==
                                  "In Progress" ? (
                                  <span
                                    class="badge badge-warning"
                                    style={{ padding: "10px" }}
                                  >
                                    In Progress
                                  </span>
                                ) : propertyId?.propertyData?.propertyStatus ==
                                  "Reject" ? (
                                  <>
                                    <span
                                      class="badge badge-danger"
                                      style={{ padding: "10px" }}
                                    >
                                      Reject
                                    </span>
                                    <p>
                                      {" "}
                                      <b>Rejection Reason:&nbsp;&nbsp;</b>{" "}
                                      {propertyId?.propertyData?.rejectReason}
                                    </p>
                                  </>
                                ) : (
                                  <span class="badge badge-success">
                                    Verified
                                  </span>
                                )}
                              </h6>
                            </dt>
                          </dl>
                        </div>
                      </div>
                      <div className="row ">
                        <div>
                          <div className="col-md-12 d-flex justify-content-end align-items-end">
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {propertyId?.propertyData?.propertyStatus ==
                              "Verified" ? (
                                <Button
                                  variant="contained"
                                  style={{
                                    backgroundColor: "#3A833A",
                                    marginRight: "10px",
                                  }}
                                >
                                  Approved
                                </Button>
                              ) : (
                                <Button
                                  onClick={ApproveVerify}
                                  variant="contained"
                                  style={{
                                    backgroundColor: "#3A833A",
                                    marginRight: "10px",
                                  }}
                                >
                                  Approve
                                </Button>
                              )}

                              {propertyId?.propertyData?.propertyStatus ==
                              "Reject" ? (
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: "#D4403A" }}
                                >
                                  Rejected
                                </Button>
                              ) : (
                                <Button
                                  onClick={toggleModal}
                                  variant="contained"
                                  style={{ backgroundColor: "#D4403A" }}
                                >
                                  Reject
                                </Button>
                              )}
                            </Box>

                            {isModalOpen && (
                              <Modal open={isModalOpen} onClose={toggleModal}>
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    width: 400,
                                    bgcolor: "background.paper",
                                    borderRadius: 3,
                                    boxShadow: 24,
                                    p: 4,
                                  }}
                                >
                                  <h6>Add Rejection Reason</h6>
                                  <TextField
                                    label="Enter something"
                                    variant="outlined"
                                    fullWidth
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    sx={{ mb: 2 }}
                                  />
                                  <Button
                                    onClick={handleSubmit}
                                    variant="contained"
                                    color="primary"
                                  >
                                    Submit
                                  </Button>
                                </Box>
                              </Modal>
                            )}
                          </div>
                        </div>
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

export default ViewPropertyVerification;
