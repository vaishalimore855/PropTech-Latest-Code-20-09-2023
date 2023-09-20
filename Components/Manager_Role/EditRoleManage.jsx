import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAdminRoleId } from "../../Redux/Slice/MenuSlice";
import { useNavigate } from "react-router-dom";

const EditRoleManage = () => {
  var navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const AdminRoleId = useSelector((state) => state.adminMenu.Role);

  const [editedAdminRole, setEditedAdminRole] = useState({
    role: "",
  });

  useEffect(() => {
    dispatch(getAdminRoleId(id));
  }, [id]);

  useEffect(() => {
    setEditedAdminRole({
      role: AdminRoleId?.role,
    });
  }, [AdminRoleId]);

  const handleChangeEditRoleInput = (e) => {
    const { name, value } = e.target;
    setEditedAdminRole({
      ...editedAdminRole,
      [name]: value,
    });
  };

  const handleEditAdminRole = (e) => {
    e.preventDefault();

    const data = {
      method: "PUT",
      body: JSON.stringify(editedAdminRole),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };

    fetch(`http://65.20.73.28:8090/api/adminroles/${id}`, data)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === true) {
          toast.success(data.message);
          // navigate("/RoleManage");
        } else {
          toast.error(data.message);
        }
        navigate("/RoleManage");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="rtl">
        <div id="main">
          <div className="main-content" style={{ height: "700px" }}>
            <div className="container">
              <div className="page-header mt-5">
                <h4>Edit Role Management</h4>
                <nav aria-label="breadcrumb">
                  {/* Breadcrumb code */}
                </nav>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="card" style={{ height: "200px" }}>
                    <div className="card-body">
                      <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-5 mb-3">
                          <input
                            type="text"
                            className="form-control mt-5"
                            name="role"
                            value={editedAdminRole?.role}
                            onChange={handleChangeEditRoleInput} 
                          />
                        </div>
                        <div className="col-md-2 mb-3">
                          <button
                            className="btn btn-primary mt-5"
                            onClick={handleEditAdminRole} 
                          >
                            Edit
                          </button>
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
    </>
  );
};

export default EditRoleManage;

