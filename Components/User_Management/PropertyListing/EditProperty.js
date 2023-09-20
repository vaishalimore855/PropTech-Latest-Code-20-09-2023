import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getPropertybyId } from "../../../Redux/Slice/PropertyListingSlice";
import { getPropertyList } from "../../../Redux/Slice/PropertyListingSlice";
import PropertyListingSlice from "../../../Redux/Slice/PropertyListingSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProperty = () => {
  const { id } = useParams();
  console.log("id", id);

  const dispatch = useDispatch();
  const Property = useSelector(
    (state) => state.propertylisting.propertyListing
  );
  console.log("Property", Property);

  const propertyValues = {
    propertyName: Property.firstname,
    RERANumber: Property.RERANumber,
    codeName: Property.codeName,
    verificationStatus: Property.verificationStatus,
    propertyType: Property.propertyType,
    location: Property.location,
    Price: Property.Price,
    Bedrooms: Property.Bedrooms,
    Bathrooms: Property.Bathrooms,
    Area: Property.Area,
    propertyDescription: Property.propertyDescription,
    propertyImage: Property.propertyImage,
  };

  const [property, setProperty] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    setProperty(propertyValues);
  }, [property]);

  useEffect(() => {
    dispatch(getPropertybyId(id));
  }, [id]);

  const handleChangeEditpropertyInput = (e) => {
    const { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };

  const getEditProfile = (e) => {
    e.preventDefault();

    const data = {
      method: "PUT",
      body: JSON.stringify({
        propertyName: property.propertyName,
        RERANumber: property.RERANumber,
        codeName: property.codeName,
        verificationStatus: property.verificationStatus,
        propertyType: property.propertyType,
        location: property.location,
        price: property.price,
        Bedrooms: property.Bedrooms,
        Bathrooms: property.Bathrooms,
        Area: property.Area,
        propertyDescription: property.propertyDescription,
        propertyImage: property.propertyImage,
      }),
      headers: {
         "Content-Type": "application/json",
        "authorization":token
      },
    };

    console.log("body", data);

    fetch(`http://65.20.73.28:8090//api/property/${id}`, data)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        alert("data", data);
        if (data.status == true) {
          setProperty({});
          dispatch(getPropertybyId(id));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

   var navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/homepage");
  //   navigate("/property-listing");
  // };

  return (
    <div className="rtl">
      {/* <!-- begin::main --> */}
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <div className="main-content">
          <div className="container">
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4>Edit Property</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage"style={{ fontSize: "16px" }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/property-listing"style={{ fontSize: "16px" }}>Property Listing</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page"style={{ fontSize: "16px" }}>
                    Edit Property
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <form className="needs-validation" novalidate="">
                      <div className="row">
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom01">Property Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            placeholder="enter your Property Name"
                            required=""
                            value={property?.propertyName}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom02">RERA number</label>
                          <input
                            type="text"
                            data-input-mask=""
                            className="form-control"
                            id="validationCustom02"
                            placeholder=""
                            required=""
                            value={property?.RERANumber}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>
                        <div className="col-md-4 mb-4">
                          <label for="validationCustom03">Code Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom03"
                            placeholder=""
                            required=""
                            value={property?.codeName}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 mb-4">
                          <label for="validationCustom05">
                            Verification Status
                          </label>
                          <select
                            id="verification"
                            className="form-control"
                            name="verification"
                          >
                            <option value="verified">Verified</option>
                            <option value="unverified">Unverified</option>
                          </select>
                        </div>
                        <div className="form-group col-md-3 mb-4">
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

                        <div className="form-group col-md-6 mb-4">
                          <label for="location">Location</label>
                          <input
                            type="text"
                            id="location"
                            className="form-control"
                            name="location"
                            required
                            value={property?.location}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>

                        <div className="form-group col-md-3 mb-4">
                          <label for="price">Price:</label>
                          <input
                            type="number"
                            id="price"
                            className="form-control"
                            name="price"
                            min="0"
                            required
                            value={property?.Price}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>

                        <div className="form-group col-md-3 mb-4">
                          <label for="bedrooms">Bedrooms:</label>
                          <input
                            type="number"
                            id="bedrooms"
                            className="form-control"
                            name="bedrooms"
                            min="0"
                            required
                            value={property?.Bedrooms}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>

                        <div className="form-group col-md-3 mb-4">
                          <label for="bathrooms">Bathrooms:</label>
                          <input
                            type="number"
                            id="bathrooms"
                            className="form-control"
                            name="bathrooms"
                            min="0"
                            required
                            value={property?.Bathrooms}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>

                        <div className="form-group col-md-3 mb-4">
                          <label for="area">Area (in sqft):</label>
                          <input
                            type="number"
                            id="area"
                            className="form-control"
                            name="area"
                            min="0"
                            required
                            value={property?.Area}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>
                        <div className="form-group col-md-6 mb-4">
                          <label for="description">Property Description</label>
                          <textarea
                            id="description"
                            className="form-control"
                            name="description"
                            rows="4"
                            required
                          ></textarea>
                        </div>

                        <div className="form-group col-md-3 mb-4">
                          <label for="image">Property Image</label>
                          <input
                            type="file"
                            id="image"
                            className="form-control-file"
                            name="image"
                            value={property?.propertyImage}
                            onChange={(e) => handleChangeEditpropertyInput(e)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="form-group " style={{ marginLeft: "25px" }}>
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required=""
                      />
                      <label className="form-check-label" for="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div className="invalid-feedback">
                        You must agree before submitting.
                      </div>
                    </div>
                    <button
                      className="btn btn-primary mb-4 "
                      type="submit"
                      onClick={(e) => getEditProfile(e)}
                    >
                      Submit{" "}
                    </button>
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

export default EditProperty;
