import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import LOGO from "../../../../Images/Demo_LOGO.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { faBell } from "@fortawesome/free-solid-svg-icons/faBell";
function AdminPostLoginHeader(props) {
  return (
    <>
      <nav className="custom_admin_post_login_header d-flex justify-content-between align-items-center">
        <h2 className="h2">LOGO</h2>
        <div className="d-flex custom_admin_post_login_header_icons mr-2">
          <FontAwesomeIcon
            className="p-2 "
            icon={faBell}
            style={{ color: "white" }}
          />
          <FontAwesomeIcon
            className="p-2 "
            icon={faUser}
            style={{ color: "white" }}
          />
        </div>
      </nav>
    </>
  );
}
export default AdminPostLoginHeader;
