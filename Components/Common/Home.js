import React from "react";
// import Login from "../../auth/login";
import Sidebar from "../Components/Sidebar/Sidebar";


function Home() {
  return (
    <>
    <Sidebar />
    <div className="rtl">
      <div id="main">
        <div className="main-content">
          <div className="container">
            <div className="page-header" style={{ marginTop: "7%" }}>
              <h4>Sales Dashboard</h4>
              <small className="">
                Welcome, <span className="text-primary">Zeeshaan Pathan</span>
              </small>
            </div>
            <div className="row">
              <div className="col-md-12">
              <div class="row">
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title d-flex align-items-start justify-content-between mb-0">
                                        <span>buyers</span>
                                        <span class="avatar">
                                            <span class="avatar-title bg-success text-white rounded-circle">
                                                <i class="fa fa-percent"></i>
                                            </span>
                                        </span>
                                    </h6>
                                    <div class="d-flex d-sm-block d-lg-flex align-items-end mb-3">
                                        <h3 class="mb-0 mr-2">
                                        {/* 0.19% */}
                                        </h3>
                                        <p class="small text-muted mb-0 line-height-20">
                                            <span class="text-success">
                                            {/* + 1.2% */}
                                            </span> 
                                            {/* than last week */}
                                        </p>
                                    </div>
                                    {/* <canvas id="widget-chart1"></canvas> */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title d-flex align-items-start justify-content-between mb-0">
                                        <span>Sellers</span>
                                        <span class="avatar">
                                            <span class="avatar-title bg-warning text-white rounded-circle">
                                                <i class="fa fa-dollar"></i>
                                            </span>
                                        </span>
                                    </h6>
                                    <div class="d-flex d-sm-block d-lg-flex align-items-end mb-3">
                                        <h3 class="mb-0 mr-2">
                                        {/* 3,137 */}
                                        </h3>
                                        <p class="small text-muted mb-0 line-height-20">
                                            <span class="text-danger">
                                            {/* -1.2% */}
                                            </span>
                                             {/* than last week */}
                                        </p>
                                    </div>
                                    {/* <canvas id="widget-chart2"></canvas> */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card">
                                <div class="card-body">
                                    <h6 class="card-title d-flex align-items-start justify-content-between mb-0">
                                        <span>Investors</span>
                                        <span class="avatar">
                                            <span class="avatar-title bg-danger text-white rounded-circle">
                                                <i class="fa fa-cube"></i>
                                            </span>
                                        </span>
                                    </h6>
                                    <div class="d-flex d-sm-block d-lg-flex align-items-end mb-3">
                                        <h3 class="mb-0 mr-2">
                                        {/* 1,650 */}
                                        </h3>
                                        <p class="small text-muted mb-0 line-height-20">
                                            <span class="text-success">
                                            {/* + 2.1% */}
                                            </span>
                                             {/* than last week */}
                                        </p>
                                    </div>
                                    {/* <canvas id="widget-chart3"></canvas> */}
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="row">
                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title d-flex justify-content-between">
                          <span>Sales this month</span>
                          <span className="dropdown">
                            <a
                              href="#"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </a>
                            <span className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                Action
                              </a>
                              <a href="#" className="dropdown-item">
                                Another action
                              </a>
                              <a href="#" className="dropdown-item">
                                Something else here
                              </a>
                            </span>
                          </span>
                        </h6>
                        <div id="chart1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Total Customers</h6>
                        <div className="text-center">
                          <div className="mb-2">
                            <span className="bar-1">
                            {/* 2,5,9,6,5,2,4,3,7,5 */}
                            </span>
                          </div>
                          <div className="font-size-30 mb-1 font-weight-bold text-primary">
                            {/* 1.241 */}
                          </div>
                          <p className="mb-0 text-muted">
                            <i className="fa fa-caret-up text-primary m-r-5"></i> 23%
                            increase in Last week
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Average Order Value</h6>
                        <div className="text-center">
                          <div className="mb-2">
                            <span className="bar-3">
                            {/* 2,5,9,6,5,2,4,3,7,5 */}
                            </span>
                          </div>
                          <div className="font-size-30 mb-1 font-weight-bold text-success">
                            {/* &#8377;732.52 */}
                          </div>
                          <p className="mb-0 text-muted">
                            <i className="fa fa-caret-down text-danger m-r-5"></i> 4
                            lead less than last week
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title d-md-flex justify-content-between">
                          Your Most Recent Earnings
                          <span className="reportrange btn btn-outline-light btn-sm mt-3 mt-md-0">
                            <i className="ti-calendar me-2"></i>
                            <span className="text"></span>
                            <i className="ti-angle-down ml-2"></i>
                          </span>
                        </h6>
                        <div className="row">
                          <div className="col-lg-4 col-md-12">
                            <div className="card border mb-3">
                              <div className="card-body p-3">
                                <div className="d-flex align-items-center">
                                  <div className="icon-block me-3 icon-block-lg icon-block-outline-success text-success">
                                    <i className="fa fa-bar-chart"></i>
                                  </div>
                                  <div className="m-10">
                                    <h6 className="text-uppercase font-size-11">
                                      Gross Earnings
                                    </h6>
                                    <h4 className="mb-0">&#8377;1,958,104
                                    </h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card border mb-3">
                              <div className="card-body p-3">
                                <div className="d-flex align-items-center">
                                  <div className="icon-block me-3 icon-block-lg icon-block-outline-danger  text-danger">
                                    <i className="fa fa-hand-lizard-o"></i>
                                  </div>
                                  <div className="m-10">
                                    <h6 className="text-uppercase font-size-11">
                                      Tax Withheld
                                    </h6>
                                    <h4 className="mb-0">&#8377;234,769</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card border mb-3">
                              <div className="card-body p-3">
                                <div className="d-flex align-items-center">
                                  <div className="icon-block me-3 icon-block-lg icon-block-outline-warning text-warning">
                                    <i className="fa fa-dollar"></i>
                                  </div>
                                  <div className="m-10">
                                    <h6 className="text-uppercase font-size-11">
                                      Net Earnings
                                    </h6>
                                    <h4 className="mb-0">&#8377;1,608,469</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-8 col-md-12">
                            <div className="table-responsive">
                              <table className="table table-hover ">
                                <thead className="thead-light">
                                  <tr>
                                    <th>Date</th>
                                    <th>Sales Count</th>
                                    <th>Gross Earnings</th>
                                    <th>Tax Withheld</th>
                                    <th className="text-right">Net Earnings</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>03/15/2018</td>
                                    <td>1,050</td>
                                    <td className="text-success">+ &#8377;32,580.00</td>
                                    <td className="text-danger">- &#8377;3,023.10</td>
                                    <td className="text-right">&#8377;28,670.90</td>
                                  </tr>
                                  <tr className="m-10">
                                    <td>03/14/2018</td>
                                    <td>780</td>
                                    <td className="text-success">+ &#8377;30,065.10</td>
                                    <td className="text-danger">- &#8377;2,780.00</td>
                                    <td className="text-right">&#8377;26,930.40</td>
                                  </tr>
                                  <tr>
                                    <td>03/13/2018</td>
                                    <td>1.980</td>
                                    <td className="text-success">+ &#8377;30,065.10</td>
                                    <td className="text-danger">- &#8377;2,780.00</td>
                                    <td className="text-right">&#8377;26,930.40</td>
                                  </tr>
                                  <tr>
                                    <td>03/12/2018</td>
                                    <td>300</td>
                                    <td className="text-success">+ &#8377;30,065.10</td>
                                    <td className="text-danger">- &#8377;2,780.00</td>
                                    <td className="text-right">&#8377;26,930.40</td>
                                  </tr>
                                  <tr>
                                    <td>03/11/2018</td>
                                    <td>940</td>
                                    <td className="text-success">+ &#8377;30,065.10</td>
                                    <td className="text-danger">- &#8377;2,780.00</td>
                                    <td className="text-right">&#8377;26,930.40</td>
                                  </tr>
                                  <tr>
                                    <td>03/10/2018</td>
                                    <td>1.280</td>
                                    <td className="text-success">+ &#8377;30,065.10</td>
                                    <td className="text-danger">-&#8377;2,780.00</td>
                                    <td className="text-right">&#8377;26,930.40</td>
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

                <div className="row">
                  <div className="col-xl-6 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title d-flex justify-content-between">
                          <span>Income Distribution</span>
                          <span className="dropdown">
                            <a
                              className="btn btn-outline-light btn-sm dropdown-toggle"
                              href="#"
                              data-toggle="dropdown"
                            >
                              USA
                            </a>
                            <span className="dropdown-menu dropdown-menu-right">
                              <a href="#" className="dropdown-item">
                                USA
                              </a>
                              <a href="#" className="dropdown-item">
                                Germany
                              </a>
                              <a href="#" className="dropdown-item">
                                France
                              </a>
                              <a href="#" className="dropdown-item">
                                Italy
                              </a>
                            </span>
                          </span>
                        </h6>
                        <div id="vmap_usa_en" style={{ height: "300px" }}></div>
                        <div className="table-responsive mt-3">
                          <table className="table table-borderless mb-0">
                            <thead className="thead-light">
                              <tr>
                                <th className="wd-40">States</th>
                                <th className="wd-25 text-right">Orders</th>
                                <th className="wd-35 text-right">Earnings</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="tx-medium">California</td>
                                <td className="text-right">12,201</td>
                                <td className="text-right text-success">
                                  &#8377;150,200.80
                                </td>
                              </tr>
                              <tr>
                                <td className="tx-medium">Texas</td>
                                <td className="text-right">11,950</td>
                                <td className="text-right text-success">
                                  &#8377;138,910.20
                                </td>
                              </tr>
                              <tr>
                                <td className="tx-medium">Wyoming</td>
                                <td className="text-right">11,198</td>
                                <td className="text-right text-success">
                                  &#8377;132,050.00
                                </td>
                              </tr>
                              <tr>
                                <td className="tx-medium">Florida</td>
                                <td className="text-right">9,885</td>
                                <td className="text-right text-success">
                                  &#8377;127,762.10
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Users Assigned to Me</h6>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item d-flex align-items-center p-l-r-0">
                            <div>
                              <figure className="avatar avatar-state-success m-r-15">
                                <img
                                  src="https://via.placeholder.com/128X128"
                                  className="rounded-circle"
                                  alt="image" />
                              </figure>
                            </div>
                            <div>
                              <h6 className="m-b-0">Valentine Maton</h6>
                              <small className="text-muted">Engineer</small>
                            </div>
                            <div className="ms-auto">
                              <span className="badge badge-danger me-2  d-sm-inline d-none ml-10">
                                Denied
                              </span>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  data-toggle="dropdown"
                                  className="btn btn-outline-light btn-sm  "
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#" className="dropdown-item">
                                    View
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Send Message
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Assign
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item d-flex align-items-center p-l-r-0">
                            <div>
                              <figure className="avatar avatar-state-success m-r-15">
                                <img
                                  src="https://via.placeholder.com/128X128"
                                  className="rounded-circle"
                                  alt="image" />
                              </figure>
                            </div>
                            <div>
                              <h6 className="m-b-0">Holmes Cherryman</h6>
                              <small className="text-muted">Human resources</small>
                            </div>
                            <div className="ms-auto">
                              <span className="badge badge-success me-2 d-sm-inline d-none">
                                Completed
                              </span>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  data-toggle="dropdown"
                                  className="btn btn-outline-light btn-sm"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#" className="dropdown-item">
                                    View
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Send Message
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Assign
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item d-flex align-items-center p-l-r-0">
                            <div>
                              <figure className="avatar avatar-state-success m-r-15">
                                <span className="avatar-title bg-secondary rounded-circle">
                                  MH
                                </span>
                              </figure>
                            </div>
                            <div>
                              <h6 className="m-b-0">Malanie Hanvey</h6>
                              <small className="text-muted">Real estate agent</small>
                            </div>
                            <div className="ms-auto">
                              <span className="badge badge-warning me-2 d-sm-inline d-none">
                                Pending
                              </span>
                              <div className="dropdown">
                                <a
                                  href="#"
                                  data-toggle="dropdown"
                                  className="btn btn-outline-light btn-sm"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#" className="dropdown-item">
                                    View
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Send Message
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Assign
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="list-group-item d-flex align-items-center p-l-r-0">
                            <div>
                              <figure className="avatar avatar-state-success m-r-15">
                                <img
                                  src="https://via.placeholder.com/128X128"
                                  className="rounded-circle"
                                  alt="image" />
                              </figure>
                            </div>
                            <div>
                              <h6 className="m-b-0">Kenneth Hune</h6>
                              <small className="text-muted">Engineer</small>
                            </div>
                            <div className="ms-auto">
                              <span className="badge badge-danger me-2 d-sm-inline d-none">
                                Denied
                              </span>
                              <div className="dropdown ">
                                <a
                                  href="#"
                                  data-toggle="dropdown"
                                  className="btn btn-outline-light btn-sm"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a href="#" className="dropdown-item">
                                    View
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Send Message
                                  </a>
                                  <a href="#" className="dropdown-item">
                                    Assign
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div className="mt-3 text-center">
                          <a href="#">View All</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-12">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Total Sales By Org Unit</h6>
                        <p className="text-muted">Total Sales</p>
                        <h2 className="number-font">69,453</h2>
                        <div className="progress" style={{ height: "10px" }}>
                          <div
                            className="progress-bar w-25 bg-primary"
                            role="progressbar"
                          ></div>
                          <div
                            className="progress-bar w-50 bg-info"
                            role="progressbar"
                          ></div>
                          <div
                            className="progress-bar w-25 bg-warning"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="row mt-3 pt-3">
                          <div className="col border-right">
                            <p className="mb-0">
                              <span className="fa fa-circle text-primary mr-1"></span>
                              Sales
                            </p>
                            <h5 className="mt-2 mb-0">25%</h5>
                          </div>
                          <div className="col border-right">
                            <p className="mb-0">
                              <span className="fa fa-circle text-info mr-1"></span>
                              Marketing
                            </p>
                            <h5 className="mt-2 mb-0">50%</h5>
                          </div>
                          <div className="col">
                            <p className="mb-0">
                              <span className="fa fa-circle text-warning mr-1"></span>
                              Finance
                            </p>
                            <h5 className="mt-2 mb-0">25%</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">Daily Task List</h6>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <div className="custom-control d-flex justify-content-between  custom-checkbox-success custom-checkbox todo-item">
                          <div>
                            <input
                              type="checkbox"
                              className="custom-control-input me-2"
                              id="customCheck3" />
                            <label
                              className="custom-control-label "
                              for="customCheck3"
                            >
                              Assignment will be completed
                            </label>
                          </div>
                          <div>
                            <small className="text-muted font-size-11">
                              13 May 2019
                            </small>

                          </div>
                        </div>
                        <form className="mt-4">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              aria-label="Example text with button addon"
                              placeholder="New task"
                              aria-describedby="button-addon1" />
                            <div className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                id="button-addon1"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div></>
  );
}

export default Home;

