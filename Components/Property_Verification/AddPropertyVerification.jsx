// import React, { useState, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useFormik } from "formik";
// import axios from "axios";
// const AddProperty = () => {
//   var navigate = useNavigate();
//   const [base64OwnershipProof, setBase64OwnershipProof] = useState("");
//   const [base64IndexIIDoc, setBase64IndexIIDoc] = useState("");
//   const base64OwnershipProofRef = useRef(null);
//   const base64IndexIIDocRef = useRef(null);
//   const token = localStorage.getItem("token");
//   const [propertyid, setpropertyid] = useState("");

//   const OwnershipProof = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const base64OwnershipProofData = reader.result;
//         setBase64OwnershipProof(base64OwnershipProofData);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFileChangeIndex = (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         const base64IndexIIDocData = reader.result;
//         setBase64IndexIIDoc(base64IndexIIDocData);
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   const addProperty = () => {
//     const data = {
//       method: "POST",
//       body: JSON.stringify({
//        OwnershipProof: base64OwnershipProof,
//       IndexIIDoc: base64IndexIIDoc,
//       propertyid: propertyid,

//       }),
//       headers: {
//         "Content-Type": "application/json",
//         "authorization":token
//         },
//     };

//     fetch("http://65.20.73.28:8090/api/propertyverification", data)
//       .then((response) => response.json())
//       .then((data) => {
//         console.log("data message", data);
//         if (data?.status == true) {

//           toast.success(data.message);
//             navigate("/property-verification");
//         } else {
//           toast.error(data.message);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
// <div>
//   {/* <!-- begin::main --> */}
//   <div id="main">
//     {/* <!-- begin::main-content --> */}
//     <main className="main-content">
//       <div className="container">
//         <ToastContainer />
//         {/* <!-- begin::page-header --> */}
//         <div className="page-header mt-5">
//           <h4>Property Verification</h4>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <Link to="/homepage">Home</Link>
//               </li>
//               <li className="breadcrumb-item">
//                 <Link to="#">User Management Screen</Link>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 Property Verification
//               </li>
//             </ol>
//           </nav>
//         </div>
//         {/* <!-- end::page-header --> */}

//         <div className="row">
//           <div className="col-md-12">
//             <div className="card">
//               <div className="card-body">
//                 <div className="pt-4 pb-4 text-left"></div>
//                 <div className="card">
//                   <div className="card-body">
//                     <ToastContainer />
//                     <form style={{ height: "auto" }}>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           {base64OwnershipProof && (
//                             <div>
//                               <img
//                                 src={base64OwnershipProof}
//                                 alt="OwnershipProof"
//                                 style={{ width: "250px", height: "200px" }}
//                               />
//                             </div>
//                           )}

//                           <label htmlFor="validationCustom01">
//                             OwnershipProof{" "}
//                           </label>

//                           <input
//                             className="form-control"
//                             type="file"
//                             accept="image/*"
//                             ref={base64OwnershipProofRef}
//                             onChange={OwnershipProof}
//                           />
//                           <button
//                             style={{ display: "none" }}
//                             onClick={() =>
//                               base64OwnershipProofRef.current.click()
//                             }
//                           >
//                             Add OwnershipProof
//                           </button>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           {base64IndexIIDoc && (
//                             <div>
//                               <img
//                                 src={base64IndexIIDoc}
//                                 alt="Pan Card"
//                                 style={{ width: "250px", height: "200px" }}
//                               />
//                             </div>
//                           )}
//                           <label htmlFor="validationCustom04">
//                             IndexIIDoc
//                           </label>
//                           <input
//                             className="form-control"
//                             type="file"
//                             accept="image/*"
//                             ref={base64IndexIIDocRef}
//                             onChange={handleFileChangeIndex}
//                           />
//                           <button
//                             style={{ display: "none" }}
//                             onClick={() =>
//                               base64IndexIIDocRef.current.click()
//                             }
//                           >
//                             IndexIIDoc
//                           </button>{" "}
//                         </div>

//                       </div>
//                       <div className="row">

//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="validationCustom04">
//                             Property Id
//                           </label>
//                           <input
//                             className="form-control"
//                             type="text"
//                             value={propertyid}
//                             onChange={(e) => setpropertyid(e.target.value)}
//                             placeholder="Enter User ID"
//                           />
//                         </div>
//                       </div>

//                       <button
//                         className="btn btn-primary mt-2"
//                         type="button"
//                         onClick={addProperty}
//                       >
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//     {/* <!-- end::main-content --> */}
//   </div>
//   {/* <!-- end::main --> */}
// </div>
//   );
// };

// export default AddProperty;

import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddProperty = () => {
  const navigate = useNavigate();
  const [base64OwnershipProof, setBase64OwnershipProof] = useState("");
  const [base64IndexIIDoc, setBase64IndexIIDoc] = useState("");
  const base64OwnershipProofRef = useRef(null);
  const base64IndexIIDocRef = useRef(null);
  const token = localStorage.getItem("token");
  const [propertyid, setpropertyid] = useState("");
  const [formErrors, setFormErrors] = useState({
    ownershipProof: "",
    indexIIDoc: "",
    propertyid: "",
  });
  const OwnershipProof = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64OwnershipProofData = reader.result;
        setBase64OwnershipProof(base64OwnershipProofData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeIndex = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64IndexIIDocData = reader.result;
        setBase64IndexIIDoc(base64IndexIIDocData);
      };

      reader.readAsDataURL(file);
    }
  };
  const validateForm = () => {
    let valid = true;
    const newFormErrors = {
      ownershipProof: "",
      indexIIDoc: "",
      propertyid: "",
    };

    if (!base64OwnershipProof) {
      newFormErrors.ownershipProof = "Ownership Proof is required";
      valid = false;
    }

    if (!base64IndexIIDoc) {
      newFormErrors.indexIIDoc = "Index IIDoc is required";
      valid = false;
    }

    if (!propertyid) {
      newFormErrors.propertyid = "Property ID is required";
      valid = false;
    }

    setFormErrors(newFormErrors);
    return valid;
  };

  const addProperty = () => {
    // Perform validation checks
    if (!base64OwnershipProof) {
      toast.error("Please upload Ownership Proof");
      return;
    }

    if (!base64IndexIIDoc) {
      toast.error("Please upload Index IIDoc");
      return;
    }

    if (!propertyid) {
      toast.error("Please enter Property ID");
      return;
    }

    // If validation passes, proceed with the API call
    const data = {
      method: "POST",
      body: JSON.stringify({
        OwnershipProof: base64OwnershipProof,
        IndexIIDoc: base64IndexIIDoc,
        propertyid: propertyid,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch("http://65.20.73.28:8090/api/propertyverification", data)
      .then((response) => response.json())
      .then((data) => {
        console.log("data message", data);
        if (data?.status === true) {
          toast.success(data.message);
          navigate("/property-verification");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  // const addProperty = () => {
  //   if (validateForm()) {
  //     const data = {
  //       method: "POST",
  //       body: JSON.stringify({
  //         OwnershipProof: base64OwnershipProof,
  //         IndexIIDoc: base64IndexIIDoc,
  //         propertyid: propertyid,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //         authorization: token,
  //       },
  //     };

  //     fetch("http://65.20.73.28:8090/api/propertyverification", data)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("data message", data);
  //         if (data?.status === true) {
  //           toast.success(data.message);
  //           navigate("/property-verification");
  //         } else {
  //           toast.error(data.message);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };
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
              <h4>Property Verification</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      User Management Screen
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Property Verification
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
                        <ToastContainer />
                        <form style={{ height: "auto" }}>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              {base64OwnershipProof && (
                                <div>
                                  <img
                                    src={base64OwnershipProof}
                                    alt="OwnershipProof"
                                    style={{ width: "250px", height: "200px" }}
                                  />
                                </div>
                              )}

                              <label htmlFor="validationCustom01">
                                OwnershipProof{" "}
                              </label>

                              <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                ref={base64OwnershipProofRef}
                                onChange={OwnershipProof}
                              />
                              <button
                                style={{ display: "none" }}
                                onClick={() =>
                                  base64OwnershipProofRef.current.click()
                                }
                              >
                                Add OwnershipProof
                              </button>
                              {formErrors.ownershipProof && (
                                <div className="invalid-feedback">
                                  {formErrors.ownershipProof}
                                </div>
                              )}
                            </div>
                            <div className="col-md-6 mb-3">
                              {base64IndexIIDoc && (
                                <div>
                                  <img
                                    src={base64IndexIIDoc}
                                    alt="Pan Card"
                                    style={{ width: "250px", height: "200px" }}
                                  />
                                </div>
                              )}
                              <label htmlFor="validationCustom04">
                                IndexIIDoc
                              </label>
                              <input
                                className="form-control"
                                type="file"
                                accept="image/*"
                                ref={base64IndexIIDocRef}
                                onChange={handleFileChangeIndex}
                              />
                              <button
                                style={{ display: "none" }}
                                onClick={() =>
                                  base64IndexIIDocRef.current.click()
                                }
                              >
                                IndexIIDoc
                              </button>{" "}
                              {formErrors.indexIIDoc && (
                                <div className="invalid-feedback">
                                  {formErrors.indexIIDoc}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <label htmlFor="validationCustom04">
                                Property Id
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                value={propertyid}
                                onChange={(e) => setpropertyid(e.target.value)}
                                placeholder="Enter User ID"
                              />
                              {formErrors.propertyid && (
                                <div className="invalid-feedback">
                                  {formErrors.propertyid}
                                </div>
                              )}
                            </div>
                          </div>

                          <button
                            className="btn btn-primary mt-2"
                            type="button"
                            onClick={addProperty}
                          >
                            Submit
                          </button>
                        </form>
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

export default AddProperty;
