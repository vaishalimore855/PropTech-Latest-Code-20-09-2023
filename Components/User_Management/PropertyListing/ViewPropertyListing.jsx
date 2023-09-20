// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useSelector, useDispatch } from "react-redux";
// import { getPropertybyId } from "../../../Redux/Slice/PropertyListingSlice";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "react-router-dom";
// import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import { Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import { Carousel } from "react-bootstrap";
// const ViewPropertyListing = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getPropertybyId(id));
//   }, [dispatch, id]);

//   const PropertyListingId = useSelector(
//     (state) => state.propertylisting.property
//   );

//   console.log("PropertyListingId", PropertyListingId);

//   const token = localStorage.getItem("token");
//   //carousel
//   const [images, setImages] = useState([]);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // Fetch images from the API here
//     setImages(`${PropertyListingId[0]?.mediaData?.images}`);
//     console.log("images", images);
//   }, []);

//   const prevImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div>
//       {/* <!-- begin::main --> */}
//       <div id="main">
//         {/* <!-- begin::main-content --> */}
//         <main className="main-content">
//           <div className="container">
//             <ToastContainer />
//             {/* <!-- begin::page-header --> */}
//             <div className="page-header mt-5">
//               <h4> View Property Listing</h4>
//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb">
//                   <li className="breadcrumb-item">
//                     <Link to="/homepage" style={{ fontSize: "16px" }}>
//                       Home
//                     </Link>
//                   </li>
//                   <li className="breadcrumb-item">
//                     <Link to="#" style={{ fontSize: "16px" }}>
//                       Property Listing Screen
//                     </Link>
//                   </li>
//                   <li
//                     className="breadcrumb-item active"
//                     aria-current="page"
//                     style={{ fontSize: "16px" }}
//                   >
//                     View Property Listing
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//             {/* <!-- end::page-header --> */}

//             <div className="row">
//               <div className="col-md-12">
//               <div className="card">
//                   <div className="card-body">
//                     <div className="pt-4 pb-4 text-left"><h4>Image</h4></div>

//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={12} >
//                           <Carousel >
//                             {PropertyListingId?.mediaData?.images &&
//                               PropertyListingId?.mediaData?.images.map(
//                                 (image, index) => (
//                                   <Carousel.Item key={index}>
//                                     <img
//                                       className="d-block w-100"
//                                       src={image}
//                                       alt={`Slide ${index}`}
//                                       height={400}
//                                       width={50}
//                                     />
//                                   </Carousel.Item>
//                                 )
//                               )}
//                           </Carousel>

//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-2 pb-4 text-left">
//                       <h4>Property Data</h4>
//                     </div>
//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Id:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.id}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Title:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.title}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Description:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.description}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Category:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.category}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">Subcategory:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.subcategory}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">ListedIn:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.listedIn}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Price:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.price}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Property Status:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.propertydata
//                                       ?.propertyStatus
//                                   }
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <dl className="row ">
//                             <dt className="col-5">status:</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.propertydata?.status}
//                             </dd>
//                           </dl>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Reject Reason:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.propertydata
//                                       ?.rejectReason
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Userid:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.userid}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">propertymanagerid:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.propertydata
//                                       ?.propertymanagerid
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Actiongentid:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.agentid}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">Booking Amount:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.propertydata
//                                       ?.bookingAmount
//                                   }
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">Markas Favorite:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.propertydata
//                                       ?.markasFavorite
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">CreatedAt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.createdAt}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">UpdatedAt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.propertydata?.updatedAt}
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-2 pb-4 text-left">
//                       <h4>Location Details</h4>
//                     </div>
//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Id:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.id}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Address:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.address}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">City:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.city}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">State:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.state}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">Neighborhood:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.locationData
//                                       ?.neighborhood
//                                   }
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Latitude:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.latitude}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Longitude:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.longitude}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Propertyid:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.propertyid}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">CreatedAt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.createdAt}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">UpdatedAt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.locationData?.updatedAt}
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-2 pb-4 text-left">
//                       <h4> Details Data</h4>
//                     </div>
//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">availableFrom:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.availableFrom}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">basement:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.basement}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">bathrooms:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.bathrooms
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">bedrooms:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.bedrooms}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">createdAt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.createdAt}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">exteriorMaterial:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.exteriorMaterial}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">facing:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.facing}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">flatNo:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.flatNo}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">floorsNo:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.floorsNo
//                                   }
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">furnish:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.furnish}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">garageSize:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.garageSize}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">garages:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.garages}
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">id:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.id
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">lotSizeInFt:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.lotSizeInFt}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">notes:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.notes
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">parking:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.parking}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">possession:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.possession
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">propertyid:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.propertyid
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">refugeArea:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.refugeArea}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">roofing:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.detailsData?.roofing}
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">rooms:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.rooms
//                                   }
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">sizeInFt:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.sizeInFt
//                                   }
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">structureType:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.structureType
//                                   }
//                                 </dd>
//                               </dl>

