import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubscriptionList } from "../../Redux/Slice/SubscriptionSlice";
import * as ExcelJS from "exceljs";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Paper } from "@mui/material";

import { makeStyles } from "@mui/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import BuyerSubscription from "./Buyer/BuyerSubscription";
import SellerSubscription from "./Sellers/SellerSubscription";
import InvestorSubscription from "./Investor/InvestorSubscription.";
const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    width: 350,
    height: 100,
    paddingLeft: "30px",
    // padding: theme.spacing(2, 4, 3),
  },
}));
const SubscriptionPlan = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [subscriptionData, setSubscriptionData] = useState("");
  // Dispatch the action to fetch the property list when the component mounts
  useEffect(() => {
    dispatch(getSubscriptionList());
  }, [dispatch]);

  // Access the PropertyList from the Redux store
  const SubscriptionList = useSelector(
    (state) => state.SubscriptionData.Subscriptions
  );

  console.log("list", JSON.stringify(SubscriptionList));

  //   const { userid } = useParams();
  var navigate = useNavigate();

  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Id",
      " Name",
      "Price",
      "feature",
      "Status",
      "CreatedAt",
      "UpdatedAt",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    SubscriptionList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.name,
        row.price,
        row.feature,
        row.status,
        row.createdAt,
        row.updatedAt,
      ]); // Fixed field names
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const navigateToEditSubscription = (id) => {
    navigate(`/edit-subscriptionplan/${id}`);
  };

  const navigateToViewPSubscription = (id) => {
    navigate(`/view-subscriptionplan/${id}`);
  };
  const token = localStorage.getItem("token");

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setOpenConfirmation(true);
  };

  const cancelDelete = () => {
    setItemToDelete(null);
    setOpenConfirmation(false);
  };

  const executeDelete = (id) => {
    axios
      .delete(`http://65.20.73.28:8090/api/subscriptions/${id}`, {
        headers: {
          authorization: token,
        },
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getSubscriptionList());
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemToDelete(null);
        setOpenConfirmation(false);
      });
  };

 
  const [currentTab, setCurrentTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      {/* <!-- begin::main --> */}
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <main className="main-content">
          <div className="container">
            <ToastContainer />
            <div className="row">
              <div className="col-md-12">
                <div>
                  <Tabs value={currentTab} onChange={handleChangeTab} centered>
                    <Tab label="Buyer Subscription" />
                    <Tab label=" Seller Subscription" />
                    <Tab label=" Investor Subscription" />
                  </Tabs>
                </div>
              </div>
            </div>

            <div>
              <TabPanel value={currentTab} index={0}>
                <BuyerSubscription />
              </TabPanel>
              <TabPanel value={currentTab} index={1}>
                <SellerSubscription />
              </TabPanel>
              <TabPanel value={currentTab} index={2}>
                <InvestorSubscription />
              </TabPanel>
            </div>
          </div>
        </main>
        {/* <!-- end::main-content --> */}
      </div>
      {/* <!-- end::main --> */}
    </div>
  );
};

export default SubscriptionPlan;
