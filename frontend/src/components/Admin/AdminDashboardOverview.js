import React, { useState } from "react";
//React router imports
import { Link } from "react-router-dom";
//Material UI imports
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Avatar, Stack } from "@mui/material";

function AdminDashboardOverview(props) {
  const [shops, setShops] = useState(props.shop);
  return (
    <div className="flex-grow-1 p-5 d-flex">
      <div className="d-flex flex-column">
        <h3 className="h3">Top Sellers</h3>
        <Link to="/">
          See More <ArrowRightAltIcon />
        </Link>
        <Stack className="mt-4" direction="row" spacing={3}>
          {shops.map((shop, index) => {
            return (
              <div>
                <Avatar
                  src={shop.appearance.prop_pic}
                  key={index}
                  sx={{ width: 110, height: 110 }}
                />
                <span className="d-block text-center">{shop.name}</span>
              </div>
            );
          })}
        </Stack>
      </div>
    </div>
  );
}
export default AdminDashboardOverview;
