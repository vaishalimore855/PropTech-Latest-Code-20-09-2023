
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";

// const AddPersonalDetails = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const formik = useFormik({
//     initialValues: {
//       firstname: "",
//       lastname: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//     },
//     validate: (values) => {
//       let errors = {};
//       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//       if (!values.firstname) {
//         errors.firstname = "First Name cannot be blank";
//       }
//       if (!values.lastname) {
//         errors.lastname = "Last Name cannot be blank";
//       }
//       if (!values.phoneNumber) {
//         errors.phoneNumber = "Phone Number cannot be blank";
//       } else if (values.phoneNumber.length !== 10) {
//         errors.phoneNumber = "Phone Number must be 10 digits";
//       }
//       if (!values.email) {
//         errors.email = "Email cannot be blank";
//       } else if (!regex.test(values.email)) {
//         errors.email = "Invalid email format";
//       }
//       if (!values.password) {
//         errors.password = "Password cannot be blank";
//       } else if (values.password.length < 4) {
//         errors.password = "Password must be more than 4 characters";
//       }

//       return errors;
//     },
//     onSubmit: (values) => {
//       navigate("/sellers");

//       addSeller(values);
//     },
//   });

//   const addSeller = (values) => {
//     const data = {
//       method: "POST",
//       body: JSON.stringify({
//         firstname: values.firstname,
//         lastname: values.lastname,
//         email: values.email,
//         phoneNumber: values.phoneNumber,
//         userrole: "seller",
//         mobileverified: true,
//         password: values.password,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//         authorization: token,
//       },
//     };

//     fetch("http://65.20.73.28:8090/api/users", data)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data?.status === true) {
//           toast.success(data.message);
//           navigate("/sellers");
//         } else {
//           toast.error(data.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <ToastContainer />
//       <form onSubmit={formik.handleSubmit}>
//         <div className="row">
//           <div className="col-md-6 ">
//             <label htmlFor="validationCustom01">First Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Your first Name"
//               name="firstname"
//               value={formik.values.firstname}
//               onChange={formik.handleChange}
//             />
//             <p style={{ color: "red" }}>{formik.errors.firstname}</p>
//           </div>
//           <div className="col-md-6 ">
//             <label htmlFor="validationCustom04">Last Name</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Your last Name"
//               name="lastname"
//               value={formik.values.lastname}
//               onChange={formik.handleChange}
//             />
//             <p style={{ color: "red" }}>{formik.errors.lastname}</p>
//           </div>
//         </div>
//         <div className="row mt-1">
//           <div className="col-md-6">
//             <label htmlFor="validationCustom04">Phone Number</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter phone number"
//               name="phoneNumber"
//               value={formik.values.phoneNumber}
//               onChange={formik.handleChange}
//             />
//             <p style={{ color: "red" }}>{formik.errors.phoneNumber}</p>
//           </div>
//           <div className="col-md-6">
//             <label htmlFor="validationCustom04">Email</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Email"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//             />
//             <p style={{ color: "red" }}>{formik.errors.email}</p>
//           </div>
//         </div>
//         <div className="row mt-1">
//           <div className="col-md-6 ">
//             <label htmlFor="validationCustom04">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter password"
//               name="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//             />
//             <p style={{ color: "red" }}>{formik.errors.password}</p>
//           </div>
//         </div>
//         <button className="btn btn-primary mt-3" type="submit">
//           Submit
//         </button>
//       </form>
//     </>
//   );
// };

// export default AddPersonalDetails;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPersonalDetails = () => {
  const navigate = useNavigate();

  const [seller, setSeller] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChangeAddSellerInput = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const validate = () => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    const onlyLetters = /^[A-Za-z]+$/;
    if (!seller.firstname) {
      errors.firstname = "firstname cannot be blank";
    } else if (!onlyLetters.test(seller.firstname)) {
      errors.firstname = "First name should only contain letters.";
    }

   
    if (!seller.lastname) {
      errors.lastname = "lastname cannot be blank";
    } else if (!onlyLetters.test(seller.lastname)) {
      errors.lastname = "last name should only contain letters.";
    }
    if (!seller.phoneNumber) {
      errors.phoneNumber = "Phone Number cannot be blank";
    } else if (seller.phoneNumber.length !== 10) {
      errors.phoneNumber = "Phone Number must be 10 digits";
    }
    if (!seller.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(seller.email)) {
      errors.email = "Invalid email format";
    }
    if (!seller.password) {
      errors.password = "Password cannot be blank";
    } else if (seller.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }

    return errors;
  };

  const addSeller = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        firstname: seller.firstname,
        lastname: seller.lastname,
        email: seller.email,
        phoneNumber: seller.phoneNumber,
        userrole: "seller",
        mobileverified: true,
        password: seller.password,
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
          navigate("/sellers");
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
      addSeller();
      navigate("/sellers");

    }
  };

  return (
    // <>
    //   <ToastContainer />
    //   <form onSubmit={handleSubmit}>
    //     <div className="row">
    //       <div className="col-md-6 ">
    //         <label htmlFor="validationCustom01">First Name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter Your first Name"
    //           name="firstname"
    //           value={seller.firstname}
    //           onChange={handleChangeAddSellerInput}
    //         />
    //         {formErrors.firstname && (
    //           <p style={{ color: "red" }}>{formErrors.firstname}</p>
    //         )}
    //       </div>
    //       <div className="col-md-6 ">
    //         <label htmlFor="validationCustom04">Last Name</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter Your last Name"
    //           name="lastname"
    //           value={seller.lastname}
    //           onChange={handleChangeAddSellerInput}
    //         />
    //         {formErrors.lastname && (
    //           <p style={{ color: "red" }}>{formErrors.lastname}</p>
    //         )}{" "}
    //       </div>
    //     </div>
    //     <div className="row mt-4">
    //       <div className="col-md-6">
    //         <label htmlFor="validationCustom04">Phone Number</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter phone number"
    //           name="phoneNumber"
    //           value={seller.phoneNumber}
    //           onChange={handleChangeAddSellerInput}            />
    //         {formErrors.phoneNumber && (
    //           <p style={{ color: "red" }}>{formErrors.phoneNumber}</p>
    //         )}
    //       </div>
    //       <div className="col-md-6">
    //         <label htmlFor="validationCustom04">Email</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter Email"
    //           name="email"
    //           value={seller.email}
    //           onChange={handleChangeAddSellerInput}
    //         />
    //         {formErrors.email && (
    //           <p style={{ color: "red" }}>{formErrors.email}</p>
    //         )}
    //       </div>
    //     </div>
    //     <div className="row mt-4">
    //       <div className="col-md-6 ">
    //         <label htmlFor="validationCustom04">Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Enter password"
    //           name="password"
    //           value={seller.password}
    //           onChange={handleChangeAddSellerInput}
    //         />
    //         {formErrors.password && (
    //           <p style={{ color: "red" }}>{formErrors.password}</p>
    //         )}
    //       </div>
    //     </div>
    //     <button className="btn btn-primary mt-3" type="submit">
    //       Submit
    //     </button>
    //   </form>
    // </>
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
            value={seller.firstname}
            onChange={handleChangeAddSellerInput}
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
            value={seller.lastname}
            onChange={handleChangeAddSellerInput}
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
            value={seller.phoneNumber}
            onChange={handleChangeAddSellerInput}            />
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
            value={seller.email}
            onChange={handleChangeAddSellerInput}
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
            value={seller.password}
            onChange={handleChangeAddSellerInput}
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
