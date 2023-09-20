import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAdminData } from "../../Redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, InputAdornment, Link as MuiLink } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const AdminDetails = useSelector((state) => state.authentication.Admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const handleChangeRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  const handleChange = () => {
    setShowPassword(!showPassword);
  };

  const values = {
    username: "",
    password: "",
  };

  const [auth, setAuth] = useState(values);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getAdminData());
  }, []);

  const handleChangeAuthInput = (e) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  const Login = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        email: auth.username,
        password: auth.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://65.20.73.28:8090/api/admins/login", data)
      .then((response) => response.json())
      .then((data) => {
        console.log("login response", data);

        if (data.status == true) {
          toast.success(data.message);
          navigate("/dashboard");
          const jsonData = JSON.stringify(
            `Email-ID:${data.user.email}, RoleNo:${data.user.role}`
          );
          localStorage.setItem("myData", jsonData);
          localStorage.setItem("token", data.token);
          localStorage.setItem("adminId", data.user.id);
        } else {
          toast.error(data.message);
        }
        if (rememberMe) {
          // Store login information in local storage
          localStorage.setItem("rememberedUsername", auth.username);
        } else {
          // Clear stored username if "Remember me" is unchecked
          localStorage.removeItem("rememberedUsername");
        }
      })
      .catch((err) => toast.error(err));
  };
  console.log("auth", auth);
  const validate = (auth) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!auth.username) {
      errors.username = "Username cannot be blank";
    } else if (!auth.password) {
      errors.password = "Password cannot be blank";
    } else if (auth.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(auth));
    setIsSubmitting(true);
  };

  const adminLoginData = localStorage.getItem("myData");

  return (
    <div className="form-membership">
      <ToastContainer />
      <div className="form-wrapper" style={{ height: "auto" }}>
        {/* logo  */}
        <div className="mb-4" id="logo">
          <h2 style={{ fontWeight: "bold" }}>PropTech</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <TextField
              sx={{ width: "100%" }}
              placeholder="Username or email"
              type="text"
              name="username"
              value={auth.username}
              onChange={handleChangeAuthInput}
            />
            <p style={{ color: "red" }}>{formErrors.username}</p>
          </div>
          <div className="form-group mb-3">
            <TextField
              sx={{ width: "100%" }}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={auth.password}
              onChange={handleChangeAuthInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ backgroundColor: "#ffffff" }}
                  >
                    {showPassword ? (
                      <VisibilityOff onClick={handleChange} />
                    ) : (
                      <Visibility onClick={handleChange} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <p style={{ color: "red" }}>{formErrors.password}</p>
          </div>
          {/* <div className="form-group mb-3">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleChangeRememberMe}
              />
              &nbsp;&nbsp; Remember me
            </label>
          </div> */}
          <div
            className="form-group mb-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleChangeRememberMe}
              />
              &nbsp; Remember me
            </label>
            <p style={{ margin: "3px" }}>
              <MuiLink component={Link} to="/reset-password">
                Forgot Password?
              </MuiLink>
            </p>
          </div>

          <button className="btn btn-primary btn-block " onClick={Login}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
