import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getKycSellerUserid } from "../../../../Redux/Slice/SellerSlice";
import { useNavigate } from "react-router-dom";

function SellerKyc() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const header = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQHByb3B0ZWNoLmNvbSIsInVzZXJJZCI6MSwiaWF0IjoxNjkwODc1NDk3LCJleHAiOjE2OTA5NjE4OTd9.iuf3V9yWB51X8yP73ZL6K7l9YHK4-RhGmLBx7oWoQrc",
  };
  localStorage.setItem("token", JSON.stringify(header));
  const token = localStorage.getItem("token");
  localStorage.setItem("userId", id);
  const userId = localStorage.getItem("userId");

  const SellerKyc = useSelector((state) => state.seller.KycUserid);

  useEffect(() => {
    dispatch(getKycSellerUserid(userId, token));
  }, [userId, token]);

  return (
    <>
      {SellerKyc?.status ? (
        <div className="view-document-main col-lg-12">
          <dl className="row ">
            <dt className="col-2">Adhar Front:</dt>
            <dd className="col-4">
              {SellerKyc?.aadhar_front_base64 ? (
                <div
                  style={{
                    width: "330px",
                    height: "200px",
                    border: "1px black solid",
                    padding: "10px",
                    marginRight: "20px",
                    borderRadius: "10px"
                  }}
                >
                  <img
                    src={`data:image/png;base64, ${SellerKyc?.aadhar_front_base64}`}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <div>No Adhar Front Image</div>
              )}
            </dd>
            <dt className="col-2">Adhar Back:</dt>
            <dd className="col-4">
              {SellerKyc?.aadhar_back_base64 ? (
                <div
                  style={{
                    width: "330px",
                    height: "200px",
                    border: "1px black solid",
                    padding: "10px",
                    marginRight: "20px",
                    borderRadius: "10px"
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64, ${SellerKyc?.aadhar_back_base64}`}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <div>No Adhar Back Image</div>
              )}
            </dd>
          </dl>
          <dl className="row">
            <dt className="col-2">Pan Card:</dt>
            <dd className="col-4">
              {SellerKyc?.pan_base64 ? (
                <div
                  style={{
                    width: "330px",
                    height: "200px",
                    border: "1px black solid",
                    padding: "10px",
                    marginRight: "20px",
                    borderRadius: "10px"
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64, ${SellerKyc?.pan_base64}`}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                </div>
              ) : (
                <div>No Pan Card Image</div>
              )}
            </dd>
            <dt className="col-2">User Id:</dt>
            <dd className="col-4">
              <div
                style={{
                  width: "200px",
                  height: "50px",
                  border: "1px black solid",
                  padding: "10px",
                  marginRight: "20px",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px"
                }}
              >
                {userId}
              </div>
            </dd>
          </dl>
        </div>
      ) : (
        
        <div> No KYC Data Found</div>
      )}
    </>
  );
}

export default SellerKyc;


