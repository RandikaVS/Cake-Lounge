import React, { useState} from 'react'
import {Form, Button,Container} from 'react-bootstrap'
import axios from "axios"
import Swal from 'sweetalert2'
import { useEffect } from 'react'

const CreateShop = () => {

    const userData = JSON.parse(localStorage.getItem('userInfo'));

    const [shopName,setShopName] = useState();
    const [shopAddress,setShopAddress] = useState();
    const [shopDescription,setShopDescription] = useState();
    const [province,setProvince] = useState();
    const [userId,setUserId] = useState(userData._id);
    const [shopLogo,setShopLogo] = useState();

// useEffect(() => {
//   userData = JSON.parse(localStorage.getItem('userInfo'));
//   setUserId(userData._id);
// }, [])

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

const createShopHandle = async()=>{

  window.alert(userData._id);
  
    if(!shopName || !shopAddress || !shopDescription || !province || !userId){
       window.alert('Please fill the details !!!');
    }

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
          province,
          shopLogo,
        },
        config
      );
      console.log(shop);
     
      localStorage.setItem("shopInfo", JSON.stringify(shop));
         window.alert('Shop created !!!');
        
    
    } catch (error) {

      window.alert('Fail to create shop !!!');
      window.alert(`Error occured ${error.response.data.message}`);
      console.log(`Error occured ${error.response.data.message}`);
      
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
                              onChange={(e)=>setShopDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="forBasicName" style={{width:"400px"}}>
              <Form.Label>Province</Form.Label>
              <Form.Control type="text" placeholder="Enter province" required
                              onChange={(e)=>setProvince(e.target.value)}/>
            </Form.Group>

          <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload shop image</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails(e.target.files[0])}/>
            </Form.Group>

            <Button 
            variant="primary" 
            type="submit" 
            onClick={createShopHandle} >
              Create Shop
            </Button>
          </Form></div>

        </div>
  )
}
export default CreateShop

