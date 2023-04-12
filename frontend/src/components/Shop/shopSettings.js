// import React from 'react'
// import { Image } from 'react-bootstrap';
// import {Form, Button,Container} from 'react-bootstrap'
// import Swal from 'sweetalert2'
// import axios from "axios"
// import {useHistory} from 'react-router-dom'
// import { useState } from 'react';
// import CardMedia from '@mui/material/CardMedia';
// import Card from '@mui/material/Card';
// import { CardActionArea } from '@mui/material';
// import { useEffect } from 'react';

//  //const shopData = (JSON.parse(localStorage.getItem("shopInfo")));
// const ShopSettings = () => {

//    const shopData = (JSON.parse(localStorage.getItem("shopInfo")));

//     const [shopId,setShopId] = useState(shopData._id);
//     const [shopName,setShopName] = useState(shopData.shopName);
//     const [shopAddress,setShopAddress] = useState(shopData.shopAddress);                       
//     const [shopDescription,setShopDescription] = useState(shopData.shopDescription);
//     const [shopProvince,setShopProvince] = useState(shopData.shopProvince);
//     const [shopLogo,setShopLogo] = useState(shopData.shopLogo);

//        useEffect(() => {
// const shopData = (JSON.parse(localStorage.getItem("shopInfo")));
// setShopId(shopData._id);
//    }, [])
    
//     const history = useHistory();



//     const postDetails = (shopLogo)=>{

//       if(shopLogo===undefined){

//     console.log("Plese upload an image!!!");
//       }
//       if(shopLogo.type === "image/jpeg" || "image.png"){

//         const data = new FormData();

//         data.append("file",shopLogo);

//         data.append("upload_preset","userImages");

//         data.append("cloud_name","cake-lounge");

//         fetch("https://api.cloudinary.com/v1_1/cake-lounge/image/upload",{

//           method: "post",
//           body: data,
//         })
//         .then((res) => res.json())

//         .then(data =>{

//           //const imageUrl = data.url.toString();
//           setShopLogo(data.url.toString());

//           shopLogo = data.url.toString();
//           //console.log(data.url.toString());
//           console.log(shopLogo);

//         })
//         .catch((err)=>{
//           console.log(err);
//           //setPicLoading(false);
//         })
//       }else{

       
//         console.log("Plese upload an image!!!");

//       }
//     };



//    const updateShop = async()=>{
//     setShopId(shopData._id);
//     window.alert(shopId);
//     if(!shopName || !shopAddress || !shopDescription || !shopProvince || !shopId){

//          Swal.fire({
//           title: 'Failed',
//           text: 'Please fill all the fields',
//           icon: 'error',
//           confirmButtonText: 'Close'
//         })
//       }else{

//         try {
//           const config = {

//         headers: {
//           "Content-type": "application/json",
//         },

//       };
//       const{data} = await axios.post(
//         "/api/shop/UpdateShop",
//         {
//           shopId,
//           shopName,
//           shopAddress,
//           shopDescription,
//           shopProvince,
//         },
//         config
//       );
//       console.log(data);
//       localStorage.setItem("shopInfo", JSON.stringify(data));
//           Swal.fire({
//           title: 'success',
//           text: 'Shop Updated',
//           icon: 'success',
//           confirmButtonText: 'Close'
//         })
//         } catch (error) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: 'Fail Update Shop',
//             footer: '<a href="">Why do I have this issue?</a>'
//           })
//           console.log(`Error occured ${error.response.product.message}`);
          
//         }

//       }
//    }


   

    
//     const d = new Date();

//   return (
//     <div>

//         {/* <div className="top" style={{display: "block", width: 700, padding: 30}}>
            
//             <h1 style={{fontFamily:"sans-serif",marginLeft:"50px"}}>{shopData.shopName}</h1><br></br>
            
//             <Card sx={{ maxWidth: 345,height:'250px' }}>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="250"
//                     image={shopLogo}
//                     alt="image 1"
//                   />
//                 </CardActionArea>
//               </Card>
            
//               <Form.Label>Change Shop Logo</Form.Label>
//               <Form.Control type="file" size="sm" onChange={(e)=>postDetails(e.target.files[0])}/>
            

//             <div className="top2" style={{display:"flex"}}>

//             <p>Member since <b>{d.getFullYear()}</b></p>

//             <Image className="VerticalLine"src="https://res.cloudinary.com/cake-lounge/image/upload/v1650169164/Icons/icons8-vertical-line-50_arkro0.png"/>

//             <p> <Image src="https://res.cloudinary.com/cake-lounge/image/upload/v1650168865/Icons/icons8-location-24_dualwq.png"/>
//             {shopAddress}</p>

//            <p style={{marginTop:'1px'}}> <Image className="VerticalLine" src="https://res.cloudinary.com/cake-lounge/image/upload/v1650169164/Icons/icons8-vertical-line-50_arkro0.png"/>{shopName}<span style={{marginLeft:"10px"}}>{shopName}</span></p>

//             </div> */}
//     {/* </div> */}

//     <div style={{display:"flex"}}><Form>
//             <div className='signupHeader'>
//             <h3>Update Shop</h3></div>

//     <Form.Group className="mb-3" controlId="forBasicName" style={{width:"500px"}}>
//     <Form.Label>Shop Name</Form.Label>
//     <Form.Control type="text" defaultValue={shopName} required
//                      onChange={(e)=>setShopName(e.target.value)}/>
//   </Form.Group>

//   <Form.Group className="mb-3" controlId="formBasicEmail">
//     <Form.Label>Shop Address</Form.Label>
//     <Form.Control type="text" defaultValue={shopAddress}
//                 onChange={(e)=>setShopAddress(e.target.value)}/>
//   </Form.Group>

//   <Form.Group className="mb-3" controlId="formBasicPassword">
//     <Form.Label>Shop Description</Form.Label>
//     <Form.Control type="text" defaultValue={shopDescription} 
//                     onChange={(e)=>setShopDescription(e.target.value)}/>
//   </Form.Group>

//   <Form.Group className="mb-3" controlId="formConfirmPassword">
//     <Form.Label>Province</Form.Label>
//     <Form.Control type="text" defaultValue={shopAddress} required  
//                     onChange={(e)=>setShopProvince(e.target.value)}/>
//   </Form.Group>



// </Form></div>
//   <Button 
//   variant="primary" 
//   type="submit" 
//   onClick={updateShop} >
//     Update
//   </Button>
//     </div>
//   )
// }

// export default ShopSettings;
