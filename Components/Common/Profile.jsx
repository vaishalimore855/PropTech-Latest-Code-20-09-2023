// import React, { useEffect, useState, useRef } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getProfileData, changePassword } from "../Redux/Slice/ProfileSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import Webcam from "react-webcam";
// import { Modal, Button } from "react-bootstrap";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { TextField, InputAdornment } from "@mui/material";
// import { useParams } from "react-router-dom";

// const Profile = () => {
//   var navigate = useNavigate();

//   const dispatch = useDispatch();
//   const { id } = useParams();

//   const Profile = useSelector((state) => state.profile.Profile);
//   // const Password = useSelector((state)=>state.profile.changePassword)
//   const [formErrors, setFormErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   console.log("formErrors", formErrors);
//   console.log("Profile", Profile);
//   //webcam
//   const webcamRef = useRef(null);
//   const [showWebcamModal, setShowWebcamModal] = useState(false);
//   const [capturedImage, setCapturedImage] = useState(null);
//   console.log("capturedImage", capturedImage);
//   const openWebcamModal = () => setShowWebcamModal(true);
//   const closeWebcamModal = () => setShowWebcamModal(false);

//   const captureImage = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setCapturedImage(imageSrc);
//     closeWebcamModal();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     console.log("SelectedImage------------------->", URL.createObjectURL(file));
//     setSelectedImage(URL.createObjectURL(file));
//     localStorage.setItem("selectedImage", URL.createObjectURL(file));
//   };

//   const initialValues = {
//     firstName: Profile.firstname,
//     lastname: Profile?.lastname,
//     address: Profile?.address,
//     email: Profile?.email,
//     phoneNo: Profile?.phoneNumber,
//     imageUrl: null,
//   };

//   const [showPassword, setShowPassword] = useState({
//     current: false,
//     new: false,
//   });

//   const togglePasswordVisibility = (field) => {
//     setShowPassword((prevState) => ({
//       ...prevState,
//       [field]: !prevState[field],
//     }));
//   };

//   const validate = (admin) => {
//     let errors = {};
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//     if (!admin.firstName) {
//       errors.firstName = "Firstname cannot be blank";
//     }
//     if (!admin.lastname) {
//       errors.lastname = "Lastname cannot be blank";
//     }
//     if (!admin.address) {
//       errors.address = "Address cannot be blank";
//     }
//     if (!admin.email) {
//       errors.email = "Email cannot be blank";
//     } else if (!regex.test(admin.email)) {
//       errors.email = "Invalid email format";
//     }
//     if (!admin.phoneNo) {
//       errors.phoneNo = "Phone number cannot be blank";
//     } else if (admin.phoneNo.length > 10) {
//       errors.phoneNo = "Mobile number not valid";
//     }

//     return errors;
//   };

//   const changePassValue = {
//     email: "",
//     currentPassword: "",
//     newPassword: "",
//   };

//   const [admin, setAdmin] = useState();
//   const [password, setPassword] = useState(changePassValue);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     setAdmin({
//       ...admin,
//       [name]: value,
//     });
//   };

//   const handleChangePasswordInput = (e) => {
//     const { name, value } = e.target;
//     setPassword({
//       ...password,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     dispatch(getProfileData());
//   }, []);

//   useEffect(() => {
//     setAdmin(initialValues);
//     setPassword(changePassValue);
//   }, [Profile]);

//   const updateProfile = (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const data = {
//       method: "PUT",
//       body: JSON.stringify({
//         firstname: admin.firstName,
//         lastname: admin.lastname,
//         email: admin.email,
//         phoneNumber: admin.phoneNo,
//         address: admin.address,
//         image: null,
//       }),
//       headers: {
//         "Content-type": "application/json",
//         Authorization: token,
//       },
//     };

//     //  console.log("body",data)

//     fetch(`http://65.20.73.28:8090//api/admins`, data)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data", data);
//         setAdmin(initialValues);
//         toast.success(data.message);
//       })
//       .catch((err) => console.log(err));
//   };

//   const getChangePassword = async () => {
//     const data = {
//       method: "POST",
//       body: JSON.stringify({
//         email: password.email,
//         currentPassword: password.currentPassword,
//         newPassword: password.newPassword,
//       }),
//       headers: {
//         "Content-type": "application/json",
//       },
//     };

//     // dispatch(changePassword(data))

