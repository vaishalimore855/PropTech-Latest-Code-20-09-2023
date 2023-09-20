import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getPropertyList,
  getPropertybyId,
} from "../../../Redux/Slice/PropertyListingSlice";
import axios from "axios";
import * as ExcelJS from "exceljs";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import TablePagination from "@mui/material/TablePagination";
// import Loader from "react-loader-spinner";
import CircularProgress from "@mui/joy/CircularProgress";

const useStyles = makeStyles((theme) => ({
  modalPaper: {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    width: 350,
    height: 100,
    paddingLeft: "30px",
    // padding: theme.spacing(2, 4, 3),
  },
}));

const PropertyListing = () => {
  const { id } = useParams();
  //property list
  const dispatch = useDispatch();
  const classes = useStyles();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const PropertyList = useSelector(
    (state) => state.propertylisting.propertyListingList
  );
  console.log("PropertyList", PropertyList);

  //property Id
  const PropertyId = useSelector((state) => state.propertylisting.property);
  console.log("PropertyId", PropertyId);

  useEffect(() => {
    // dispatch(getPropertyList(id));
    dispatch(getPropertyList(id))
      .then(() => {
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching property data:", error);
        setIsLoading(false); // Set loading to false in case of an error
      });

    dispatch(getPropertybyId(id));
  }, [id]);

  //pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Excel Data
  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Data");

    // Add headers
    const headers = [
      "Sr.No",
      "Amenities",
      "CreatedAt",
      "Facilities",
      "Id",
      "Propertyid",
      "UpdatedAt",
      "AvailableFrom",
      "Basement",
      "Bathrooms",
      "Bedrooms",
      "CreatedAt",
      "ExteriorMaterial ",
      "Facing",
      "FlatNo",
      "FloorsNo",
      "Furnish",
      "GarageSize",
      "Garages",
      "Id",
      "IotSizeInFt",
      "Notes",
      "Parking",
      "Possession",
      "Propertyid",
      "RefugeArea",
      "Roofing",
      "Rooms",
      "SizeInFt",
      "StructureType",
      "TotalFloor",
      "UpdatedAt",
      "YearBuilt",
      "DetailsData ",
      "Address",
      "City",
      "CreatedAt",
      "Id",
      "Latitude",
      "Longitude",
      "Neighborhood",
      "Propertyid",
      "State",
      "UpdatedAt",
      "Floors",
      "Images",
      "Propertyid",
      "Videoid",
      "Videotype",
      "Virtualtour",
      "Agentid",
      "BookingAmount",
      "Category",
      "CreatedAt",
      "Description",
      "Id",
      "ListedIn",

      "MarkasFavorite",
      "Price",
      "PropertyStatus",
      "Propertymanagerid",
      "RejectReason",
      "Status",
      "Subcategory",
      "Title ",
      "UpdatedAt",
      "Userid",
      "TotalPages",
    ]; // Fixed header names
    worksheet.addRow(headers);

    // Add data rows
    PropertyList?.data.forEach((row) => {
      worksheet.addRow([
        row.amenitiesData?.amenities,
        row.amenitiesData?.createdAt,
        row.amenitiesData?.facilities,
        row.amenitiesData?.id,
        row.amenitiesData?.propertyid,
        row.amenitiesData?.updatedAt,
        row.updatedAt,
        //
        row.detailsData?.availableFrom,
        row.detailsData?.basement,
        row.detailsData?.bathrooms,

        row.detailsData?.bedrooms,

        row.detailsData?.createdAt,
        row.detailsData?.exteriorMaterial,
        row.detailsData?.facing,
        row.detailsData?.flatNo,
        row.detailsData?.floorsNo,
        row.detailsData?.furnish,

        row.detailsData?.garageSize,
        row.detailsData?.garages,
        row.detailsData?.id,
        row.detailsData?.lotSizeInFt,
        row.detailsData?.notes,
        row.detailsData?.parking,
        row.detailsData?.possession,
        row.detailsData?.propertyid,
        row.detailsData?.refugeArea,
        row.detailsData?.roofing,
        row.detailsData?.rooms,
        row.detailsData?.sizeInFt,
        row.detailsData?.structureType,
        row.detailsData?.totalFloor,
        row.detailsData?.updatedAt,
        row.detailsData?.yearBuilt,

        //
        row.locationData?.address,
        row.locationData?.city,
        row.locationData?.createdAt,
        row.locationData?.id,
        row.locationData?.latitude,
        row.locationData?.longitude,
        row.locationData?.neighborhood,
        row.locationData?.propertyid,
        row.locationData?.state,
        row.locationData?.updatedAt,

        row.mediaData?.floors[0],

        row.mediaData?.images[0],
        row.mediaData?.propertyid,
        row.mediaData?.videoid,
        row.mediaData?.videotype,

        row.mediaData?.virtualtour,

        row.propertydata?.agentid,
        row.propertydata?.bookingAmount,
        row.propertydata?.category,
        row.propertydata?.createdAt,
        row.propertydata?.description,
        row.propertydata?.id,

        row.propertydata?.listedIn,
        row.propertydata?.markasFavorite,
        row.propertydata?.price,
        row.propertydata?.propertyStatus,
        row.propertydata?.propertymanagerid,
        row.propertydata?.rejectReason,
        row.propertydata?.status,
        row.propertydata?.subcategory,
        row.propertydata?.title,
        row.propertydata?.updatedAt,
        row.propertydata?.userid,
      ]); // Fixed field names
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };
  var navigate = useNavigate();
  const navigateToViewPropertyListing = (id) => {
    navigate(`/view-propertylisting/${id}`);
  };
  const navigateToEditProperty = (id) => {
    navigate(`/edit-property/${id}`);
  };

  const confirmDelete = (id) => {
    setItemToDelete(id);
    setOpenConfirmation(true);
  };
  const token = localStorage.getItem("token");

  const cancelDelete = () => {
    setItemToDelete(null);
    setOpenConfirmation(false);
  };

  const executeDelete = (id) => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: token,
    };
    axios
      .delete(`http://65.20.73.28:8090/api/property/${id}`, {
        headers,
      })
      .then((response) => response.data)
      .then((data) => {
        if (data.status !== true) {
          dispatch(getPropertyList(id));
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setItemToDelete(null);
        setOpenConfirmation(false);
      });
  };

  return (
    <>
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <main className="main-content">
          <div className="container">
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4>Property Listing</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="#" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="#" style={{ fontSize: "16px" }}>
                      Property Listing
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="d-flex justify-content-end">
                        <Button
                          onClick={exportToExcel}
                          enabled={!PropertyList.length}
                          variant="contained"
                          style={{
                            backgroundColor: "#3A833A",
                            marginRight: "10px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faDownload}
                            style={{ color: "white" }}
                          />{" "}
                          &nbsp;&nbsp; Export to Excel
                        </Button>
                      </div>
                    </div>

                    <div className="card" style={{ overflowX: "auto" }}>
                      <div className="card-body">
                        {isLoading ? (
                          <div className="text-center">
                            <CircularProgress size="lg" />
                            <h5>Loading Please Wait....</h5>
                          </div>
                        ) : (
                          <table
                            id="example2"
                            className="table table-striped table-bordered"
                          >
                            <thead>
                              <tr style={{ fontWeight: 700 }}>
                                <td>Sr.No</td>
                                <td>Amenities</td>
                                <td>CreatedAt</td>
                                <td>Facilities</td>
                                <td>Id</td>
                                <td>Propertyid</td>
                                <td>UpdatedAt</td>
                                {/*  */}

                                <td>AvailableFrom</td>
                                <td>Basement</td>
                                <td>Bathrooms</td>
                                <td>Bedrooms</td>
                                <td>CreatedAt</td>
                                <td>ExteriorMaterial </td>
                                <td>Facing</td>
                                <td>FlatNo</td>
                                <td>FloorsNo</td>
                                <td>Furnish</td>
                                <td>GarageSize</td>
                                <td>Garages</td>
                                <td>Id</td>
                                <td>IotSizeInFt</td>
                                <td>Notes</td>
                                <td>Parking</td>
                                <td>Possession</td>
                                <td>Propertyid</td>
                                <td>RefugeArea</td>
                                <td>Roofing</td>
                                <td>Rooms</td>
                                <td>SizeInFt</td>
                                <td>StructureType</td>
                                <td>TotalFloor</td>
                                <td>UpdatedAt</td>
                                <td>YearBuilt</td>
                                <td>DetailsData </td>
                                <td>Address</td>
                                <td>City</td>
                                <td>CreatedAt</td>
                                <td>Id</td>
                                <td>Latitude</td>
                                <td>Longitude</td>
                                <td>Neighborhood</td>
                                <td>Propertyid</td>
                                <td>State</td>
                                <td>UpdatedAt</td>
                                <td>Floors</td>
                                <td>Images</td>
                                <td>Propertyid</td>
                                <td>Videoid</td>
                                <td>Videotype</td>
                                <td>Virtualtour</td>
                                <td>Agentid</td>
                                <td>BookingAmount</td>
                                <td>Category</td>
                                <td>CreatedAt</td>
                                <td>Description</td>
                                <td>Id</td>
                                <td>ListedIn</td>

                                <td>MarkasFavorite</td>
                                <td>Price</td>
                                <td>PropertyStatus</td>
                                <td>Propertymanagerid</td>
                                <td>RejectReason</td>
                                <td>Status</td>
                                <td>Subcategory</td>
                                <td>Title </td>
                                <td>UpdatedAt</td>
                                <td>Userid</td>
                              

                                <td style={{ width: "300px" }}>Action</td>
                              </tr>
                            </thead>
                            <tbody>
                              {PropertyList?.data &&
                                PropertyList?.data.map((property, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>

                                      <td>
                                        {property?.amenitiesData?.amenities}
                                      </td>
                                      <td>
                                        {property?.amenitiesData?.createdAt}
                                      </td>
                                      <td>
                                        {property?.amenitiesData?.facilities[0]}
                                        &nbsp;
                                        {property?.amenitiesData?.facilities[1]}
                                        &nbsp;
                                        {property?.amenitiesData?.facilities[2]}
                                        &nbsp;
                                      </td>

                                      <td>{property?.amenitiesData?.id}</td>
                                      <td>
                                        {property?.amenitiesData?.propertyid}
                                      </td>
                                      <td>
                                        {property?.amenitiesData?.updatedAt}
                                      </td>
                                      {/*  */}
                                      <td>
                                        {property?.detailsData?.availableFrom}
                                      </td>

                                      <td>{property?.detailsData?.basement}</td>
                                      <td>
                                        {property?.detailsData?.bathrooms}
                                      </td>
                                      <td>{property?.detailsData?.bedrooms}</td>

                                      <td>
                                        {property?.detailsData?.createdAt}
                                      </td>
                                      <td>
                                        {
                                          property?.detailsData
                                            ?.exteriorMaterial
                                        }
                                      </td>
                                      <td>{property?.detailsData?.facing}</td>

                                      <td>{property?.detailsData?.flatNo}</td>
                                      <td>{property?.detailsData?.floorsNo}</td>
                                      <td>{property?.detailsData?.furnish}</td>
                                      <td>
                                        {property?.detailsData?.garageSize}
                                      </td>

                                      <td>
                                        {property?.amenitiesData?.garages}
                                      </td>

                                      <td>{property?.detailsData?.id}</td>
                                      <td>
                                        {property?.detailsData?.lotSizeInFt}
                                      </td>
                                      

                                      <td>{property?.detailsData?.parking}</td>
                                      <td>
                                        {property?.detailsData?.possession}
                                      </td>
                                      <td>
                                        {property?.detailsData?.propertyid}
                                      </td>

                                      <td>
                                        {property?.detailsData?.refugeArea}
                                      </td>
                                      <td>{property?.detailsData?.roofing}</td>
                                      <td>{property?.detailsData?.rooms}</td>
                                      <td>{property?.detailsData?.sizeInFt}</td>
                                      

                                      <td>
                                        {property?.detailsData?.structureType}
                                      </td>
                                      <td>
                                        {property?.detailsData?.totalFloor}
                                      </td>
                                      <td>
                                        {property?.detailsData?.updatedAt}
                                      </td>
                                      <td>
                                        {property?.detailsData?.yearBuilt}
                                      </td>

                                      {/*  */}
                                      <td>
                                        {property?.amenitiesData?.detailsData}
                                      </td>

                                      <td>{property?.locationData?.address}</td>
                                      <td>{property?.locationData?.city}</td>
                                      <td>
                                        {property?.locationData?.createdAt}
                                      </td>

                                      <td>{property?.locationData?.id}</td>
                                      <td>
                                        {property?.locationData?.latitude}
                                      </td>
                                      <td>
                                        {property?.locationData?.longitude}
                                      </td>

                                      <td>
                                        {property?.locationData?.neighborhood}
                                      </td>
                                      <td>
                                        {property?.locationData?.propertyid}
                                      </td>
                                      <td>{property?.locationData?.state}</td>
                                      <td>
                                        {property?.locationData?.updatedAt}
                                      </td>

                                      <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <img
                                            src={property?.mediaData?.floors[0]}
                                            alt=""
                                            width="100%"
                                            height="100%"
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <div className="d-flex justify-content-center align-items-center">
                                          <img
                                            src={property?.mediaData?.images[0]}
                                            alt=""
                                            width="100%"
                                            height="100%"
                                          />
                                        </div>
                                      </td>
                                      <td>{property?.mediaData?.propertyid}</td>
                                      <td>{property?.mediaData?.videoid}</td>
                                      <td>{property?.mediaData?.videotype}</td>
                                      <td>
                                        {property?.mediaData?.virtualtour}
                                      </td>

                                      <td>{property?.propertydata?.agentid}</td>
                                      <td>
                                        {property?.propertydata?.bookingAmount}
                                      </td>
                                      <td>
                                        {property?.propertydata?.category}
                                      </td>
                                      <td>
                                        {property?.propertydata?.createdAt}
                                      </td>
                                      <td>
                                        {property?.propertydata?.description}
                                      </td>
                                      <td>{property?.propertydata?.id}</td>
                                      <td>
                                        {property?.propertydata?.listedIn}
                                      </td>
                                      <td>
                                        {property?.propertydata?.markasFavorite}
                                      </td>
                                      <td>{property?.propertydata?.price}</td>
                                      <td>
                                        {property?.propertydata?.propertyStatus}
                                      </td>
                                      <td>
                                        {
                                          property?.propertydata
                                            ?.propertymanagerid
                                        }
                                      </td>
                                      <td>
                                        {property?.propertydata?.rejectReason}
                                      </td>
                                      <td>{property?.propertydata?.status}</td>
                                      <td>
                                        {property?.propertydata?.subcategory}
                                      </td>

                                      <td>{property?.propertydata?.title}</td>
                                      <td>
                                        {property?.propertydata?.updatedAt}
                                      </td>
                                      <td>{property?.propertydata?.userid}</td>
                                      
                                      <td style={{ width: "300px" }}>
                                        <button
                                          onClick={() =>
                                            navigateToViewPropertyListing(
                                              property?.propertydata?.id
                                            )
                                          }
                                          className="btn btn-sm btn-icon me-2 float-left btn-info"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="View"
                                        >
                                          <FontAwesomeIcon
                                            icon={faEye}
                                            style={{ color: "white" }}
                                          />
                                        </button>
                                        <button
                                          className="btn btn-sm btn-icon   me-2  btn-danger"
                                          data-toggle="tooltip"
                                          data-placement="top"
                                          title=""
                                          data-original-title="Delete"
                                          onClick={() =>
                                            confirmDelete(
                                              property?.propertydata?.id
                                            )
                                          }
                                        >
                                          <FontAwesomeIcon
                                            icon={faTrashAlt}
                                            style={{ color: "white" }}
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                            <Modal
                              open={openConfirmation}
                              onClose={cancelDelete}
                            >
                              <Paper className={classes.modalPaper}>
                                <div className="confirmation-modal">
                                  <div className="confirmation-content">
                                    <p style={{ marginTop: "10px" }}>
                                      Are you sure you want to delete this item?
                                    </p>
                                    <div className="row">
                                      <div className="col-md-5">
                                        <Button
                                          className="btn btn-primary text-white "
                                          style={{ marginLeft: "30px" }}
                                          onClick={() =>
                                            executeDelete(itemToDelete)
                                          }
                                        >
                                          Confirm
                                        </Button>
                                      </div>
                                      <div className="col-md-5">
                                        <Button
                                          className="btn btn-primary text-white"
                                          onClick={cancelDelete}
                                        >
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Paper>
                            </Modal>
                          </table>
                        )}
                        <TablePagination
                          rowsPerPageOptions={[5, 10]}
                          component="div"
                          count={PropertyList.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- end::main-content --> */}
      </div>
    </>
  );
};

export default PropertyListing;
