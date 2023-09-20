import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import { getAdminData, adminLogin } from "../../Redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  var navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="form-membership">
      <div className="form-wrapper">
        {/* <!-- logo --> */}
        <div id="logo">
          <h2>PropTech</h2>
        </div>
        {/* <!-- ./ logo --> */}
        <h5>Reset password</h5>

        {/* <!-- form --> */}
        <form>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username or email"
              required
              autofocus
            />
          </div>
          <button
            className="btn btn-primary btn-block mb-3"
            onClick={() => ResetPassword()}
          >
            Submit
          </button>
          <hr />
          <a
            href=""
            className="btn btn-sm btn-outline-light ml-1"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => handleClick()}
          >
            Login!
          </a>
        </form>
        {/* <!-- ./ form --> */}
      </div>
    </div>
  );
};

export default ResetPassword;
