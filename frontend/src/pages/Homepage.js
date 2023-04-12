import React from 'react'

import axios from "axios";
import "./CakeLoungeHeader.css";
//Material UI imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Paper from "@mui/material/Paper";
import SellIcon from "@mui/icons-material/Sell";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import { Avatar, Card, Divider, Link } from "@mui/material";

//Assests Import
// import PropPic from "https://res.cloudinary.com/cake-lounge/image/upload/v1653442533/jcfaryp5xodw59zabruh.jpg";
// import NederlandFlag from "https://res.cloudinary.com/cake-lounge/image/upload/v1653451922/WhatsApp_Image_2022-05-25_at_1.43.19_AM_kxxdmb.jpg";
import { useState } from 'react';
import { useEffect } from 'react';


const Homepage = (proops) => {

    const [products, setProducts] = useState(null);
  useEffect(() => {
    axios
      .get("api/user/fetch/shops")
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.log("[Cake Lounge Frontend ]", error);
      });
  });

  if (products == null) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="d-flex  flex-column">
        <section className="custom-home-page-product-list d-flex flex-column justify-content-center">
          <div className="d-flex justify-content-center">
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[0].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[0].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[0].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[0].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[1].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[1].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[1].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[1].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[2].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[2].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[2].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[2].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[3].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[3].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[3].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[3].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
          </div>
          <div className="d-flex justify-content-center">
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[1].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[1].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[1].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[1].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[0].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[0].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[0].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[0].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[3].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[3].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[3].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[3].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
            <Card className="m-5 flex-column d-flex">
              <img
                className="custom-home-page-product-image"
                src={products[2].image1}
              />
              <div className="p-2 d-flex flex-column">
                <span>
                  <b>{products[2].productName}</b>{" "}
                </span>

                <span>
                  <b>&euro; {products[2].price}</b>{" "}
                </span>
              </div>
              <Divider />
              <div className="p-2 d-flex flex-column">
                <span style={{ fontSize: "16px" }}>
                  {products[2].countInStock} Cakes Avaialable{" "}
                </span>
              </div>
              <div className="d-flex p-2 justify-content-between">
                <Link>Buy</Link>
                <div className="d-flex">
                  <FavoriteBorderIcon className="mx-1" />
                  <ShoppingCartIcon />
                </div>
              </div>
            </Card>
          </div>
        </section>
        <footer className="custom-home-footer d-flex bg-dark text-white p-5 justify-content-around mt-5">
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">General Links</h3>
            <span>About</span>
            <span>Contact</span>
            <span>Help Center</span>
            <span>Site map</span>
          </div>
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">Buyer</h3>
            <span>Registration</span>
            <span>Buyer Help Center</span>
            <span>Shops</span>
          </div>
          <div className="d-flex flex-column col-md-3">
            <h3 className="h3">Seller</h3>
            <span>Registration</span>
            <span>Seller Help Center</span>
            <span>My Shops</span>
            <span>Seller Policy</span>
          </div>
          <div className="d-flex flex-column">
            <h3 className="h3">Reach Us</h3>
            <div className="d-flex">
              <FacebookIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <InstagramIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <YouTubeIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <TwitterIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
            </div>
            <h3 className="h3 mt-4">Our Apps</h3>
            <div className="d-flex">
              <AndroidIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
              <AppleIcon
                className="mx-2"
                sx={{ fontSize: "30px", color: "#ff5c8d" }}
              />
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Homepage