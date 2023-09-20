import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBuyerbyId } from "../../../../Redux/Slice/BuyerSlice";
import { useNavigate } from "react-router-dom";

const EditBuyerPersonalDetails = () => {
  var navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const BuyerId = useSelector((state) => state.buyer.Buyer);
  console.log("buyerId .......", JSON.stringify(BuyerId));
  const [formErrors, setFormErrors] = useState({});

  const [editedBuyer, setEditedBuyer] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    userrole: "Buyer",
    mobileverified: true,
    password: "",
  });
  useEffect(() => {
    dispatch(getBuyerbyId(id));
  }, [id]);

  useEffect(() => {
    setEditedBuyer({
      firstname: BuyerId?.personaldata?.firstname,
      lastname: BuyerId?.personaldata?.lastname,
      email: BuyerId?.personaldata?.email,
      phoneNumber: BuyerId?.personaldata?.phoneNumber,
      userrole: BuyerId?.personaldata?.userrole,
      mobileverified: BuyerId?.personaldata?.mobileverified,
      password: "",
    });
  }, [BuyerId]);

  const handleChangeEditBuyerInput = (e) => {
    const { name, value } = e.target;
    setEditedBuyer({
      ...editedBuyer,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyLetters = /^[A-Za-z]+$/;

    if (!editedBuyer.firstname) {
      errors.firstname = "First name cannot be blank";
    } else if (!onlyLetters.test(editedBuyer.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

    if (!editedBuyer.lastname) {
      errors.lastname = "Last name cannot be blank";
    } else if (!onlyLetters.test(editedBuyer.lastname)) {
      errors.lastname = "Last name should only contain letters.";
    }

    if (!editedBuyer.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (editedBuyer.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }

    if (!editedBuyer.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(editedBuyer.email)) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleEditProfile();
    }
  };

  const handleEditProfile = () => {
    const data = {
      method: "PUT",
      body: JSON.stringify(editedBuyer),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(`http://65.20.73.28:8090/api/users/${id}`, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        navigate("/buyer");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label for="validationCustom01">First Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your full Name"
              name="firstname"
              value={editedBuyer.firstname}
              onChange={(e) => handleChangeEditBuyerInput(e)}
            />
            {formErrors.firstname && (
              <p style={{ color: "red" }}>{formErrors.firstname}</p>
            )}

            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="validationCustom01">Last Name </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your last Name"
              name="lastname"
              value={editedBuyer.lastname}
              onChange={(e) => handleChangeEditBuyerInput(e)}
            />
            {formErrors.lastname && (
              <p style={{ color: "red" }}>{formErrors.lastname}</p>
            )}
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="validationCustom04">Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={editedBuyer.phoneNumber}
              onChange={(e) => handleChangeEditBuyerInput(e)}
            />
            {formErrors.phoneNumber && (
              <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
            )}

            <div className="invalid-feedback">
              Please provide a valid phone Number.
            </div>
          </div>
          <div className="col-md-6 mb-3">
            <label for="validationCustom04">Email</label>
            <input
              type="text"
              className="form-control"
              placeholder=" Enter Email"
              name="email"
              value={editedBuyer.email}
              onChange={(e) => handleChangeEditBuyerInput(e)}
            />
            {formErrors.email && (
              <p style={{ color: "red" }}>{formErrors.email}</p>
            )}
            <div className="invalid-feedback"></div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="validationCustom04">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            value={editedBuyer.password}
            onChange={(e) => handleChangeEditBuyerInput(e)}
          />
          <div className="invalid-feedback">
            Please provide a valid location.
          </div>
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default EditBuyerPersonalDetails;