//     fetch("http://65.20.73.28:8090//api/admins/changepassword", data)
//       .then((response) => response.json())
//       .then((data) => {
//         setPassword({});
//         console.log("changepassword", data);
//         if (data?.status === true) {
//           setPassword(changePassValue);
//           toast.success(data?.message);
//         } else {
//           toast.error(data?.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormErrors(validate(admin));

//     if (Object.keys(formErrors).length == 0) {
//       updateProfile();
//     }
//   };

//   localStorage.setItem("capturedImage", capturedImage);
//   // localStorage.setItem("selectedImage..............", selectedImage);

//   console.log("selectedImage", selectedImage);

//   return (
//     <>
//       <div id="main">
//         <main className="main-content ">
//           <div className="container mt-5">
//             <ToastContainer />
//             <div className="row">
//               <div className="col-md-4">
//                 <div className="card ">
//                   <div className="text-center mt-3">
//                     {selectedImage && !capturedImage && (
//                       <figure
//                         className="avatar avatar-sm m-r-15"
//                         style={{ width: "100px", height: "100px" }}
//                       >
//                         <img
//                           src={selectedImage}
//                           className="rounded-circle"
//                           alt="Selected"
//                           width="100%"
//                           height="100%"
//                         />
//                       </figure>
//                     )}
//                     {capturedImage && (
//                       <figure
//                         className="avatar avatar-sm m-r-15"
//                         style={{ width: "100px", height: "100px" }}
//                       >
//                         <img
//                           src={capturedImage}
//                           className="rounded-circle"
//                           alt="Captured"
//                           width="100%"
//                           height="100%"
//                         />
//                       </figure>
//                     )}

//                     <h5 className="mb-1">Zeeshaan Pathan</h5>
//                     <p className="text-muted small">Administrator</p>
//                   </div>
//                   <div className="card-body mr-5 ">
//                     <div className="row mb-2  me-5">
//                       <div className="col-6 text-muted text-left ">
//                         First Name:
//                       </div>
//                       <div className="col-6 text-left">
//                         {Profile?.firstname}
//                       </div>
//                     </div>
//                     <div className="row mb-2 me-5">
//                       <div className="col-6 text-muted text-left">
//                         Last Name:
//                       </div>
//                       <div className="col-6 text-left">{Profile?.lastname}</div>
//                     </div>
//                     <div className="row mb-2 ">
//                       <div className=" col-5 text-muted text-left">
//                         Address:{" "}
//                       </div>
//                       <div className="col-6 text-left">
//                         {Profile?.address}Pune
//                       </div>
//                     </div>
//                     <div className="row mb-2 ">
//                       <div className="col-5 text-muted text-left">Phone:</div>
//                       <div className="col-6 text-left ">
//                         {Profile?.phoneNumber}+91 8765454345
//                       </div>
//                     </div>
//                     <div className="row mb-2">
//                       <div className="col-5 text-muted text-left">Email:</div>
//                       <div className="col-6 text-left">{Profile?.email}</div>
//                     </div>
//                   </div>
//                   <hr className="m-0" />
//                 </div>

//                 <div className="card">
//                   <div className="card-body">
//                     <h6 className="card-title d-flex justify-content-between align-items-center">
//                       Change Password
//                     </h6>
//                     <div className="form-group mb-4">
//                       <label for="email">Email</label>
//                       <span className="text-danger">*</span>
//                       <TextField
//                         placeholder="Email "
//                         className="form-control"
//                         id="old_password"
//                         name="email"
//                         value={password.email}
//                         onChange={(e) => handleChangePasswordInput(e)}
//                       />
//                     </div>

//                     <div className="form-group mb-4">
//                       <label for="password">Current Password</label>
//                       <span className="text-danger">*</span>
//                       <TextField
//                         placeholder="current password"
//                         type={showPassword.current ? "text" : "password"}
//                         className="form-control"
//                         name="currentPassword"
//                         value={password.currentPassword}
//                         onChange={(e) => handleChangePasswordInput(e)}
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <span
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() =>
//                                   togglePasswordVisibility("current")
//                                 }
//                               >
//                                 {showPassword.current ? (
//                                   <VisibilityOff />
//                                 ) : (
//                                   <Visibility />
//                                 )}
//                               </span>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </div>

