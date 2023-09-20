// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getBuyerbyId } from "../../../Redux/Slice/BuyerSlice";
// import { useNavigate } from "react-router-dom";

// import Tabs from "@mui/material/Tabs";
// import Tab from "@mui/material/Tab";
// import Box from "@mui/material/Box";

// const EditBuyer = () => {
//   //tab
//   const TabPanel = ({ children, value, index }) => {
//     return (
//       <div role="tabpanel" hidden={value !== index}>
//         {value === index && <Box p={3}>{children}</Box>}
//       </div>
//     );
//   };
//   const [currentTab, setCurrentTab] = useState(0);

//   const handleChangeTab = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   var navigate = useNavigate();
//   const { id } = useParams();

//   const dispatch = useDispatch();
//   const buyerId = useSelector((state) => state.buyer.Buyer);
//   console.log("buyerId .......", JSON.stringify(buyerId));

//   const [editedBuyer, setEditedBuyer] = useState({
//     fullname: "",
//     email: "",
//     phoneNumber: "",
//     userrole: "buyer",
//     mobileverified: true,
//     password: "",
//   });
//   useEffect(() => {
//     dispatch(getBuyerbyId(id));
//   }, [id]);

//   useEffect(() => {
//     setEditedBuyer({
//       fullname: buyerId?.personaldata?.fullname,
//       email: buyerId?.personaldata?.email,
//       phoneNumber: buyerId?.personaldata?.phoneNumber,
//       userrole: buyerId?.personaldata?.userrole,
//       mobileverified: buyerId?.personaldata?.mobileverified,
//       password: "",
//     });
//   }, [buyerId]);

//   const handleChangeEditBuyerInput = (e) => {
//     const { name, value } = e.target;
//     setEditedBuyer({
//       ...editedBuyer,
//       [name]: value,
//     });
//   };

//   const handleEditProfile = (e) => {
//     e.preventDefault();

//     const data = {
//       method: "PUT",
//       body: JSON.stringify(editedBuyer),
//       headers: {
//          "Content-Type": "application/json",
        //"authorization":token
//       },
//     };

//     fetch(`http://65.20.73.28:8090//api/users/${id}`, data)
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.status === true) {
//           toast.success(data.message);
//         } else {
//           toast.error(data.message);
//         }
//         navigate("/buyer");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="rtl">
//       {/* <!-- begin::main --> */}
//       <div id="main">
//         {/* <!-- begin::main-content --> */}
//         <div className="main-content">
//           <div className="container">
//             <ToastContainer />
//             {/* <!-- begin::page-header --> */}
//             <div className="page-header mt-5">
//               <h4>Edit Buyer</h4>
//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/homepage">Home</Link>
//                   </li>
//                   <li className="breadcrumb-item">
//                     <Link to="#">User Management</Link>
//                   </li>
//                   <li className="breadcrumb-item">
//                     <Link to="/buyer">Buyers</Link>
//                   </li>
//                   <li className="breadcrumb-item active" aria-current="page">
//                     Edit Buyer
//                   </li>
//                 </ol>
//               </nav>
//               <div>
//               <Tabs value={currentTab} onChange={handleChangeTab} centered>
//                 <Tab label="Personal Details" />
//                 <Tab label="KYC" />
                
//               </Tabs>
//               <TabPanel value={currentTab} index={0}>
//                 {/* Content for Tab 1 */}
//                 <h2>Tab 1 Content</h2>
//                 <p>This is the content for Tab 1.</p>
//               </TabPanel>
//               <TabPanel value={currentTab} index={1}>
//                 {/* Content for Tab 2 */}
//                 <h2>Tab 2 Content</h2>
//                 <p>This is the content for Tab 2.</p>
//               </TabPanel>
//             </div>
           
//             </div>
//             {/* <!-- end::page-header --> */}
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="card">
//                   <div className="card-body">
//                     <form>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom01">Full Name </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter Your full Name"
//                             name="fullname"
//                             // value={buyer.personaldata.fullname}
//                             value={editedBuyer.fullname}
//                             onChange={(e) => handleChangeEditBuyerInput(e)}
//                           />

//                           <div className="valid-feedback">Looks good!</div>
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom04">Phone Number</label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="Enter Phone Number"
//                             name="phoneNumber"
//                             value={editedBuyer.phoneNumber}
//                             onChange={(e) => handleChangeEditBuyerInput(e)}
//                           />
//                           <div className="invalid-feedback">
//                             Please provide a valid phone Number.
//                           </div>
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom04">Email</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder=" Enter City"
//                             name="email"
//                             value={editedBuyer.email}
//                             onChange={(e) => handleChangeEditBuyerInput(e)}
//                           />
//                           <div className="invalid-feedback"></div>
//                         </div>

//                         <div className="col-md-6 mb-3">
//                           <label for="validationCustom04">Password</label>
//                           <input
//                             type="password"
//                             className="form-control"
//                             placeholder="Enter password"
//                             name="password"
//                             value={editedBuyer.password}
//                             onChange={(e) => handleChangeEditBuyerInput(e)}
//                           />
//                           <div className="invalid-feedback">
//                             Please provide a valid location.
//                           </div>
//                         </div>
//                         <div className="row">
//                           <div className="col-md-6 mb-3">
//                             <label for="validationCustom04">
//                               Select User Role &nbsp;
//                             </label>

//                             <select
//                               style={{ width: "40%" }}
//                               name="userrole"
//                               onChange={(e) => handleChangeEditBuyerInput(e)}
//                             >
//                               <option value="seller">Seller</option>
//                               <option value="buyer">Buyer</option>
//                               <option value="investor">Investor</option>
//                             </select>

//                             <p style={{ color: "red" }}></p>
//                           </div>
//                         </div>
//                       </div>
//                       <button
//                         className="btn btn-primary mt-2"
//                         type="submit"
//                         onClick={(e) => handleEditProfile(e)}
//                       >
//                         Submit{" "}
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <!-- end::main-content --> */}
//       </div>
//       {/* <!-- end::main --> */}
//     </div>
//   );
// };

// export default EditBuyer;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import EditPersonalDetails from "./Edit/EditPersonalDetails";
import EditKyc from "./Edit/EditKyc";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
function EditBuyer() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          {/* begin::page-header  */}
          <div className="page-header mt-5">
              <h4>Edit Buyer</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>User Management</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/buyer" style={{ fontSize: "16px" }}>Buyers</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "16px" }}>
                    Edit Buyer
                  </li>
                </ol>
              </nav>
            </div>
          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              
                <div>
                  <Tabs value={currentTab} onChange={handleChangeTab} start>
                    <Tab label="Edit Personal Details" />
                    <Tab label="Edit Buyer Kyc" />
                  </Tabs>
                </div>
              

              <div className="card" style={{height:"auto",marginTop:"30px"}}>
                <div>
                  <TabPanel value={currentTab} index={0}>
                    <EditPersonalDetails />
                  </TabPanel>
                  <TabPanel value={currentTab} index={1}>
                    <EditKyc />{" "}
                  </TabPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditBuyer;
