import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import InvestorKyc from "./View/InvestorKyc";
import ViewInvestorPersonalDetails from "./View/ViewInvestorPersonalDetails";

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
function ViewInvestor() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div id="main">
      <div className="main-content">
        <div className="container">
          {/* begin::page-header  */}
          <div className="page-header">
            <h4>Investor Details</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/Dashboard" style={{ fontSize: "16px" }}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="#" style={{ fontSize: "16px" }}>User Management</Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" style={{ fontSize: "16px" }}>Investor</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page" style={{ fontSize: "16px" }}>
                  Investor Details
                </li>
              </ol>
            </nav>
          </div>
          {/* end::page-header */}

          <div className="row">
            <div className="col-md-12">
              
                <div>
                  <Tabs value={currentTab} onChange={handleChangeTab} start>
                    <Tab label="Personal Details" />
                  </Tabs>
                </div>
                <div className="card" style={{marginTop:"30px"}}>
                <div>
                  <TabPanel value={currentTab} index={0}>
                    <ViewInvestorPersonalDetails />
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

export default ViewInvestor;
