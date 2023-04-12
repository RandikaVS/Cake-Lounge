import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import PublishIcon from '@mui/icons-material/Publish';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { ChatState } from '../../Context/ChatProvider';
import { useHistory } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2'
import axios from 'axios';


const UpdateProduct = () => {

     const{selectedProduct,setSelectedProduct} = ChatState();

    const [productId,setProductId] = useState(selectedProduct._id);
    const [productName,setProductName] = useState(selectedProduct.productName);
    const [category,setCategory] = useState(selectedProduct.category)
    const [productType,setProductType] = useState(selectedProduct.productType);
    const [productDescription,setProductDescription] = useState(selectedProduct.productDescription);                       
    const [productWeight,setProductWeight] = useState(selectedProduct.productWeight);
    const [price,setPrice] = useState(selectedProduct.price);
    const [countInStock,setCountInStock] = useState(selectedProduct.countInStock);
    const [image1,setImage1] = useState(selectedProduct.image1);
    const [image2,setImage2] = useState(selectedProduct.image2);
    const [image3,setImage3] = useState(selectedProduct.image3);
    const [image4,setImage4] = useState(selectedProduct.image4);
    const [image5,setImage5] = useState(selectedProduct.image5);
    const [isUpdated,setIsUpdated] = useState(null);
    // const [selectedProduct,setSelectedProduct] = useState();

const history= useHistory();
    

  const postDetails1 = (image1)=>{

      if(image1===undefined){

    console.log("Plese upload an image!!!");
      }
      if(image1.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",image1);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setImage1(data.url.toString());

          image1 = data.url.toString();
          //console.log(data.url.toString());
          console.log(image1);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

  const postDetails2 = (image2)=>{

      if(image2===undefined){

    console.log("Plese upload an image!!!");
      }
      if(image2.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",image2);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setImage2(data.url.toString());

          image2 = data.url.toString();
          //console.log(data.url.toString());
          console.log(image2);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

  const postDetails3 = (image3)=>{

      if(image3===undefined){

    console.log("Plese upload an image!!!");
      }
      if(image3.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",image3);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setImage3(data.url.toString());

          image3 = data.url.toString();
          //console.log(data.url.toString());
          console.log(image3);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

  const postDetails4 = (image4)=>{

      if(image4===undefined){

    console.log("Plese upload an image!!!");
      }
      if(image4.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",image4);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setImage4(data.url.toString());

          image4 = data.url.toString();
          //console.log(data.url.toString());
          console.log(image4);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

  const postDetails5 = (image5)=>{

      if(image5===undefined){

    console.log("Plese upload an image!!!");
      }
      if(image5.type === "image/jpeg" || "image.png"){

        const data = new FormData();

        data.append("file",image5);

        data.append("upload_preset","userImages");

        data.append("cloud_name","cake-lounge");

        fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

          method: "post",
          body: data,
        })
        .then((res) => res.json())

        .then(data =>{

          //const imageUrl = data.url.toString();
          setImage5(data.url.toString());

          image5 = data.url.toString();
          //console.log(data.url.toString());
          console.log(image5);

        })
        .catch((err)=>{
          console.log(err);
          //setPicLoading(false);
        })
      }else{

       
        console.log("Plese upload an image!!!");

      }
    };

    const updateListing = async()=>{

      if(!productName || !category || !productType || !productDescription || !productWeight || !price || !countInStock){
        Swal.fire({
        title: 'Error!',
        text: 'Please fill required fields !!!',
        icon: 'error',
        confirmButtonText: 'Close'
      })
      }else{

        try {
          const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const { data } = await axios.post(
        "/api/product/update",
        {
          productId,
          productName,
          category,
          productType,
          productDescription,
          productWeight,
          price,
          countInStock,
          image1,image2,image3,image4,image5,

        },
        config
      );
      Swal.fire({
            title: 'success',
            text: 'Update Success',
            icon: 'success',
            confirmButtonText: 'Close'
          })
         setIsUpdated(data);
          
        } catch (error) {
          Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Update failed',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      console.log(`Error occured ${error.response.data.message}`);
      
        }
      }

    }

    if(isUpdated !=null){
      setSelectedProduct(null);
      history.push('/shop')
    }
    const productList = ()=>{
      setSelectedProduct(null);
      history.push('/shop')
    }
    
  return (
      
    <div>
       
<div>
            <div style={{display:"flex"}}><Form>
            <div className='signupHeader'>
            <h3>Update Product</h3></div>

              <Form.Group className="mb-3" controlId="forBasicName" style={{width:"500px"}}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" defaultValue={selectedProduct.productName}
                              onChange={(e)=>setProductName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" defaultValue={selectedProduct.category}
                          onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Type</Form.Label>
              <Form.Control type="text" placeholder="Product type" defaultValue={selectedProduct.productType}
                              onChange={(e)=>setProductType(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Description </Form.Label>
              <Form.Control type="text" placeholder="Product description" defaultValue={selectedProduct.productDescription}
                              onChange={(e)=>setProductDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Weight</Form.Label>
              <Form.Control type="text" placeholder="Product weight" defaultValue={selectedProduct.productWeight}
                              onChange={(e)=>setProductWeight(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control type="text" placeholder="Product stock" defaultValue={selectedProduct.countInStock}
                              onChange={(e)=>setCountInStock(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" placeholder="Product price" defaultValue={selectedProduct.price}
                              onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>

          <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 1</Form.Label>

              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image1}
                    alt="image 1"
                  />
                </CardActionArea>
              </Card>
            <br></br>
              <Form.Control type="file" size="sm" src={selectedProduct.image1}
                            onChange={(e)=>postDetails1(e.target.files[0])}/>
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 2</Form.Label>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image2}
                    alt="image 1"
                  />
                </CardActionArea>
              </Card>
            <br></br>
              <Form.Control type="file" size="sm" 
                            onChange={(e)=>postDetails2(e.target.files[0])}/>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 3</Form.Label>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image3}
                    alt="image 1"
                  />
                </CardActionArea>
              </Card>
            <br></br>
              <Form.Control type="file" size="sm" 
                            onChange={(e)=>postDetails3(e.target.files[0])}/>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 4</Form.Label>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image4}
                    alt="image 1"
                  />
                </CardActionArea>
              </Card>
            <br></br>
              <Form.Control type="file" size="sm" 
                            onChange={(e)=>postDetails4(e.target.files[0])}/>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 5</Form.Label>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image5}
                    alt="image 1"
                  />
                </CardActionArea>
              </Card>
            <br></br>
              <Form.Control type="file" size="sm" 
                            onChange={(e)=>postDetails5(e.target.files[0])}/>
            </Form.Group>
            </Form></div>
            <Row><Col>
            <Button variant="contained" startIcon={<CancelIcon/>} style={{marginLeft:'250px'}} onClick={productList}>
                  Cancel
                </Button>
        <Button variant="contained" startIcon={<PublishIcon/>} style={{marginLeft:'550px'}} onClick={updateListing} >
                  Publish
                </Button>
                </Col>
</Row></div>

    </div>
  )
}
export default UpdateProduct;
