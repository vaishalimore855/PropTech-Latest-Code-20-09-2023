import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMenuItemList } from "../../Redux/Slice/MenuSlice";
import axios from "axios";
function AddMenu() {
  const navigate = useNavigate();

  const menuValues = {
    name: "",
    link: "",
    icon: "",
    parentid: "",
    priority: "",
    type: "",
  };

  const [addMenu, setAddMenu] = useState(menuValues);
  const [error, setError] = useState(null);
  const [parentList, setParentList] = useState();

  const [formErrors, setFormErrors] = useState({});
  const token = localStorage.getItem("token");
  useEffect(() => {
    getParentList();
  }, []);
  const handleChangeAddaddMenuInput = (e) => {
    const { name, value } = e.target;

    setAddMenu({
      ...addMenu,
      [name]: value,
    });
  };

  const validate = (addMenu) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!addMenu.name) {
      errors.name = "Name cannot be blank";
    } else if (!addMenu.link) {
      errors.icon = "link cannot be blank";
    } else if (!addMenu.icon) {
      errors.priority = "icon cannot be blank";
    }
    // else if (!addMenu.parentid) {
    //   errors.type = "parentid be blank";
    // }
    else if (!addMenu.priority) {
      errors.type = "priority be blank";
    } else if (!addMenu.type) {
      errors.type = "type  be blank";
    }

    return errors;
  };
  const getParentList = () => {
    setError(null);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    axios
      .post(`http://65.20.73.28:8090/api/adminmenus/getparentlist`, null, {
        headers,
      })
      .then((response) => {
        setParentList(response.data);

        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        setError("Error fetching data. Please try again.");
      });
  };
  console.log("parentList", parentList);
  const addAdminMenu = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        name: addMenu.name,
        link: addMenu.link,
        icon: addMenu.icon,
        parentid: addMenu.parentid,
        priority: addMenu.priority,
        type: addMenu.type,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    console.log("send data", data);
    fetch("http://65.20.73.28:8090/api/adminmenus", data)
      .then((response) => response.json())
      .then((data) => {
        // alert("status", JSON.stringify(data));
        if (data?.status == true) {
          // getMenuItemList(data);
          toast.success(data.message);
          navigate("/adminmenu");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(addMenu);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      addAdminMenu();
    }
  };

  return (
    <div>
      <div id="main">
        <div className="main-content">
          <div className="container">
            <ToastContainer />
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4>Add Menu</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      Privilege
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/AdminMenu" style={{ fontSize: "16px" }}>
                      Admin Menu
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Add Menu
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom01"> Name </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Name"
                            name="name"
                            value={addMenu.name}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          {addMenu.name ? null : (
                            <p style={{ color: "red" }}>{formErrors.name}</p>
                          )}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom02">Link</label>
                          <input
                            type="text"
                            data-input-mask="phone"
                            className="form-control"
                            placeholder="Enter Path"
                            name="link"
                            value={addMenu.link}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          {addMenu.link ? null : (
                            <p style={{ color: "red" }}>{formErrors.link}</p>
                          )}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Icon</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Icon"
                            name="icon"
                            value={addMenu.icon}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          {addMenu.icon ? null : (
                            <p style={{ color: "red" }}>{formErrors.icon}</p>
                          )}
                        </div>

                        {/* <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Parent Id</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Menu Id"
                            name="parentid"
                            value={addMenu.parentid}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          {addMenu.parentid ? null : (
                            <p style={{ color: "red" }}>
                              {formErrors.parentid}
                            </p>
                          )}
                          {/* <p style={{ color: "red" }}>{formErrors.parentid}</p> */}
                        {/* </div> */}
                        <div className="col-md-4 mb-3">
                          <label for="validationCustom04">Parent Id</label>
                          <select
                            className="form-control"
                            placeholder="Enter menu Id"
                            name="parentid"
                            value={addMenu.parentid}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          >
                            <option value="">Select Parent id</option>

                            {parentList &&
                              parentList.map((value, i) => {
                                return (
                                  <>
                                    <option key={i} value={value.id}>
                                      {value.name}
                                    </option>
                                  </>   
                                );
                              })}
                          </select>
                          <p style={{ color: "red" }}>{formErrors.role}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Priority</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter priority for menu item"
                            name="priority"
                            value={addMenu.priority}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          {addMenu.priority ? null : (
                            <p style={{ color: "red" }}>
                              {formErrors.priority}
                            </p>
                          )}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Type</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Menu Type"
                            name="type"
                            value={addMenu.type}
                            onChange={(e) => handleChangeAddaddMenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.type}</p>
                        </div>
                      </div>

                      <button
                        className="btn btn-primary mt-2"
                        type="submit"
                        // onClick={() => addAdminMenu()}
                      >
                        Submit{" "}
                      </button>
                    </form>
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

export default AddMenu;


