import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getKycSellerUserid,
  getUserKycData,
} from "../../../../Redux/Slice/SellerSlice";
import { useNavigate } from "react-router-dom";

const EditSellerKyc = () => {
  var navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const KycVerifiedData = useSelector((state) => state.seller.KycData);
  const [KycVerificationData, setKycVerificationData] = useState();
  const [aadharNum, setaadharNum] = useState("");
  const [panNum, setpanNum] = useState("");
  const [aadharNumError, setaadharNumError] = useState("");
  const [panNumError, setpanNumError] = useState("");

  const dispatch = useDispatch();
  const kycuserId = useSelector((state) => state.seller.KycUserid);
  useEffect(() => {
    dispatch(getKycSellerUserid(id));
  }, [id]);

  const KycData = {
    adharFront: KycVerifiedData?.aadhar_front_base64,
    adharBack: KycVerifiedData?.aadhar_back_base64,
    panCard: KycVerifiedData?.pan_base64,
  };

  useEffect(() => {
    setKycVerificationData(KycData);
    setaadharNum(KycVerifiedData?.kycdata?.aadhar_number);
    setpanNum(KycVerifiedData?.kycdata?.pan_number);
  }, [KycVerifiedData]);

  useEffect(() => {
    const userData = {
      headers: {
        authorization: token,
      },
    };
    dispatch(getUserKycData({ id: id, data: userData }));
  }, [id, token]);

  const handleKYCFileChange = (event, inputName) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setKycVerificationData((prevKycVerificationData) => ({
          ...prevKycVerificationData,
          [inputName]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getKYCverification = async (e) => {
    e.preventDefault();

    const data = {
      method: "POST",
      body: JSON.stringify({
        aadhar_front: KycVerificationData.adharFront,
        aadhar_back: KycVerificationData.adharBack,
        pan: KycVerificationData.panCard,
        aadhar_number: aadharNum,
        pan_number: panNum,
        userid: id,
      }),
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
    };

    console.log("send body", data);

    fetch(`http://65.20.73.28:8090/api/users/upload-kyc`, data)
      .then((response) => response.json())
      .then((data) => {
        console.log("updated profile", data);

        if (data.status == true) {
          const userData = { headers: { authorization: token } };
          dispatch(getUserKycData({ id: id, data: userData }));
          if (!aadharNum) {
            setaadharNumError("Aadhar Number is required");
            return;
          } else if (!/^\d{12}$/.test(aadharNum)) {
            setaadharNumError("Aadhar Number must be a 12-digit number");
            return;
          } else {
            setaadharNumError("");
          }
      
          // Validate Pan Number
          if (!panNum) {
            setpanNumError("Pan Number is required");
            return;
          } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNum)) {
            setpanNumError("Invalid Pan Number format");
            return;
          } else {
            setpanNumError("");
          }
         
      
          toast.success(data.message);
          navigate("/sellers");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ToastContainer />
      <form
        style={{ height: "auto" }}
        // onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="col-md-4 mb-3">
            <label for="validationCustom01">Aadhar Number </label>
            <input
              className="form-control"
              type="text"
              name="aadharnumber"
              value={aadharNum}
              onChange={(e) => setaadharNum(e.target.value)}
              placeholder="Enter Aadhar Number"
            />
            {aadharNumError && <p style={{ color: "red" }}>{aadharNumError}</p>}
  
          </div>
          <div className="col-md-4 mb-3">
            <label for="validationCustom04">Aadhar front</label>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="adharFront"
                  onChange={(event) => handleKYCFileChange(event, "adharFront")}
                />
              </div>
              <div className="col-md-6 mb-3">
                {KycVerificationData?.adharFront != undefined || null ? (
                  <div
                    style={{
                      width: "150px",
                      height: "70px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${KycVerificationData?.adharFront}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <label for="validationCustom01">Aadhar Back </label>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="adharBack"
                  onChange={(event) => handleKYCFileChange(event, "adharBack")}
                />
              </div>
              <div className="col-md-6 mb-3">
                {KycVerificationData?.adharBack != undefined || null ? (
                  <div
                    style={{
                      width: "150px",
                      height: "70px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${KycVerificationData?.adharBack}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label for="validationCustom01">Pan Number </label>
            <input
              className="form-control"
              type="text"
              name="pannumber"
              value={panNum}
              onChange={(e) => setpanNum(e.target.value)}
              placeholder="Enter Pan Number"
            />
             {panNumError && <p style={{ color: "red" }}>{panNumError}</p>}
          </div>

          <div className="col-md-4 mb-3">
            <label for="validationCustom04">Pan</label>
            <div className="row">
              <div className="col-md-6 ">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  name="panCard"
                  onChange={(event) => handleKYCFileChange(event, "panCard")}
                />
              </div>

              <div className="col-md-6 ">
                {KycVerificationData?.panCard != undefined || null ? (
                  <div
                    style={{
                      width: "150px",
                      height: "70px",
                      border: "1px black solid",
                      padding: "10px",
                      marginRight: "20px",
                      borderRadius: "10px",
                    }}
                  >
                    <img
                      src={`${KycVerificationData?.panCard}`}
                      alt=""
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary "
          type="submit"
          onClick={(e) => getKYCverification(e)}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditSellerKyc;
