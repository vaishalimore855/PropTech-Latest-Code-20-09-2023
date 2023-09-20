import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdminMenuId } from "../../Redux/Slice/MenuSlice";
import { useNavigate } from "react-router-dom";

const EditAdminMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const adminMenuId = useSelector((state) => state.adminMenu.AdminMenuId);

  const [formErrors, setFormErrors] = useState({});
  const [editedAdminmenu, setEditedAdminmenu] = useState({
    name: "",
    icon: "",
    link: "",
    priority: "",
    parentid: "",
    type: "",
  });

  useEffect(() => {
    dispatch(getAdminMenuId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (adminMenuId) {
      setEditedAdminmenu({
        name: adminMenuId.name,
        icon: adminMenuId.icon,
        link: adminMenuId.link,
        priority: adminMenuId.priority,
        parentid: adminMenuId.parentid,
        type: adminMenuId.type,
      });
    }
  }, [adminMenuId]);
  const validate = (editedAdminmenu) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const onlyLetters = /^[A-Za-z]+$/;

    if (!editedAdminmenu.name) {
      errors.name = "name cannot be blank";
    } else if (!onlyLetters.test(editedAdminmenu.name)) {
      errors.name = " name should only contain letters.";
    }

    if (!editedAdminmenu.link) {
      errors.link = "link cannot be blank";
    } else if (!onlyLetters.test(editedAdminmenu.link)) {
      errors.link = "link should only contain letters.";
    }
    if (!editedAdminmenu.type) {
      errors.type = "type cannot be blank";
    } else if (!onlyLetters.test(editedAdminmenu.type)) {
      errors.type = "type should only contain letters.";
    }

    // if (!editedAdminmenu.name) {
    //   errors.name = "Name cannot be blank";

    // } else if (!editedAdminmenu.link) {
    //   errors.link = "link cannot be blank";
    // }
    else if (!editedAdminmenu.icon) {
      errors.icon = "icon cannot be blank";
    } else if (!editedAdminmenu.priority) {
      errors.type = "priority be blank";
    } else if (!editedAdminmenu.type) {
      errors.type = "type  be blank";
    }

    return errors;
  };

  const handleChangeEditAdminmenuInput = (e) => {
    const { name, value } = e.target;
    setEditedAdminmenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditAdminmenu = async (e) => {
    e.preventDefault();

    const data = {
      method: "PUT",
      body: JSON.stringify(editedAdminmenu),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    try {
      const response = await fetch(
        `http://65.20.73.28:8090/api/adminmenus/${id}`,
        data
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === true) {
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
          navigate("/adminmenu");
        });
    } catch (error) {
      console.error("Error updating admin menu:", error);
      toast.error("An error occurred while updating the admin menu.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(editedAdminmenu);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleEditAdminmenu();
    }
  };

  return (
    <div>
      <div id="main">
        <div className="main-content">
          <div className="container">
            <ToastContainer />
            <div className="page-header mt-5">
              <h4>Edit Admin Menu</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>Privilege</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/AdminMenu" style={{ fontSize: "16px" }}>
                      Edit Admin Menu
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    Edit Menu
                  </li>
                </ol>
              </nav>
            </div>
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
                            value={editedAdminmenu.name}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.name}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom02">Link</label>
                          <input
                            type="text"
                            data-input-mask="phone"
                            className="form-control"
                            placeholder="Enter Path"
                            name="link"
                            value={editedAdminmenu.link}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.link}</p>
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
                            value={editedAdminmenu.icon}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.icon}</p>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Parent Id</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter Menu Id"
                            name="parentid"
                            value={editedAdminmenu.parentid}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Priority</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter priority for menu item"
                            name="priority"
                            value={editedAdminmenu.priority}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.priority}</p>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label for="validationCustom04">Type</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Menu Type"
                            name="type"
                            value={editedAdminmenu.type}
                            onChange={(e) => handleChangeEditAdminmenuInput(e)}
                          />
                          <p style={{ color: "red" }}>{formErrors.type}</p>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary mt-2"
                        type="submit"
                        // onClick={handleEditAdminmenu}
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
    </div>
  );
};

export default EditAdminMenu;
