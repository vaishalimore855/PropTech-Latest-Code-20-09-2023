import React from "react";

const Footer = () => {
  return (
    <div>
      {/* <!-- begin::footer --> */}
      <footer>
        <div className="container">
          <div>
            © 2019 Protable v1.0.0 Made by{" "}
            <a href="http://laborasyon.com">Laborasyon</a>
          </div>
          <div>
            <nav className="nav">
              <a
                href="https://themeforest.net/licenses/standard"
                className="nav-link"
              >
                Licenses
              </a>
              <a href="#" className="nav-link">
                Change Log
              </a>
              <a href="#" className="nav-link">
                Get Help
              </a>
            </nav>
          </div>
        </div>
      </footer>
      {/* <!-- end::footer --> */}
    </div>
  );
};

export default Footer;
