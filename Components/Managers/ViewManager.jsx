import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getManagerbyId } from "../../Redux/Slice/ManagerSlice";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Button, Modal, Box, TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ViewManager = () => {
  var navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const managerId = useSelector((state) => state.ManagerData.Manager);

  console.log("ManagerId", JSON.stringify(managerId));

  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    dispatch(getManagerbyId(id));
  }, [id]);

  const token = localStorage.getItem("token");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const managerValues = {
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    userrole: "",
    phoneNumber: "",
    city: "",
    address: "",
    menu: "",
    status: "",
    image: "",
    isAdmin: "",
    isVerifiedByAdmin: "",
    rejectReason: "",
    isBlockedByAdmin: "",
    freeAdvertLimit: "",
    paidAdvertLimit: "",
    Mobileverified: "",
  };

  const [manager, setmanager] = useState(managerValues);

  useEffect(() => {
    setmanager({
      firstname: managerId?.firstname,
      lastname: managerId?.lastname,
      email: managerId?.email,
      password: "",
      role: managerId?.role,
      userrole: managerId?.userrole,
      phoneNumber: managerId?.phoneNumber,
      city: managerId?.city,
      address: managerId?.address,
      menu: managerId?.menu,
      status: managerId?.status,
      image: managerId?.image,
      isAdmin: managerId?.isAdmin,
      isVerifiedByAdmin: managerId?.isVerifiedByAdmin,
      rejectReason: managerId?.rejectReason,
      isBlockedByAdmin: managerId?.isBlockedByAdmin,
      freeAdvertLimit: managerId?.freeAdvertLimit,
      paidAdvertLimit: managerId?.paidAdvertLimit,
      Mobileverified: managerId?.Mobileverified,
    });
  }, [managerId]);

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
              <h4> View Manager </h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      Manager
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    View Manager Management Screen
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
                          <div
                            className="view-document-main col-lg-12"
                            style={{ padding: "3%" }}
                          >
                            <div class="row">
                              <div class="col-8">
                                <dl className="row ">
                                  <dt className="col-5">First Name:</dt>
                                  <dd className="col-7">
                                    {manager?.firstname}
                                  </dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Last Name:</dt>
                                  <dd className="col-7">{manager?.lastname}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Email ID:</dt>
                                  <dd className="col-7">{manager?.email}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Role</dt>
                                  <dd className="col-7">{manager?.role}</dd>
                                </dl>

                                <dl className="row ">
                                  <dt className="col-5">User Role:</dt>
                                  <dd className="col-7">{manager?.userrole}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Status:</dt>
                                  <dd className="col-7">{manager?.status}</dd>
                                </dl>

                                <dl className="row ">
                                  <dt className="col-5">Phone Number:</dt>
                                  <dd className="col-7">
                                    {manager?.phoneNumber}
                                  </dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">City:</dt>
                                  <dd className="col-7">{manager?.city}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Address</dt>
                                  <dd className="col-7">{manager?.address}</dd>
                                </dl>

                                <dl className="row ">
                                  <dt className="col-5">Image:</dt>
                                  <dd className="col-7">{manager?.image}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Menu:</dt>
                                  <dd className="col-7">{manager?.menu}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">isAdmin:</dt>
                                  <dd className="col-7">{manager?.isAdmin}</dd>
                                </dl>
                                <dl className="row ">
                                  <dt className="col-5">Reject Reason</dt>
                                  <dd className="col-7">
                                    {manager?.rejectReason}
                                  </dd>
                                </dl>
                              </div>
                            </div>
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

export default ViewManager;
