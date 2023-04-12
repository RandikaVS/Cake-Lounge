import React from "react";
import "./CakeLoungeHeader.css";
//Material UI imports
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Paper from "@mui/material/Paper";
import SellIcon from "@mui/icons-material/Sell";
import InputBase from "@mui/material/InputBase";
import { useRef } from 'react';
import { Skeleton, Button } from '@mui/material';
import { Container, Overlay,ref,show,target,Popover, Spinner, Form, FormControl, Placeholder } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { useState } from 'react'
import Swal from 'sweetalert2';
import ScrollableFeed from 'react-scrollable-feed'
import axios from 'axios'
import LogoutIcon from '@mui/icons-material/Logout';
import { pink } from '@mui/material/colors';


import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

import { Avatar, Link } from "@mui/material";
//Assests Import
import PropPic from "../../Asserts/WhatsApp Image 2022-05-25 at 1.43.22 AM.jpeg";
import NederlandFlag from "../../Asserts/WhatsApp Image 2022-05-25 at 1.43.19 AM.jpeg";
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';


export default function CakeLoungeHomePage(props) {

  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem('userInfo'));

    const [show, setShow] = useState(false);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);
    const [target, setTarget] = useState(null);


    const handleSearch = async (event) => {
        setShow(!show);
        setTarget(event.target);
    if (!search) {
      Swal.fire('Please enter user name to search..!')
      return;
    }

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      };

      const { data } = await axios.get(`/api/product/searches?search=${search}`, config);
      //console.log(data)
      setSearchResult(data);
    } catch (error) {
      window.alert('Failed to Load the Search Results')
    }
  };

  const logOut = ()=>{
    localStorage.removeItem('userInfo');
    history.push('/')
  }


  const proPage = ()=>{
    history.push('/profile')
  }
  return (
    <div className="d-flex  flex-column">
      <header className="d-flex flex-column">
        <div className=" text-white bg-dark container-fluid custom-above-navbar-section ">
          <div className=" d-flex container-1">
            <span>
              Hello, <b>User</b>
            </span>
            <span className="mx-2">Daily Deals</span>
            <span className="mx-2">Help Center</span>
          </div>
          <div className="d-flex container-2">
            <div className="d-flex">
              <ExpandMoreIcon />
              <span>EUR</span>
            </div>
            <div className="d-flex">
              <span className="mx-2">Ship to</span>
              <img className="mt-1" src={NederlandFlag} alt="" />
            </div>
            <div className="d-flex">
              <span className="mx-2">Sell</span>
              <span className="mx-2">Wishlist</span>
            </div>
            <div className="d-flex">
              <NotificationsIcon className="mt-1 mx-1" sx={{ fontSize: 17 }} />
              <ShoppingCartIcon className="mt-1 mx-1" sx={{ fontSize: 17 }} />
            </div>
          </div>
        </div>
        <nav className="container-fluid custom-navbar p-2 shadow d-flex justify-content-around px-3">
          <h1 className="col-md-3">Cake Lounge</h1>
          <div className="d-flex col-md-6">
   
              <SearchBar/>

            <Link>Advance Search</Link>
          </div>
          <div className="d-flex col-md-3 justify-content-end">
            <ShoppingCartIcon
              className="mx-2"
              sx={{ alignSelf: "center", fontSize: 30 }}
            />
            <NotificationsIcon
              className="mx-2"
              sx={{ alignSelf: "center", fontSize: 30 }}
            />
            <SellIcon
              className="mx-2"
              sx={{ alignSelf: "center", fontSize: 30 }}
            />
   
            <Avatar
              className="custom-border custom-navbar-user-image mx-2"
              src='https://res.cloudinary.com/cake-lounge/image/upload/v1653442533/jcfaryp5xodw59zabruh.jpg'
              alt="user pic"
              onClick={proPage}
            />
        
            <LogoutIcon
            className="custom-border custom-navbar-user-image mx-2"
             sx={{ color: pink[500] }}
             onClick={logOut}
            />
           
          </div>
        </nav>
      </header>
    </div>
  );
}
