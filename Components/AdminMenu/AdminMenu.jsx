import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAdminMenuList, getAdminMenuId } from "../../Redux/Slice/MenuSlice";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Paper } from "@mui/material";
import * as ExcelJS from "exceljs";
import { makeStyles } from "@mui/styles";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "@mui/material/TablePagination";

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
function AdminMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);
  const [getAllMenu, setGetAllMenu] = useState();

  const AdminMenuList = useSelector((state) => state.adminMenu.AdminMenuList);
  const ParentidList = useSelector((state) => state.adminMenu.ParentIdList);
  console.log("ParentidList", ParentidList);
  var navigate = useNavigate();
  console.log("AdminMenuList", AdminMenuList);
  useEffect(() => {
    getAdminMenuId(id);
    dispatch(getAdminMenuList());
    getAllMenuData();
    
  }, [id]);
  //pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Id",
      " Title",
      "Path",
      "Icon",
      "Priority",
      "Parentid",
      "SubNav",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    AdminMenuList.forEach((row) => {
      worksheet.addRow([
        row.id,
        row.title,
        row.path,
        row.icon,
        row.priority,
        row.parentid,
        row.subNav,
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
  const navigateToEditAdminMenu = (id) => {
    navigate(`/edit-adminmenu/${id}`);
  };

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
      .delete(`http://65.20.73.28:8090/api/adminmenus/${id}`, {
        headers: {
          authorization: token,
        },
      })
      
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getAdminMenuList());
          // getAllMenuData();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
        getAllMenuData();

      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemToDelete(null);
        setOpenConfirmation(false);
      });
  };
  const getAllMenuData = () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    axios
      .post(`http://65.20.73.28:8090/api/adminmenus/getallmenu`, null, {
        headers,
      })
      .then((response) => {
        setGetAllMenu(response.data);

        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        setError("Error fetching data. Please try again.");
      });
  };

  console.log("getAllMenu", getAllMenu);
  return (
    <div className="rtl">
      <div id="main">
        <div className="main-content">
          <div className="container">
            <div className="page-header mt-5">
              <h4>Admin Menu</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/Dashboard" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Admin Menu
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ height: "200%" }}>
                    <div className="pt-4 pb-4 text-left justify-content-between">
                      <div className="row">
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-primary btn-rounded">
                            <Link to="/AddMenu" className="text-white">
                              + Add
                            </Link>
                          </button>

                          <Button
                            onClick={exportToExcel}
                            enabled={!AdminMenuList.length}
                            variant="contained"
                            style={{
                              backgroundColor: "#3A833A",
                              marginRight: "10px",
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faDownload}
                              style={{ color: "white" }}
                            />{" "}
                            &nbsp;&nbsp; Export to Excel
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <table
                          id="example2"
                          className="table table-striped table-bordered"
                        >
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Title</th>
                              <th>Path</th>
                              <th>Icon</th>
                              <th>Priority</th>
                              <th>Parentid</th>
                              {/* <th>SubNav</th> */}
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {getAllMenu &&
                              getAllMenu?.map((menu) => (
                                <tr>
                                  <td>{menu.adminmenu?.id}</td>
                                  <td>{menu.adminmenu?.name}</td>
                                  <td>{menu.adminmenu?.link}</td>
                                  <td>{menu.adminmenu?.icon}</td>
                                  <td>{menu.adminmenu?.priority}</td>

                                  <td>{menu?.parent}</td>

                                  <td className="d-flex justify-content-center align-items-center">
                                    <button
                                      onClick={() =>
                                        navigateToEditAdminMenu(menu.adminmenu?.id)
                                      }
                                      className="btn btn-sm btn-icon me-2 float-left btn-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Edit"
                                    >
                                      <FontAwesomeIcon
                                        icon={faPencilSquare}
                                        style={{ color: "white" }}
                                      />
                                    </button>

                                    <button
                                      className="btn btn-sm btn-icon me-2 btn-danger"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Delete"
                                      onClick={() => confirmDelete(menu.adminmenu.id)}
                                    >
                                      <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        style={{ color: "white" }}
                                      />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                          <Modal open={openConfirmation} onClose={cancelDelete}>
                            <Paper className={classes.modalPaper}>
                              <div className="confirmation-modal">
                                <div className="confirmation-content">
                                  <p style={{ marginTop: "10px" }}>
                                    Are you sure you want to delete this item?
                                  </p>
                                  <div className="row">
                                    <div className="col-md-5">
                                      <Button
                                        className="btn btn-primary text-white "
                                        style={{ marginLeft: "30px" }}
                                        onClick={() =>
                                          executeDelete(itemToDelete)
                                        }
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                    <div className="col-md-5">
                                      <Button
                                        className="btn btn-primary text-white"
                                        onClick={cancelDelete}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </Modal>
                        </table>
                        <TablePagination
                          rowsPerPageOptions={[5, 10]}
                          component="div"
                          count={AdminMenuList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMenu;