//                               <dl className="row ">
//                                 <dt className="col-5">totalFloor:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.totalFloor
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">updatedAt:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.updatedAt
//                                   }
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">yearBuilt:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.detailsData
//                                       ?.yearBuilt
//                                   }
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-2 pb-4 text-left">
//                       <h4>Amenities Data</h4>{" "}
//                     </div>
//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Amenities:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.amenitiesData?.amenities}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Facilities:</dt>
//                                 <dd className="col-7">
//                                   {
//                                     PropertyListingId?.amenitiesData
//                                       ?.facilities[0]
//                                   }
//                                   &nbsp;
//                                   {
//                                     PropertyListingId?.amenitiesData
//                                       ?.facilities[1]
//                                   }
//                                   &nbsp;
//                                   {
//                                     PropertyListingId?.amenitiesData
//                                       ?.facilities[2]
//                                   }
//                                   &nbsp;
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">Id:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.amenitiesData?.id}
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <dl className="row ">
//                             <dt className="col-5">propertyid:</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.amenitiesData?.propertyid}
//                             </dd>
//                           </dl>
//                           <dl className="row ">
//                             <dt className="col-5">createdAt:</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.amenitiesData?.createdAt}
//                             </dd>
//                           </dl>
//                           <dl className="row ">
//                             <dt className="col-5">UpdatedAt:</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.amenitiesData?.updatedAt}
//                             </dd>
//                           </dl>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-4 pb-4 text-left"><h4>Floor</h4></div>

//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={12} >
//                           <Carousel >
//                             {PropertyListingId?.mediaData?.floor &&
//                               PropertyListingId?.mediaData?.floor.map(
//                                 (image, index) => (
//                                   <Carousel.Item key={index}>
//                                     <img
//                                       className="d-block w-100"
//                                       src={image}
//                                       alt={`Slide ${index}`}
//                                       height={400}
//                                       width={50}
//                                     />
//                                   </Carousel.Item>
//                                 )
//                               )}
//                           </Carousel>
//                           {/* </div> */}
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card">
//                   <div className="card-body">
//                     <div className="pt-2 pb-4 text-left">
//                       <h4>Media Data</h4>{" "}
//                     </div>
//                     <div className="view-document-main col-lg-12">
//                       <Grid
//                         container
//                         rowSpacing={1}
//                         columnSpacing={{ xs: 1, sm: 2, md: 3 }}
//                       >
//                         <Grid item xs={6}>
//                           <div class="row">
//                             <div class="col-12">
//                               <dl className="row ">
//                                 <dt className="col-5">Videoid:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.mediaData?.videoid}
//                                 </dd>
//                               </dl>
//                               <dl className="row ">
//                                 <dt className="col-5">videotype:</dt>
//                                 <dd className="col-7">
//                                   {PropertyListingId?.mediaData?.videotype}
//                                 </dd>
//                               </dl>
//                             </div>
//                           </div>
//                         </Grid>

//                         <Grid item xs={6}>
//                           <dl className="row ">
//                             <dt className="col-5">Virtualtour</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.mediaData?.virtualtour}
//                             </dd>
//                           </dl>
//                           <dl className="row ">
//                             <dt className="col-5">Propertyid</dt>
//                             <dd className="col-7">
//                               {PropertyListingId?.mediaData?.propertyid}
//                             </dd>
//                           </dl>
//                         </Grid>
//                       </Grid>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//         {/* <!-- end::main-content --> */}
//       </div>

//       {/* <!-- end::main --> */}
//     </div>
//   );
// };

