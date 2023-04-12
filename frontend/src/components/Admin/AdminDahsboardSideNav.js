//General imports
import React, { useState } from "react";
import USER_IMG from "../../Assets/user.png";
//Material UI imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import DashboardIcon from "@mui/icons-material/Dashboard";

function AdminDahsboardSideNav(props) {
  return (
    <div className="container-fliud min-vh-100 shadow-lg d-flex flex-column w-25 custom_admin_dashboard align-items-center">
      <img className="mt-5" src={USER_IMG} alt="user_profile_image" />
      <div className="custom_admin_dashboard_sidenav_links p-4">
        <Accordion className="w-100 mt-4" sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h4 className="h4">
              <DashboardIcon /> Dashboard
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <div className="ssss">
              <ul>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Overview
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Messages
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Users
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Products
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Analytics
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Settings
                  </a>
                </li>
                <li className="list-unstyled">
                  <a className="text-decoration-none text-dark" href="">
                    Notifications
                  </a>
                </li>
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <AssignmentTurnedInIcon /> Upcoming
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <AssignmentIcon /> Logs
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ boxShadow: "none" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <h4 className="h4">
              <HelpCenterIcon /> Support
            </h4>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="flex-grow-1">
        <span className="position-relative bottom-0 ">
          MAde with ❤ by Shehan Chanuka
        </span>
      </div>
    </div>
  );
}
export default AdminDahsboardSideNav;
