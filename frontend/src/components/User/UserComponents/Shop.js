import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';
import {Form,Container} from 'react-bootstrap'
import CreateShop from '../../Shop/CreateShop';
import { styled } from '@mui/material/styles';
import { Image } from 'react-bootstrap';
import Icon from '@mui/material/Icon';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import Button from '@mui/material/Button';
import ShopRegister from '../../Shop/ShopRegister';




 const Shop = ({fetchAgain}) => {

    const userData = (JSON.parse(localStorage.getItem("userInfo")));
    // const shopData = (JSON.parse(localStorage.getItem("shopInfo")));
    const [shop,setShop]=useState(null);
    const [shopName,setShopName] = useState();
    const [shopAddress,setShopAddress] = useState();
    const [shopDescription,setShopDescription] = useState();
    const [province,setProvince] = useState();
    const [shopLogo,setShopLogo] = useState();
    const [userId,setUserId]=useState(userData._id);
    console.log(userData._id);

    const history= useHistory();

    const fetchShop = async()=>{
         setUserId(userData._id)
       try {
      const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const { data } = await axios.post(

        "/api/shop/fetchShop",
        {
          userId

        },

        config,
      );
      console.log(data);
      setShop(data);
      localStorage.setItem("shopInfo", JSON.stringify(data));
    
    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Shop fetching failed',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      console.log(`Error occured ${error.message}`);
      
    }
    }


    useEffect(() => {
      const userData = (JSON.parse(localStorage.getItem("userInfo")));
      fetchShop();
    }, [fetchAgain])

    const viewShop = () =>{
        history.push('/shop');
    }
    const shopRegisterBtn = () =>{
        history.push('/shopRegister');
    }
    

 
    return (
    <div>
        {shop?(

            <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={shop.shopLogo}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {shop.shopName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shop.shopDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={viewShop}>View</Button>
      </CardActions>
    </Card>



         ):(
           <ShopRegister />
        )}
    </div>
  )
  
 }
export default Shop;