//                     <div className="form-group mb-4">
//                       <label htmlFor="newPassword">New Password</label>
//                       <span className="text-danger">*</span>
//                       <TextField
//                         type={showPassword.new ? "text" : "password"}
//                         className="form-control"
//                         name="newPassword"
//                         placeholder="New Password "
//                         value={password.newPassword}
//                         onChange={(e) => handleChangePasswordInput(e)}
//                         InputProps={{
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <span
//                                 style={{ cursor: "pointer" }}
//                                 onClick={() => togglePasswordVisibility("new")}
//                               >
//                                 {showPassword.new ? (
//                                   <VisibilityOff />
//                                 ) : (
//                                   <Visibility />
//                                 )}
//                               </span>
//                             </InputAdornment>
//                           ),
//                         }}
//                       />
//                     </div>

//                     <button
//                       className="btn btn-primary"
//                       type="submit"
//                       onClick={() => getChangePassword()}
//                     >
//                       Change Password
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-8">
//                 <div className="card">
//                   <div className="card-body">
//                     <form className="needs-validation" onSubmit={handleSubmit}>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom01">First name</label>
//                           <span className="text-danger">*</span>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               formErrors.firstName ? "is-invalid" : ""
//                             }`}
//                             placeholder="First name"
//                             name="firstName"
//                             value={admin?.firstName}
//                             onChange={(e) => handleInputChange(e)}
//                           />
//                           {formErrors.firstName && (
//                             <div className="invalid-feedback">
//                               {formErrors.firstName}
//                             </div>
//                           )}

//                           <div className="valid-feedback">Looks good!</div>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom02">Last name</label>
//                           <span className="text-danger">*</span>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               formErrors.lastName ? "is-invalid" : ""
//                             }`}
//                             placeholder="Last name"
//                             name="lastName"
//                             value={admin?.lastName}
//                             onChange={(e) => handleInputChange(e)}
//                           />
//                           {formErrors.lastName && (
//                             <div className="invalid-feedback">
//                               {formErrors.lastName}
//                             </div>
//                           )}
//                           <div className="valid-feedback">Looks good!</div>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom03">Email</label>
//                           <span className="text-danger">*</span>
//                           <input
//                             type="text"
//                             className={`form-control ${
//                               formErrors.email ? "is-invalid" : ""
//                             }`}
//                             placeholder="Email Id"
//                             name="email"
//                             value={admin?.email}
//                             onChange={(e) => handleInputChange(e)}
//                           />
//                           {formErrors.email && (
//                             <div className="invalid-feedback">
//                               {formErrors.email}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom04">Phone Number</label>
//                           <span className="text-danger">*</span>
//                           <input
//                             type="number"
//                             className={`form-control ${
//                               formErrors.phoneNo ? "is-invalid" : ""
//                             }`}
//                             placeholder="+91 9876564534"
//                             name="phoneNo"
//                             value={admin?.phoneNo}
//                             onChange={(e) => handleInputChange(e)}
//                           />
//                           {formErrors.phoneNo && (
//                             <div className="invalid-feedback">
//                               {formErrors.phoneNo}
//                             </div>
//                           )}
//                         </div>
//                         <div className="form-group col-md-12">
//                           <label for="exampleFormControlTextarea1">
//                             Address
//                           </label>
//                           <span className="text-danger">*</span>
//                           <textarea
//                             className={`form-control ${
//                               formErrors.address ? "is-invalid" : ""
//                             }`}
//                             id="exampleFormControlTextarea1"
//                             name="address"
//                             value={admin?.address}
//                             onChange={(e) => handleInputChange(e)}
//                             rows="5"
//                           >
//                             Kharadi Pune
//                           </textarea>
//                           {formErrors.address && (
//                             <div className="invalid-feedback">
//                               {formErrors.address}
//                             </div>
//                           )}
//                         </div>
//                         <div className="form-group col-md-5 mt-3">
//                           <label for="exampleFormControlFile1">Image</label>
//                           <input
//                             type="file"
//                             name="Image"
//                             className="form-control-file"
//                             id="exampleFormControlFile1"
//                             onChange={handleImageChange}
//                           />
//                           {formErrors.image && (
//                             <div className="invalid-feedback">
//                               {formErrors.image}
//                             </div>
//                           )}
//                         </div>
//                         <div className="col-md-4 mt-3">
//                           {selectedImage && !capturedImage && (
//                             <figure
//                               className="avatar avatar-sm m-r-15"
//                               style={{ width: "100px", height: "100px" }}
//                             >
//                               <img
//                                 src={selectedImage}
//                                 className="rounded-circle"
//                                 alt="Selected"
//                                 width="100%"
//                                 height="100%"
//                               />
//                             </figure>
//                           )}
//                           {capturedImage && (
//                             <figure
//                               className="avatar avatar-sm m-r-15"
//                               style={{ width: "100px", height: "100px" }}
//                             >
//                               <img
//                                 src={capturedImage}
//                                 className="rounded-circle"
//                                 alt="Captured"
//                                 width="100%"
//                                 height="100%"
//                               />
//                             </figure>
//                           )}
//                         </div>

