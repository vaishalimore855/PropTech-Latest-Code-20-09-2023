import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddInvestorPersonalDetails from "./Add/AddInvestorPersonalDetails";
import AddInvestorKyc from "./Add/AddInvestorKyc";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
function AddInvestorForm() {

  const [currentTab, setCurrentTab] = useState(0);
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          {/* begin::page-header  */}
          <ToastContainer/>
          <div className="page-header mt-5">
            <h4>Add investor</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/Dashboard" style={{ fontSize: "16px" }}>Home</Link>
                </li>

                <li className="breadcrumb-item">
                  <Link to="/investor" style={{ fontSize: "16px" }} >Investor</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "16px" }}>
                  Add Investor
                </li>
              </ol>
            </nav>
          </div>

          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              {/* <div className="card"> */}
              <div>
                <Tabs value={currentTab} onChange={handleChangeTab} start>
                  <Tab label="Add Personal Details" />
                 </Tabs>
              </div>
              {/* </div> */}
            </div>
          </div>

          <div className="card" style={{ height: "auto", marginTop: "30px"}}>
            <div>
              <TabPanel value={currentTab} index={0}>
                <AddInvestorPersonalDetails />
              </TabPanel>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddInvestorForm;
