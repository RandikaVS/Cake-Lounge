import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import PublishIcon from '@mui/icons-material/Publish';
import {Form,Row,Col} from 'react-bootstrap'
import { useState } from 'react';
import { useEffect } from 'react';
import Swal from 'sweetalert2'
import axios from "axios"
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { IconButton} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChatState } from '../../Context/ChatProvider';
import UpdateProduct from './updateProduct';
import { useHistory } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


const Product = ({fetchAgain}) => {

  const userData = (JSON.parse(localStorage.getItem("userInfo")));
  const{selectedProduct,setSelectedProduct} = ChatState();
    const [productName,setProductName] = useState();
    const [category,setCategory] = useState()
    const [productType,setProductType] = useState();
    const [productDescription,setProductDescription] = useState();                       
    const [productWeight,setProductWeight] = useState();
    const [price,setPrice] = useState();
    const [countInStock,setCountInStock] = useState();
    const [userId,setUserId] = useState(userData._id);
    const [image1,setImage1] = useState();
    const [image2,setImage2] = useState();
    const [image3,setImage3] = useState();
    const [image4,setImage4] = useState();
    const [image5,setImage5] = useState();
    const[add,setproductAdd]=useState(null);
    // const[selectedProduct,setSelectedProduct]=useState();
   const history= useHistory();

    const[products,setProducts]=useState();

    useEffect(() => {
      const userData = (JSON.parse(localStorage.getItem("userInfo")));
      setUserId(userData._id);
    }, [])

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




    const addlisting = async()=>{

       if(!productName || !productDescription || !productType || !productWeight ||!price ||!countInStock || !category || !userId){

         Swal.fire({
          title: 'Failed',
          text: 'Fail to publish',
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
      const{product} = await axios.post(
        "/api/product/add",
        {
          productName,
          category,
          productType,
          productDescription,
          productWeight,
          price,
          countInStock,
          userId,
          image1,image2,image3,image4,image5,
        },
        config
      );
      console.log(product);
      localStorage.setItem(productName, JSON.stringify(product));
          Swal.fire({
          title: 'success',
          text: 'Published',
          icon: 'success',
          confirmButtonText: 'Close'
        })
        setproductAdd(null)
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Fail to publish',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          console.log(`Error occured ${error.response.product.message}`);
          
        }

      }
    }

    const fetchProducts = async()=>{

      console.log(userId);
      try {
        const {data} = await axios.post(
          "/api/product",
          {
            userId,
          },
          );
        console.log("Product array");
        console.log(data);
        setProducts(data);
        
      } catch (error) {
        console.log("Fail to load the products");
      }
    }
    const deleteProduct = async(selectProduct)=>{
      const productId = selectProduct._id;
      try {
        const config = {

        headers: {
          "Content-type": "application/json",
        },

      };
      const{data} = await axios.post(
        "/api/product/delete",
        {
          productId,
        },
        config
      )
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Product has been deleted',
        showConfirmButton: false,
        timer: 1500
      })
        
      } catch (error) {
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fail to delete the product!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
      }
    }

    useEffect(() => {
      fetchProducts();
    }, [fetchAgain])
    
if(selectedProduct !=null){
        history.push('/updateProduct')
    }

  return (
    <>
      {add?(
        <div>
         <div style={{display:"flex"}}><Form>
            <div className='signupHeader'>
            <h3>Add Product</h3></div>

              <Form.Group className="mb-3" controlId="forBasicName" style={{width:"500px"}}>
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Enter product name" required
                              onChange={(e)=>setProductName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter category" 
                          onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Type</Form.Label>
              <Form.Control type="text" placeholder="Product type" 
                              onChange={(e)=>setProductType(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Description </Form.Label>
              <Form.Control type="text" placeholder="Product description" 
                              onChange={(e)=>setProductDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Weight</Form.Label>
              <Form.Control type="text" placeholder="Product weight" 
                              onChange={(e)=>setProductWeight(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Stock</Form.Label>
              <Form.Control type="text" placeholder="Product stock" 
                              onChange={(e)=>setCountInStock(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Product Price</Form.Label>
              <Form.Control type="text" placeholder="Product price" 
                              onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>

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

          <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 1</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails1(e.target.files[0])}/>
            </Form.Group>

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

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 2</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails2(e.target.files[0])}/>
            </Form.Group>

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
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 3</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails3(e.target.files[0])}/>
            </Form.Group>

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
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 4</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails4(e.target.files[0])}/>
            </Form.Group>

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
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Upload your image 5</Form.Label>
              <Form.Control type="file" size="sm" onChange={(e)=>postDetails5(e.target.files[0])}/>
            </Form.Group>
            </Form></div>


<Row><Col>
            <Button variant="contained" startIcon={<CancelIcon/>} style={{marginLeft:'250px'}} onClick={(e)=>setproductAdd(null)}>
                  Cancel
                </Button>
        <Button variant="contained" startIcon={<PublishIcon/>} style={{marginLeft:'550px'}} onClick={addlisting} >
                  Publish
                </Button>
                </Col>
</Row>


        </div>

      ):(
        <div>
                <Button variant="contained" startIcon={<AddIcon/>} style={{marginLeft:'900px'}} onClick={(e)=>setproductAdd("1")}>
                  Add Product
                </Button><br></br><br></br>

                <Box sx={{width: '100%',marginLeft:'150px'}}>
                      <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                  <h3 style={{marginLeft:'100px'}}>Active Listings</h3>
                            <Table
                             sx={{ minWidth: 750,marginLeft:'150px' }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            >
                            
                              
                              <TableBody  >
                              {products?(
                                  <div>
                                    {products.map((product)=>(
                                      <TableRow
                                      hover
                                      role="checkbox"
                                      tabIndex={-1}
                                     
                                    >

                                      <TableCell padding="checkbox"onClick={()=>setSelectedProduct(product)}>
                                        <Avatar>
                                          <img src={product.image1} style={{width:'50px',height:'50px'}}/>
                                        </Avatar>
                                      </TableCell>
                                      <TableCell
                                        component="th"
                                        scope="row"
                                        padding="10px"
                                        onClick={()=>setSelectedProduct(product)}
                                        sx={{width:"500px"}}
                                      >
                                        {product.productName}
                                      </TableCell>
                                      
                                    <TableCell align="right">
                                                  <IconButton aria-label="delete"
                                                  onClick={()=>{
                                                    
                                                    Swal.fire({
                                                      title: 'Are you sure?',
                                                      text: "You won't be able to revert this!",
                                                      icon: 'warning',
                                                      showCancelButton: true,
                                                      confirmButtonColor: '#3085d6',
                                                      cancelButtonColor: '#d33',
                                                      confirmButtonText: 'Yes, delete it!'
                                                    }).then((result) => {
                                                      if (result.isConfirmed) {
                                                         {deleteProduct(product)};
                                                       
                                                      }else if (
                                                        /* Read more about handling dismissals below */
                                                        result.dismiss === Swal.DismissReason.cancel
                                                      ) {
                                                        swalWithBootstrapButtons.fire(
                                                          'Cancelled',
                                                          'Your chat is safe :)',
                                                          'error'
                                                        )
                                                      }
                                                    })}}
                                                  >
                                                      <DeleteIcon />
                                                    </IconButton>
                                                    
                                      </TableCell>
                                    </TableRow>
                                    ))}

                                  </div>
                              ):(
                                <div>
                                  No products 
                                </div>
                              )}
                              </TableBody>

                            </Table>
                          </TableContainer>
                          </Paper>

                        </Box>
        </div>
      )
   }

    </>
  )

}

export default Product
