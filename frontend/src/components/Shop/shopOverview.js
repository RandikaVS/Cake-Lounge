import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Product from './product';
import { Row,Col } from 'react-bootstrap';
import { ChatState } from './../../Context/ChatProvider';

 const ShopOverview = ({fetchAgain}) => {

   const shopData = (JSON.parse(localStorage.getItem("shopInfo")));
   const userData = (JSON.parse(localStorage.getItem("userInfo")));

   const{chatLen} = ChatState();

   const [userId,setUserId]= useState(userData._id);
   const [products,setProducts]= useState(userData._id);
   const[orders,setOrders]=useState();
   const[length,setLength] = useState();
   const[orderLength,setOrderLength]=useState();

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
        setLength(data.length);
        
      } catch (error) {
        console.log("Fail to load the products");
      }
    }

      const fetchOrders = async()=>{
   

      console.log(userId);
      try {
        const {data} = await axios.post(
          "/api/order",
          {
            userId,
          },
          );
        console.log("order array");
        console.log(data);
        setOrders(data);
        setOrderLength(data.length);
        
      } catch (error) {
        console.log("Fail to load the orders");
      }
    }



    useEffect(() => {
      fetchProducts();
      fetchOrders();
    }, [fetchAgain])

  return (
    <div>
      <Row>
        <Col>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={shopData.shopLogo}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Active Listings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'30px'}}>
          <p>{length}</p>
        </Typography>
      </CardContent>
    </Card>
</Col><Col>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={"https://res.cloudinary.com/cake-lounge/image/upload/v1653420177/1-2900.jpg.optimal_ksxgr2.jpg"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Orders
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'30px'}}>
          <p>{orderLength}</p>
        </Typography>
      </CardContent>
    </Card>
  </Col>
  <Col>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={"https://res.cloudinary.com/cake-lounge/image/upload/v1653420605/unnamed_juuyqk.png"}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Messages
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'30px'}}>
          <p>{chatLen}</p>
        </Typography>
      </CardContent>
    </Card>
  </Col>


    </Row>
    </div>
  )
}
export default ShopOverview;