import React, { useState, useEffect } from "react";
import logo from "../../assets/media/image/logo.png";
import logo_sm from "../../assets/media/image/logo-sm.png";
import logo_dark from "../../assets/media/image/logo-dark.png";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarChart,
  faHome,
  faMoneyBill,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand";
import { faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  faChartBar,
  faChartBarAlt,
  faShoppingCart,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { faFolder, faFile } from "@fortawesome/free-solid-svg-icons";
import { faMessageCircle } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileSlice from "../../Redux/Slice/ProfileSlice";
import { getProfileData } from "../../Redux/Slice/ProfileSlice";
// import Header from "../admin/Header";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { faSeller } from "@fortawesome/free-solid-svg-icons";
import { faDashboard } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [capturedImg, setCapturedImg] = useState("");
   useEffect(() => {
    const selectedImage = localStorage.getItem("selectedImage");
    const capturedImage = localStorage.getItem("capturedImage");
    console.log("selectedImage ********************************", selectedImg);

    console.log("capturedImage**********************", capturedImg);
    if (selectedImage) {
      setSelectedImg(selectedImage);
    }
    if (capturedImage) {
      setCapturedImg(capturedImage);
    }
  }, []);
  const handleClickList = () => {
    setOpen(!open);
  };
  const [openManagement, setOpenManagement] = React.useState(false);

  const handleClickManagerList = () => {
    setOpenManagement(!openManagement);
  };
  const [openSubscription, setOpenSubscription] = React.useState(false);
  const handleSubsriptionList = () => {
    setOpenSubscription(!openSubscription);
  };
  const [openSubscriptionPlan, setOpenSubscriptionPlan] = React.useState(false);
  const handleSubsriptionPlan = () => {
    setOpenSubscriptionPlan(!openSubscriptionPlan);
  };

  const [openAdminmenu, setOpenAdminmenu] = React.useState(false);

  const handleClickAdminmenu = () => {
    setOpenAdminmenu(!openAdminmenu);
  };
  var navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile");
    navigate("/Dashboard");
    navigate("/buyer");
    navigate("/investor");
    navigate("/sellers");
    navigate("/property-listing");
    navigate("/documentVerification");
  };

  return (
    <>
      <div
        className="navigation"
        style={{ overflow: "auto", height: "100vh", position: "fixed" }}
      >
        <div id="logo">
          <h3 style={{ fontWeight: "bold" }}>PropTech</h3>
        </div>

        <header className="navigation-header">
          {/* {SelectedImage ? (
            <figure className="avatar avatar-state-success">
              <img src={SelectedImage} className="rounded-circle" alt="image" />
            </figure>
          ) : (
            <figur  e className="avatar avatar-state-success">
              <img
                src="https://via.placeholder.com/128X128"
                className="rounded-circle"
                alt="image"
              />
            </figure>
          )} */}

          {selectedImg && !capturedImg && (
            <figure
              className="avatar avatar-sm m-r-15"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src={selectedImg}
                className="rounded-circle"
                alt="Selected"
                width="100%"
                height="100%"
              />
            </figure>
          )}
          {capturedImg && (
            <figure
              className="avatar avatar-sm m-r-15"
              style={{ width: "100px", height: "100px" }}
            >
              <img
                src={capturedImg}
                className="rounded-circle"
                alt="Captured"
                width="100%"
                height="100%"
              />
            </figure>
          )}

          <div>
            <h5>Zeeshaan Pathan</h5>
            <p className="text-muted">Administrator</p>
            <ul className="nav">
              <li className="nav-item">
                <Link
                  to="/profile"
                  className="btn nav-link bg-info-bright"
                  title="Profile"
                  data-toggle="tooltip"
                >
                  <FontAwesomeIcon icon={faUser} style={{ marginTop: 4 }} />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="#"
                  className="btn nav-link bg-success-bright"
                  title="Settings"
                  data-toggle="tooltip"
                >
                  <FontAwesomeIcon icon={faCog} style={{ marginTop: 4 }} />
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/"
                  className="btn nav-link bg-danger-bright"
                  title="Logout"
                  data-toggle="tooltip"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginTop: 4 }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </header>

        <div className="navigation-menu-body">
          <ul>
            <List to="/Dashboard">
              <ListItemButton>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faDashboard}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link to="/Dashboard">Dashboard</Link>{" "}
              </ListItemButton>
            </List>

            <List>
              <ListItemButton onClick={handleClickList}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link>
                  <span>User Management</span>
                </Link>{" "}
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Link to="/buyer">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {/* <FontAwesomeIcon icon={faShoppingCart} /> */}
                      </ListItemIcon>
                      <Link to="/buyer">Buyer</Link>
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Link to="/sellers">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {/* <FontAwesomeIcon icon={faStore} /> */}
                      </ListItemIcon>
                      <Link to="/sellers">Seller</Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Link to="/investor">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {/* <FontAwesomeIcon icon={faMoneyBill} /> */}
                      </ListItemIcon>
                      <Link to="/investor">Investor</Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
            </List>
            <List>
              <ListItemButton onClick={handleClickManagerList}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faKey}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link>Access Management</Link>{" "}
                {openManagement ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openManagement} timeout="auto" unmountOnExit>
                <Link to="/RoleManage">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faUsersCog} />
                      </ListItemIcon>
                      <Link to="/RoleManage"> Role Managemnet </Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>

              <Collapse in={openManagement} timeout="auto" unmountOnExit>
                <Link to="/adminmenu">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faBars} />
                      </ListItemIcon>
                      <Link to="/adminmenu">Manager Menu</Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>

              <Collapse in={openManagement} timeout="auto" unmountOnExit>
                <Link to="/managers">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faListUl} />
                      </ListItemIcon>
                      <Link to="/managers">Manager List</Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
            </List>

            {/* <List>
              <ListItemButton onClick={handleSubsriptionList}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link>Subscription </Link>{" "}
                {openSubscription ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </ListItemIcon>
                    <Link to="/buyer-subscription" style={{ marginRight: 25 }}>
                      Buyer
                    </Link>{" "}
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </ListItemIcon>
                    <Link to="/seller-subscription" style={{ marginRight: 25 }}>
                      Seller
                    </Link>{" "}
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </ListItemIcon>
                    <Link
                      to="/investor-subscription"
                      style={{ marginRight: 25 }}
                    >
                      Investor
                    </Link>{" "}
                  </ListItemButton>
                </List>
              </Collapse>

              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <Link to="/subscriptionHistory">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faStore} />
                      </ListItemIcon>
                      <Link>Subscription History</Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
            </List> */}

            <List>
              <ListItemButton onClick={handleSubsriptionList}>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link>Subscription </Link>{" "}
                {openSubscription ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <ListItemButton sx={{ pl: 4 }} onClick={handleSubsriptionPlan}>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={faThLarge} />
                  </ListItemIcon>
                  <Link>Subscription Plan</Link>{" "}
                  {openSubscriptionPlan ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse
                  in={openSubscriptionPlan}
                  timeout="auto"
                  unmountOnExit
                >
                  <Link to="/buyer-subscription">
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 5 }}>
                        <ListItemIcon>
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </ListItemIcon>
                        <Link to="/buyer-subscription">Buyer</Link>{" "}
                      </ListItemButton>
                    </List>
                  </Link>
                  <Link to="/seller-subscription">
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 5 }}>
                        <ListItemIcon>
                          <FontAwesomeIcon icon={faStore} />
                        </ListItemIcon>
                        <Link to="/seller-subscription">Seller</Link>{" "}
                      </ListItemButton>
                    </List>
                  </Link>
                  <Link to="/investor-subscription">
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 5 }}>
                        <ListItemIcon>
                          <FontAwesomeIcon icon={faMoneyBill} />
                        </ListItemIcon>
                        <Link to="/investor-subscription">Investor</Link>{" "}
                      </ListItemButton>
                    </List>
                  </Link>
                </Collapse>
              </Collapse>
              <Collapse in={openSubscription} timeout="auto" unmountOnExit>
                <Link to="/subscriptionHistory">
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faHistory} />
                      </ListItemIcon>
                      <Link to="/subscriptionHistory">
                        Subscription History
                      </Link>{" "}
                    </ListItemButton>
                  </List>
                </Link>
              </Collapse>
            </List>

            <List to="/property-listing">
              <ListItemButton>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faHome}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link to="/property-listing">Property Listing</Link>{" "}
              </ListItemButton>
            </List>

            <List to="/property-verification">
              <ListItemButton>
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ marginLeft: "20px" }}
                  />
                </ListItemIcon>
                <Link to="/property-verification">Property Verification</Link>{" "}
              </ListItemButton>
            </List>
          </ul>
        </div>
      </div>

      <div id="main">{/* <Header /> */}</div>
    </>
  );
};

export default Sidebar;
