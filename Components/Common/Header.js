import React from "react";
import "../assets/css/header.css";
//icons
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand";
import { faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div>
      {/* <!-- begin::header --> */}
      <div className="header">
        {/* <!-- begin::header left --> */}
        <ul className="navbar-nav">
          {/* <!-- begin::navigation-toggler --> */}
          <li className="nav-item navigation-toggler">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faBars} />
            </a>
          </li>
          {/* <!-- end::navigation-toggler --> */}

          {/* <!-- begin::header-logo --> */}
          <li className="nav-item" id="header-logo">
            <a href="index.html">
              <img
                className="logo"
                src="assets/media/image/logo.png"
                alt="logo"
              />
              <img
                className="logo-sm"
                src="assets/media/image/logo-sm.png"
                alt="small logo"
              />
              <img
                className="logo-dark"
                src="assets/media/image/logo-dark.png"
                alt="dark logo"
              />
            </a>
          </li>
          {/* <!-- end::header-logo --> */}
        </ul>
        {/* <!-- end::header left --> */}

        {/* <!-- begin::header-right --> */}
        <div className="header-left">
          <ul className="navbar-nav">
            {/* <!-- begin::search-form --> */}
            {/* <li className="nav-item search-form">
              <div className="row">
                <div className="col-md-6">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-default" type="button">
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </li> */}
            {/* <!-- end::search-form --> */}

            {/* <!-- begin::header minimize/maximize --> */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                title="Fullscreen"
                data-toggle="fullscreen"
              >
                <FontAwesomeIcon
                  icon={faExpand}
                  className="maximize"
                  data-feather="maximize"
                />
                <FontAwesomeIcon
                  icon={faBars}
                  className="minimize"
                  data-feather="minimize"
                />
              </a>
            </li>
            {/* <!-- end::header minimize/maximize --> */}

            {/* <!-- begin::header app list --> */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link"
                title="Apps"
                data-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faThLarge} />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-big">
                <div className="p-3">
                  <h6 className="text-uppercase font-size-11 mb-3">Web Apps</h6>
                  <div className="row row-xs">
                    <div className="col-6">
                      <a href="chat.html">
                        <div className="text-uppercase font-size-11 p-3 border-radius-1 border text-center mb-3">
                          <i
                            className="text-success width-23 height-23"
                            data-feather="message-circle"
                          ></i>
                          <div className="mt-2">Chat</div>
                        </div>
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="inbox.html">
                        <div className="text-uppercase font-size-11 p-3 border-radius-1 border text-center mb-3">
                          <i
                            className="text-info width-23 height-23"
                            data-feather="mail"
                          ></i>
                          <div className="mt-2">Mail</div>
                        </div>
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="calendar.html">
                        <div className="text-uppercase font-size-11 p-3 border-radius-1 border text-center">
                          <i
                            className="text-warning width-23 height-23"
                            data-feather="calendar"
                          ></i>
                          <div className="mt-2">Calendar</div>
                        </div>
                      </a>
                    </div>
                    <div className="col-6">
                      <a href="file-manager.html">
                        <div className="text-uppercase font-size-11 p-3 border-radius-1 border text-center">
                          <i
                            className="text-danger width-23 height-23"
                            data-feather="file"
                          ></i>
                          <div className="mt-2">File Manager</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* <!-- end::header app list --> */}

            {/* <!-- begin::header messages dropdown --> */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link nav-link-notify"
                title="Messages"
                data-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faComment} />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-big">
                <div
                  className="p-4 text-center"
                  data-backround-image="https://via.placeholder.com/481X271"
                >
                  <h6 className="mb-1">Messages</h6>
                  <small className="font-size-11 opacity-7">
                    2 unread messages
                  </small>
                </div>
                <div>
                  <ul className="list-group list-group-flush">
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <img
                              src="https://via.placeholder.com/128X128"
                              className="rounded-circle"
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Herbie Pallatina
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-circle-o font-size-11"
                            ></i>
                          </p>
                          <div className="small text-muted">
                            <span className="mr-2">02:30 PM</span>
                            <span>Have you madimage</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex align-items-center hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <img
                              src="https://via.placeholder.com/128X128"
                              className="rounded-circle"
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Andrei Miners
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-circle-o font-size-11"
                            ></i>
                          </p>
                          <div className="small text-muted">
                            <span className="mr-2">08:36 PM</span>
                            <span>I have a meetinimage</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="text-divider small pb-2 pl-3 pt-3">
                      <span>Old chats</span>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex align-items-center hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <img
                              src="https://via.placeholder.com/128X128"
                              className="rounded-circle"
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Kevin added
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <div className="small text-muted">
                            <span className="mr-2">11:09 PM</span>
                            <span>Have you madimage</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <img
                              src="https://via.placeholder.com/128X128"
                              className="rounded-circle"
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Eugenio Carnelley
                            <i
                              title="Mark as read"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <div className="small text-muted">
                            <span className="mr-2">Yesterday</span>
                            <span>I have a meetinimage</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex align-items-center hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <img
                              src="https://via.placeholder.com/128X128"
                              className="rounded-circle"
                              alt="user"
                            />
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Neely Ferdinand
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <div className="small text-muted">
                            <span className="mr-2">Yesterday</span>
                            <span>I have a meetinimage</span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="p-2 text-right">
                  <ul className="list-inline small">
                    <li className="list-inline-item">
                      <a href="#">Mark All Read</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* <!-- end::header messages dropdown --> */}

            {/* <!-- begin::header notification dropdown --> */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link nav-link-notify"
                title="Notifications"
                data-toggle="dropdown"
              >
                <FontAwesomeIcon icon={faBell} />
              </a>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-big">
                <div
                  className="p-4 text-center"
                  data-backround-image="https://via.placeholder.com/481X271"
                >
                  <h6 className="mb-1">Notifications</h6>
                  <small className="font-size-11 opacity-7">
                    1 unread notifications
                  </small>
                </div>
                <div>
                  <ul className="list-group list-group-flush">
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <span className="avatar-title bg-success-bright text-success rounded-circle">
                              <i className="ti-user"></i>
                            </span>
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            New customer registered
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-circle-o font-size-11"
                            ></i>
                          </p>
                          <span className="text-muted small">20 min ago</span>
                        </div>
                      </a>
                    </li>
                    <li className="text-divider small pb-2 pl-3 pt-3">
                      <span>Old notifications</span>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <span className="avatar-title bg-warning-bright text-warning rounded-circle">
                              <i className="ti-package"></i>
                            </span>
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            New Order Recieved
                            <i
                              title="Mark as read"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <span className="text-muted small">45 sec ago</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex align-items-center hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <span className="avatar-title bg-danger-bright text-danger rounded-circle">
                              <i className="ti-server"></i>
                            </span>
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Server Limit Reached!
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <span className="text-muted small">55 sec ago</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="list-group-item d-flex align-items-center hide-show-toggler"
                      >
                        <div>
                          <figure className="avatar avatar-sm m-r-15">
                            <span className="avatar-title bg-info-bright text-info rounded-circle">
                              <i className="ti-layers"></i>
                            </span>
                          </figure>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 line-height-20 d-flex justify-content-between">
                            Apps are ready for update
                            <i
                              title="Make unread"
                              data-toggle="tooltip"
                              className="hide-show-toggler-item fa fa-check font-size-11"
                            ></i>
                          </p>
                          <span className="text-muted small">Yesterday</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="p-2 text-right">
                  <ul className="list-inline small">
                    <li className="list-inline-item">
                      <a href="#">Mark All Read</a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            {/* <!-- end::header notification dropdown --> */}
          </ul>

          {/* <!-- begin::mobile header toggler --> */}
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item header-toggler">
              <a href="#" className="nav-link">
                <i data-feather="arrow-down"></i>
              </a>
            </li>
          </ul>
          {/* <!-- end::mobile header toggler --> */}
        </div>
        {/* <!-- end::header-right --> */}
      </div>
      {/* <!-- end::header --> */}
    </div>
  );
};

export default Header;
