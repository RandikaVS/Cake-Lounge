import React from 'react'
import { ChatState } from './../Context/ChatProvider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import { Row,Col } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Product from './../components/Shop/product';
import {Form,Container} from 'react-bootstrap'
import ShopIcon from '@mui/icons-material/Shop';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CancelIcon from '@mui/icons-material/Cancel';
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MessageIcon from '@mui/icons-material/Message';
import SingleChat from '../components/Chat/SingleChat';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


//const userData = JSON.parse(localStorage.getItem('userInfo'));


const ProductPage = () => {

     const userData = JSON.parse(localStorage.getItem('userInfo'));

    const{product,chats,setChats,setSelectedChat,user,selectedChat,setUser,setChatLen,chatLen} = ChatState();

    const[qty,setQty] = useState();
    const[buyerId,setBuyerId]=useState(userData._id);
    const[productId,setProductId] = useState(product._id);
    const[productimage1,setProductimage1] = useState(product.image1);
    const[sellerId,setSellerId]= useState(product.userId);
    const[buyClicked,setBuyClicked]=useState(null);
    const[address,setAddress]=useState();
    const[total,setTotal]=useState();
    const[userId,setUserId] = useState(product.userId)
    const[token,setToken] = useState(userData.token)

    const history = useHistory();


    const buyProduct = async()=>{
        setTotal(product.price*qty);
        setQty(qty);

        if(!qty || !address || !productId || !buyerId || !sellerId || !total){
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
          "/api/order/buy",
          {
            buyerId,
            productId,
            sellerId,
            productimage1,
            qty,
            address,
            total,

          },
          config
      );
      Swal.fire({
            title: 'success',
            text: 'Order Placed',
            icon: 'success',
            confirmButtonText: 'Close'
          });
          history.push('/home');
                
            } catch (error) {
                Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Fail to buy',
        footer: '<a href="">Why do I have this issue?</a>'
      })

      console.log(`Error occured ${error.response.data.message}`);
                
            }
        }

    }

    const productChatPage = ()=>{
      history.push('/productChatPage')
    }



const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
        {product.productName}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Form>
        <Form.Group  controlId="forBasicName" style={{width:"200px",marginLeft:"-400px"}}>
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="text" placeholder='qty'required
                     onChange={(e)=>setQty(e.target.value)}/>
  </Form.Group></Form>
      </Typography>
      <Typography variant="body2">
          <br></br>

        <h5>Price : ${product.price}</h5>
        <br />
        <h6>{product.productDescription}</h6>
      </Typography>
      <Typography>
<IconButton color="primary" aria-label="upload picture" component="span" onClick={productChatPage}>
          <MessageIcon />
        </IconButton>
      </Typography>
    </CardContent>
    <CardActions>
      
      <Button variant="contained" startIcon={<ShopIcon/>} onClick={(e)=>setBuyClicked(product)}>
                  Buy Item
                </Button>
                     <Button  variant="contained" startIcon={<ShoppingCartIcon/>} >
                  Add to Cart
                </Button>
                     <Button variant="contained" startIcon={<FavoriteIcon/>} >
                  Add to WishList
                </Button>
                
    </CardActions>
  </React.Fragment>
);

const Buy = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" component="div">
       <h5>Check out</h5>
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Form>
        <Form.Group  controlId="forBasicName" style={{width:"200px",marginLeft:"-400px"}}>
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="text" placeholder='qty'required defaultValue={qty}
                     onChange={(e)=>setQty(e.target.value)}/>
  </Form.Group>
  <Form.Group  controlId="forBasicName" style={{width:"500px",marginLeft:"-400px"}}>
    <Form.Label>Address</Form.Label>
    <Form.Control type="text" placeholder='address'required
                     onChange={(e)=>setAddress(e.target.value)}/>
  </Form.Group>
  </Form>
      </Typography>
      <Typography variant="body2">
          <br></br>

        <h5>Total : ${product.price*qty}</h5>
        <br />
        <h6>{product.productDescription}</h6>
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" startIcon={<ShopIcon/>} onClick={buyProduct}>
                  Buy Item
                </Button>
                     <Button  variant="contained" startIcon={<CancelIcon/>} onClick={(e)=>setBuyClicked(null)}>
                  Cancel
                </Button>
                     
    </CardActions>
  </React.Fragment>
);
    const itemData = [
  {
    img: product.image1,
    title: 'Breakfast',
    rows: 2,
    cols: 2,
  },
  {
    img: product.image2,
    title: 'Burger',
  },
  {
    img: product.image3,
    title: 'Camera',
  },
  {
    img: product.image4,
    title: 'Coffee',
    cols: 2,
  },
  {
    img: product.image5,
    title: 'Hats',
    cols: 2,
  },

];



if(buyClicked !=null){
    return(
        <>
         <Row>
            <Col>
        <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
            >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}
            </ImageList>
            </Col>
            <Col>
             <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{marginTop:'50px',marginRight:'100px'}}>{Buy}</Card>
                </Box>
            </Col>
            </Row>
        </>
    )
}else{
  return (
    <div>
        <Row>
            <Col>
        <ImageList
            sx={{ width: 500, height: 450 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
            >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                <img
                    {...srcset(item.img, 121, item.rows, item.cols)}
                    alt={item.title}
                    loading="lazy"
                />
                </ImageListItem>
            ))}

            </ImageList>
            </Col>
            <Col>
             <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined" sx={{marginTop:'50px',marginRight:'100px'}}>{card}</Card>
                </Box>
            </Col>
            </Row>
  );

    </div>
  )
    }
}


export default ProductPage