//                         <div className="col-md-3 mt-3">
//                           <button
//                             variant="primary"
//                             className="btn btn-primary  mt-4"
//                             onClick={openWebcamModal}
//                           >
//                             Open Webcam
//                           </button>
//                           <Modal
//                             show={showWebcamModal}
//                             onHide={closeWebcamModal}
//                           >
//                             <Modal.Header closeButton>
//                               <Modal.Title>Webcam Image Upload</Modal.Title>
//                             </Modal.Header>
//                             <Modal.Body>
//                               <Webcam
//                                 audio={false}
//                                 ref={webcamRef}
//                                 screenshotFormat="image/jpeg"
//                               />
//                             </Modal.Body>
//                             <Modal.Footer>
//                               <Button
//                                 variant="secondary"
//                                 onClick={closeWebcamModal}
//                               >
//                                 Close
//                               </Button>
//                               <Button variant="primary" onClick={captureImage}>
//                                 Capture Image
//                               </Button>
//                             </Modal.Footer>
//                           </Modal>
//                           {/* {capturedImage && (
//                             <div>
//                               <h2>Captured Image</h2>
//                               <img src={capturedImage} alt="Captured" />
//                             </div>
//                           )} */}
//                         </div>
//                       </div>
//                       <button
//                         className="btn btn-primary float-right mt-4"
//                         type="submit"
//                         // onClick={(e) => updateProfile(e)}
//                       >
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         {/* end::main-content  */}
//       </div>
//     </>
//   );
// };

// export default Profile;


import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, changePassword } from "../Redux/Slice/ProfileSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Modal, Button } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import { useParams } from "react-router-dom";

