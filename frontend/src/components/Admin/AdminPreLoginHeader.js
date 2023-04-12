import React, { Component, useState } from "react";
import LOGO from "../../Asserts/Demo_LOGO.png";
import customCss from "./admin.css";

const AdminPreLoginHeader = (props) => {
  if (!props.logged) {
    return (
      <>
        <div className="container-fluid custom_admin_prelogin_header">
          <img src={LOGO} />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default AdminPreLoginHeader;
