import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddInvestorPersonalDetails = () => {
  const navigate = useNavigate();

  const [investor, setInvestor] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChangeAddInvestorInput = (e) => {
    const { name, value } = e.target;
    setInvestor({
      ...investor,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    
    const onlyLetters = /^[A-Za-z]+$/;
    if (!investor.firstname) {
      errors.firstname = "firstname cannot be blank";
    } else if (!onlyLetters.test(investor.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

   
    if (!investor.lastname) {
      errors.lastname = "lastname cannot be blank";
    } else if (!onlyLetters.test(investor.lastname)) {
      errors.lastname = "last name should only contain letters.";
    }
    if (!investor.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (investor.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!investor.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(investor.email)) {
      errors.email = "Invalid email format";
    }
    if (!investor.password) {
      errors.password = "Password cannot be blank";
    } else if (investor.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  const addInvestor = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        firstname: investor.firstname,
        lastname: investor.lastname,
        email: investor.email,
        phoneNumber: investor.phoneNumber,
        userrole: "investor",
        mobileverified: true,
        password: investor.password,
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
          navigate("/investor");
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
      addInvestor();
      navigate("/investor");

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
              value={investor.firstname}
              onChange={handleChangeAddInvestorInput}
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
              value={investor.lastname}
              onChange={handleChangeAddInvestorInput}
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
              value={investor.phoneNumber}
              onChange={handleChangeAddInvestorInput}            />
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
              value={investor.email}
              onChange={handleChangeAddInvestorInput}
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
              value={investor.password}
              onChange={handleChangeAddInvestorInput}
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

export default AddInvestorPersonalDetails;
