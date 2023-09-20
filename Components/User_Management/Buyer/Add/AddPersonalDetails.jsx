import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPersonalDetails = () => {
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChangeAddBuyerInput = (e) => {
    const { name, value } = e.target;
    setBuyer({
      ...buyer,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    

    // if (!buyer.firstname) {
    //   errors.firstname = "Firstname cannot be blank";
    // }
    // if (!buyer.lastname) {
    //   errors.lastname = "Lastname cannot be blank";
    // }
    const onlyLetters = /^[A-Za-z]+$/;
    if (!buyer.firstname) {
      errors.firstname = "firstname cannot be blank";
    } else if (!onlyLetters.test(buyer.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

   
    if (!buyer.lastname) {
      errors.lastname = "lastname cannot be blank";
    } else if (!onlyLetters.test(buyer.lastname)) {
      errors.lastname = "last name should only contain letters.";
    }
    if (!buyer.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (buyer.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!buyer.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(buyer.email)) {
      errors.email = "Invalid email format";
    }
    if (!buyer.password) {
      errors.password = "Password cannot be blank";
    } else if (buyer.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  const addBuyer = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        firstname: buyer.firstname,
        lastname: buyer.lastname,
        email: buyer.email,
        phoneNumber: buyer.phoneNumber,
        userrole: "buyer",
        mobileverified: true,
        password: buyer.password,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };

    fetch("http://65.20.73.28:8090/api/users", data)
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          toast.success(data.message);
          navigate("/buyer");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      addBuyer();
      navigate("/buyer");

    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 ">
            <label htmlFor="validationCustom01">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your first Name"
              name="firstname"
              value={buyer.firstname}
              onChange={handleChangeAddBuyerInput}
            />
            {formErrors.firstname && (
              <p style={{ color: "red" }}>{formErrors.firstname}</p>
            )}
          </div>
          <div className="col-md-6 ">
            <label htmlFor="validationCustom04">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your last Name"
              name="lastname"
              value={buyer.lastname}
              onChange={handleChangeAddBuyerInput}
            />
            {formErrors.lastname && (
              <p style={{ color: "red" }}>{formErrors.lastname}</p>
            )}{" "}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <label htmlFor="validationCustom04">Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={buyer.phoneNumber}
              onChange={handleChangeAddBuyerInput}            />
            {formErrors.phoneNumber && (
              <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="validationCustom04">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Email"
              name="email"
              value={buyer.email}
              onChange={handleChangeAddBuyerInput}
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 ">
            <label htmlFor="validationCustom04">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={buyer.password}
              onChange={handleChangeAddBuyerInput}
            />
            {formErrors.password && (
              <p style={{ color: "red" }}>{formErrors.password}</p>
            )}
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddPersonalDetails;
