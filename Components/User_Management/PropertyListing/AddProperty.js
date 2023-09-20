import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const AddProperty = () => {
  var navigate = useNavigate();
  const propertyValues = {
    propertyName: "",
    RERANumber: "",
    codeNumber: "",
    VerificationStatus: "",
    PropertyType: "",
    Location: "",
    Price: "",
    Bedrooms: "",
    Bathrooms: "",
    Area: "",
    PropertyDescription: "",
    propertyImage: "",
  };

  const [propertyData, setPropertyData] = useState(propertyValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  console.log(formErrors);

  const handleChangeAddPropertyInput = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const addproperty = () => {
    const data = {
      method: "POST",
      body: JSON.stringify({
        propertyName: propertyData.propertyName,
        RERANumber: propertyData.RERANumber,
        codeNumber: propertyData.codeNumber,
        VerificationStatus: propertyData.VerificationStatus,
        PropertyType: propertyData.PropertyType,
        Location: propertyData.Location,
        Price: propertyData.Price,
        Bedrooms: propertyData.Bedrooms,
        Bathrooms: propertyData.Bathrooms,
        Area: propertyData.Area,
        PropertyDescription: propertyData.PropertyDescription,
        propertyImage: propertyData.propertyImage,
      }),
      headers: {
         "Content-Type": "application/json",
        "authorization":token
      },
    };

    fetch("http://65.20.73.28:8090//api/property", data)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data?.status == true) {
          setPropertyData(propertyValues);
          // toast.success(data.message)
          navigate("/property-Listing");
        } else {
          // toast.error(data.message)
        }
      })
      .catch((err) => console.log(err));
  };
  console.log("Add property", propertyData);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(propertyData);
  };

  useEffect(() => {
    addproperty();
  }, []);
  return (
    <div>
      <div id="main">
        <div className="main-content">
          <div className="container">
            <div className="page-header mt-5">
              <h4>Add Property</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage"style={{ fontSize: "16px" }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#"style={{ fontSize: "16px" }}>Property Listing</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page"style={{ fontSize: "16px" }}>
                    Add Property
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form>
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom01">Property Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            placeholder="Enter your Property Name"
                            required
                            value={propertyData.propertyName}
                            onChange={(e) => handleChangeAddPropertyInput(e)}
                          />
                           {propertyData.propertyName ?null:<p style={{color:"red"}}>{formErrors.propertyName}</p>}

                        </div>
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom02">RERA number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Enter RERA number"
                            required
                            value={propertyData.RERANumber}
                            onChange={(e)=>handleChangeAddPropertyInput(e)}

                          />
                           {propertyData.RERANumber ?null:<p style={{color:"red"}}>{formErrors.RERANumber}</p>}
                        </div>
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom03">Code Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom03"
                            placeholder="Enter Code Name"
                            required
                            value={propertyData.codeNumber}
                            onChange={(e) => handleChangeAddPropertyInput(e)}
 
                          />
                           {propertyData.codeNumber ?null:<p style={{color:"red"}}>{formErrors.codeNumber}</p>}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 mb-4">
                          <label for="verification">Verification Status</label>
                          <select
                            id="verification"
                            className="form-control"
                            name="verification"
                          >
                            <option value="verified">Verified</option>
                            <option value="unverified">Unverified</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="propertyType">Property Type</label>
                          <select
                            id="propertyType"
                            className="form-control"
                            name="propertyType"
                          >
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="condo">Condo</option>
                            <option value="land">Land</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label for="location">Location</label>
                          <input
                            type="text"
                            id="location"
                            className="form-control"
                            name="location"
                            required
                            value={propertyData.VerificationStatus}
                            onChange={(e) => handleChangeAddPropertyInput(e)}
 
                          />
                           {propertyData.VerificationStatus ?null:<p style={{color:"red"}}>{formErrors.VerificationStatus}</p>}
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="price">Price:</label>
                          <input
                            type="number"
                            id="price"
                            className="form-control"
                            name="price"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="bedrooms">Bedrooms:</label>
                          <input
                            type="number"
                            id="bedrooms"
                            className="form-control"
                            name="bedrooms"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="bathrooms">Bathrooms:</label>
                          <input
                            type="number"
                            id="bathrooms"
                            className="form-control"
                            name="bathrooms"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="area">Area (in sqft):</label>
                          <input
                            type="number"
                            id="area"
                            className="form-control"
                            name="area"
                            min="0"
                            required
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label for="description">Property Description</label>
                          <textarea
                            id="description"
                            className="form-control"
                            name="description"
                            rows="4"
                            required
                          ></textarea>
                        </div>
                        <div className="col-md-3 mb-4">
                          <label for="image">Property Image</label>
                          <input
                            type="file"
                            id="image"
                            className="form-control-file"
                            name="image"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="form-check mb-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="invalidCheck"
                            required
                          />
                          <label
                            className="form-check-label"
                            for="invalidCheck"
                          >
                            Agree to terms and conditions
                          </label>
                          <div className="invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div>
                      <button className="btn btn-primary mb-4" type="submit">
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

export default AddProperty;
