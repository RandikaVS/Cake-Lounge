import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import {Form} from 'react-bootstrap'
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Swal from 'sweetalert2'
import axios from "axios"

const ShopRegister = () => {

    const userData = (JSON.parse(localStorage.getItem("userInfo")));

    

    const [shopName,setShopName] = useState();
    const [shopAddress,setShopAddress] = useState();
    const [shopDescription,setShopDescription] = useState();
    const [shopProvince,setShopProvince] = useState();
    const [shopLogo,setShopLogo] = useState();
    const [userId,setUserId] = useState(userData._id);

    useEffect(() => {
      const userData = (JSON.parse(localStorage.getItem("userInfo")));
      setUserId(userData._id);
    }, [])

    const postDetails = (shopLogo)=>{

      if(shopLogo===undefined){

    console.log("Plese upload an image!!!");
      }
      if(shopLogo.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",shopLogo);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setShopLogo(data.url.toString());

          shopLogo = data.url.toString();
          //console.log(data.url.toString());
          console.log(shopLogo);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

    
    const createShop = async()=>{

       if(!shopName || !shopAddress || !shopDescription || !shopProvince ||!userId ){

         Swal.fire({
          title: 'Failed',
          text: 'Please fill all the fields',
          icon: 'error',
          confirmButtonText: 'Close'
        })
      }
      else{

        try {
          const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const{shop} = await axios.post(
        "/api/shop/createShop",
        {
          userId,
          shopName,
          shopAddress,
          shopDescription,
          shopProvince,
          shopLogo,
        },
        config
      );
      console.log(shop);
      localStorage.setItem("shopInfo", JSON.stringify(shop));
          Swal.fire({
          title: 'success',
          text: 'Shop Created',
          icon: 'success',
          confirmButtonText: 'Close'
        })
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fail Create Shop',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          console.log(`Error occured ${error.response.product.message}`);
          
        }

      }
    }

  return (
    <div>
        
        <div style={{marginLeft:'-400px'}}>
              <Form>
            <div className='signupHeader'>
            <h3>Create Shop</h3></div>

              <Form.Group className="mb-3" controlId="forBasicName" style={{width:"400px"}}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" required
                              onChange={(e)=>setShopName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="forBasicName" style={{width:"400px"}}>
              <Form.Label>Shop address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" required
                              onChange={(e)=>setShopAddress(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="forBasicName" style={{width:"400px"}}>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" required
                             onChange={(e)=>setShopDescription(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="forBasicName" style={{width:"400px"}}>
              <Form.Label>Province</Form.Label>
              <Form.Control type="text" placeholder="Enter province" required
                              onChange={(e)=>setShopProvince(e.target.value)}/>
            </Form.Group>

          <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload shop image</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails(e.target.files[0])}/>
            </Form.Group>

          </Form></div>
          <Button variant="contained" startIcon={<AddBoxIcon/>} style={{marginLeft:'550px'}} onClick={createShop} >
                  Create Shop
                </Button>

    </div>
  )
}
export default ShopRegister
