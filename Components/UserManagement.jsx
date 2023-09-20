import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserbyId } from "../Redux/Slice/UserSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const UserManagement = () => {
  const dispatch = useDispatch();
  const GetById = useSelector((state) => state.user.users);
  console.log("GetById", GetById);
  useEffect(() => {
    dispatch(getUserbyId());
  }, []);

  return (
    <>
      <li
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to="#">
          <FontAwesomeIcon icon={faGlobe} className="me-3 nav-link-icon" />
          <span>User Management</span>
          <FontAwesomeIcon icon={faAngleUp} className="sub-menu-arrow" />
        </Link>
        <ul>
          <li>
            <Link to="/buyer">Buyers</Link>
          </li>
          <li>
            <Link to="/sellers">Sellers</Link>
          </li>
          <li>
            <Link to="/investor">Investors</Link>
          </li>
        </ul>{" "}
      </li>
    </>
  );
};

export default UserManagement;
