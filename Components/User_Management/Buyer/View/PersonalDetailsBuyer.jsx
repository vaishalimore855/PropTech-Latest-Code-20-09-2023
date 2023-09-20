import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBuyerbyId } from "../../../../Redux/Slice/BuyerSlice";
import { getKycBuyerUserid } from "../../../../Redux/Slice/BuyerSlice";
import { Button, Modal, Box, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";


function PersonalDetailsBuyer() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Buyer = useSelector((state) => state.buyer.Buyer);
  const token = localStorage.getItem("token");
  console.log("view buyer", JSON.stringify(Buyer));
  const adminId = localStorage.getItem("adminId");
  const BuyerKyc = useSelector((state) => state.buyer.KycUserid);
  useEffect(() => {
    dispatch(getBuyerbyId(id));
    dispatch(getKycBuyerUserid(id, token));
  }, [id]);

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

    fetch(`http://65.20.73.28:8090/api/users/markasverify/${id}`, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          navigate("/view-buyer/" + id);
        } else {
          toast.error(data.message);
          navigate("/view-buyer/" + id);
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
      method: "PUT",
      body: JSON.stringify(rejectData),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(`http://65.20.73.28:8090/api/users/markasreject/${id}`, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          toggleModal();
          navigate("/view-buyer/" + id);
        } else {
          toast.error(data.message);
          toggleModal();
          navigate("/view-buyer/" + id);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <div className="view-document-main col-lg-12" style={{ padding: "3%" }}>
        <div class="row">
          <div class="col-8">
            <dl className="row ">
              <dt className="col-5">First Name:</dt>
              <dd className="col-7">{Buyer?.personaldata?.firstname}</dd>
            </dl>
            <dl className="row ">
              <dt className="col-5">Last Name:</dt>
              <dd className="col-7">{Buyer?.personaldata?.lastname}</dd>
            </dl>
            <dl className="row ">
              <dt className="col-5">Contact Number:</dt>
              <dd className="col-7">{Buyer?.personaldata?.phoneNumber}</dd>
            </dl>
            <dl className="row ">
              <dt className="col-5">Email ID:</dt>
              <dd className="col-7">{Buyer?.personaldata?.email}</dd>
            </dl>
            <dl className="row ">
              <dt className="col-5">User Role</dt>
              <dd className="col-7">{Buyer?.personaldata?.userrole}</dd>
            </dl>

            {/* <dl className="row ">
              <dt className="col-5">Address:</dt>
              <dd className="col-7">{Buyer?.personaldata?.address}</dd>
            </dl> */}
            <dl className="row ">
              <dt className="col-5">Verification Status:</dt>
              <dd className="col-7">
                {Buyer?.personaldata?.isVerifiedByAdmin == "Verified" ? (
                  <span class="badge badge-success">Verified</span>
                ) : Buyer?.personaldata?.isVerifiedByAdmin == "Reject" ? (
                  <span class="badge badge-danger">Reject</span>
                ) : (
                  <span class="badge badge-info">Pending</span>
                )}
              </dd>
            </dl>
            {Buyer?.personaldata?.isVerifiedByAdmin == "Reject" ? (
              <dl className="row ">
                <dt className="col-5">Reject Reason : </dt>
                <dd className="col-7">{Buyer?.personaldata?.rejectReason}</dd>
              </dl>
            ) : null}
          </div>
          
          <div class="col-12">
            <dl className="row">
              <dt className="col-5">KYC Document :</dt>
            </dl>
            <dl className="row">
              <dd className="col-4">
                {BuyerKyc?.aadhar_front_base64 ? (
                  <div
                    style={{
                      height: "170px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${BuyerKyc?.aadhar_front_base64}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                    <h6 style={{ marginTop: "15px" }}>Aadhar Front</h6>
                  </div>
                ) : (
                  <div>No Adhar Front Image</div>
                )}
              </dd>

              <dd className="col-4">
                {BuyerKyc?.aadhar_back_base64 ? (
                  <div
                    style={{
                      height: "170px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${BuyerKyc?.aadhar_back_base64}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                    <h6 style={{ marginTop: "15px" }}>Aadhar Back</h6>
                  </div>
                ) : (
                  <div>No Adhar Back Image</div>
                )}
              </dd>

              <dd className="col-4">
                {BuyerKyc?.pan_base64 ? (
                  <div
                    style={{
                      height: "170px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${BuyerKyc?.pan_base64}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                    <h6 style={{ marginTop: "15px" }}>Pan</h6>
                  </div>
                ) : (
                  <div>No Pan Card Image</div>
                )}
              </dd>
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
                  marginTop: "10%",
                }}
              >
              
                {Buyer?.personaldata?.isVerifiedByAdmin == "Verified" ? (
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#3A833A", marginRight: "10px" }}
                  >
                    Approved
                  </Button>
                ) : (
                  <Button
                    onClick={ApproveVerify}
                    variant="contained"
                    style={{ backgroundColor: "#3A833A", marginRight: "10px" }}
                  >
                    Approve
                  </Button>
                )}

                {Buyer?.personaldata?.isVerifiedByAdmin == "Reject" ? (
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
    </>
  );
}

export default PersonalDetailsBuyer;