// export default ViewPropertyListing;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { getPropertybyId } from "../../../Redux/Slice/PropertyListingSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Carousel } from "react-bootstrap";
const ViewPropertyListing = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPropertybyId(id));
  }, [dispatch, id]);

  const PropertyListingId = useSelector(
    (state) => state.propertylisting.property
  );

  console.log("PropertyListingId", PropertyListingId);

  const token = localStorage.getItem("token");
  //carousel
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Fetch images from the API here
    setImages(`${PropertyListingId[0]?.mediaData?.images}`);
    console.log("images", images);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? PropertyListingId?.mediaData?.images.length - 1
        : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === PropertyListingId?.mediaData?.images.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  //floor image
  const [currentFloorIndex, setCurrentfloorIndex] = useState(0);

  const handleFloorPrevious = () => {
    setCurrentfloorIndex((prevFloorIndex) =>
    prevFloorIndex === 0
        ? PropertyListingId?.mediaData?.floor.length - 1
        : prevFloorIndex - 1
    );
  };

  const handleFloorNext = () => {
    setCurrentfloorIndex((prevFloorIndex) =>
    prevFloorIndex === PropertyListingId?.mediaData?.floor.length - 1
        ? 0
        : prevFloorIndex + 1
    );
  };


  return (
    <div>
      {/* <!-- begin::main --> */}
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <main className="main-content">
          <div className="container">
            <ToastContainer />
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4> View Property Listing</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage" style={{ fontSize: "16px" }}>
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#" style={{ fontSize: "16px" }}>
                      Property Listing Screen
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ fontSize: "16px" }}
                  >
                    View Property Listing
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="pt-4 pb-4 text-left">
                      <h4>Image</h4>
                    </div>

                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        {/* <div className="carousel-buttons"> */}
                          <span
                            // className="btn btn-primary text-white "
                            onClick={handlePrevious}
                            style={{marginLeft:"40%",fontSize:"18px"}}
                          >
                             Prev &lt;
                          </span>
                          <span
                            // className="btn btn-primary text-white "
                            onClick={handleNext}
                            style={{marginLeft:"10%",fontSize:"18px"}}
  
                          >
                            Next &gt;
                          </span>
                        {/* </div> */}
                        <Grid item xs={12}>
                          <Carousel
                            activeIndex={currentIndex}
                            onSelect={() => {}}
                          >
                            {PropertyListingId?.mediaData?.images &&
                              PropertyListingId?.mediaData?.images.map(
                                (image, index) => (
                                  <Carousel.Item key={index}>
                                    <img
                                      className="d-block w-100"
                                      src={image}
                                      alt={`Slide ${index}`}
                                      height={400}
                                      width={50}
                                    />
                                  </Carousel.Item>
                                )
                              )}
                          </Carousel>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="pt-2 pb-4 text-left">
                      <h4>Property Data</h4>
                    </div>
                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Id:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.id}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Title:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.title}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Description:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.description}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Category:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.category}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">Subcategory:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.subcategory}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">ListedIn:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.listedIn}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Price:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.price}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Property Status:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.propertydata
                                      ?.propertyStatus
                                  }
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <dl className="row ">
                            <dt className="col-5">status:</dt>
                            <dd className="col-7">
                              {PropertyListingId?.propertydata?.status}
                            </dd>
                          </dl>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Reject Reason:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.propertydata
                                      ?.rejectReason
                                  }
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Userid:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.userid}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">propertymanagerid:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.propertydata
                                      ?.propertymanagerid
                                  }
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Actiongentid:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.agentid}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">Booking Amount:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.propertydata
                                      ?.bookingAmount
                                  }
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">Markas Favorite:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.propertydata
                                      ?.markasFavorite
                                  }
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">CreatedAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.createdAt}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">UpdatedAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.propertydata?.updatedAt}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="pt-2 pb-4 text-left">
                      <h4>Location Details</h4>
                    </div>
                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Id:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.id}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Address:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.address}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">City:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.city}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">State:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.state}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">Neighborhood:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.locationData
                                      ?.neighborhood
                                  }
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Latitude:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.latitude}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Longitude:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.longitude}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Propertyid:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.propertyid}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">CreatedAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.createdAt}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">UpdatedAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.locationData?.updatedAt}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="pt-2 pb-4 text-left">
                      <h4> Details Data</h4>
                    </div>
                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">availableFrom:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.detailsData
                                      ?.availableFrom
                                  }
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">basement:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.basement}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">bathrooms:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.bathrooms}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">bedrooms:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.bedrooms}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">createdAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.createdAt}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">exteriorMaterial:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.detailsData
                                      ?.exteriorMaterial
                                  }
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">facing:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.facing}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">flatNo:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.flatNo}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">floorsNo:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.floorsNo}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">furnish:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.furnish}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">garageSize:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.garageSize}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">garages:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.garages}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">id:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.id}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">lotSizeInFt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.lotSizeInFt}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">notes:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.notes}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">parking:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.parking}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">possession:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.possession}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">propertyid:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.propertyid}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">refugeArea:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.refugeArea}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">roofing:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.roofing}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">rooms:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.rooms}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">sizeInFt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.sizeInFt}
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">structureType:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.detailsData
                                      ?.structureType
                                  }
                                </dd>
                              </dl>

                              <dl className="row ">
                                <dt className="col-5">totalFloor:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.totalFloor}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">updatedAt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.updatedAt}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">yearBuilt:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.detailsData?.yearBuilt}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="pt-2 pb-4 text-left">
                      <h4>Amenities Data</h4>{" "}
                    </div>
                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Amenities:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.amenitiesData?.amenities}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Facilities:</dt>
                                <dd className="col-7">
                                  {
                                    PropertyListingId?.amenitiesData
                                      ?.facilities[0]
                                  }
                                  &nbsp;
                                  {
                                    PropertyListingId?.amenitiesData
                                      ?.facilities[1]
                                  }
                                  &nbsp;
                                  {
                                    PropertyListingId?.amenitiesData
                                      ?.facilities[2]
                                  }
                                  &nbsp;
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">Id:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.amenitiesData?.id}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={6}>
                          <dl className="row ">
                            <dt className="col-5">propertyid:</dt>
                            <dd className="col-7">
                              {PropertyListingId?.amenitiesData?.propertyid}
                            </dd>
                          </dl>
                          <dl className="row ">
                            <dt className="col-5">createdAt:</dt>
                            <dd className="col-7">
                              {PropertyListingId?.amenitiesData?.createdAt}
                            </dd>
                          </dl>
                          <dl className="row ">
                            <dt className="col-5">UpdatedAt:</dt>
                            <dd className="col-7">
                              {PropertyListingId?.amenitiesData?.updatedAt}
                            </dd>
                          </dl>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="pt-4 pb-4 text-left">
                      <h4>Floor</h4>
                    </div>

                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        
                        {/* <div className="carousel-buttons"> */}
                        <span
                            // className="btn btn-primary text-white "
                            onClick={handleFloorPrevious}
                            style={{marginLeft:"40%",fontSize:"18px"}}
                          >
                             Prev &lt;
                          </span>
                          <span
                            // className="btn btn-primary text-white "
                            onClick={handleFloorNext}
                            style={{marginLeft:"10%",fontSize:"18px"}}
  
                          >
                            Next &gt;
                          </span>
                        {/* </div> */}
                        <Grid item xs={12}>
                          <Carousel
                            activeIndex={currentFloorIndex}
                            onSelect={() => {}}
                          >
                            {PropertyListingId?.mediaData?.floor &&
                              PropertyListingId?.mediaData?.floor.map(
                                (image, index) => (
                                  <Carousel.Item key={index}>
                                    <img
                                      className="d-block w-100"
                                      src={image}
                                      alt={`Slide ${index}`}
                                      height={400}
                                      width={50}
                                    />
                                  </Carousel.Item>
                                )
                              )}
                          </Carousel>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="pt-2 pb-4 text-left">
                      <h4>Media Data</h4>{" "}
                    </div>
                    <div className="view-document-main col-lg-12">
                      <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={6}>
                          <div class="row">
                            <div class="col-12">
                              <dl className="row ">
                                <dt className="col-5">Videoid:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.mediaData?.videoid}
                                </dd>
                              </dl>
                              <dl className="row ">
                                <dt className="col-5">videotype:</dt>
                                <dd className="col-7">
                                  {PropertyListingId?.mediaData?.videotype}
                                </dd>
                              </dl>
                            </div>
                          </div>
                        </Grid>

                        <Grid item xs={6}>
                          <dl className="row ">
                            <dt className="col-5">Virtualtour</dt>
                            <dd className="col-7">
                              {PropertyListingId?.mediaData?.virtualtour}
                            </dd>
                          </dl>
                          <dl className="row ">
                            <dt className="col-5">Propertyid</dt>
                            <dd className="col-7">
                              {PropertyListingId?.mediaData?.propertyid}
                            </dd>
                          </dl>
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* <!-- end::main-content --> */}
      </div>

      {/* <!-- end::main --> */}
    </div>
  );
};

export default ViewPropertyListing;
