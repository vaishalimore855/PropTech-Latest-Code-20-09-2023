import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSellerKyc = () => {
  var navigate = useNavigate();
  const [base64AdharFront, setBase64AdharFront] = useState("");
  const [base64AdharBack, setBase64AdharBack] = useState("");
  const [base64Pancard, setBase64Pancard] = useState("");
  const adharFrontRef = useRef(null);
  const adharBackRef = useRef(null);
  const panCardRef = useRef(null);
  const [userId, setUserId] = useState("");

  const handleFileChangeFront = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // reader.result contains the base64 encoded image data
        const base64FrontData = reader.result;
        setBase64AdharFront(base64FrontData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChangeBack = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // reader.result contains the base64 encoded image data
        const base64BackData = reader.result;
        setBase64AdharBack(base64BackData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileChangePan = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // reader.result contains the base64 encoded image data
        const base64PancardData = reader.result;
        setBase64Pancard(base64PancardData);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    const data = {
      aadhar_front: base64AdharFront,
      aadhar_back: base64AdharBack,
      pan: base64Pancard,
      userid: userId,
    };

    axios
      .post("http://65.20.73.28:8090/api/users/upload-kyc", data)
      .then((response) => {
        const data = response.data;
        console.log("data message", data);
        if (data?.status === true) {
          toast.success(data.message);
          navigate("/sellers");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log("Error from API", err);
        toast.error("Error uploading KYC");
      });
  };

  return (
    <>
      <ToastContainer />
      <form style={{ height: "auto" }}>
        <div className="row">
          <div className="col-md-6 mb-3">
            {base64AdharFront && (
              <div>
                <img
                  src={base64AdharFront}
                  alt="Adhar Front"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            )}

            <label htmlFor="validationCustom01">Aadhar Front </label>

            <input
              className="form-control"
              type="file"
              accept="image/*"
              ref={adharFrontRef}
              onChange={handleFileChangeFront}
            />
            <button
              style={{ display: "none" }}
              onClick={() => adharFrontRef.current.click()}
            >
              Add Adhar Front
            </button>
          </div>
          <div className="col-md-6 mb-3">
            {base64AdharBack && (
              <div>
                <img
                  src={base64AdharBack}
                  alt="Adhar Back"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            )}
            <label htmlFor="validationCustom04">Aadhar Back</label>

            <input
              className="form-control"
              type="file"
              accept="image/*"
              ref={adharBackRef}
              onChange={handleFileChangeBack}
            />
            <button
              style={{ display: "none" }}
              onClick={() => adharBackRef.current.click()}
            >
              Add Adhar Back
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            {base64Pancard && (
              <div>
                <img
                  src={base64Pancard}
                  alt="Pan Card"
                  style={{ width: "200px", height: "200px" }}
                />
              </div>
            )}
            <label htmlFor="validationCustom04">Pan</label>
            <input
              className="form-control"
              type="file"
              accept="image/*"
              ref={panCardRef}
              onChange={handleFileChangePan}
            />
            <button
              style={{ display: "none" }}
              onClick={() => panCardRef.current.click()}
            >
              Add Pan Card
            </button>{" "}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="validationCustom04">User Id</label>
            <input
              className="form-control"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
            />
          </div>
        </div>

        <button
          className="btn btn-primary mt-2"
          type="button"
          onClick={handleUpload}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddSellerKyc;

