import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getKycBuyerUserid } from "../../../../Redux/Slice/BuyerSlice";
import { useNavigate } from "react-router-dom";

function BuyerKyc() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");
  
  const BuyerKyc = useSelector((state) => state.buyer.KycUserid);
console.log("BuyerKyc",BuyerKyc)
  useEffect(() => {
    dispatch(getKycBuyerUserid(adminId, token));
  }, [adminId, token]);

  return (
    <>
      {BuyerKyc?.status ? (
        <div className="view-document-main col-lg-12">
          <dl className="row ">
            <dt className="col-2">Adhar Front:</dt>
            <dd className="col-4">
              {BuyerKyc?.aadhar_front_base64 ? (
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
                    src={`data:image/png;base64, ${BuyerKyc?.aadhar_front_base64}`}
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
              {BuyerKyc?.aadhar_back_base64 ? (
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
                    src={`data:image/jpeg;base64, ${BuyerKyc?.aadhar_back_base64}`}
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
              {BuyerKyc?.pan_base64 ? (
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
                    src={`data:image/jpeg;base64, ${BuyerKyc?.pan_base64}`}
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
                {adminId}
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

export default BuyerKyc;