const Profile = () => {
  var navigate = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();

  const Profile = useSelector((state) => state.profile.Profile);
  // const Password = useSelector((state)=>state.profile.changePassword)
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [SelectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageData = e.target.result;

        // Store the selected image in local storage
        localStorage.setItem("selectedImage", imageData);
        setSelectedImage(imageData);
      };

      reader.readAsDataURL(file);
    }
  };
  console.log("SelectedImage",SelectedImage)
  console.log("formErrors", formErrors);
  console.log("Profile", Profile);
  //webcam
  const webcamRef = useRef(null);
  const [showWebcamModal, setShowWebcamModal] = useState(false);
  const [CapturedImage, setCapturedImage] = useState(null);
  console.log("CapturedImage", CapturedImage);
  const openWebcamModal = () => setShowWebcamModal(true);
  const closeWebcamModal = () => setShowWebcamModal(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    localStorage.setItem("capturedImage", imageSrc);
 
    closeWebcamModal();
    
  };
  const selectedImage = localStorage.getItem("selectedImage");
  console.log("selectedImage********************************",selectedImage)
    const capturedImage = localStorage.getItem("capturedImage");
    
  
    console.log("capturedImage**********************", capturedImage);
    
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log("SelectedImage------------------->", URL.createObjectURL(file));
  //   setSelectedImage(URL.createObjectURL(file));
  //   localStorage.setItem("selectedImage", URL.createObjectURL(file));
  // };

  const initialValues = {
    firstName: Profile.firstname,
    lastname: Profile?.lastname,
    address: Profile?.address,
    email: Profile?.email,
    phoneNo: Profile?.phoneNumber,
    imageUrl: null,
  };

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const validate = (admin) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!admin.firstName) {
      errors.firstName = "Firstname cannot be blank";
    }
    if (!admin.lastname) {
      errors.lastname = "Lastname cannot be blank";
    }
    if (!admin.address) {
      errors.address = "Address cannot be blank";
    }
    if (!admin.email) {
      errors.email = "Email cannot be blank";
    } else if (!regex.test(admin.email)) {
      errors.email = "Invalid email format";
    }
    if (!admin.phoneNo) {
      errors.phoneNo = "Phone number cannot be blank";
    } else if (admin.phoneNo.length > 10) {
      errors.phoneNo = "Mobile number not valid";
    }

    return errors;
  };

  const changePassValue = {
    email: "",
    currentPassword: "",
    newPassword: "",
  };

  const [admin, setAdmin] = useState();
  const [password, setPassword] = useState(changePassValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const handleChangePasswordInput = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  useEffect(() => {
    setAdmin(initialValues);
    setPassword(changePassValue);
  }, [Profile]);

  const updateProfile = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      method: "PUT",
      body: JSON.stringify({
        firstname: admin.firstName,
        lastname: admin.lastname,
        email: admin.email,
        phoneNumber: admin.phoneNo,
        address: admin.address,
        image: null,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    };

    //  console.log("body",data)

    fetch(`http://65.20.73.28:8090//api/admins`, data)
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        setAdmin(initialValues);
        toast.success(data.message);
      })
      .catch((err) => console.log(err));
  };

  const getChangePassword = async () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        email: password.email,
        currentPassword: password.currentPassword,
        newPassword: password.newPassword,
      }),
      headers: {
        "Content-type": "application/json",
      },
    };

    // dispatch(changePassword(data))

    fetch("http://65.20.73.28:8090//api/admins/changepassword", data)
      .then((response) => response.json())
      .then((data) => {
        setPassword({});
        console.log("changepassword", data);
        if (data?.status === true) {
          setPassword(changePassValue);
          toast.success(data?.message);
        } else {
          toast.error(data?.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(admin));

    if (Object.keys(formErrors).length == 0) {
      updateProfile();
    }
  };
  return (
    <>
      <div id="main">
        <main className="main-content ">
          <div className="container mt-5">
            <ToastContainer />
            <div className="row">
              <div className="col-md-4">
                <div className="card ">
                  <div className="text-center mt-3">
                    {selectedImage && !capturedImage && (
                      <figure
                        className="avatar avatar-sm m-r-15"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <img
                          src={selectedImage}
                          className="rounded-circle"
                          alt="Selected"
                          width="100%"
                          height="100%"
                        />
                      </figure>
                    )}
                    {capturedImage && (
                      <figure
                        className="avatar avatar-sm m-r-15"
                        style={{ width: "100px", height: "100px" }}
                      >
                        <img
                          src={capturedImage}
                          className="rounded-circle"
                          alt="Captured"
                          width="100%"
                          height="100%"
                        />
                      </figure>
                    )}

                    <h5 className="mb-1">Zeeshaan Pathan</h5>
                    <p className="text-muted small">Administrator</p>
                  </div>
                  <div className="card-body mr-5 ">
                    <div className="row mb-2  me-5">
                      <div className="col-6 text-muted text-left ">
                        First Name:
                      </div>
                      <div className="col-6 text-left">
                        {Profile?.firstname}
                      </div>
                    </div>
                    <div className="row mb-2 me-5">
                      <div className="col-6 text-muted text-left">
                        Last Name:
                      </div>
                      <div className="col-6 text-left">{Profile?.lastname}</div>
                    </div>
                    <div className="row mb-2 ">
                      <div className=" col-5 text-muted text-left">
                        Address:{" "}
                      </div>
                      <div className="col-6 text-left">
                        {Profile?.address}Pune
                      </div>
                    </div>
                    <div className="row mb-2 ">
                      <div className="col-5 text-muted text-left">Phone:</div>
                      <div className="col-6 text-left ">
                        {Profile?.phoneNumber}+91 8765454345
                      </div>
                    </div>
                    <div className="row mb-2">
                      <div className="col-5 text-muted text-left">Email:</div>
                      <div className="col-6 text-left">{Profile?.email}</div>
                    </div>
                  </div>
                  <hr className="m-0" />
                </div>

                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title d-flex justify-content-between align-items-center">
                      Change Password
                    </h6>
                    <div className="form-group mb-4">
                      <label for="email">Email</label>
                      <span className="text-danger">*</span>
                      <TextField
                        placeholder="Email "
                        className="form-control"
                        id="old_password"
                        name="email"
                        value={password.email}
                        onChange={(e) => handleChangePasswordInput(e)}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label for="password">Current Password</label>
                      <span className="text-danger">*</span>
                      <TextField
                        placeholder="current password"
                        type={showPassword.current ? "text" : "password"}
                        className="form-control"
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={(e) => handleChangePasswordInput(e)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  togglePasswordVisibility("current")
                                }
                              >
                                {showPassword.current ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </span>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="newPassword">New Password</label>
                      <span className="text-danger">*</span>
                      <TextField
                        type={showPassword.new ? "text" : "password"}
                        className="form-control"
                        name="newPassword"
                        placeholder="New Password "
                        value={password.newPassword}
                        onChange={(e) => handleChangePasswordInput(e)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <span
                                style={{ cursor: "pointer" }}
                                onClick={() => togglePasswordVisibility("new")}
                              >
                                {showPassword.new ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </span>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={() => getChangePassword()}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <form className="needs-validation" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom01">First name</label>
                          <span className="text-danger">*</span>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.firstName ? "is-invalid" : ""
                            }`}
                            placeholder="First name"
                            name="firstName"
                            value={admin?.firstName}
                            onChange={(e) => handleInputChange(e)}
                          />
                          {formErrors.firstName && (
                            <div className="invalid-feedback">
                              {formErrors.firstName}
                            </div>
                          )}

                          <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom02">Last name</label>
                          <span className="text-danger">*</span>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.lastName ? "is-invalid" : ""
                            }`}
                            placeholder="Last name"
                            name="lastName"
                            value={admin?.lastName}
                            onChange={(e) => handleInputChange(e)}
                          />
                          {formErrors.lastName && (
                            <div className="invalid-feedback">
                              {formErrors.lastName}
                            </div>
                          )}
                          <div className="valid-feedback">Looks good!</div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom03">Email</label>
                          <span className="text-danger">*</span>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email Id"
                            name="email"
                            value={admin?.email}
                            onChange={(e) => handleInputChange(e)}
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">
                              {formErrors.email}
                            </div>
                          )}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Phone Number</label>
                          <span className="text-danger">*</span>
                          <input
                            type="number"
                            className={`form-control ${
                              formErrors.phoneNo ? "is-invalid" : ""
                            }`}
                            placeholder="+91 9876564534"
                            name="phoneNo"
                            value={admin?.phoneNo}
                            onChange={(e) => handleInputChange(e)}
                          />
                          {formErrors.phoneNo && (
                            <div className="invalid-feedback">
                              {formErrors.phoneNo}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-12">
                          <label for="exampleFormControlTextarea1">
                            Address
                          </label>
                          <span className="text-danger">*</span>
                          <textarea
                            className={`form-control ${
                              formErrors.address ? "is-invalid" : ""
                            }`}
                            id="exampleFormControlTextarea1"
                            name="address"
                            value={admin?.address}
                            onChange={(e) => handleInputChange(e)}
                            rows="5"
                          >
                            Kharadi Pune
                          </textarea>
                          {formErrors.address && (
                            <div className="invalid-feedback">
                              {formErrors.address}
                            </div>
                          )}
                        </div>
                        <div className="form-group col-md-5 mt-3">
                          <label for="exampleFormControlFile1">Image</label>
                          <input
                            type="file"
                            name="Image"
                            accept="image/*"
                            className="form-control-file"
                            id="exampleFormControlFile1"
                            onChange={handleImageChange}
                          />
                          {formErrors.image && (
                            <div className="invalid-feedback">
                              {formErrors.image}
                            </div>
                          )}
                        </div>
                        <div className="col-md-4 mt-3">
                          {selectedImage && !capturedImage && (
                            <figure
                              className="avatar avatar-sm m-r-15"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={selectedImage}
                                className="rounded-circle"
                                alt="Selected"
                                width="100%"
                                height="100%"
                              />
                            </figure>
                          )}
                          {capturedImage && (
                            <figure
                              className="avatar avatar-sm m-r-15"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={capturedImage}
                                className="rounded-circle"
                                alt="Captured"
                                width="100%"
                                height="100%"
                              />
                            </figure>
                          )}
                        </div>

                        <div className="col-md-3 mt-3">
                          <button
                            variant="primary"
                            className="btn btn-primary  mt-4"
                            onClick={openWebcamModal}
                          >
                            Open Webcam
                          </button>
                          <Modal
                            show={showWebcamModal}
                            onHide={closeWebcamModal}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Webcam Image Upload</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                              />
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={closeWebcamModal}
                              >
                                Close
                              </Button>
                              <Button variant="primary" onClick={captureImage}>
                                Capture Image
                              </Button>
                            </Modal.Footer>
                          </Modal>
                          
                        </div>
                      </div>
                      <button
                        className="btn btn-primary float-right mt-4"
                        type="submit"
                        // onClick={(e) => updateProfile(e)}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* end::main-content  */}
      </div>
    </>
  );
};

export default Profile;
