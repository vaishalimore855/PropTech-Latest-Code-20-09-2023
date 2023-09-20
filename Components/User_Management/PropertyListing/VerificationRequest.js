import React from "react";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";


function VerificationRequest() {
  

  return (
    <div>
      <div id="main">
        {/* <!-- begin::main-content --> */}
        <main className="main-content">
          <div className="container">
            {/* <!-- begin::page-header --> */}
            <div className="page-header mt-5">
              <h4>Document Verification</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/homepage"style={{ fontSize: "16px" }}>Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/document-verificartion"style={{ fontSize: "16px" }}>Request</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page"style={{ fontSize: "16px" }}>
                    Document Verification
                  </li>
                </ol>
              </nav>
            </div>
            {/* <!-- end::page-header --> */}

            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <div className="card">
                      <div className="card-body ">
                        <table
                          id="example2"
                          className="table table-striped table-bordered "
                        >
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Property Name</th>
                              <th>Owner Name</th>
                              <th>Contact</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-justify align-middle ">
                            <tr>
                              <td>1</td>
                              <td>Tiger Nixon</td>
                              <td>System Architect</td>
                              <td>Edinburgh</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <Link
                                  to="/documentVerification"
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Garrett Winters</td>
                              <td>Accountant</td>
                              <td>Tokyo</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <Link
                                  to="/documentVerification"
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>Ashton Cox</td>
                              <td>Junior Technical Author</td>
                              <td>San Francisco</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>4</td>
                              <td>Cedric Kelly</td>
                              <td>Senior Javascript Developer</td>
                              <td>Edinburgh</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <a
                                  href="/document-verification"
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>5</td>
                              <td>Airi Satou</td>
                              <td>Accountant</td>
                              <td>Tokyo</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>6</td>
                              <td>Brielle Williamson</td>
                              <td>Integration Specialist</td>
                              <td>New York</td>
                              <td>Verified</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>7</td>
                              <td>Brielle Williamson</td>
                              <td>Integration Specialist</td>
                              <td>New York</td>
                              <td>In Review</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>8</td>
                              <td>Airi Satou</td>
                              <td>Accountant</td>
                              <td>Tokyo</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <Link
                                  href="/documentVerification"
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </Link>
                              </td>
                            </tr>
                            <tr>
                              <td>9</td>
                              <td>Colleen Hurst</td>
                              <td>Javascript Developer</td>
                              <td>San Francisco</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>10</td>
                              <td>Sonya Frost</td>
                              <td>Software Engineer</td>
                              <td>Edinburgh</td>
                              <td>In Review</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>11</td>
                              <td>Jena Gaines</td>
                              <td>Office Manager</td>
                              <td>London</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>

                            <tr>
                              <td>12</td>
                              <td>Angelica Ramos</td>
                              <td>Chief Executive Officer (CEO)</td>
                              <td>London</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>13</td>
                              <td>Gavin Joyce</td>
                              <td>Developer</td>
                              <td>Edinburgh</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>14</td>
                              <td>Brenden Wagner</td>
                              <td>Software Engineer</td>
                              <td>San Francisco</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>15</td>
                              <td>Fiona Green</td>
                              <td>Chief Operating Officer (COO)</td>
                              <td>San Francisco</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>16</td>
                              <td>Cara Stevens</td>
                              <td>Sales Assistant</td>
                              <td>New York</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>17</td>
                              <td>Michael Bruce</td>
                              <td>Javascript Developer</td>
                              <td>Singapore</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>18</td>
                              <td>Donna Snider</td>
                              <td>Customer Support</td>
                              <td>New York</td>
                              <td>Cancelled</td>
                              <td className="d-flex">
                                <a
                                  href=""
                                  className="btn btn-sm btn-icon ms-5 float-left btn-info"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="View"
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    style={{ color: "white" }}
                                  />
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
    </div>
  );
}

export default VerificationRequest;
